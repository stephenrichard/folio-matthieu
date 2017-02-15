import Vue from 'vue'
import Router from 'vue-router'
import Home from 'components/Home'
import About from 'components/About'
import Project from 'components/Project'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/:project_name',
      name: 'project',
      component: Project
    }
  ]
})
