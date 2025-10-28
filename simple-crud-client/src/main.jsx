import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import{
  createBrowserRouter,
  RouterProvider,
} from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout.jsx';
import UserDetail from './components/UserDetail.jsx';
import UpdateUser from './components/UpdateUser.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element: <MainLayout></MainLayout>,
    children: [
      {index: true, element: <App></App>},
      {
        path:'/users/:id',
        loader: ({params})=> fetch(`http://localhost:1000/users/${params.id}`),
        element: <UserDetail></UserDetail>
      },
      {
        path: '/update/:id',
        loader:({params})=> fetch(`http://localhost:1000/users/${params.id}`),
        element: <UpdateUser></UpdateUser>
      },
    ]

  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </StrictMode>,
)
