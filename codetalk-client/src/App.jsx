import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import ProfilePage from './pages/ProfilePage'
import DashBoardPage from './pages/DashBoardPage'
import SettingsPage from './pages/SettingsPage'
import VerifyOtpPage from './pages/VerifyOtpPage'

function App() {

  return (

    <Routes>
      <Route path='/' element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/signup' element={<SignupPage/>}/>
      <Route path='/dashboard' element={<DashBoardPage/>}/>
      <Route path='/profile' element={<ProfilePage/>}/>
      <Route path='/setting' element={<SettingsPage/>}/>
      <Route path='/verify' element={<VerifyOtpPage/>}/>
      <Route path='/settings' element={<SettingsPage/>}/>
    </Routes>
  )
}

export default App

