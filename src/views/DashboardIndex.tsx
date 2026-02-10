import React from 'react'
import { useNavigate } from '@tanstack/react-router'

const DashboardIndex: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = () => {
    navigate({ to: '/' })
  }
  return (
    <div>
      <h2>这是仪表盘的首页概览内容</h2>
      <button onClick={handleClick}>Go to Home</button>
    </div>
  )
}

export default DashboardIndex
