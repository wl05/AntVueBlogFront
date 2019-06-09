import Vue from 'vue'
import Vuex from 'vuex'
import home from './modules/home'
import category from './modules/category'
import detail from './modules/detail'
import archives from './modules/archives'
import signup from './modules/signup'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    home,
    category,
    detail,
    archives,
    signup
  }
})

