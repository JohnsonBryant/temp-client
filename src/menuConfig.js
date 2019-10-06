// 菜单配置
// headerMenuConfig：头部导航配置
// asideMenuConfig：侧边导航配置

const headerMenuConfig = [];

const asideMenuConfig = [
  {
    path: '/dashboard',
    name: '实时监测',
    icon: 'el-icon-menu',
    children: [
      {
        path: '/analysis',
        name: '分析页',
      },
      {
        path: '/monitor',
        name: '监控页',
      },
      {
        path: '/workplace',
        name: '工作台',
      },
    ],
  },
  {
    path: '/charts',
    name: '图表页',
    icon: 'el-icon-picture-outline',
    children: [
      {
        path: '/line',
        name: '折线图',
      }
    ],
  }
];

export { headerMenuConfig, asideMenuConfig };
