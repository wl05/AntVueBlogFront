import Vue from 'vue'
import Vuex from 'vuex'
import app from './modules/app'
import user from './modules/user'
import article from './modules/article'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    app,
    user,
    article
  }
})

export default store
