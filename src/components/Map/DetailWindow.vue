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
        <el-button type="text" size="small" @click="handleHelpConfirm(data.name)">前往救援</el-button>
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
          <span v-if="data.status === 'available'" class="info-status status-success">空闲</span>
          <span v-if="data.status === 'busy'" class=" info-status status-danger">救援中</span>
          <span v-if="data.status === 'rest'" class="info-status status-info">休息中</span>
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">救援装备</div>
        <div class="info-card-description-content">
          <el-tag
              v-for="(tool, index) in data.rescueTools.slice(0,4)"
              :key="index"
              size="mini"
              class="info-rescue-tool-item">
            {{ tool }}
          </el-tag>
          <span v-if="data.rescueTools.length > 4">…</span>
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">联系电话</div>
        <div class="info-card-description-content">
          <a :href="`tel:${data.phone}`" class="info-card-phone-link">
            {{ data.phone }}
          </a>
        </div>
      </el-col>

      <el-col class="info-card-description" :xs="24">
        <div class="info-card-description-title">位置</div>
        <div class="info-card-description-content">
          {{ data.location }}
        </div>
      </el-col>

    </el-row>
  </div>
</template>


<script>
import {InfoCardTypes} from "../Home/InfoCard";

export default {
  name: 'DetailWindow',
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
  methods: {
    handleHelpConfirm(id) {
      console.log("function:handleHelpConfirm(" + id + ")")
      this.$emit('handleConfirmation', id);
    }
  }
};
</script>

<style scoped>
.info-card {
  box-shadow: 0 1px 4px 1px rgba(198, 198, 198, 0.2);
  border: solid 2px whitesmoke;
  border-radius: 5px;
  min-height: 100px;
  margin: 0 6px 20px 6px;
  padding: 10px 5px 10px 5px;
}

.info-card-description {
  display: flex;
  flex-direction: row;
  font-size: 14px;
  line-height: 18px;
  margin-bottom: 6px;
}

.info-card-description-title {
  min-width: 60px;
  text-align: right;
  margin-right: 6px;
  font-weight: 500;
}

.info-card-description-title::after {
  content: ':';
}

.info-description-short {
  font-size: 13px;
  line-height: 16px;
  display: -webkit-box;
  -webkit-line-clamp: 6;
  -webkit-box-orient: vertical;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
