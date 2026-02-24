import React, { useState } from 'react'
import { AgGrid } from '@/components/AgGrid'
import type { ColDef } from 'ag-grid-community'

interface IEmployee {
  id: number
  name: string
  department: string
  role: string
  salary: number
  status: 'Active' | 'On Leave' | 'Terminated'
  joinDate: string
}

const AgGridDemo: React.FC = () => {
  const [rowData] = useState<IEmployee[]>([
    {
      id: 1,
      name: 'John Doe',
      department: 'Engineering',
      role: 'Senior Developer',
      salary: 120000,
      status: 'Active',
      joinDate: '2022-01-15',
    },
    {
      id: 2,
      name: 'Jane Smith',
      department: 'Design',
      role: 'UI/UX Designer',
      salary: 95000,
      status: 'Active',
      joinDate: '2022-03-01',
    },
    {
      id: 3,
      name: 'Mike Johnson',
      department: 'Product',
      role: 'Product Manager',
      salary: 110000,
      status: 'On Leave',
      joinDate: '2021-11-20',
    },
    {
      id: 4,
      name: 'Sarah Williams',
      department: 'Marketing',
      role: 'Marketing Specialist',
      salary: 85000,
      status: 'Active',
      joinDate: '2023-02-10',
    },
    {
      id: 5,
      name: 'David Brown',
      department: 'Engineering',
      role: 'DevOps Engineer',
      salary: 115000,
      status: 'Active',
      joinDate: '2022-06-15',
    },
    {
      id: 6,
      name: 'Emily Davis',
      department: 'HR',
      role: 'HR Manager',
      salary: 90000,
      status: 'Terminated',
      joinDate: '2020-09-01',
    },
    {
      id: 7,
      name: 'Chris Wilson',
      department: 'Sales',
      role: 'Sales Representative',
      salary: 75000,
      status: 'Active',
      joinDate: '2023-01-05',
    },
    {
      id: 8,
      name: 'Jessica Taylor',
      department: 'Engineering',
      role: 'Frontend Developer',
      salary: 105000,
      status: 'Active',
      joinDate: '2022-08-20',
    },
    {
      id: 9,
      name: 'Ryan Martinez',
      department: 'Support',
      role: 'Support Specialist',
      salary: 65000,
      status: 'Active',
      joinDate: '2023-04-12',
    },
    {
      id: 10,
      name: 'Amanda Thomas',
      department: 'Design',
      role: 'Graphic Designer',
      salary: 80000,
      status: 'On Leave',
      joinDate: '2021-12-10',
    },
  ])

  const [colDefs] = useState<ColDef<IEmployee>[]>([
    {
      field: 'id',
      headerName: 'ID',
      width: 70,
      pinned: 'left',
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'name',
      headerName: 'Name',
      filter: 'agTextColumnFilter',
      checkboxSelection: true,
      headerCheckboxSelection: true,
    },
    {
      field: 'department',
      headerName: 'Department',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'role',
      headerName: 'Role',
      filter: 'agTextColumnFilter',
    },
    {
      field: 'salary',
      headerName: 'Salary',
      valueFormatter: params => {
        return params.value ? '$' + params.value.toLocaleString() : ''
      },
      filter: 'agNumberColumnFilter',
    },
    {
      field: 'status',
      headerName: 'Status',
      cellClass: params => {
        switch (params.value) {
          case 'Active':
            return 'text-green-600 font-medium'
          case 'On Leave':
            return 'text-yellow-600 font-medium'
          case 'Terminated':
            return 'text-red-600 font-medium'
          default:
            return ''
        }
      },
    },
    {
      field: 'joinDate',
      headerName: 'Join Date',
      filter: 'agDateColumnFilter',
    },
  ])

  return (
    <div className='p-6 h-full flex flex-col'>
      <div className='mb-6'>
        <h1 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
          AG Grid Component Demo
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          A wrapper component for AG Grid with automatic theme switching and
          default configurations.
        </p>
      </div>

      <div className='flex-1'>
        <AgGrid<IEmployee>
          rowData={rowData}
          columnDefs={colDefs}
          pagination={true}
          paginationPageSize={10}
        />
      </div>
    </div>
  )
}

export default AgGridDemo
