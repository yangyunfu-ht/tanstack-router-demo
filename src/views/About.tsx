import React from 'react'
import { useAuth } from '@/contexts/rootRoute'

const About: React.FC = () => {
  const auth = useAuth()

  return (
    <div>
      <h1>{auth.user?.name}</h1>
      <h1>About</h1>
    </div>
  )
}

export default About
