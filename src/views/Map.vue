<template>
  <div class="map-container">
    <h1>----------------------↓地图↓--------------------</h1>
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap"
               class="amap-demo"
               :plugin="plugin"
               :zoom="zoom"
               :center="center">
        <el-amap-marker vid="marker1"
        :position = "pos1"
        :label = 'label1'>
        </el-amap-marker>
      </el-amap>
    </div>
    <h1>----------------------↑地图↑--------------------</h1>
  </div>
</template>

<script>
export default {
  data() {
    return {
      zoom: 13, // 地图缩放等级,3-18,18最大
      center: [121.59996, 31.197646], // 地图中央经纬度
      lng: 0,
      lat: 0,
      loaded: false,
      msg: '高德地图',

      pos1: [121.586, 31.197646],
      label1:{
        content:"地标1",
        offset:[20,0]// 向右偏移20,显示在右边
      }
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
