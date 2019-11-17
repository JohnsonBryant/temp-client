<template>
  <section class="app-main">
    <transition name="fade" mode="out-in">
      <!-- <router-view :key="key"></router-view> -->
      <router-view></router-view>
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  sockets:{
    connectMsg (pack) {
      console.log(pack);
    },
    dataMsg (pack) {
      console.log(pack);
    },
    directiveStartTest (pack) {
      console.log(pack);
    },
    directiveStopTest (pack) {
      console.log(pack);
    },
    directiveModifyID (pack) {
      console.log(pack);
    },
    directiveSearchSensors (pack) {
      console.log(pack);
    },
  },
};
</script>
