import * as types from '../mutations-types'

const state = {
  page: null,
  projects: null
}

const getters = {
  getPage: state => {
    return state.page
  },
  getProjects: state => {
    return state.projects
  }
}

const mutations = {
  [types.SET_PAGE] (state, pageState) {
    state.page = pageState
  },
  [types.STORE_PROJECTS] (state, projectsState) {
    state.projects = projectsState
  }
}

export default {
  state,
  getters,
  mutations
}
