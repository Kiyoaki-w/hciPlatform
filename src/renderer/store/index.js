import Vue from 'vue'
import Vuex from 'vuex'

import { createPersistedState, createSharedMutations } from 'vuex-electron'

import modules from './modules'

Vue.use(Vuex)

export default new Vuex.Store({
  modules,

  // 全局变量设置
  state:{
    globalVariable: {
      prop1: 233,
      prop2: 10,
      prop3: 11,
      prop4: 'global variable',
      prop5: 1
    },
    params: ''
  },

  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
