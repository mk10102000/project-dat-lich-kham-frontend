import Dashboard from './views/Dashboard.js';
import UserProfile from './views/UserProfile.js';
import TableList from './views/ManagerCalender.js';
import Typography from './views/QuanLyLichKham.js';
import ManagerPost from './views/ManagerCalender';
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
    path: '/manager-canlendar',
    name: 'Quản lý đăng ký khám',
    icon: <FaRegCalendarPlus />,
    component: TableList,
    layout: '/admin',
  },
  {
    path: '/manager-posts',
    name: 'Quản lý bài đăng',
    icon: <BsFillFileEarmarkPostFill />,
    component: ManagerPost,
    layout: '/admin',
  },
  {
    path: '/quan-ly-lich-kham',
    name: 'Quản lý lịch khám',
    icon: <BsFillCalendarDateFill />,
    component: Typography,
    layout: '/admin',
  },
];

export default dashboardRoutes;
