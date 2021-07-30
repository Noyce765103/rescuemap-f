<template>
  <div class="map-container">
    <div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':helpRequestButtonOn}"
           id="toggle-rescue-point"
           @click="filterMarker(0)">
        求救点
      </div>
      <div class="div-inline" style="color: black" id="toggle-danger-zone"
           @click="filterMarker(3)">
        险情
      </div>
      <div class="div-inline" style="color: black" id="toggle-shelter"
           @click="filterMarker(2)">避难所
      </div>
      <div class="div-inline" style="color: black" :class="{'button-pressed':rescueTeamButtonOn}"
           id="toggle-emergency-team"
           @click="filterMarker(1)">救援队伍
      </div>
    </div>
    <h1>----------------------↓地图↓--------------------</h1>
    <div :style="{width:'100%',height:'300px'}">
      <el-amap vid="amap"
               class="amap-demo"
               resize-enable="true"
               map-style="dark"
               :plugin="mapPlugins"
               :amapManager="amapManager"
               :zoom="mapZoom"
               :center="mapCenter"
               :events="mapEvents">
        <el-amap-info-window
            is-custom="true"
            :position="infoWindow.pos"
            :visible="infoWindow.visible"
            :events="infoWindow.event">
          <div class="info-box-bg">
            <info-card :data="cardData"
                       :type="cardDataType">
            </info-card>
          </div>
        </el-amap-info-window>
      </el-amap>
    </div>
    <h6 v-on:click="eventClick">----------------------↑地图↑--------------------</h6>
    <div>{{ helpRequestButtonOn }}</div>
    <div @click="drawMarkers">{{ rescueTeamButtonOn }}</div>
  </div>

</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import * as api from "../services/http/api";
import InfoCard, {InfoCardTypes} from "../components/Home/InfoCard";
// 与地图连接的manager实体,需要通过它获取原生AMap.Map对象
const amapManager = new AMapManager();
export default {
  name: 'Map',
  // eslint-disable-next-line vue/no-unused-components
  components: {InfoCard},
  data() {
    return {
      // 高德地图主参数
      mapPlugins: ['AMap.Geocoder'],
      amapManager,
      mapZoom: 4, // 默认放大等级,3-18,可变
      mapCenter: [121.577, 31.196646], // 默认地图中央经纬度,可变

      rescueTeamButtonOn: true,
      helpRequestButtonOn: true,

      markerDataList: [],

      cardData: Object,
      cardDataType: 0,
      infoWindow: {
        pos: [0, 0],
        visible: false,
        event: {
          init(o) {
            o.setAnchor("top-center")
          }
        }
      },
      mapEvents: {
        'complete': () => {
          lazyAMapApiLoaderInstance.load().then(() => {
            this.drawMarkers()
          })
        },
        'moveend': () => {
        },
        'zoomchange': () => {
        },
        'click': (e) => {
          this.infoWindow.visible = false;
        }
      },
    }
  },

  created() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.requestData()
    })
  },

  methods: {
    drawMarkers() {
      // 获取原生高德API的map对象
      const map = this.amapManager.getMap();
      // 清空地图
      map.clearMap();
      // 创建标记点(marker)
      for (let i = 0; i < this.markerDataList.length; i++) {
        if (this.markerDataList[i].pos == null) {
          continue;
        }
        let marker;
        switch (this.markerDataList[i].markerType) {
          case 0:
            if (this.helpRequestButtonOn) {
              marker = new AMap.Marker({
                extData: {markerID: i},
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png",
                title: this.markerDataList[i].name,
                position: [this.markerDataList[i].pos.lng, this.markerDataList[i].pos.lat],
                anchor: "bottom-center",
                offset: new AMap.Pixel(0, 9),
              })
              // 绑定单击
              marker.on('click', this.eventClick)
              // 放上地图
              map.add(marker);
            }
            break;
          case 1:
            if (this.rescueTeamButtonOn) {
              marker = new AMap.Marker({
                extData: {markerID: i},
                position: [this.markerDataList[i].pos.lng, this.markerDataList[i].pos.lat],
                title: this.markerDataList[i].name,
                anchor: "bottom-center",
                offset: new AMap.Pixel(0, 9),
                icon: "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png"
              })
              // 绑定单击
              marker.on('click', this.eventClick)
              // 放上地图
              map.add(marker);
            }
            break;
        }
      }
    },

    filterMarker(buttonID) {
      // 翻转开关
      alert(buttonID);
      switch (buttonID) {
        case 0:
          this.helpRequestButtonOn = !this.helpRequestButtonOn;
          break;
        case 1:
          this.rescueTeamButtonOn = !this.rescueTeamButtonOn;
          break;
      }
      this.drawMarkers()
      this.amapManager.getMap().setFitView()
    },

    // 回调函数,响应markers的单击事件
    eventClick(ev) {
      const map = this.amapManager.getMap();
      const markerPos = ev.target.getPosition();
      console.log(ev.target.getExtData().markerID)
      map.setZoomAndCenter(16, markerPos);

      this.cardData = this.markerDataList[ev.target.getExtData().markerID];
      this.cardDataType = this.cardData.markerType;
      this.infoWindow.pos = [markerPos.getLng(), markerPos.getLat()];
      this.infoWindow.visible = true;
    },

    requestData() {
      this.markerDataList = [];
      this.getHelpList();
      this.getRescueList();
      console.log(this.markerDataList);
    },

    async getHelpList() {
      const res = await api.getHelpList();
      const tempList = res.result;
      const geoCoder = new AMap.Geocoder({
        city: "全国"
      });
      for (let i = 0; i < tempList.length; i++) {
        tempList[i].markerType = 0;
        if (tempList.pos === undefined) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[i].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              tempList[i].pos = result.geocodes[0].location
            } else {
              tempList[i].pos = null
            }
          })
        }
        this.markerDataList.push(tempList[i]);
      }
    },

    async getRescueList() {
      const res = await api.getRescueList();
      const tempList = res.result;
      const geoCoder = new AMap.Geocoder({
        city: "全国"
      });
      for (let i = 0; i < tempList.length; i++) {
        tempList[i].markerType = 1;
        if (tempList.pos === undefined) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[i].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              tempList[i].pos = result.geocodes[0].location
            } else {
              tempList[i].pos = null
            }
          })
        }
        this.markerDataList.push(tempList[i]);
      }
    },
  }
}
</script>

<style scoped>

.info-box-bg {
  background: #f8f8f8;
  border-radius: 10px;
}

.map-container {
  width: 100%;
  height: 100%;
}

.div-inline {
  display: inline;
}

.amap-icon img,
.amap-marker-content img {
  width: 25px;
  height: 34px;
}

.button-pressed {
  color: red;
}
</style>
