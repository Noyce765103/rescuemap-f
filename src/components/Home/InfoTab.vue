<template>
  <el-tabs :value="currentTabName" @tab-click="handleClick">
    <el-tab-pane label="求助信息" name="sos">
      <div class="info-list">
        <InfoCard
          v-for="(cardData, index) in mock"
          :key="index"
          :data="cardData"
        ></InfoCard>
      </div>
    </el-tab-pane>
    <el-tab-pane label="救援信息" name="resuce">救援信息</el-tab-pane>
    <el-tab-pane label="帮助信息" name="help">帮助信息</el-tab-pane>
  </el-tabs>
</template>

<script>
import InfoCard from './InfoCard.vue';
const mock = [
  {
    name: '张三丰',
    phone: '13488998765',
    location: '我回复而横幅横幅是东方红东方红窗口键',
    SOSTime: '2021-07-24 17:29:00',
    trappedNumber: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  },
  {
    name: '张三丰',
    phone: '13488998765',
    location: '我回复而横幅横幅是东方红东方红窗口键',
    SOSTime: '2021-07-24 17:29:00',
    trappedNumber: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  },
  {
    name: '张三丰',
    phone: '13488998765',
    location: '我回复而横幅横幅是东方红东方红窗口键',
    SOSTime: '2021-07-24 17:29:00',
    trappedNumber: 5,
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. ',
  },
];

export default {
  components: { InfoCard },
  name: 'InfoTab',
  props: {
    currentTabName: String,
    currentTabData: Array,
  },
  data() {
    return {
      mock: mock,
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
