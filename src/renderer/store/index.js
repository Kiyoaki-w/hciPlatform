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
      prop1: 'hello',
      prop2: 'global variable',
      prop3: 1
    },
    params: ''
  },

  plugins: [
    createPersistedState(),
    createSharedMutations()
  ],
  strict: process.env.NODE_ENV !== 'production'
})
