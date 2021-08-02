<template>
  <div class="map-container">
    <div class="button-container">
      <div class="btn-line-one">
        <!-- 选中为蓝色,不选为白色   -->
        <el-button :type="markerFilterOn[0]?'primary':'plain'"
                   size="mini" @click="filterMarker(amapMarkerTypes.HELP_REQUEST)" round>求救信息
        </el-button>
        <el-button :type="markerFilterOn[1]?'primary':'plain'"
                   size="mini" @click="filterMarker(amapMarkerTypes.DANGER_ZONE)" round>险情
        </el-button>
        <el-button :type="markerFilterOn[2]?'primary':'plain'"
                   size="mini" @click="filterMarker(amapMarkerTypes.SHELTER)" round>避难点
        </el-button>
        <el-button :type="markerFilterOn[3]?'primary':'plain'"
                   size="mini" @click="filterMarker(amapMarkerTypes.RESCUE_TEAM)" round>救援队伍
        </el-button>
      </div>
    </div>
    <el-amap vid="amap"
             class="amap-main"
             resize-enable="true"
             map-style="dark"
             :plugin="mapPlugins"
             :amapManager="amapManager"
             :zoom="mapZoom"
             :center="mapCenter"
             :events="mapEvents">
      <el-amap-info-window
          auto-move="false"
          is-custom="true"
          :offset="infoWindow.offset"
          :position="infoWindow.pos"
          :visible="infoWindow.visible"
          :events="infoWindow.event">
        <div class="info-box-bg">
          <detail-window :data="cardData"
                         :type="cardDataType"
                         @handleConfirmation="handleConfirmation">
          </detail-window>
        </div>
      </el-amap-info-window>
    </el-amap>
    <div id="stats-display">
      <el-row type="flex" justify="space-around">
        <el-col :xs="12">
          <div>求援地点: {{ stats.helpCount }} 个</div>
        </el-col>
        <el-col :xs="12">
          <div>空闲救援队伍: {{ stats.availableRescueTeamCount }} 支</div>
        </el-col>
      </el-row>
      <el-row type="flex" justify="space-around">
        <el-col :xs="12">
          <div>被困人数: {{ stats.trappedPersonCount }} 人</div>
        </el-col>
        <el-col :xs="12">
          <div>险情: {{ stats.dangerZoneCount }} 处</div>
        </el-col>
      </el-row>
    </div>
  </div>

</template>

<script>
import {AMapManager, lazyAMapApiLoaderInstance} from 'vue-amap'
import * as api from "../services/http/api";
import Vue from "vue";
import DetailWindow from "../components/Map/DetailWindow";
// 与地图连接的manager实体,需要通过它获取原生AMap.Map对象
const amapManager = new AMapManager();
export default {
  name: 'Map',
  components: {DetailWindow},
  data() {
    return {
      amapMarkerTypes:
          {
            HELP_REQUEST: 0,
            DANGER_ZONE: 1,
            SHELTER: 2,
            RESCUE_TEAM: 3
          },
      /* ----------------------高德地图变量------------------------- */
      // 地图用到的插件列表: Geocoder坐标地址互转
      mapPlugins: ['AMap.Geocoder'],
      amapManager,
      // 默认放大等级,3-18,可变
      mapZoom: 4,
      // 默认地图中央经纬度,可变
      mapCenter: [121.577, 31.196646],
      mapEvents: {
        init(map) {
          AMapUI.loadUI(['control/BasicControl'], function (BasicControl) {
            // 添加一个缩放控件
            map.addControl(new BasicControl.Zoom({
              position: 'rb'
            }));
          });
        },
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
      /* ----------------------标记点的变量-------------------------- */
      // 标记类别开关:  求救点, 险情 ,避难所, 救援队
      markerFilterOn: [true, true, true, true],
      // 标记信息总列表
      markerDataList: [],
      /* ----------------------详情窗格变量-------------------------- */
      // 主内容
      cardData: Object,
      // 类型
      cardDataType: 0,
      // 窗格显示变量
      infoWindow: {
        offset: [0, 20],
        pos: [0, 0],
        visible: false,
        event: {
          init(o) {
            o.setAnchor("top-right")
          }
        }
      },
      /* -----------------------统计数据变量-------------------------- */
      stats: {
        helpCount: 0,
        availableRescueTeamCount: 0,
        trappedPersonCount: 0,
        dangerZoneCount: 0,
      }
    }
  },

  created() {
    lazyAMapApiLoaderInstance.load().then(() => {
      this.requestData();
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
        if (// 无坐标的不画
            this.markerDataList[i].pos == null ||
            // 类型没选中的不画
            !this.markerFilterOn[this.markerDataList[i].markerType]) {
          continue;
        }
        const markerType = this.markerDataList[i].markerType;
        /* --- 准备marker的相关数据 --- */
        // 附加信息,注入index方便回调
        const exData = {markerIndex: i};
        // 有区别的数据在下面初始化
        let iconURL;
        switch (markerType) {
          case this.amapMarkerTypes.HELP_REQUEST:
            iconURL = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-red.png";
            break;
          case this.amapMarkerTypes.RESCUE_TEAM:
            iconURL = "//a.amap.com/jsapi_demos/static/demo-center/icons/poi-marker-default.png";
            break;
        }
        const marker = new AMap.Marker({
          extData: exData,
          icon: (iconURL || null),
          title: this.markerDataList[i].name + i.toString(),
          position: [this.markerDataList[i].pos.lng, this.markerDataList[i].pos.lat],
          anchor: "bottom-center",// 原点设在底部居中
          offset: new AMap.Pixel(0, 1),
        });
        marker.on('click', this.onMarkerClick); // 绑定单击
        map.add(marker); // 放上地图
      }
    },

    // 处理 marker类型筛选开关 的 按下 事件
    filterMarker(buttonID) {
      /* console.log("function:FilterMarker(" + buttonID + ")") */
      // 翻转开关,同时通知Vue更新数据
      Vue.set(this.markerFilterOn, buttonID, !this.markerFilterOn[buttonID]);
      /* console.log(this.markerFilterOn) */
      // 重画标记
      this.drawMarkers()
      // 缩放到合适大小
      this.amapManager.getMap().setFitView()
    },

    // 响应详情框内 [接取救援任务按钮] 的点击事件
    handleConfirmation(dataID) {
      /* console.log("function:handleConfirmation(" + dataID + ")") */
      alert("按下infoWindow,事件:" + dataID + "已接取");
    },
    // 回调函数,响应marker的单击事件
    onMarkerClick(event) {
      const map = this.amapManager.getMap();
      // 触发事件marker的坐标
      const markerPos = event.target.getPosition();
      // 显示详情窗格
      this.showInfoWindow(
          this.markerDataList[event.target.getExtData().markerIndex],
          [markerPos.getLng(), markerPos.getLat()]
      )
      // 居中放大显示marker
      map.setZoomAndCenter(16, markerPos);
    },


    async requestData() {
      this.markerDataList = [];
      let res;
      let tempList;
      res = await api.getHelpList();
      tempList = res.result;
      const geoCoder = new AMap.Geocoder({city: "全国"});
      let item;
      for (item in tempList) {
        const data = tempList[item]
        // 标记为求救点
        data.markerType = this.amapMarkerTypes.HELP_REQUEST;
        if (data.pos == null) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[item].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              data.pos = result.geocodes[0].location;
            }
          });
        }
        this.markerDataList.push(data);
      }
      res = await api.getRescueList();
      tempList = res.result;
      for (item in tempList) {
        const data = tempList[item]
        // 标记为救援队伍
        data.markerType = this.amapMarkerTypes.RESCUE_TEAM;
        if (data.pos == null) {
          // 从地址描述获取坐标
          geoCoder.getLocation(tempList[item].location, function (status, result) {
            if (status === 'complete' && result.info === 'OK') {
              // result中对应详细地理坐标信息
              data.pos = result.geocodes[0].location;
            }
          });
        }
        this.markerDataList.push(data);
      }
      // console.log(this.markerDataList);
      this.calculateStats()
    },

    // 显示详情窗格
    showInfoWindow(cardData, pos) {
      this.cardData = cardData;
      this.cardDataType = (this.cardData.markerType === 0 ? 0 : 1);
      this.infoWindow.pos = pos;
      this.infoWindow.visible = true;
    },

    // 根据加载的marker数据计算统计数据,需在marker获取后执行
    // TODO(marker分步加载的话统计数据不准的,是否直接给api从后台调?)
    calculateStats() {
      // console.log(this.markerDataList);
      console.log("function:calculateStats()");
      // 初始化
      let helpCnt = 0;
      let personCnt = 0;
      let dangerCnt = 0;
      let teamCnt = 0;
      let i;
      // 计数
      for (i in this.markerDataList) {
        const markerData = this.markerDataList[i];
        // console.log(markerData);
        switch (markerData.markerType) {
          case this.amapMarkerTypes.HELP_REQUEST:
            helpCnt++;
            personCnt += markerData.trappedNumber;
            // console.log("help,person:" + [helpCnt, personCnt]);
            break;
          case this.amapMarkerTypes.DANGER_ZONE:
            dangerCnt++;
            // console.log("danger" + dangerCnt);
            break;
          case this.amapMarkerTypes.RESCUE_TEAM:
            if (markerData.status === 'available') {
              teamCnt++;
            }
            // console.log("team" + teamCnt);
            break;
          default:
            break;
        }
      }
      Vue.set(this.stats, "helpCount", helpCnt);
      Vue.set(this.stats, "trappedPersonCount", personCnt);
      Vue.set(this.stats, "availableRescueTeamCount", teamCnt);
      Vue.set(this.stats, "dangerZoneCount", dangerCnt);
    },


  }
}
</script>

<style scoped>
.info-box-bg {
  background: #f8f8f8;
  border-radius: 5px;
}

.amap-main {
  width: 100%;
  height: 70%;
}

.button-container {
  padding: 1rem 1rem 1rem 1rem;
  height: 3rem;
}

.btn-line-one {
  height: 2.5rem;
  text-align: justify;
  display: flex;
  justify-content: space-between;
}

.amap-logo {
  right: 0 !important;
  left: auto !important;
  display: none !important;
}

.amap-copyright {
  opacity: 0;
}
</style>
