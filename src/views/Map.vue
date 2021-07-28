<template>
  <div class="map-container">
    <h1>----------------------↓地图↓--------------------</h1>
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap"
               :plugin="plugin"
               :zoom="zoom"
               class="amap-demo" :center="center">
      </el-amap>
    </div>
    <h1>----------------------↑地图↑--------------------</h1>
  </div>
</template>

<script>
export default {
  data () {
    const self = this
    return {
      zoom: 13, // 地图缩放等级,3-18,18最大
      center: [121.59996, 31.197646], // 地图中央经纬度
      lng: 0,
      lat: 0,
      loaded: false
    }
  },
  name: 'Map'
}
</script>

<style scoped>
#map-container {
  width: 100%;
  height: 100%;
}
</style>
