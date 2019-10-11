<template>
  <router-view/>
</template>

<style lang="scss">
/*复写默认样式*/
.el-submenu__title{
  font-size: 16px;
}

.siderbar-container .el-drawer__header{
  padding: 0;
  margin: 0;
}

.siderbar-container .el-drawer{
  background: rgb(0, 20, 42);
}

.siderbar-container .el-menu{
  border-right: none; 
}

.selectEq-container .el-drawer{
  background: transparent;

}
.selectEq-container .el-drawer__header{
  padding: 0;
  margin: 0;
}
.selectEq-container .el-el-drawer__header, .selectEq-container .el-drawer__body{
  background: #ffffff;
  margin-left: 10px;
  margin-right: 10px;
}

.el-table-filter__bottom button{
  font-size: 15px;
  padding: 0 18px;
}

.el-divider__text {
  color: #909399;
}

.dash-test-item .el-card__body{
  padding: 0;
}
/*复写默认样式*/

</style>