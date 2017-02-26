<template>
  <div class="page page-home" :style="{ 'background-image': 'url(./static/img/patterns/pattern-'+ getCurrentProject.slug +'.png)' }">

      <!-- <router-link v-for="(project, index) in getProjects" :to="{ name: 'project', params: { project_name: project.slug } }">{{ project.name }}</router-link> -->

      <div id="works">
        
        <div class="project" v-for="work in getProjects" :data-color="work.color">
          <router-link :to="work.slug" class="project__cover">
            <img :src="work.main_image" alt="work.name">
            <span class="rectangle color-colored"></span>
          </router-link>
          <div class="project__datas">
            <h2 class="color-colored">Voices of legends</h2>
            <div class="skills color-gray"><span>Art direction</span> - <span>Motion design</span> - <span>Sound design</span></div>
          </div>
        </div>

      </div>

      <ul id="works-nav">
        <li class="nav-item" v-for="work in getProjects">
          <span class="inner"></span>
          <span class="work-name">{{ work.name }}</span>
        </li>
      </ul>
    
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'home',
    data () {
      return {
        msg: 'Welcome Home'
      }
    },
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    mounted () {
      this.$store.commit('SET_PAGE', 'home')
    }
  }
</script>

<style scoped lang="sass">
  
  .page-home
    overflow: hidden

    #works
      position: relative
      width: 100%
      height: 100%
      text-align: center
      white-space: nowrap

      .project
        display: inline-block
        width: 100%

        &__cover
          position: relative
          display: block
          width: 750px
          height: 430px
          margin: 0 auto

          img
            position: relative
            width: 730px
            height: auto
            z-index: 2

          .rectangle
            position: absolute
            content: ''
            right: 0
            bottom: 0
            width: 120px
            height: 160px
            background-color: currentColor
            z-index: 1

        &__datas
          text-transform: uppercase

          h2
            font-size: 34px
            font-weight: 800
            letter-spacing: 3.2px
            line-height: 50px

          .skills
            font-size: 12px
            font-weight: 800
            letter-spacing: 0.9px

    #works-nav
      position: absolute
      bottom: 50px
      left: 50%
      transform: translateX(-50%)
      z-index: 3

      .nav-item
        text-align: center
        margin-right: 10px

        &:last-child
          margin-right: 0

        .inner
          position: relative
          display: block
          width: 150px
          height: 7px
          background-color: white

        .work-name
          display: block
          margin-top: 8px
          font-size: 11px
          font-weight: 800
          letter-spacing: 1.6px
          line-height: 14px
          text-transform: uppercase
          color: white


</style>
