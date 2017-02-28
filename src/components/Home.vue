<template>
  <div class="page page-home" :style="{ 'background-color': getProjects[currentWork].color_bg }" ref="homePage">

      <!-- <router-link v-for="(project, index) in getProjects" :to="{ name: 'project', params: { project_name: project.slug } }">{{ project.name }}</router-link> -->

      <div id="works">

        <div class="project" v-for="(work, index) in getProjects" :data-color="work.color" :data-index="index">
          <div class="project-wrapper">
            <router-link :to="work.slug" class="project__cover">
              <img :src="work.main_image" alt="work.name">
              <span class="rectangle color-colored"></span>
            </router-link>
            <div class="project__datas">
              <h2 class="slider-title color-colored">{{ work.name }}</h2>
              <div class="slider-subtitle skills color-gray"><span v-for="(skill, index) in work.skills" :class="{ last: index === (work.skills.length - 1) }">{{ skill }} <span class="line">- </span></span></div>
            </div>
          </div>

        </div>

      </div>

      <ul id="works-nav">
        <li class="nav-item" v-for="(work, index) in getProjects" v-on:click="goTo(index)" :data-color="work.color" :data-index="index">
          <span class="inner"></span>
          <span class="work-name slider-subtitle ">{{ work.name }}</span>
        </li>
      </ul>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { TimelineLite, TweenLite, Power2 } from 'gsap'

  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome Home',
        currentWork: 0
      }
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    mounted () {
      var that = this
      this.$store.commit('SET_PAGE', 'home')

      this.$el.querySelectorAll('.project:first-child')[0].style.transform = 'translateX(0)'
      this.$el.querySelectorAll('.nav-item[data-index="0"]')[0].className += ' active'

      // Handle arrow navigation
      document.addEventListener('keyup', function (e) {
        if (e.keyCode === 37) {
          // You can't go back if you're on the first project
          if (that.currentWork > 0) {
            that.goPrev(that.currentWork - 1)
          }
        }

        if (e.keyCode === 39) {
          // You can't continue if you've reached the last project
          if (that.currentWork < that.getProjects.length - 1) {
            that.goNext(that.currentWork + 1)
          }
        }
      }, false)
    },
    methods: {
      goTo (index) {
        if (index !== this.currentWork) {
          if (index < this.currentWork) {
            this.goPrev(index)
          } else {
            this.goNext(index)
          }
        }
      },
      goPrev (index) {
        var oldProject = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"]')
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] span')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] span')

        var tl = new TimelineLite()
        tl.set(matchingProject, { x: '-100%' })
        tl.set(matchingProjectSquare, { x: '-150%' })
        tl.add('switch')
        tl.to(oldProjectSquare, 0.6, {
          x: '150%',
          ease: Power2.easeOut
        }, 'switch')
        tl.to(oldProject, 0.6, {
          x: '100%',
          opacity: 0,
          delay: 0,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(matchingProject, 0.8, {
          x: '0%',
          opacity: 1,
          delay: 0.3,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(matchingProjectSquare, 0.8, {
          x: '0%',
          delay: 0.4,
          ease: Power2.easeOut
        }, 'switch')

        this.projectHasChanged(index)
      },
      goNext (index) {
        var oldProject = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"]')
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] span')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] span')

        var tl = new TimelineLite()
        tl.set(matchingProject, { x: '100%' })
        tl.set(matchingProjectSquare, { x: '150%' })
        tl.add('switch')
        tl.to(oldProjectSquare, 0.6, {
          x: '-150%',
          delay: 0.2,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(oldProject, 0.6, {
          x: '-100%',
          opacity: 0,
          delay: 0.2,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(matchingProject, 0.8, {
          x: '0%',
          opacity: 1,
          delay: 0.3,
          ease: Power2.easeOut
        }, 'switch')
        tl.to(matchingProjectSquare, 0.8, {
          x: '0%',
          delay: 0.4,
          ease: Power2.easeOut
        }, 'switch')

        this.projectHasChanged(index)
      },
      projectHasChanged (index) {
        // Update the current work index
        this.currentWork = index

        var navItems = this.$el.querySelectorAll('.nav-item')
        // Reset nav items class active
        navItems.forEach(function (item) {
          item.className = 'nav-item'
        })
        // Set the new nav item as active
        this.$el.querySelectorAll('.nav-item[data-index="' + index + '"]')[0].className += ' active'
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../stylesheets/common/_color'

  .page-home
    overflow: hidden
    background-image: url('../../static/img/patterns/pattern.png')
    transition: background-color 0.5s linear

    #works
      position: relative
      width: 100%
      height: 100%
      text-align: center
      white-space: nowrap

      .project
        position: absolute
        width: 100%
        height: 100%;
        transform: translateX(100%)

        .project-wrapper
          display: flex
          justify-content: center;
          flex-direction: column
          height: 100%

        &__cover
          position: relative
          display: block
          // width: 750px
          // height: 430px

          width: 55%;
          max-width: calc(70vw - 200px);
          max-height: calc(100vh - 250px);

          margin: 0 auto

          img
            position: relative
            // width: 730px
            // height: auto
            width: 100%;
            height: auto;
            z-index: 2

          .rectangle
            position: absolute
            content: ''
            right: -17px
            bottom: -10px
            width: 120px
            height: 160px
            background-color: currentColor
            z-index: 1

        &__datas
          text-transform: uppercase

    #works-nav
      position: absolute
      bottom: 50px
      left: 50%
      transform: translateX(-50%)
      z-index: 3

      .nav-item
        text-align: center
        margin-right: 10px

        &:hover,
        &.active
          cursor: pointer

          .inner
            &:before
              width: 100%

        &:last-child
          margin-right: 0

        .inner
          position: relative
          display: block
          width: 150px
          height: 6px
          background-color: white

          &:before
            position: absolute
            content: ''
            left: 0
            width: 0
            height: 100%
            transition: .3s ease

        .work-name
          display: block
          margin-top: 8px
          font-size: 11px
          letter-spacing: 1.6px
          line-height: 14px


</style>
