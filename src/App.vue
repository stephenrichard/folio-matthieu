<template>
  <div id="app">
    <!-- <loader></loader> -->
    <headerComponent></headerComponent>
    <router-view></router-view>
  </div>
</template>

<script>
  import Loader from './components/Loader'
  import Header from './components/HeaderComponent'
  import dataJson from './assets/datas.json'

  export default {
    name: 'app',
    components: {
      headerComponent: Header,
      Loader
    },
    data () {
      return {
        projectsDatas: dataJson.projects
      }
    },
    beforeMount () {
      this.$store.commit('STORE_PROJECTS', this.projectsDatas)
      this.$store.commit('SET_CURRENT_PROJECT', this.projectsDatas[0])
      // this.$store.commit('SET_NEXT_PROJECT', this.projectsDatas[1])
      // this.$store.commit('SET_PREV_PROJECT', this.projectsDatas[this.projectsDatas.length - 1])
    }
  }
</script>

<style lang="sass">
  @import './stylesheets/main'

  #app
    font-family: $font
    -webkit-font-smoothing: antialiased
    -moz-osx-font-smoothing: grayscale
    color: #2c3e50

  h1, h2
    font-weight: normal

  ul
    list-style-type: none
    padding: 0

  li
    display: inline-block
    margin: 0 10px

  a
    color: #42b983

</style>
