/*
 * @Author: Pan Jingyi
 * @Date: 2023-01-01 03:27:59
 * @LastEditTime: 2023-01-01 14:15:38
 */
// import Percent from '../pages/percent'
import { useRoutes } from 'react-router-dom'
import Detail from '../pages/detail'
import Home from '../pages/home'
import None from '../pages/none'
import TransferList from '../pages/transferList'
export default () => {
  const routes = useRoutes([
    {
      path: '/',
      element: <Home />,
    },
    {
      path: 'detail/:id',
      element: <Detail />,
    },
    {
      path: 'none',
      element: <None />,
    },
    {
      path: 'transfer-list',
      element: <TransferList />,
    },
  ])
  return routes
}
