// 以下文件格式为描述路由的协议格式
// 你可以调整 routerConfig 里的内容
// 变量名 routerConfig 为 iceworks 检测关键字，请不要修改名称

import HeaderAsideLayout from './layouts/HeaderAsideLayout';
import Dashboard from './pages/Dashboard';
import NotFound from './pages/NotFound';
import Analysis from './pages/Analysis';
import History from './pages/History';
import Workspace from './pages/Workspace';
import LandingPage from './pages/LandingPage';
import AddEquipment from './pages/AddEquipment';
import TestConfig from './pages/TestConfig';

const routerConfig = [
  {
    path: '/',
    layout: HeaderAsideLayout,
    component: LandingPage,
  },
  {
    path: '/landingPage',
    layout: HeaderAsideLayout,
    component: LandingPage,
  },
  {
    path: '/testConfig',
    layout: HeaderAsideLayout,
    component: TestConfig,
  },
  {
    path: '/dashboard',
    layout: HeaderAsideLayout,
    component: Dashboard,
  },
  {
    path: '/analysis',
    layout: HeaderAsideLayout,
    component: Analysis,
  },
  {
    path: '/history',
    layout: HeaderAsideLayout,
    component: History,
  },
  {
    path: '/workplace',
    layout: HeaderAsideLayout,
    component: Workspace,
  },
  {
    path: '/addEquipment',
    layout: HeaderAsideLayout,
    component: AddEquipment,
  },
  {
    path: '*',
    layout: HeaderAsideLayout,
    component: NotFound,
  },
];

export default routerConfig;
