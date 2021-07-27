<template>
  <div id="app">
    <div class="header-wrapper">
      <p>救援地图</p>
    </div>
    <router-view class="main-content"></router-view>
    <bottom-nav></bottom-nav>
  </div>
</template>

<style>
#app {
  height: 100vh;
  display: flex;
  flex-direction: column;
}
.header-wrapper {
  height: 3.125rem;
  background-color: #f8f8f8;
}
.main-content {
  flex: 1;
}

.header-wrapper p {
  text-align: center;
  font-size: 1.2rem;
  line-height: 3.5rem;
}
</style>
<script>
import BottomNav from './components/BottomNav'
export default {
  components: { BottomNav },
}
</script>
