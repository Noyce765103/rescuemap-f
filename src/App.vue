<template>
  <el-container id="app">
    <el-header class="header-wrapper">
      <p>救援地图</p>
    </el-header>
    <router-view class="main-content"></router-view>
    <BottomNav></BottomNav>
  </el-container>
</template>

<style>
#app {
  height: 100vh;
}
.header-wrapper {
  height: 3.125rem;
  background-color: #f8f8f8;
}

.main-content {
  flex: 1;
  padding: 20px 10px 0 10px;
}

.header-wrapper p {
  text-align: center;
  font-size: 1.2rem;
  line-height: 3.5rem;
}
</style>
<script>
import BottomNav from './components/BottomNav';
export default {
  components: { BottomNav },
};
</script>
