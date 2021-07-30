<template>
  <div class="nav-container">
    <router-link class="link" to="/">
      <div class="iconfont">&#xe600;</div>
      <p>首页</p>
    </router-link>
    <router-link class="link" to="/map">
      <div class="iconfont">&#xe68a;</div>
      <p>救援地图</p>
    </router-link>
    <router-link class="link" to="/user">
      <div class="iconfont">&#xe601;</div>
      <p>个人中心</p>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'BottomNav',
};
</script>

<style scoped>
.nav-container a {
  color: #acacac;
  font-size: 0.8rem;
}
.nav-container a.router-link-exact-active {
  color: #1890ff;
}
.nav-container {
  display: flex;
  justify-content: space-between;
  padding-top: 10px;
  padding-bottom: 30px;
  text-align: center;
  position: sticky;
  bottom: 0;
  background: whitesmoke;
}
.link {
  flex: 1;
  height: 1.2rem;
}
.nav-container .iconfont {
  padding-bottom: 0.4rem;
}
</style>
