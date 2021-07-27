import Vue from 'vue'
import Vuex from 'vuex'

// 用于存放全局通用的 参数 与 状态标记

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 这里放全局参数
    demoValue: {}
  },
  mutations: {
    // set方法
    setDemoValue (state, newValue) {
      state.demoValue = newValue
    }
  },
  actions: {},
  modules: {}
})
