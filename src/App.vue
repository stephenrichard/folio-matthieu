<template>
  <div id="app">
    <loader v-show="!isLoaded" v-bind:progress="progress"></loader>
    <headerComponent></headerComponent>
    <router-view></router-view>
  </div>
</template>

<script>
  import assetsLoader from 'assets-loader'
  import Loader from './components/Loader'
  import Header from './components/HeaderComponent'
  import dataJson from '../static/datas.json'
  import { mapGetters } from 'vuex'

  export default {
    name: 'app',
    components: {
      headerComponent: Header,
      Loader
    },
    data () {
      return {
        projectsDatas: dataJson.projects,
        progress: null
      }
    },
    computed: {
      ...mapGetters([
        'isLoaded'
      ])
    },
    beforeMount () {
      var that = this
      this.$store.commit('STORE_PROJECTS', this.projectsDatas)
      this.$store.commit('SET_CURRENT_PROJECT', this.projectsDatas[0])
      // this.$store.commit('SET_NEXT_PROJECT', this.projectsDatas[1])
      // this.$store.commit('SET_PREV_PROJECT', this.projectsDatas[this.projectsDatas.length - 1])
      var loader = assetsLoader({
        assets: [
          'static/datas.json',
          'static/img/patterns/pattern.png',
          // Main images
          'static/img/voices/main-image.png',
          'static/img/domingo/main-image.png',
          'static/img/4ltrophy/main-image.png',
          'static/img/geek-art/main-image.png',
          'static/img/lost-edge/main-image.png',
          // About page background
          'static/img/bg-about-1x.png',
          'static/img/bg-about-2x.png',
          // Back link animations
          'static/img/menu-animation/pink.png',
          'static/img/menu-animation/green.png',
          'static/img/menu-animation/yellow.png',
          'static/img/menu-animation/blue.png',
          'static/img/menu-animation/purple.png',
          'static/img/menu-animation/red.png'
        ]
      })
      .on('error', function (error) {
        console.log(error)
      })
      .on('progress', function (progress) {
        console.log((progress * 100).toFixed() + '%')
      })
      .on('complete', function (assets) {
        console.log('Loading complete')
        that.$store.commit('SET_LOADING', true)
      })
      .start()
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
