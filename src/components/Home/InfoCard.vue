<template>
  <div class="info-card">
    <el-row v-if="type === InfoCardTypes.HOME_HELP">
      <el-col class="info-card-description" :xs="12">
        <div class="info-card-description-title">姓名</div>
        <div class="info-card-description-content">{{ data.name }}</div>
      </el-col>
      <el-col class="info-card-description" :xs="12">
        <div class="info-card-description-title">被困人数</div>
        <div class="info-card-description-content">
          {{ data.trappedNumber }}
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">联系电话</div>
        <div class="info-card-description-content">
          <a :href="`tel:${data.phone}`" class="info-card-phone-link">{{
            data.phone
          }}</a>
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">位置</div>
        <div class="info-card-description-content">
          {{ data.location }}
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">求助时间</div>
        <div class="info-card-description-content">
          {{ data.SOSTime }}
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">详细描述</div>
        <div class="info-card-description-content ">
          <div
            class="info-description"
            :class="collapsed && 'info-description-short'"
          >
            {{ data.description }}
          </div>
          <div
            class="info-description-more-button"
            v-show="collapsed"
            @click="collapsed = !collapsed"
          >
            <i class="el-icon-caret-bottom"></i>展开
          </div>
          <div
            class="info-description-more-button"
            v-show="!collapsed"
            @click="collapsed = !collapsed"
          >
            <i class="el-icon-caret-top"></i>折叠
          </div>
        </div>
      </el-col>
    </el-row>

    <el-row v-if="type === InfoCardTypes.HOME_RESCUE">
      <el-col class="info-card-description" :xs="12">
        <div class="info-card-description-title">联系人</div>
        <div class="info-card-description-content">{{ data.name }}</div>
      </el-col>

      <el-col class="info-card-description" :xs="12">
        <div class="info-card-description-title">状态</div>
        <div class="info-card-description-content">
          <span
            v-if="data.status === 'available'"
            class="info-status status-success"
            >空闲</span
          >
          <span v-if="data.status === 'busy'" class=" info-status status-danger"
            >救援中</span
          >
          <span v-if="data.status === 'rest'" class="info-status status-info"
            >休息中</span
          >
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">救援装备</div>
        <div class="info-card-description-content">
          <el-tag
            v-for="(tool, index) in data.rescueTools"
            :key="index"
            size="small"
            class="info-rescue-tool-item"
            >{{ tool }}</el-tag
          >
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">联系电话</div>
        <div class="info-card-description-content">
          <a :href="`tel:${data.phone}`" class="info-card-phone-link">{{
            data.phone
          }}</a>
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">位置</div>
        <div class="info-card-description-content">
          {{ data.location }}
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">详细描述</div>
        <div class="info-card-description-content ">
          <div
            class="info-description"
            :class="collapsed && 'info-description-short'"
          >
            {{ data.description }}
          </div>
          <div
            class="info-description-more-button"
            v-show="collapsed"
            @click="collapsed = !collapsed"
          >
            <i class="el-icon-caret-bottom"></i>展开
          </div>
          <div
            class="info-description-more-button"
            v-show="!collapsed"
            @click="collapsed = !collapsed"
          >
            <i class="el-icon-caret-top"></i>折叠
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export const InfoCardTypes = {
  HOME_HELP: 0,
  HOME_RESCUE: 1,
  RESULT_HELP: 2,
  RESULT_RESCUE: 3,
  USER_CENTER_HELP: 4,
  USER_CENTER_RESCUE: 5,
};
export default {
  name: 'InfoCard',
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: Number,
    },
  },
  data() {
    return {
      collapsed: true,
      InfoCardTypes: InfoCardTypes,
    };
  },
};
</script>

<style>
.info-card {
  min-height: 210px;
  margin: 0 6px 20px 6px;
  padding: 25px 20px 10px 15px;
  box-shadow: 0 1px 4px 1px rgba(198, 198, 198, 0.2);
  border: solid 2px whitesmoke;
  border-radius: 10px;
}
.info-card-description {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 8px;
}
.info-card-description-title {
  min-width: 65px;
  text-align: right;
  margin-right: 6px;
  font-weight: 500;
}
.info-card-description-title::after {
  content: ':';
}
.info-description {
  font-size: 13px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-box-orient: vertical;
}
.info-description-short {
  -webkit-line-clamp: 6;
  text-overflow: ellipsis;
  overflow: hidden;
}
.info-description-more-button {
  text-align: right;
  font-size: 13px;
  margin-top: 6px;
}
.info-status {
  font-weight: 500;
}
.info-rescue-tool-item {
  margin-inline-end: 6px;
  margin-block-end: 8px;
}
.status-success {
  color: #67c23a;
}
.status-danger {
  color: #f56c6c;
}
.status-info {
  color: #909399;
}
</style>
