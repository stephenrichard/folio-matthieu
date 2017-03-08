<template>
  <div class="page page-about">
    <div class="bg"></div>
    <div class="wrapper">

      <div class="about-container">
        <h2 class="page-about-title">{{ name }}</h2>
        <span class="page-about-subtitle">{{ jobTitle }}</span>
        <p
          v-html="description"
          class="text"></p>
        <div class="social-links">
          <a :href="'mailto:' + contact" class="social-link">Contact</a>
          <a :href="twitter" class="social-link first" target="_blank">Twitter</a>
          <a :href="pinterest" class="social-link" target="_blank">Pinterest</a>
          <a :href="linkedin" class="social-link" target="_blank">Linkedin</a>
        </div>

        <div class="page-about-rec"><span>rec</span></div>
      </div>

    </div>
  </div>
</template>

<script>

import { TimelineLite, TweenLite, Power2 } from 'gsap'
import { mapGetters } from 'vuex'

export default {
  name: 'About',
  computed: {
    ...mapGetters([
      'getProjects',
      'getCurrentProject'
    ])
  },
  data () {
    return {
      pageName: 'About',
      name: 'Matthieu Tourdes',
      jobTitle: 'Junior art director & motion designer',
      description: 'Hey I’m Matthieu Tourdes, a 21 years old junior art director & motion designer. At a very young age, I tried to find out what magic trick was used to make cartoon and video games, which led me to build my own toys and develop a strong passion for the motion graphics industry. I’m currently in 4th Year at HETIC where I’m studying development, design and marketing.<br/><br/>I’m also looking for a 6 months internship as Motion Designer.',
      contact: 'matthieu.tourdes@gmail.com',
      twitter: 'https://twitter.com/Tourdes',
      pinterest: 'https://fr.pinterest.com/matthieutourdes/',
      linkedin: 'https://www.linkedin.com/in/tourdes/'
    }
  },
  beforeMount () {
    this.$store.commit('SET_PAGE', 'about')
  },
  mounted () {
    var bg = this.$el.querySelectorAll('.bg')[0]
    bg.style.backgroundColor = this.getCurrentProject.color_bg

    var wrapper = this.$el.querySelectorAll('.wrapper')
    var tl = new TimelineLite()

    tl.set(wrapper, {
      opacity: 0,
      y: '-100px'
    })
    tl.add('switch')
    tl.to(bg, 1.5, {
      y: '-100%',
      opacity: 1,
      delay: 0.3,
      ease: Power2.easeOut
    }, 'switch')
    tl.to(bg, 0.4, {
      backgroundColor: '#CE3131'
    }, 'switch')
    tl.to(wrapper, 1, {
      opacity: 1,
      y: '0%',
      delay: 0.5,
      ease: Power2.easeOut
    }, 'switch')
  },
  beforeRouteLeave (to, from, next) {
    var bg = this.$el.querySelectorAll('.bg')[0]
    bg.style.backgroundColor = this.getCurrentProject.color_bg

    var wrapper = this.$el.querySelectorAll('.wrapper')
    var tl = new TimelineLite()

    tl.set(wrapper, {
      opacity: 1,
      y: '0%'
    })
    tl.set(bg, {
      opacity: 1,
      y: '-100%'
    })
    tl.add('switch')
    tl.to(bg, 1, {
      y: '0%',
      opacity: 1,
      delay: 0.3,
      ease: Power2.easeOut
    }, 'switch')
    tl.to(wrapper, 0.5, {
      opacity: 1,
      y: '-100px',
      delay: 0.8,
      ease: Power2.easeOut,
      onComplete: next
    }, 'switch')
  }
}
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'
  @import '../stylesheets/common/_vars'

  .bg
    position : absolute
    left: 0
    right: 0
    top: 0
    bottom: 0
    z-index: 1
    background-color: black
    // background-image: url('../../static/img/patterns/pattern.png')
    transition: background-color 1s linear
  .page-about
    display: flex
    align-items: center
    background-image: url(../../static/img/bg-about-2x.png)
    -webkit-background-size: cover
    background-size: cover
    background-repeat: no-repeat
    background-color: $dark

    @media (max-width: 1280px)
      background-image: url(../../static/img/bg-about-1x.png)

    .wrapper
      position: relative
      padding-left: 220px

      @media (max-width: $tablet)
        padding-left: 40px

      @media (max-width: $mobile)
        padding: 60px 20px 0 20px

      .about-container
        max-width: 600px

      .page-about-title
        color: $red

      .page-about-subtitle
        display: inline-block
        margin-bottom: 25px

      .text
        color: white
        margin-bottom: 25px

      .social-links
        display: inline-block

        .social-link
          position: relative
          display: inline-block
          padding: 10px 10px 0 0
          margin-right: 20px
          text-transform: uppercase
          color: white
          font-size: 11px
          text-decoration: none
          transition: color .3s

          &:last-child
            &:after
              display: none

          &:after
            position: absolute
            content: ''
            right: -10px
            top: 13px
            height: 2px
            width: 8px
            background-color: $red

          &:hover
            color: $red

      .page-about-rec
        position: absolute
        right: 100px
        bottom: 20px

        @media (max-width: $mobile)
          display: none

        span
          position: relative
          font-weight: 800
          font-size: 11px
          letter-spacing: 1.57px
          text-transform: uppercase
          color: white

          &:before
            position: absolute
            content: ''
            left: -15px
            top: 2px
            width: 8px
            height: 8px
            background-color: $red
            border-radius: 4px
            opacity: 0.2
            animation: record 1s ease infinite alternate

  @keyframes record
    100%
      opacity: 1

</style>
