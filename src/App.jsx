import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Mainpage from './pages/MainPage'

const router = createBrowserRouter(
  createRoutesFromElements(

    <Route path='/' element={<MainLayout />}>


      <Route index element={<Mainpage />} />


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