import Home from '../page/Home'
import Insight from '../page/Insight'

import { createBrowserRouter } from 'react-router-dom'

const router = createBrowserRouter([
    {
      path:'/insight',
      element: <Insight />
    },
    {
      path:'/',
      element: <Home />
    }
  ])

  export default router