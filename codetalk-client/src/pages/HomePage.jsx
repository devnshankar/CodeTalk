import React from 'react'
import { useNavigate } from 'react-router-dom'

function HomePage() {
    const navigate = useNavigate();
    const getStartedHandler = () => {
        navigate('/login')
    }
  return (
    <div >
        <h1>Welcome to our app</h1>
        <button onClick={getStartedHandler}>
            Get Started Now !!!
        </button>
    </div>
  )
}

export default HomePage