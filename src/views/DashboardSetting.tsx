import React from 'react'
import { useNavigate } from '@tanstack/react-router'

const DashboardSetting: React.FC = () => {
  const navigate = useNavigate()

  const handleClick = (userId: string) => {
    navigate({
      to: '/users/$userId',
      params: { userId },
    })
  }
  return (
    <div>
      <h2>这是仪表盘的设置页面内容</h2>
      <button onClick={() => handleClick('42')}>Go to User Detail</button>
    </div>
  )
}

export default DashboardSetting
