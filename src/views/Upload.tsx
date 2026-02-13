import React, { useState, useRef, useEffect } from 'react'
import SparkMD5 from 'spark-md5'

// 定义切片大小 (比如 2MB)
const CHUNK_SIZE = 2 * 1024 * 1024

// 定义上传状态
type UploadStatus =
  | 'idle'
  | 'hashing'
  | 'uploading'
  | 'paused'
  | 'completed'
  | 'error'

interface FileChunk {
  file: Blob
  index: number
  hash: string // 整个文件的 hash，还是切片的 hash？一般是大文件的 hash + index
  size: number
  progress: number
  status: 'pending' | 'uploading' | 'success' | 'error'
}

const Upload: React.FC = () => {
  const [file, setFile] = useState<File | null>(null)
  const [status, setStatus] = useState<UploadStatus>('idle')
  const [progress, setProgress] = useState(0)
  const [chunks, setChunks] = useState<FileChunk[]>([])
  const [hash, setHash] = useState<string>('')

  // 用于控制并发请求的 abort controller
  const abortControllerRef = useRef<AbortController | null>(null)

  const handleFileChange = (file: File) => {
    if (file && file instanceof File) {
      setFile(file)
      setStatus('idle')
      setProgress(0)
      setChunks([])
      setHash('')
    }
  }

  // 1. 文件切片 & 计算 Hash
  const calculateHash = async (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const spark = new SparkMD5.ArrayBuffer()
      const fileReader = new FileReader()
      const chunks = Math.ceil(file.size / CHUNK_SIZE)
      let currentChunk = 0

      fileReader.onload = e => {
        if (e.target?.result) {
          spark.append(e.target.result as ArrayBuffer)
        }
        currentChunk++

        if (currentChunk < chunks) {
          loadNext()
        } else {
          resolve(spark.end())
        }
      }

      fileReader.onerror = () => {
        reject('Hash calculation failed')
      }

      function loadNext() {
        const start = currentChunk * CHUNK_SIZE
        const end =
          start + CHUNK_SIZE >= file.size ? file.size : start + CHUNK_SIZE
        fileReader.readAsArrayBuffer(file.slice(start, end))
      }

      loadNext()
    })
  }

  // 创建切片列表
  const createChunks = (file: File, fileHash: string): FileChunk[] => {
    const chunkList: FileChunk[] = []
    // 计算切片数量 (向上取整)
    const chunkCount = Math.ceil(file.size / CHUNK_SIZE)
    console.log('chunkCount', chunkCount, file.size, CHUNK_SIZE)

    for (let i = 0; i < chunkCount; i++) {
      const start = i * CHUNK_SIZE
      const end = Math.min(file.size, start + CHUNK_SIZE)
      chunkList.push({
        file: file.slice(start, end),
        index: i,
        hash: fileHash,
        size: end - start,
        progress: 0,
        status: 'pending',
      })
    }
    console.log('chunkList', chunkList)
    return chunkList
  }

  const handleUpload = async () => {
    if (!file) return

    try {
      setStatus('hashing')
      // 步骤 1: 计算 Hash (模拟耗时)
      // 在实际项目中，可以使用 Web Worker 避免阻塞主线程
      const fileHash = await calculateHash(file)
      setHash(fileHash)

      // 步骤 2: 切片
      const chunkList = createChunks(file, fileHash)
      setChunks(chunkList)

      // 步骤 3: 开始上传
      setStatus('uploading')
      await uploadChunks(chunkList)
    } catch (error) {
      console.error(error)
      setStatus('error')
    }
  }

  // 模拟上传单个切片
  const uploadChunk = (
    chunk: FileChunk,
    signal: AbortSignal
  ): Promise<void> => {
    return new Promise((resolve, reject) => {
      // 模拟网络延迟 500ms - 1500ms
      const timeout = 500 + Math.random() * 1000

      let loaded = 0
      const interval = setInterval(() => {
        if (signal.aborted) {
          clearInterval(interval)
          reject(new DOMException('Aborted', 'AbortError'))
          return
        }

        loaded += chunk.size / 10 // 每次增加 10%

        // 更新切片进度
        setChunks(prev =>
          prev.map(c => {
            if (c.index === chunk.index) {
              return {
                ...c,
                progress: Math.min(100, (loaded / chunk.size) * 100),
              }
            }
            return c
          })
        )

        // 更新总进度 (简单的平均值计算，实际应根据 total size 计算)
        // 这里我们在 uploadChunks 中统一计算总进度更合适，但为了演示实时性：
        // updateGlobalProgress()

        if (loaded >= chunk.size) {
          clearInterval(interval)
          // 标记为成功
          setChunks(prev =>
            prev.map(c => {
              if (c.index === chunk.index)
                return { ...c, status: 'success', progress: 100 }
              return c
            })
          )
          resolve()
        }
      }, timeout / 10)
    })
  }

  // 并发上传控制
  const uploadChunks = async (allChunks: FileChunk[]) => {
    const controller = new AbortController()
    abortControllerRef.current = controller
    const signal = controller.signal

    // 过滤出未完成的切片
    const pendingChunks = allChunks.filter(c => c.status !== 'success')

    // 并发数限制
    const CONCURRENCY = 3
    const queue = [...pendingChunks]
    const activeUploads = new Set<Promise<void>>()

    try {
      while (queue.length > 0 || activeUploads.size > 0) {
        // 如果暂停或中止
        if (signal.aborted) throw new Error('Paused')

        // 填充并发池
        while (queue.length > 0 && activeUploads.size < CONCURRENCY) {
          const chunk = queue.shift()!

          // 更新状态为 uploading
          setChunks(prev =>
            prev.map(c =>
              c.index === chunk.index ? { ...c, status: 'uploading' } : c
            )
          )

          const uploadPromise = uploadChunk(chunk, signal).then(() => {
            activeUploads.delete(uploadPromise)
          })

          activeUploads.add(uploadPromise)
        }

        // 等待任意一个完成，以便继续填充
        if (activeUploads.size > 0) {
          await Promise.race(activeUploads)
        } else {
          // 全部完成
          break
        }
      }

      setStatus('completed')
    } catch (err: unknown) {
      const error = err as Error
      if (error.message === 'Paused' || error.name === 'AbortError') {
        setStatus('paused')
      } else {
        setStatus('error')
      }
    }
  }

  const handlePause = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort()
      abortControllerRef.current = null
    }
  }

  const handleResume = () => {
    if (status === 'paused' && chunks.length > 0) {
      setStatus('uploading')
      uploadChunks(chunks)
    }
  }

  // 计算总进度
  useEffect(() => {
    if (chunks.length === 0) return
    const totalSize = chunks.reduce((acc, curr) => acc + curr.size, 0)
    const loadedSize = chunks.reduce(
      (acc, curr) => acc + (curr.size * curr.progress) / 100,
      0
    )
    const percent = Math.floor((loadedSize / totalSize) * 100)
    setProgress(percent)
  }, [chunks])

  const handlePickerFile = () => {
    const htmlInputElement = document.createElement('input')
    htmlInputElement.style.display = 'none'
    htmlInputElement.type = 'file'
    htmlInputElement.onchange = e => {
      const target = e.target as HTMLInputElement
      const file = target.files?.[0]
      if (file) {
        handleFileChange(file)
      }
    }
    htmlInputElement.click()
    // 释放对 DOM 元素的引用
    htmlInputElement.remove()
  }

  const handleClearFile = () => {
    setFile(null)
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors'>
        <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
          大文件上传示例
        </h1>

        {/* 文件选择 */}
        <div className='mb-6'>
          <button
            className='px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 rounded-lg'
            onClick={handlePickerFile}
          >
            选择文件
          </button>
          <button
            className='px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-lg ml-2'
            onClick={handleClearFile}
          >
            清除选择
          </button>
          <div className='flex justify-between'>
            <div className='mt-4 text-sm text-gray-600 dark:text-gray-300'>
              {file?.name || '未选择文件'}
            </div>
            <div className='mt-2 text-sm text-gray-600 dark:text-gray-300'>
              {file?.size
                ? `大小: ${(file.size / 1024 / 1024).toFixed(2)} MB`
                : ''}
            </div>
          </div>
        </div>

        {/* 操作按钮 */}
        <div className='flex gap-4 mb-6'>
          <button
            onClick={handleUpload}
            disabled={!file || status === 'uploading' || status === 'completed'}
            className='px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors'
          >
            {status === 'paused' ? '重新开始' : '开始上传'}
          </button>

          {status === 'uploading' && (
            <button
              onClick={handlePause}
              className='px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors'
            >
              暂停
            </button>
          )}

          {status === 'paused' && (
            <button
              onClick={handleResume}
              className='px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg transition-colors'
            >
              继续上传
            </button>
          )}
        </div>

        {/* 状态显示 */}
        {status !== 'idle' && (
          <div className='space-y-4'>
            <div className='flex justify-between text-sm text-gray-600 dark:text-gray-300'>
              <span>状态: {getStatusText(status)}</span>
              {hash && <span>Hash: {hash}</span>}
              <span>总进度: {progress}%</span>
            </div>

            {/* 总进度条 */}
            <div className='w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700'>
              <div
                className='bg-blue-600 h-2.5 rounded-full transition-all duration-300'
                style={{ width: `${progress}%` }}
              ></div>
            </div>

            {/* 切片网格 */}
            <div className='mt-6'>
              <h3 className='text-sm font-medium mb-2 text-gray-900 dark:text-white'>
                切片详情 ({chunks.filter(c => c.status === 'success').length}/
                {chunks.length})
              </h3>
              <div className='grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2 max-h-60 overflow-y-auto p-2 border border-gray-200 dark:border-gray-700 rounded-lg'>
                {chunks.map(chunk => (
                  <div
                    key={chunk.index}
                    className={`
                        aspect-square rounded flex items-center justify-center text-xs font-medium text-white transition-colors
                        ${getChunkColor(chunk.status)}
                      `}
                    title={`Chunk ${chunk.index}: ${chunk.progress.toFixed(0)}%`}
                  >
                    {chunk.status === 'success'
                      ? '✓'
                      : `${chunk.progress.toFixed(0)}%`}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 说明文案 */}
      <div className='mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-100 dark:border-blue-800'>
        <h3 className='text-lg font-semibold text-blue-800 dark:text-blue-300 mb-2'>
          实现原理说明
        </h3>
        <ul className='list-disc list-inside space-y-1 text-sm text-blue-700 dark:text-blue-400'>
          <li>
            <strong>文件切片</strong>: 使用 <code>File.slice()</code>{' '}
            将大文件分割成 {CHUNK_SIZE / 1024 / 1024}MB 的小块。
          </li>
          <li>
            <strong>Hash 计算</strong>: 使用 <code>spark-md5</code> 计算文件内容
            Hash，用于实现秒传和完整性校验。
          </li>
          <li>
            <strong>并发控制</strong>: 同时上传 3 个切片，避免过多请求阻塞网络。
          </li>
          <li>
            <strong>断点续传</strong>: 暂停时中止请求
            (AbortController)，恢复时只上传未完成的切片。
          </li>
          <li>
            <strong>进度汇总</strong>: 实时计算所有切片的上传进度，展示总进度。
          </li>
        </ul>
      </div>
    </div>
  )
}

function getStatusText(status: UploadStatus) {
  switch (status) {
    case 'idle':
      return '等待选择'
    case 'hashing':
      return '正在计算 Hash...'
    case 'uploading':
      return '上传中...'
    case 'paused':
      return '已暂停'
    case 'completed':
      return '上传完成'
    case 'error':
      return '上传失败'
    default:
      return status
  }
}

function getChunkColor(status: FileChunk['status']) {
  switch (status) {
    case 'pending':
      return 'bg-gray-300 dark:bg-gray-600'
    case 'uploading':
      return 'bg-blue-500 animate-pulse'
    case 'success':
      return 'bg-green-500'
    case 'error':
      return 'bg-red-500'
    default:
      return 'bg-gray-300'
  }
}

export default Upload
