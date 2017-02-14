import * as types from '../mutations-types'

const state = {
  page: ''
}

const getters = {
  getPage: state => {
    return state.page
  }
}

const mutations = {
  [types.SET_PAGE] (state, pageState) {
    state.page = pageState
  }
}

export default {
  state,
  getters,
  mutations
}
