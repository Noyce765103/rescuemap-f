<template>
  <div class="home">
    <div class="title-container">
      <p class="title">救援地图</p>
    </div>
    <el-row>
      <div class="button-container">
        <div class="btn-line-one">
          <el-button
            class="btn-style"
            type="primary"
            icon="el-icon-first-aid-kit"
            >发起求助</el-button
          >
          <el-button class="btn-style" type="primary" icon="el-icon-help"
            >发起救援</el-button
          >
        </div>
        <div class="btn-line-two">
          <el-button
            class="btn-style"
            type="primary"
            icon="el-icon-warning-outline"
            >提供帮助</el-button
          >
        </div>
      </div>
    </el-row>
    <el-row>
      <InfoTab
        :currentTabName="currentInfoTab"
        :currentTabData="currentInfoTabData"
        @handleTabClick="handleTabClick"
      ></InfoTab>
    </el-row>
  </div>
</template>

<script>
import InfoTab from '@/components/Home/InfoTab.vue';
import http from '../services/http';
import * as api from '../services/http/api';

export default {
  name: 'Home',
  components: { InfoTab },
  data() {
    return {
      currentInfoTab: 'sos',
      currentInfoTabData: [],
    };
  },
  methods: {
    handleTabClick(name) {
      if (name === 'sos') {
        this.getHelpList();
      } else if (name === 'rescue') {
        this.getRescueList();
      }
      this.currentInfoTab = name;
    },
    async getHelpList() {
      const res = await api.getHelpList();
      this.currentInfoTabData = res.result;
    },
    async getRescueList() {
      const res = await api.getRescueList();
      this.currentInfoTabData = res.result;
    },
  },
  mounted() {
    this.getHelpList();
  },
};
</script>

<style>
.title-container {
  width: 100vw;
  height: 4rem;
  padding: 0 1rem 0 1rem;
}
.title {
  font-size: 1.6em;
  line-height: 1.6rem;
  font-weight: bold;
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

.btn-line-two {
  text-align: center;
  margin-top: 1.5rem;
}
.button-container .btn-style {
  width: 8.5rem;
}
</style>
