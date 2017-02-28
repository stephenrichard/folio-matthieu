<template>
  <div class="header">
    <header :class="getCurrentProject.color">
      <router-link to="/" class="logo">
      	<img src="../assets/logo@2x.png" alt="Matthieu Tourdes motion designer">
      	<h1 class="color-gray small-text">Matthieu Tourdes</h1>
      </router-link>
      <div class="more-back-links">
        <router-link v-if="getPage === 'home'" to="/about" class="small-text">More about me</router-link>
        <router-link v-show="getPage != 'home'" to="/" class="back-link small-text before-colored project-bar">Back to menu</router-link>
      </div>
    </header>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'headerComponent',
    computed: {
      ...mapGetters([
        'getPage',
        'getCurrentProject'
      ])
    }
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/_color'

  .header
    position: absolute
    top: 35px
    left: 40px
    right: 40px
    z-index: 2

    header

      a
        display: inline-block
        text-decoration: none
        letter-spacing: 1.7px
        line-height: 16px
        text-transform: uppercase
        color: white

      .logo
        img, h1
          display: inline-block
          vertical-align: middle

        img
          margin-right: 15px
          width: calc(50px / 2)
          height: auto

        h1
          font-weight: normal
          margin-top: 2px;
          font-size: 12px
          letter-spacing: 1.7px
          line-height: 16px
          text-transform: uppercase

      .more-back-links
        float: right
        font-weight: 600

        .back-link
          position: relative
          padding-top: 10px
          font-weight: 800
          font-size: 11px
          color: $dark
          text-align: center
          transition: color ease .2s

          &:hover
            color: white

            &:before
              height: 35px

          &:before
            position: absolute
            content: ''
            top: 0
            left: 0
            right: 0
            height: 6px
            z-index: -1
            transition: height .3s ease

</style>
