import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Gamepage from './pages/Gamepage'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<MainLayout />}>

      <Route index element={<Gamepage />} />

    </Route>

  )
)

const App = () => {
  return (
    <div className='antialiased'>

      <RouterProvider router = { router } />

    </div>
  )
}

export default App