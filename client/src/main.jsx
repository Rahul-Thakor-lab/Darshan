import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/index.css'
import Home from './pages/home.jsx'
import Contact from './pages/contact.jsx'
import AboutUs from './pages/about.jsx'
import TourDetail from './features/tours/tourDetail.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './pages/Layout.jsx' 
import TourList from './features/tours/tourList.jsx'
import Profile from './pages/Profile.jsx'
import AdminProfile from './pages/Admin/AdminProfile.jsx'
import Services from './pages/service.jsx'

let allRoutes = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,  
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'about-us',
        element: <AboutUs />
      },
      {
        path: 'contact',
        element: <Contact />
      },
      {
        path: 'service',
        element: <Services />
      },
      {
        path: 'tourDetails/:id',
        element: <TourDetail />
      },
      {
        path: 'tourList',
        element:<TourList />
      },
      {
        path:'Profile',
        element:<Profile/>
      },
      {
        path:'AdminProfile',
        element:<AdminProfile/>
      },
    ]
  }
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={allRoutes} />
  </StrictMode>,
)
