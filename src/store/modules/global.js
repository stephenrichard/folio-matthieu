import * as types from '../mutations-types'

const state = {
  page: null,
  projects: null,
  currentProject: null
}

const getters = {
  getPage: state => {
    return state.page
  },
  getProjects: state => {
    return state.projects
  },
  getCurrentProject: state => {
    return state.currentProject
  }
}

const mutations = {
  [types.SET_PAGE] (state, pageState) {
    state.page = pageState
  },
  [types.STORE_PROJECTS] (state, projectsState) {
    state.projects = projectsState
  },
  [types.SET_CURRENT_PROJECT] (state, currentProjectState) {
    state.currentProject = currentProjectState
  }
}

export default {
  state,
  getters,
  mutations
}
