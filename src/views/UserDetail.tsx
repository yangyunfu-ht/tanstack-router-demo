import { useParams } from '@tanstack/react-router'
import React from 'react'

const UserDetail: React.FC = () => {
  const { userId } = useParams({ from: '/users/$userId' })

  return (
    <div>
      <h2>用户详情页</h2>
      <p>
        正在查看用户 ID: <strong>{userId}</strong>
      </p>
    </div>
  )
}

export default UserDetail
