<template>
	<transition
    v-on:enter="enter"
    v-on:leave="leave">
    <div id="loader" v-show="!isLoaded">
      <div class="wrapper" ref="wrapper">
         <p class="text">Loading...</p>
       </div>
    </div> 
  </transition>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TweenLite, TimelineLite, Power3 } from 'gsap'

  export default {
    name: 'loader',
    computed: {
      ...mapGetters([
        'isLoaded'
      ])
    },
    methods: {
      enter: function (el, done) {
        console.log('will entered loading')
        done()
      },
      leave: function (el, done) {
        var tl = new TimelineLite()
        .add('goOut')
        tl.to(this.$refs.wrapper, 0.7, {
          y: '-100%',
          ease: Power3.easeIn,
          delay: 1
        }, 'goOut')
        tl.to(el, 1, {
          y: '-100%',
          ease: Power3.easeInOut,
          delay: 1.4
        }, 'goOut')
        tl.set(el, {
          opacity: 0,
          onComplete: done
        })
      }
    }
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'

  #loader
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: #121639
    text-align: center
    z-index: 6

    .wrapper
      display: flex
      justify-content: center
      align-items: center
      height: 100%

    .text
      color: white
      text-transform: uppercase
      opacity: 0.2
      animation: load 0.7s ease infinite alternate

  @keyframes load
    100%
      opacity: 1

</style>
