import React, { useState } from 'react'
import { AgGridReact } from 'ag-grid-react'
import {
  AllCommunityModule,
  ModuleRegistry,
  type ColDef,
} from 'ag-grid-community'
import { useThemeStore } from '@/stores/useThemeStore'

// 引入 AG Grid 样式
import 'ag-grid-community/styles/ag-grid.css'
import 'ag-grid-community/styles/ag-theme-quartz.css'

// 注册所有社区版模块
ModuleRegistry.registerModules([AllCommunityModule])

// 定义行数据类型
interface IRow {
  make: string
  model: string
  price: number
  electric: boolean
}

const Data: React.FC = () => {
  const { theme } = useThemeStore()
  // 行数据
  const [rowData] = useState<IRow[]>([
    { make: 'Tesla', model: 'Model Y', price: 64950, electric: true },
    { make: 'Ford', model: 'F-Series', price: 33850, electric: false },
    { make: 'Toyota', model: 'Corolla', price: 29600, electric: false },
    { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
    { make: 'Fiat', model: '500', price: 15774, electric: false },
    { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
  ])

  // 列定义
  const [colDefs] = useState<ColDef<IRow>[]>([
    {
      headerName: '#',
      valueGetter: 'node.rowIndex + 1',
      width: 50,
      flex: 0,
      pinned: 'left',
    },
    { field: 'model', headerName: '型号', flex: 1 },
    {
      field: 'price',
      headerName: '价格',
      valueFormatter: p => '£' + p.value.toLocaleString(),
      flex: 1,
    },
    {
      field: 'electric',
      headerName: '电动?',
      flex: 1,
    },
  ])

  return (
    <div className='p-4 h-full flex flex-col'>
      <h1 className='text-2xl font-bold mb-4 text-gray-900 dark:text-white'>
        AG Grid 示例
      </h1>
      <div
        className={
          theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
        }
        style={
          {
            height: 600,
            width: '100%',
            '--ag-cell-vertical-border': 'solid var(--ag-border-color)',
            '--ag-cell-horizontal-border': 'solid var(--ag-border-color)',
            '--ag-header-column-separator-display': 'block',
            '--ag-header-column-separator-height': '100%',
            '--ag-header-column-separator-width': '1px',
            '--ag-header-column-separator-color': 'var(--ag-border-color)',
          } as React.CSSProperties
        }
      >
        <AgGridReact
          theme='legacy'
          rowData={rowData}
          columnDefs={colDefs}
          defaultColDef={{
            flex: 1,
          }}
          headerHeight={40}
          rowHeight={40}
          rowSelection={{
            mode: 'multiRow',
          }}
        />
      </div>
    </div>
  )
}

export default Data
