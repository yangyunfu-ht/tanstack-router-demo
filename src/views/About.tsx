import React from 'react'
import { useAuth } from '@/contexts/useAuthContext'

const About: React.FC = () => {
  const auth = useAuth()
  console.log(auth)
  return (
    <div>
      <h1>{auth.user?.name}</h1>
      <h1>About</h1>
    </div>
  )
}

export default About
