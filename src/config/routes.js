import Layout from '../components/Layout/Layout';
import BooksService from '../pages/BookService/BooksService';
import ChooseDayExamination from '../pages/ChooseDayExamination/ChooseDayExamination';
import ConfirmInformation from '../pages/ConfirmInformation/ConfirmInformation';
import ConfirmationList from '../pages/ConfirmInformation/components/ConfirmationList';
import Home from '../pages/Home/Home';
import Auth from '../pages/Auth/Auth';
import Login from '../pages/Auth/components/Login';
import Register from '../pages/Auth/components/Register';
import Page404 from '../pages/NotFound/404';
import DashboardLayout from '../pages/Dashboard/components/DashboardLayout';
import Dashboard from '../pages/Dashboard/views/Dashboard';
import Upgrade from '../pages/Dashboard/views/Upgrade';
import User from '../pages/Dashboard/views/UserProfile';
import Notifications from '../pages/Dashboard/views/Notifications';
import ProfileUser from '../pages/ProfileUser/ProfileUser';
import { ProtectedRoute, ProtectedRouteAdmin } from './ProtectedRoute';
import ManagerCalendar from '../pages/Dashboard/views/ManagerCalender';

let routes = (isLogin) => [
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/dich-vu',
        element: <BooksService />,
        children: [{ index: true, element: <ChooseDayExamination /> }],
      },
      {
        path: '/xac-nhan-thong-tin',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <ConfirmInformation />
          </ProtectedRoute>
        ),
        children: [
          { index: true, element: <ConfirmationList /> },
          { path: 'chon-ngay', element: <ChooseDayExamination /> },
        ],
      },
      {
        path: '/ho-so-ca-nhan',
        element: (
          <ProtectedRoute isLogin={isLogin}>
            <ProfileUser />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: 'auth',
    element: <Auth />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
    ],
  },

  {
    path: 'admin',
    element: (
      <ProtectedRouteAdmin isLogin={isLogin}>
        <DashboardLayout />
      </ProtectedRouteAdmin>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: 'upgrade', element: <Upgrade /> },
      { path: 'manager-canlendar', element: <ManagerCalendar /> },
      { path: 'user', element: <User /> },
      { path: 'notifications', element: <Notifications /> },
    ],
  },
  {
    path: '*',
    element: <Page404 />,
  },
];

export default routes;
