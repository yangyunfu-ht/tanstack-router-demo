import React, { useState, useEffect, useRef, useMemo } from 'react'

export interface TreeNodeData {
  id: string
  label: string
  children?: TreeNodeData[]
}

interface TreeSelectProps {
  data: TreeNodeData[]
  value?: string
  onChange?: (value: string, node: TreeNodeData | null) => void
  placeholder?: string
  className?: string
  allowClear?: boolean
  searchable?: boolean
  itemHeight?: number
}

const TreeSelect: React.FC<TreeSelectProps> = ({
  data,
  value,
  onChange,
  placeholder = '请选择',
  className = '',
  allowClear = true,
  searchable = true,
  itemHeight = 36,
}) => {
  const [isOpen, setIsOpen] = useState(false)
  // const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null) // Removed state
  const [expandedKeys, setExpandedKeys] = useState<Set<string>>(new Set())
  const [searchTerm, setSearchTerm] = useState('')
  const [filteredData, setFilteredData] = useState<TreeNodeData[]>(data)
  const [scrollTop, setScrollTop] = useState(0)

  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLDivElement>(null)

  // 查找当前选中的节点对象 - 使用 useMemo 替代 useEffect
  const selectedNode = useMemo(() => {
    if (!value) return null
    const findNode = (nodes: TreeNodeData[]): TreeNodeData | null => {
      for (const node of nodes) {
        if (node.id === value) return node
        if (node.children) {
          const found = findNode(node.children)
          if (found) return found
        }
      }
      return null
    }
    return findNode(data)
  }, [value, data])

  // 处理搜索逻辑
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value
    setSearchTerm(term)

    if (!term) {
      setFilteredData(data)
      return
    }

    const lowerTerm = term.toLowerCase()
    const newExpandedKeys = new Set<string>()

    const filterNodes = (nodes: TreeNodeData[]): TreeNodeData[] => {
      return nodes.reduce((acc, node) => {
        const matches = node.label.toLowerCase().includes(lowerTerm)
        const children = node.children ? filterNodes(node.children) : []

        if (matches || children.length > 0) {
          if (children.length > 0) {
            newExpandedKeys.add(node.id)
          }
          acc.push({
            ...node,
            children: children.length > 0 ? children : undefined,
          })
        }
        return acc
      }, [] as TreeNodeData[])
    }

    setFilteredData(filterNodes(data))
    setExpandedKeys(prev => new Set([...prev, ...newExpandedKeys]))
    setScrollTop(0)
    if (listRef.current) listRef.current.scrollTop = 0
  }

  // 搜索框自动聚焦
  useEffect(() => {
    if (isOpen && searchable && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen, searchable])

  // 关闭下拉框时清除搜索
  const closeDropdown = () => {
    setIsOpen(false)
    setSearchTerm('')
    setFilteredData(data)
  }

  // 点击外部关闭下拉框
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        closeDropdown()
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [data]) // Added data dependency just in case, though closeDropdown uses data

  const handleToggleExpand = (e: React.MouseEvent, id: string) => {
    e.stopPropagation()
    const newExpandedKeys = new Set(expandedKeys)
    if (newExpandedKeys.has(id)) {
      newExpandedKeys.delete(id)
    } else {
      newExpandedKeys.add(id)
    }
    setExpandedKeys(newExpandedKeys)
  }

  const handleSelect = (node: TreeNodeData) => {
    onChange?.(node.id, node)
    closeDropdown()
  }

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation()
    onChange?.('', null)
    // setSelectedNode(null) // Removed
    setSearchTerm('')
    setFilteredData(data)
  }

  // 展平树结构
  const flattenedData = useMemo(() => {
    const flatten = (
      nodes: TreeNodeData[],
      expanded: Set<string>,
      depth = 0
    ): { node: TreeNodeData; depth: number }[] => {
      let result: { node: TreeNodeData; depth: number }[] = []
      for (const node of nodes) {
        result.push({ node, depth })
        if (
          expanded.has(node.id) &&
          node.children &&
          node.children.length > 0
        ) {
          result = result.concat(flatten(node.children, expanded, depth + 1))
        }
      }
      return result
    }
    return flatten(filteredData, expandedKeys)
  }, [filteredData, expandedKeys])

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    setScrollTop(e.currentTarget.scrollTop)
  }

  // 虚拟列表计算
  const CONTAINER_HEIGHT = 240 // max-h-60
  const totalHeight = flattenedData.length * itemHeight
  const startIndex = Math.floor(scrollTop / itemHeight)
  const visibleCount = Math.ceil(CONTAINER_HEIGHT / itemHeight) + 5
  const endIndex = Math.min(flattenedData.length, startIndex + visibleCount)
  const visibleItems = flattenedData.slice(startIndex, endIndex)

  const renderVirtualList = () => {
    return (
      <div
        style={{ height: `${totalHeight}px`, position: 'relative' }}
        className='w-full'
      >
        {visibleItems.map(({ node, depth }, index) => {
          const realIndex = startIndex + index
          const hasChildren = node.children && node.children.length > 0
          const isExpanded = expandedKeys.has(node.id)
          const isSelected = value === node.id

          return (
            <div
              key={node.id}
              className='absolute w-full box-border'
              style={{
                height: `${itemHeight}px`,
                top: 0,
                transform: `translateY(${realIndex * itemHeight}px)`,
              }}
            >
              <div
                className={`
                  flex items-center px-2 cursor-pointer transition-colors h-full
                  ${isSelected ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-200'}
                `}
                style={{ paddingLeft: `${depth * 20 + 8}px` }}
                onClick={() => handleSelect(node)}
              >
                {/* 展开/收起图标 */}
                <span
                  className={`
                    mr-1 w-5 h-5 flex items-center justify-center rounded-sm hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors
                    ${hasChildren ? 'visible' : 'invisible'}
                  `}
                  onClick={e => hasChildren && handleToggleExpand(e, node.id)}
                >
                  {hasChildren && (
                    <svg
                      className={`w-3 h-3 text-gray-500 transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}
                      fill='none'
                      stroke='currentColor'
                      viewBox='0 0 24 24'
                    >
                      <path
                        strokeLinecap='round'
                        strokeLinejoin='round'
                        strokeWidth={2}
                        d='M9 5l7 7-7 7'
                      />
                    </svg>
                  )}
                </span>

                <span className='truncate'>{node.label}</span>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return (
    <div
      className={`relative ${className}`}
      ref={containerRef}
    >
      {/* 输入框区域 */}
      <div
        className={`
          w-full px-3 py-2 border rounded-lg cursor-pointer flex items-center justify-between bg-white dark:bg-gray-800 transition-colors group
          ${isOpen ? 'border-blue-500 ring-2 ring-blue-500/20' : 'border-gray-300 dark:border-gray-600 hover:border-gray-400'}
        `}
        onClick={() => setIsOpen(!isOpen)}
      >
        {searchable && isOpen ? (
          <input
            ref={inputRef}
            className='w-full bg-transparent border-none outline-none text-gray-900 dark:text-gray-100 placeholder-gray-400'
            value={searchTerm}
            onChange={handleSearch}
            placeholder={selectedNode ? selectedNode.label : placeholder}
            onClick={e => e.stopPropagation()}
          />
        ) : (
          <span
            className={
              selectedNode
                ? 'text-gray-900 dark:text-gray-100'
                : 'text-gray-400'
            }
          >
            {selectedNode ? selectedNode.label : placeholder}
          </span>
        )}

        <div className='flex items-center'>
          {allowClear && selectedNode && (
            <span
              className='hidden group-hover:block p-0.5 mr-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 cursor-pointer rounded-full hover:bg-gray-100 dark:hover:bg-gray-700'
              onClick={handleClear}
              title='清除'
            >
              <svg
                className='w-3.5 h-3.5'
                fill='none'
                stroke='currentColor'
                viewBox='0 0 24 24'
              >
                <path
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  strokeWidth={2}
                  d='M6 18L18 6M6 6l12 12'
                />
              </svg>
            </span>
          )}
          <svg
            className={`w-4 h-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} ${allowClear && selectedNode ? 'group-hover:hidden' : ''}`}
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth={2}
              d='M19 9l-7 7-7-7'
            />
          </svg>
        </div>
      </div>

      {/* 下拉列表 */}
      {isOpen && (
        <div
          className='absolute z-50 w-full mt-1 max-h-60 overflow-auto bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg animate-in fade-in zoom-in-95 duration-100'
          onScroll={handleScroll}
          ref={listRef}
        >
          {flattenedData.length > 0 ? (
            <div className='py-1'>{renderVirtualList()}</div>
          ) : (
            <div className='p-4 text-center text-gray-500 dark:text-gray-400 text-sm'>
              {searchTerm ? '无匹配数据' : '暂无数据'}
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default TreeSelect
