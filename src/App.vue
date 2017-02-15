<template>
  <div id="app">
    <headerComponent></headerComponent>

    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
  import Header from './components/HeaderComponent'
  import dataJson from './assets/datas.json'

  export default {
    name: 'app',
    components: {
      headerComponent: Header
    },
    data () {
      return {
        projectsDatas: dataJson.projects
      }
    },
    mounted () {
      this.$store.commit('STORE_PROJECTS', this.projectsDatas)
    }
  }
</script>

<style lang="sass">
  @import './stylesheets/main'
  
  #app
    font-family: 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    text-align: center
    color: #2c3e50
    margin-top: 60px

</style>
