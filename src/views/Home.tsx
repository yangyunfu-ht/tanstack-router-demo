import React, { useState } from 'react'
import { useNavigate } from '@tanstack/react-router'

const Home: React.FC = () => {
  const navigate = useNavigate()

  const [count, setCount] = useState(0)

  const handleClick = () => {
    navigate({ to: '/dashboard/settings' })
  }

  const handleIncrement = () => {
    setCount(prev => prev + 1)
  }

  const handleDecrement = () => {
    setCount(prev => prev - 1)
  }

  const handleReset = () => {
    setCount(0)
  }

  return (
    <div>
      <h1>Home</h1>
      <button
        onClick={handleClick}
        className='px-4 py-2 rounded cursor-pointer hover:bg-blue-200 transition ring ring-gray-300'
      >
        Go to Dashboard settings
      </button>
      <p className='mt-4'>Count: {count}</p>
      <div className='flex gap-2'>
        <button
          onClick={handleIncrement}
          className='bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Increment
        </button>
        <button
          onClick={handleDecrement}
          className='bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded cursor-pointer'
        >
          Decrement
        </button>
        <button
          onClick={handleReset}
          className='bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded cursor-pointer'
        >
          Reset
        </button>
      </div>
    </div>
  )
}

export default Home
