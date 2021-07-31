<template>
  <div class="map-container">
    <div class="button-container">
      <div class="btn-line-one">
        <!-- 选中为蓝色,不选为白色   -->
        <el-button :type="markerFilterOn[0]?'primary':'plain'"
                   size="mini" @click="filterMarker(this.AMAP_MARKER_TYPE.HELP_REQUEST)" round>求救信息
        </el-button>
        <el-button :type="markerFilterOn[1]?'primary':'plain'"
                   size="mini" @click="filterMarker(this.AMAP_MARKER_TYPE.DANGER_ZONE)" round>险情
        </el-button>
        <el-button :type="markerFilterOn[2]?'primary':'plain'"
                   size="mini" @click="filterMarker(this.AMAP_MARKER_TYPE.SHELTER)" round>避难点
        </el-button>
        <el-button :type="markerFilterOn[3]?'primary':'plain'"
                   size="mini" @click="filterMarker(this.AMAP_MARKER_TYPE.RESCUE_TEAM)" round>救援队伍
        </el-button>
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
    <h6>----------------------↑地图↑--------------------</h6>
  </div>

</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import * as api from "../services/http/api";
import InfoCard from "../components/Home/InfoCard";
import Vue from "vue";
// 与地图连接的manager实体,需要通过它获取原生AMap.Map对象
const amapManager = new AMapManager();
export default {
  name: 'Map',
  // eslint-disable-next-line vue/no-unused-components
  components: {InfoCard},
  data() {
    return {
      AMAP_MARKER_TYPE:
          {
            HELP_REQUEST: 0,
            DANGER_ZONE: 1,
            SHELTER: 2,
            RESCUE_TEAM: 3
          },
      /* 高德地图主参数 */
      // 地图用到的插件列表: Geocoder坐标地址互转
      mapPlugins: ['AMap.Geocoder'],
      amapManager,
      // 默认放大等级,3-18,可变
      mapZoom: 4,
      // 默认地图中央经纬度,可变
      mapCenter: [121.577, 31.196646],
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
        'click': () => {
          this.infoWindow.visible = false;
        }
      },
      // ----------------------------------------------------------------------
      // 标记类别开关:   求救 , 险情 ,避难所, 救援队
      markerFilterOn: [true, true, true, true],
      // 标记信息总列表
      markerDataList: [],
      // ----------------------------------------------------------------------
      // 详情窗格
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
    }
  },

  created() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.requestData()
    })
  },

  methods: {
    drawMarkers() {
      console.log("function:drawMarkers()")
      // 获取原生高德API的map对象
      const map = this.amapManager.getMap();
      // 清空地图
      map.clearMap();
      // 创建标记点(marker)
      for (let i = 0; i < this.markerDataList.length; i++) {
        // 无坐标的不画
        if (this.markerDataList[i].pos == null) {
          continue;
        }
        const markerType = this.markerDataList[i].markerType;
        // 类型没选中的不画
        if (this.markerFilterOn[markerType]) {
          // 准备marker的相关数据
          // 附加信息,注入index方便回调
          const exData = {markerIndex: i};
          let iconURL;
          // 有区别的数据在下面初始化
          switch (markerType) {
            case this.AMAP_MARKER_TYPE.HELP_REQUEST:
              iconURL = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
              break;
            case this.AMAP_MARKER_TYPE.RESCUE_TEAM:
              iconURL = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
              break;
          }
          const marker = new AMap.Marker({
            extData: exData,
            icon: (iconURL || null),
            title: this.markerDataList[i].name + i.toString(),
            position: [this.markerDataList[i].pos.lng, this.markerDataList[i].pos.lat],
            // 原点设在底部居中
            anchor: "bottom-center",
            offset: new AMap.Pixel(0, 1),
          })
          // 绑定单击
          marker.on('click', this.onMarkerClick)
          // 放上地图
          map.add(marker);
        }
      }

    },

    filterMarker(buttonID) {
      console.log("function:FilterMarker(" + buttonID + ")")
      // 翻转开关,同时通知Vue更新数据
      Vue.set(this.markerFilterOn, buttonID, !this.markerFilterOn[buttonID]);
      /* console.log(this.markerFilterOn) */
      // 重画所有标记
      this.drawMarkers()
      // 缩放到合适大小
      this.amapManager.getMap().setFitView()
    },

    // 回调函数,响应marker的单击事件
    onMarkerClick(event) {
      const map = this.amapManager.getMap();
      // 触发事件marker的坐标
      const markerPos = event.target.getPosition();
      // 居中放大显示
      map.setZoomAndCenter(16, markerPos);

      // 显示详情窗格
      this.cardData = this.markerDataList[event.target.getExtData().markerIndex];
      this.cardDataType = (this.cardData.markerType === 0 ? 0 : 1);
      this.infoWindow.pos = [markerPos.getLng(), markerPos.getLat()];
      this.infoWindow.visible = true;
    },

    requestData() {
      this.markerDataList = [];
      this.getHelpList();
      this.getRescueList();
      // console.log(this.markerDataList);
    },

    async getHelpList() {
      const res = await api.getHelpList();
      const tempList = res.result;
      const geoCoder = new AMap.Geocoder({city: "全国"});
      let i;
      for (i in tempList) {
        const data = tempList[i]
        // 标记为求救点
        data.markerType = this.AMAP_MARKER_TYPE.HELP_REQUEST;
        if (data.pos == null) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[i].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              data.pos = result.geocodes[0].location;
            }
          });
        }
        this.markerDataList.push(data);
      }
    },

    async getRescueList() {
      const res = await api.getRescueList();
      const tempList = res.result;
      const geoCoder = new AMap.Geocoder({city: "全国"});
      let i;
      for (i in tempList) {
        const data = tempList[i]
        // 标记为救援队伍
        data.markerType = this.AMAP_MARKER_TYPE.RESCUE_TEAM;
        if (data.pos == null) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[i].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              data.pos = result.geocodes[0].location;
            }
          });
        }
        this.markerDataList.push(data);
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

.button-container {
  padding: 0 1rem 0 1rem;
  height: 8rem;
}

.btn-line-one {
  height: 2.5rem;
  text-align: justify;
  display: flex;
  justify-content: space-between;
}

</style>
