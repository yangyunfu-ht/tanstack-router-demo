import React, { useMemo } from 'react'
import { AgGridReact, type AgGridReactProps } from 'ag-grid-react'
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

export interface AgGridProps<TData = unknown> extends AgGridReactProps<TData> {
  height?: string | number
  width?: string | number
  className?: string
  style?: React.CSSProperties
}

export const AgGrid = <TData = unknown,>({
  height = 600,
  width = '100%',
  className = '',
  style = {},
  defaultColDef,
  ...props
}: AgGridProps<TData>) => {
  const { theme } = useThemeStore()

  const containerStyle = useMemo(
    () => ({
      height,
      width,
      // 自定义样式变量以增强视觉效果
      '--ag-cell-vertical-border': 'solid var(--ag-border-color)',
      '--ag-cell-horizontal-border': 'solid var(--ag-border-color)',
      '--ag-header-column-separator-display': 'block',
      '--ag-header-column-separator-height': '100%',
      '--ag-header-column-separator-width': '1px',
      '--ag-header-column-separator-color': 'var(--ag-border-color)',
      ...style,
    }),
    [height, width, style]
  )

  const defaultColumnDef = useMemo<ColDef>(
    () => ({
      flex: 1,
      minWidth: 100,
      filter: true,
      sortable: true,
      resizable: true,
      ...defaultColDef,
    }),
    [defaultColDef]
  )

  return (
    <div
      className={`${
        theme === 'dark' ? 'ag-theme-quartz-dark' : 'ag-theme-quartz'
      } ${className}`}
      style={containerStyle as React.CSSProperties}
    >
      <AgGridReact
        theme='legacy' // 关键配置：兼容旧版 CSS 主题
        defaultColDef={defaultColumnDef}
        headerHeight={40}
        rowHeight={40}
        rowSelection={{
          mode: 'multiRow',
        }}
        pagination={true}
        paginationPageSize={20}
        paginationPageSizeSelector={[10, 20, 50, 100]}
        {...props}
      />
    </div>
  )
}
