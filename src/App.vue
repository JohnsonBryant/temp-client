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

.el-table-filter__bottom button{
  font-size: 15px;
  padding: 0 18px;
}

.addform-container .el-divider__text {
  color: #909399;
}
/*复写默认样式*/

</style>