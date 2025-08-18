import './App.css'
import { Route, Routes } from 'react-router-dom'
// import Siminator from '@/pages/siminator'
import Home from '@/pages/home'
import Mine from '@/pages/mine'
import V3 from '@/pages/v3'

function App() {
  return (
    <div className='relative min-h-screen'>
      <Routes>
        <Route path='/' element={<V3 />} />
        <Route path='/home' element={<Home />} />
        <Route path='/mine' element={<Mine />} />
      </Routes>
    </div>
  )
}

export default App
