<template>
  <div class="header">
    <header :class="getCurrentProject.color">
      <router-link to="/" class="logo">
      	<img src="../assets/logo@2x.png" alt="Matthieu Tourdes motion designer">
      	<h1 class="color-gray small-text">Matthieu Tourdes</h1>
      </router-link>
      <div class="more-back-links">
        <router-link 
          v-if="getPage === 'home'" 
          to="/about" 
          class="small-text">More about me</router-link>
        <router-link 
          v-show="getPage != 'home'"
          to="/" 
          v-bind:class="{ about: this.getPage === 'about' }"
          class="back-link small-text before-colored project-bar">Back to menu</router-link>
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
      &.pink
        .back-link
          &:after
            background-image: url(/static/img/menu-animation/pink.png)
      &.blue
        .back-link
          &:after
            background-image: url(/static/img/menu-animation/blue.png)
      &.green
        .back-link
          &:after
            background-image: url(/static/img/menu-animation/green.png)
      &.yellow
        .back-link
          &:after
            background-image: url(/static/img/menu-animation/yellow.png)
      &.purple
        .back-link
          &:after
            background-image: url(/static/img/menu-animation/purple.png)

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
          font-weight: 800
          font-size: 11px
          line-height: 14px
          color: $dark
          text-align: center
          transition: color ease .2s

          &:hover
            &:after
              opacity: 1
              animation: bounce 1.2s steps(39) reverse

          &.about
            color: white
            transition: transform .3s

            &:after
              background-image: url(/static/img/menu-animation/red.png)

          &:after
            position: absolute
            content: ''
            right: 0px
            top: auto
            left: auto
            bottom: -12px
            width: 29px;
            height: 102px;
            background-color: transparent !important
            background-position: 0 0
            opacity: 0
            transition: opacity .4s

  @keyframes bounce
    100%
      background-position: -1131px 0

</style>
