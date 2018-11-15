import Vue from 'vue'
import Vuex from 'vuex'
import helloWorld from './modules/helloWorld'
import article from './modules/article'
Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        helloWorld,
        article
    }
})