<template>
  <el-tabs :value="currentTabName" @tab-click="handleClick">
    <el-tab-pane label="求助信息" name="sos">
      <div class="info-list" v-if="currentTabName === 'sos'">
        <InfoCard
          v-for="(cardData, index) in currentTabData"
          :key="index"
          :data="cardData"
          :type="InfoCardTypes.HOME_HELP"
        ></InfoCard>
      </div>
    </el-tab-pane>
    <el-tab-pane label="救援信息" name="rescue">
      <div class="info-list" v-if="currentTabName === 'rescue'">
        <InfoCard
          v-for="(cardData, index) in currentTabData"
          :key="index"
          :data="cardData"
          :type="InfoCardTypes.HOME_RESCUE"
        ></InfoCard></div
    ></el-tab-pane>
    <el-tab-pane label="帮助信息" name="help">帮助信息</el-tab-pane>
  </el-tabs>
</template>

<script>
import InfoCard, { InfoCardTypes } from './InfoCard.vue';

export default {
  components: { InfoCard },
  name: 'InfoTab',
  props: {
    currentTabName: {
      type: String,
      required: true,
    },
    currentTabData: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      InfoCardTypes: InfoCardTypes,
    };
  },
  methods: {
    handleClick(tab, event) {
      this.$emit('handleTabClick', tab.name);
    },
  },
};
</script>

<style></style>
