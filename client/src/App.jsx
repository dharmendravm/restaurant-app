import React from 'react'
import Login from './pages/Login'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Register from './pages/Register'

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App