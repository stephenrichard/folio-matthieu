<template>
  <div class="page page-home" :style="{ 'background-color': getCurrentProject.color_bg }" ref="homePage">

      <!-- <router-link v-for="(project, index) in getProjects" :to="{ name: 'project', params: { project_name: project.slug } }">{{ project.name }}</router-link> -->

      <div id="works">

        <div class="project" v-for="(work, index) in getProjects" :data-color="work.color" :data-index="index">
          <div class="project-wrapper">
            <router-link :to="work.slug" class="project__cover">
              <div class="image-container">
                <img class="project-image" :src="work.main_image">
                <span class="store color-colored"></span>
              </div>
              <span class="rectangle color-colored"></span>
            </router-link>
            <div class="project__datas color-colored">
              <h2 class="slider-title color-colored">{{ work.name }}</h2>
              <div class="slider-subtitle skills color-gray"><span v-for="(skill, index) in work.skills" :class="{ last: index === (work.skills.length - 1) }">{{ skill }} <span class="line">- </span></span></div>
              <span class="store-title"></span>
            </div>
          </div>

        </div>

      </div>

      <ul id="works-nav">
        <li class="nav-item" v-for="(work, index) in getProjects" v-on:click="goToClick(index)" :data-color="work.color" :data-index="index">
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
        currentWork: 0,
        isAnimated: false
      }
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    mounted () {
      var sliderItem = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"]')
      var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] img')
      var sliderPictureSquare = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] span')
      var sliderPictureData = this.$el.querySelectorAll('.project[data-index="' + this.getCurrentProject.id + '"] .project__datas')
      var sliderNav = this.$el.querySelectorAll('#works-nav')

      this.$el.addEventListener('mousemove', function (event) {
        var tlSquare = new TimelineLite()
        tlSquare.to(sliderPictureSquare, 0.4, {
          x: event.clientX / 200,
          y: event.clientY / 200,
          ease: Power2.linear
        })
      })

      var tl = new TimelineLite()

      tl.set(sliderItem, {
        opacity: 0
      })
      tl.set(sliderPicture, {
        y: '-150%',
        opacity: 0
      })
      tl.set(sliderPictureSquare, {
        y: '-300%',
        opacity: 0
      })
      tl.set(sliderPictureData, {
        y: '-600px',
        opacity: 0
      })
      tl.set(sliderNav, {
        opacity: 0,
        y: '100px'
      })
      tl.add('switch')
      tl.to(sliderItem, 0.5, {
        opacity: 1,
        zIndex: 3,
        delay: 0,
        ease: Power2.linear
      }, 'switch')
      tl.to(sliderPicture, 1, {
        y: '0%',
        opacity: 1,
        delay: 0.6,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderPictureSquare, 1, {
        y: '0%',
        delay: 0.6,
        opacity: 1,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderPictureData, 1, {
        y: 0,
        opacity: 1,
        delay: 0.6,
        ease: Power2.easeOut
      }, 'switch')
      tl.to(sliderNav, 0.5, {
        opacity: 1,
        y: 0,
        delay: 0.5,
        ease: Power2.easeOut
        // onComplete: next
      }, 'switch')

      // yolo
      var that = this
      this.$store.commit('SET_PAGE', 'home')
      this.goTo(this.getCurrentProject.id)

      // Handle arrow navigation
      document.addEventListener('keyup', this.handleKeyNav, false)
    },
    beforeRouteLeave (to, from, next) {
      var sliderPicture = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] img')
      var sliderPictureSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] span')
      var sliderPictureData = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .project__datas')
      var sliderNav = this.$el.querySelectorAll('#works-nav')

      // Remove arrow navigation listener
      document.removeEventListener('keyup', this.handleKeyNav, false)

      var tl = new TimelineLite()

      tl.to(sliderPicture, 0.85, {
        y: '-150%',
        opacity: 0,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderPictureSquare, 1, {
        y: '-300%',
        delay: 0.15,
        opacity: 0,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderPictureData, 0.7, {
        y: '-600px',
        opacity: 0,
        delay: 0.23,
        ease: Power2.easeInOut
      }, 'switch')
      tl.to(sliderNav, 0.7, {
        opacity: 0,
        y: '100px',
        delay: 0.23,
        ease: Power2.easeInOut
        // onComplete: next
      }, 'switch')
      tl.to(this.$el, 0.7, {
        opacity: 1,
        delay: 0.5,
        ease: Power2.easeInOut,
        onComplete: next
      }, 'switch')
    },
    methods: {
      goToClick (index) {
        this.isAnimated = true
        this.goTo(index)
      },
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
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .rectangle')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] .rectangle')
        var matchingProjectStore = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store')
        var matchingProjectStoreTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store-title')

        if (this.isAnimated) {
          var tl = new TimelineLite()
          tl.set(matchingProjectSquare, { x: '-150%', opacity: 0 })
          tl.set(matchingProjectStore, { x: '-200%' })
          tl.set(matchingProjectStoreTitle, { x: '-200%' })
          tl.add('switch')
          tl.to(oldProjectSquare, 0.3, {
            x: '150%',
            ease: Power2.easeOut
          }, 'switch')
          tl.to(oldProject, 0.4, {
            zIndex: 1,
            opacity: 0,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProject, 0.6, {
            zIndex: 3,
            opacity: 1,
            delay: 0.3,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectSquare, 0.6, {
            x: '0%',
            opacity: 1,
            delay: 0.8,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectStore, 1.9, {
            x: '100%',
            delay: 0.4,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectStoreTitle, 1.5, {
            x: '100%',
            delay: 0.6,
            ease: Power2.easeOut
          }, 'switch')
        } else {
          var project = parseInt(this.getCurrentProject.id)
          this.$el.querySelectorAll('.project:nth-child(' + project + ')')[0].style.transform = 'translateX(0)'
          this.$el.querySelectorAll('.nav-item[data-index="0"]')[0].className += ' active'
        }

        this.projectHasChanged(index)
      },
      goNext (index) {
        var oldProject = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"]')
        var oldProjectSquare = this.$el.querySelectorAll('.project[data-index="' + this.currentWork + '"] .rectangle')
        var matchingProject = this.$el.querySelectorAll('.project[data-index="' + index + '"]')
        var matchingProjectSquare = this.$el.querySelectorAll('.project[data-index="' + index + '"] .rectangle')
        var matchingProjectStore = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store')
        var matchingProjectStoreTitle = this.$el.querySelectorAll('.project[data-index="' + index + '"] .store-title')

        if (this.isAnimated) {
          var tl = new TimelineLite()
          tl.set(matchingProjectSquare, { x: '150%', opacity: 0 })
          tl.set(matchingProjectStore, { x: '100%' })
          tl.set(matchingProjectStoreTitle, { x: '100%' })
          tl.add('switch')
          tl.to(oldProjectSquare, 0.3, {
            x: '-150%',
            ease: Power2.easeOut
          }, 'switch')
          tl.to(oldProject, 0.4, {
            zIndex: 1,
            opacity: 0,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProject, 0.6, {
            zIndex: 3,
            opacity: 1,
            delay: 0.3,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectSquare, 0.6, {
            x: '0%',
            opacity: 1,
            delay: 0.8,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectStore, 1, {
            x: '-200%',
            delay: 0.4,
            ease: Power2.easeOut
          }, 'switch')
          tl.to(matchingProjectStoreTitle, 1, {
            x: '-200%',
            delay: 0.6,
            ease: Power2.easeOut
          }, 'switch')
        } else {
          var project = parseInt(this.getCurrentProject.id) + 1
          this.$el.querySelectorAll('.project:nth-child(' + project + ')')[0].style.transform = 'translateX(0)'
          this.$el.querySelectorAll('.nav-item[data-index="0"]')[0].className += ' active'
        }

        this.projectHasChanged(index)
      },
      projectHasChanged (index) {
        // Update the current work index
        index = parseInt(index)
        this.currentWork = index
        this.$store.commit('SET_CURRENT_PROJECT', this.getProjects[index])

        var navItems = this.$el.querySelectorAll('.nav-item')
        // Reset nav items class active
        navItems.forEach(function (item) {
          item.className = 'nav-item'
        })
        // Set the new nav item as active
        this.$el.querySelectorAll('.nav-item[data-index="' + index + '"]')[0].className += ' active'
      },
      handleKeyNav (e) {
        if (e.keyCode === 37) {
          this.isAnimated = true
          // You can't go back if you're on the first project
          if (this.currentWork > 0) {
            this.isAnimated = true
            this.goPrev(this.currentWork - 1)
          }
        }

        if (e.keyCode === 39) {
          this.isAnimated = true
          // You can't continue if you've reached the last project
          if (this.currentWork < this.getProjects.length - 1) {
            this.isAnimated = true
            this.goNext(parseInt(this.currentWork + 1))
          }
        }
      }
    }
  }
</script>

<style scoped lang="sass">
  @import '../stylesheets/common/_color'

  .page-home
    overflow: hidden
    background-image: url('../../static/img/patterns/pattern.png');
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
        // transform: translateX(100%)
        opacity: 0
        z-index: 1

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

          .image-container
            position: relative
            height: 100%
            width: 100%
            max-height: 600px
            overflow: hidden

          .project-image
            position: relative
            width: 100%;
            height: 100%
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

          .store
            position: absolute
            content: ''
            top: 0
            height: 100%
            max-height: 600px
            width: 100%
            background-color: currentColor
            z-index: 3

        &__datas
          position: relative
          display: inline-block
          margin: 30px auto 0
          text-transform: uppercase
          overflow: hidden

          h2
            display: inline-block

          .store-title
            position: absolute
            content: ''
            bottom: 0
            left: 100%
            height: 100%
            max-height: 600px
            width: 100%
            background-color: currentColor
            z-index: 3

    #works-nav
      position: absolute
      bottom: 50px
      left: 50%
      transform: translateX(-50%)
      white-space: nowrap
      z-index: 3

      .nav-item
        text-align: center
        margin-right: 10px

        &:hover,
        &.active
          cursor: pointer

          .work-name
            opacity: 1

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
          opacity: 0
          transition: opacity .3s


</style>
