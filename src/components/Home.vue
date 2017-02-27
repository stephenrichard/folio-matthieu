<template>
  <div class="page page-home" :style="{ 'background-image': 'url(./static/img/patterns/pattern-'+ getCurrentProject.slug +'.png)' }">

      <!-- <router-link v-for="(project, index) in getProjects" :to="{ name: 'project', params: { project_name: project.slug } }">{{ project.name }}</router-link> -->

      <div id="works">

        <div class="project" v-for="work in getProjects" :data-color="work.color">
          <div class="project-wrapper">
            <router-link :to="work.slug" class="project__cover">
              <img :src="work.main_image" alt="work.name">
              <span class="rectangle color-colored"></span>
            </router-link>
            <div class="project__datas">
              <h2 class="slider-title color-colored">Voices of legends</h2>
              <div class="slider-subtitle skills color-gray"><span>Art direction</span> - <span>Motion design</span> - <span>Sound design</span></div>
            </div>
          </div>

        </div>

      </div>

      <ul id="works-nav">
        <li class="nav-item" v-for="work in getProjects">
          <span class="inner"></span>
          <span class="work-name slider-subtitle ">{{ work.name }}</span>
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
        height: 100%;

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

        &:last-child
          margin-right: 0

        .inner
          position: relative
          display: block
          width: 150px
          height: 6px
          background-color: white

        .work-name
          display: block
          margin-top: 8px
          font-size: 11px
          letter-spacing: 1.6px
          line-height: 14px


</style>
