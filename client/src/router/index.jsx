import Home from '../page/Home'
import Insight from '../page/Insight'

import { createBrowserRouter } from 'react-router-dom'
import Route from '../page/Route'

const router = createBrowserRouter([
    {
      path:'/insight',
      element: <Insight />
    },
    {
      path:'/',
      element: <Home />
    },
    {
      path:'/route',
      element: <Route />
    }
  ])

  export default router