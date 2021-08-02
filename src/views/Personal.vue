<template>
  <div>
    <div id="user-info">
      <el-row class="user-info-rescue" v-if="userIdentity === 'rescue-team'">
        <el-col :span="18" :xs="18">
          <el-row>
            <el-col class="info-card-description">
              <div class="info-card-description-title">姓名</div>
              <div>temp temp</div>
            </el-col>
            <el-col class="info-card-description">
              <div class="info-card-description-title">联系方式</div>
              <div>
                111111111111
              </div>
            </el-col>
            <el-col class="info-card-description">
              <div class="info-card-description-title">救援装备</div>
              <div>123,123,123,123</div>
            </el-col>
            <el-col class="info-card-description">
              <div class="info-card-description-title">当前位置</div>
              <div>123,123,123,123</div>
            </el-col>
            <el-col class="info-card-description">
              <div class="info-card-description-title">正在进行救援</div>
              <div>dummy3 <span>个</span></div>
            </el-col>
            <el-col class="info-card-description">
              <div class="info-card-description-title">已完成救援</div>
              <div>dummy(10)<span>次</span></div>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6" :xs="6">
          <el-col>
            <div>
              <img :src="require('@/assets/logo.png')"/>
            </div>
          </el-col>
          <el-col>
            <div>
              <el-button type="text" size="mini" primary>修改个人信息</el-button>
            </div>
          </el-col>
        </el-col>
      </el-row >
      <el-row v-if="userIdentity === 'help-requester'">

      </el-row>
    </div>
    <div id="tab-list">
      <div id="list-item">

      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Personal',
  data() {
    return {
      userIdentity: "rescue-team"
    }
  }
};
</script>

<style scoped>
.info-card-description {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 8px;
}

.info-card-description-title {
  min-width: 100px;
  text-align: right;
  margin-right: 6px;
  font-weight: 500;
}

.info-card-description-title::after {
  content: ':';
}
</style>
