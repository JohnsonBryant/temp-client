<template>
  <div class="app-wrapper" >
    <div class="main-container">
      <el-button class="sidebar-btn" @click="drawer = true" type="text" icon="el-icon-d-arrow-left"></el-button>
      <el-drawer
        class="siderbar-container"
        :visible.sync="drawer"
        direction="rtl"
        :modal="false"
        :show-close="false"
        size="256px"
      >
        <div class="logo">
          <!-- <img src="../../assets/logo_feibing.png" width="40"> -->
          <span class="site-name">XX检测系统</span>
        </div>
        <el-menu
          mode="vertical"
          :show-timeout="200"
          background-color="#00142a"
          text-color="hsla(0, 0%, 100%, .65)"
          active-text-color="#409EFF"
          :default-active="activeAsideMenu"
        >
          <template v-for="item in asideMenuConfig">
            <router-link v-if="!item.children" :to="item.path" :key="item.name">
              <el-menu-item :index="item.path">
                <i v-if="item.icon" :class="item.icon"></i>
                <span v-if="item.name" slot="title">{{item.name}}</span>
              </el-menu-item>
            </router-link>

            <el-submenu v-else :index="item.name || item.path" :key="item.name">
              <template slot="title">
                <i v-if="item && item.icon" :class="item.icon"></i>
                <span v-if="item && item.name" slot="title">{{item.name}}</span>
              </template>
              <template v-for="child in item.children" v-if="!child.hidden">
                <router-link :to="item.path + child.path" :key="child.name">
                  <el-menu-item :index="item.path + child.path">
                    <span v-if="child && child.name" slot="title">{{child.name}}</span>
                  </el-menu-item>
                </router-link>
              </template>
            </el-submenu>

          </template>
        </el-menu>        
      </el-drawer>

      <nav-bar></nav-bar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from './components';
import { asideMenuConfig } from '../../menuConfig';

export default {
  data() {
    return {
      drawer: false,
      asideMenuConfig,
    }
  },
  name: 'layout',
  components: {
    NavBar,
    AppMain,
  },
  computed: {
    activeAsideMenu() {
      return this.$route.path;
    }
  }
};
</script>

<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  height: 100%;
  width: 100%;
  padding: 1vh;
  &:after {
    content: "";
    display: table;
    clear: both;
  }
}

.main-container {
  min-height: 96vh;
  transition: margin-right 0.28s;
  margin-right: 0;
  background-color: #f0f2f5;
}

.sidebar-btn {
  position: fixed;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1003;
  font-size: 36px;
}

.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 64px;
  line-height: 64px;
  background: #002140;
  color: #fff;
  text-align: center;
  font-size: 20px;
  font-weight: 600;
  overflow: hidden;
}
.site-name {
  margin-left: 10px;
}
.sidebar-container {
  box-shadow: 2px 0 6px rgba(0, 21, 41, .35);
  transition: width 0.28s;
  width: 256px !important;
  height: 100%;
  position: fixed;
  top: 0;
  bottom: 0;
  right: 0;
  z-index: 1001;
  overflow: hidden;
  a {
    display: inline-block;
    width: 100%;
  }
  .el-menu {
    padding-top: 16px;
    width: 100% !important;
    border: none;
  }
  .el-submenu .el-menu-item {
    min-width: 256px !important;
    padding-left: 48px !important;
    background-color: #000c17 !important;
    &:hover {
      color: #fff !important;
    }
  }
  .el-menu-item,
  .el-submenu .el-menu-item {
    &.is-active {
      background-color: #188fff !important;
      color: #fff !important;
    }
  }
  .el-submenu__title i {
    font-size: 16px;
    color: rgba(255, 255, 255, 0.65);
  }
}
</style>
