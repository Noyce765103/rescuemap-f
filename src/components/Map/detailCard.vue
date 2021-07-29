<template>
  <div class="info-card">
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
        {{ data.phone }}
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

    <el-col v-if="data.description != null" class="info-card-description" :xs="24">
      <div class="info-card-description-title">详细描述</div>
      <div class="info-card-description-content info-description-short">
        {{ data.description }}
      </div>
    </el-col>
  </div>
</template>

<script>
export default {
  name: 'InfoCard',
  props: {
    data: Object,
  },
};
</script>

<style>
.info-card {
  box-shadow: 0 1px 4px 1px rgba(198, 198, 198, 0.2);
  border: solid 2px whitesmoke;
  border-radius: 10px;
  min-height: 240px;
  margin: 0 6px 20px 6px;
  padding: 25px 20px 25px 15px;
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
