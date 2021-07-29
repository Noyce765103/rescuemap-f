<template>
  <div class="map-container" v-on:load="init">
    <div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':buttonOn[0]}" id="toggle-rescue-point"
           @click="filterMarker(0)">
        求救点
      </div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':buttonOn[1]}" id="toggle-danger-zone"
           @click="filterMarker(1)">
        险情
      </div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':buttonOn[2]}" id="toggle-shelter"
           @click="filterMarker(2)">避难所
      </div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':buttonOn[3]}" id="toggle-emergency-team"
           @click="filterMarker(3)">救援队伍
      </div>
    </div>
    <h1>----------------------↓地图↓--------------------</h1>
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap"
               class="amap-demo"
               :amapManager="amapManager"
               :zoom="mapZoom"
               :center="mapCenter">
      </el-amap>
    </div>
    <h6 v-on:click="eventClick">----------------------↑地图↑--------------------</h6>
  </div>
</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
// 与地图连接的manager实体,需要通过它获取原生AMap.Map对象
const amapManager = new AMapManager();
const dummyData = [
    // markerType对应: 0->求助信息 1->险情 2->庇护所 3->救援队
  {uid: '00001', label: "marker1", pos: [121.596, 31.197646], markerType: 0},
  {uid: '00002', label: "marker2", pos: [121.586, 31.197646], markerType: 0},
  {uid: '00003', label: "marker3", pos: [121.576, 31.197646], markerType: 1},
  {uid: '00004', label: "marker4", pos: [121.566, 31.197646], markerType: 1},
  {uid: '00005', label: "marker5", pos: [121.556, 31.197646], markerType: 2},
  {uid: '00006', label: "marker6", pos: [121.546, 31.197646], markerType: 3},
];
const markerList = [];
export default {
  name: 'Map',

  data() {
    return {
      // 高德地图主参数
      amapManager,
      mapZoom: 14, // 默认放大等级,3-18,可变
      mapCenter: [121.577, 31.196646], // 默认地图中央经纬度,可变

      buttonOn: [true, true, true, true]
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      lazyAMapApiLoaderInstance.load().then(() => {
        // 初始化地图内容
        this.initMap();
      });
    },

    initMap() {
      this.drawMarkers()
    },
    drawMarkers() {
      lazyAMapApiLoaderInstance.load().then(() => {
        // 获取原生高德API的map对象
        const map = this.amapManager.getMap();
        // 清空地图
        map.clearMap();
        let marker;
        // 创建标记点(marker)
        for (let i = 0; i < dummyData.length; i++) {
          if (this.buttonOn[dummyData[i].markerType]) {
            marker = new AMap.Marker({
              position: dummyData[i].pos,
              title: dummyData[i].label,
              anchor: 'bottom-center',
              label: {
                content: dummyData[i].uid,
                direction: 'right'
              }
            });
            switch (dummyData[i].markerType) {
              case 0:
                marker.setIcon(require("@/assets/icon-fire-zone.png"));
                break;
              case 3:
                marker.setIcon(require("@/assets/icon-rescue-team.png"))
            }
            // 绑定单击
            marker.on('click', this.eventClick)
            // 放上地图
            map.add(marker);
          }
        }
      });
    },

    filterMarker(buttonID) {
      // 翻转开关
      alert(buttonID)
      alert(this.buttonOn)
      this.buttonOn[buttonID] = !this.buttonOn[buttonID];
      this.drawMarkers()
    },

    // 回调函数,响应markers的单击事件
    eventClick(ev) {
      alert("eventType:" + ev.type + "当前放大等级:" + this.mapZoom);
      this.amapManager.getMap().panTo(ev.lnglat);
    }
  }
}
</script>

<style scoped>
.map-container {
  width: 100%;
  height: 100%;
}

.div-inline {
  display: inline;
}

.button-pressed {
  color: red;
}
</style>
