import * as types from '../types'

/**
 * App通用配置
 */
const state = {
    data: 'hello world',
    count1: 1,
    count2: 2
}

const actions = {
    // setLoadingState({commit}, status) {
    //     commit(types.COM_LOADING_STATUS, status)
    // },

}

const getters = {
    count: state => state.count1 + state.count2
        // showToast : state => state.showToast,
        // showAlert : state => state.showAlert
}
const mutations = {
    [types.HELLO_WORLD](state, status) {
        state.loading = status
    }
}
export default {
    state,
    actions,
    getters,
    mutations
}