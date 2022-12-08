import Dashboard from './views/Dashboard.js';
import UserProfile from './views/UserProfile.js';
import TableList from './views/TableList.js';
import Typography from './views/Typography.js';
import {
  BsFillCalendarDateFill,
  BsFillFileEarmarkPostFill,
} from 'react-icons/bs';
import { BiUserPin } from 'react-icons/bi';
import { FaRegCalendarPlus } from 'react-icons/fa';
import { AiFillDashboard } from 'react-icons/ai';

const dashboardRoutes = [
  {
    path: '/',
    name: 'Dashboard',
    icon: <AiFillDashboard />,
    component: Dashboard,
    layout: '/admin',
  },
  {
    path: '/user',
    name: 'Quản lý tài khoản',
    icon: <BiUserPin />,
    component: UserProfile,
    layout: '/admin',
  },
  {
    path: '/table',
    name: 'Quản lý đăng ký khám',
    icon: <FaRegCalendarPlus />,
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Quản lý bài đăng',
    icon: <BsFillFileEarmarkPostFill />,
    component: Typography,
    layout: '/admin',
  },
  {
    path: '/typography',
    name: 'Quản lý lịch khám',
    icon: <BsFillCalendarDateFill />,
    component: Typography,
    layout: '/admin',
  },
];

export default dashboardRoutes;
