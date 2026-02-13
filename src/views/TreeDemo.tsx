import React, { useState, useMemo } from 'react'
import TreeSelect from '@/components/TreeSelect'
import type { TreeNodeData } from '@/components/TreeSelect'

const treeData: TreeNodeData[] = [
  {
    id: '1',
    label: '公司总部',
    children: [
      {
        id: '1-1',
        label: '研发中心',
        children: [
          { id: '1-1-1', label: '前端开发组' },
          { id: '1-1-2', label: '后端开发组' },
          { id: '1-1-3', label: '测试组' },
          { id: '1-1-4', label: 'UI设计组' },
        ],
      },
      {
        id: '1-2',
        label: '产品中心',
        children: [
          { id: '1-2-1', label: '产品经理组' },
          { id: '1-2-2', label: '运营组' },
        ],
      },
      {
        id: '1-3',
        label: '市场部',
      },
    ],
  },
  {
    id: '2',
    label: '分公司',
    children: [
      { id: '2-1', label: '上海分公司' },
      { id: '2-2', label: '北京分公司' },
    ],
  },
]

// 生成大规模测试数据
const generateLargeData = (
  level: number = 3,
  countPerLevel: number = 3,
  prefix = 'Node'
): TreeNodeData[] => {
  const generate = (currentLevel: number, parentId: string): TreeNodeData[] => {
    if (currentLevel > level) return []

    const nodes: TreeNodeData[] = []
    for (let i = 0; i < countPerLevel; i++) {
      const id = parentId ? `${parentId}-${i}` : `${i}`
      const label = `${prefix} ${currentLevel}-${i}`

      const node: TreeNodeData = {
        id,
        label,
        children:
          currentLevel < level ? generate(currentLevel + 1, id) : undefined,
      }
      nodes.push(node)
    }
    return nodes
  }

  return generate(1, '')
}

const TreeDemo: React.FC = () => {
  const [value, setValue] = useState<string>('')
  const [selectedNode, setSelectedNode] = useState<TreeNodeData | null>(null)

  // 大数据量测试状态
  const [largeValue, setLargeValue] = useState<string>('')
  const [largeSelectedNode, setLargeSelectedNode] =
    useState<TreeNodeData | null>(null)

  // 使用 useMemo 缓存生成的大数据，防止重渲染时重新计算
  // 生成 3 层，每层 20 个节点，总共约 8000+ 节点
  const largeTreeData = useMemo(() => generateLargeData(3, 3, '大数据节点'), [])

  const handleChange = (newValue: string, node: TreeNodeData | null) => {
    console.log('Selected:', newValue, node)
    setValue(newValue)
    setSelectedNode(node)
  }

  const handleLargeChange = (newValue: string, node: TreeNodeData | null) => {
    console.log('Selected Large:', newValue, node)
    setLargeValue(newValue)
    setLargeSelectedNode(node)
  }

  return (
    <div className='p-6 max-w-4xl mx-auto'>
      <div className='bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 border border-gray-200 dark:border-gray-700 transition-colors'>
        <h1 className='text-2xl font-bold mb-6 text-gray-900 dark:text-white'>
          递归树形选择组件示例
        </h1>

        <div className='space-y-8'>
          {/* 基础用法 */}
          <div>
            <h2 className='text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200'>
              基础用法
            </h2>
            <div className='w-full max-w-sm'>
              <TreeSelect
                data={treeData}
                value={value}
                onChange={handleChange}
                placeholder='请选择部门'
              />
            </div>
            <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-600 dark:text-gray-300'>
              <p>当前选中ID: {value || '无'}</p>
              <p>当前选中名称: {selectedNode?.label || '无'}</p>
            </div>
          </div>

          {/* 大数据量性能测试 */}
          <div>
            <h2 className='text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200'>
              大数据量性能测试 (虚拟滚动)
            </h2>
            <p className='mb-2 text-sm text-gray-500 dark:text-gray-400'>
              包含约 {8000} 个节点，测试渲染性能和滚动流畅度
            </p>
            <div className='w-full max-w-sm'>
              <TreeSelect
                data={largeTreeData}
                value={largeValue}
                onChange={handleLargeChange}
                placeholder='请选择大数据节点'
              />
            </div>
            <div className='mt-4 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-600 dark:text-gray-300'>
              <p>当前选中ID: {largeValue || '无'}</p>
              <p>当前选中名称: {largeSelectedNode?.label || '无'}</p>
            </div>
          </div>

          {/* 复杂层级演示 */}
          <div>
            <h2 className='text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200'>
              组件特性说明
            </h2>
            <ul className='list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300 text-sm'>
              <li>支持无限层级递归渲染</li>
              <li>支持点击箭头展开/收起子节点</li>
              <li>支持一键清除选中值</li>
              <li>支持暗黑模式 (Dark Mode)</li>
              <li>支持点击外部自动关闭下拉框</li>
              <li>完全受控组件 (Value/OnChange)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export default TreeDemo
