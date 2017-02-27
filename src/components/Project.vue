<template>
	<div class="page page-project">
		
    <div :class="getCurrentProject.color">

      <section class=" wrapper project-header pink">
        <h1 class="project-title color-gray">{{ getCurrentProject.name }}</h1>
        <p class="project-subtitle color-colored"><span v-for="skill in getCurrentProject.skills">{{ skill }} </span></p>
        <div class="project-header__content">
          <p class="text">{{ getCurrentProject.header_content }}</p>
          </div>
        <p class="text-ancors color-colored before-colored">Watch ancors</p>
      </section>

      <section class="project-part decoration" :data-disposition="getCurrentProject.decoration.disposition">
        <div class="decoration-container">
          <img v-for="image in getCurrentProject.decoration.images" :src="image" alt="">
        </div>
      </section>

      <section class="wrapper project-part moodboard ">
        <div class="project-part__header">
          <h2 class="project-part__title color-gray">{{ getCurrentProject.project_first_part.title }}</h2>
            <p class="text project-part__intro">{{ getCurrentProject.project_first_part.intro }}</p>
        </div>
        <div class="project-part__picture">
          <img :src="getCurrentProject.project_first_part.picture" alt="">
        </div>
      </section>

      <section class="project-part__bannerBG">
        <div class="project-part__bannerBackground" :style="{ 'background-image': 'url(' + getCurrentProject.banner + ')' }"></div>
      </section>

      <section class="wrapper project-part">
        <img class="project-part__decoration" :src="getCurrentProject.project_preparation_part.decoration" alt="">
        <div class="project-part__header">
          <h2 class="project-part__title color-gray">{{ getCurrentProject.project_preparation_part.title }}</h2>
          <p class="text project-part__intro">{{ getCurrentProject.project_preparation_part.intro }}</p>
        </div>
        <div class="project-part__preparation">
          <img class="project-preparation" :src="getCurrentProject.project_preparation_part.picture" alt="">
        </div>
      </section>

      <section class=" wrapper project-part">
        <div class="project-part__header">
            <h2 class="project-part__title color-gray">{{ getCurrentProject.project_screen_part.title }}</h2>
            <p class="text project-part__intro">{{ getCurrentProject.project_screen_part.intro }}</p>
        </div>

        <div class="project-part__bannerIMG ">
          <img :src="getCurrentProject.project_screen_part.picture" alt="">
        </div>
      </section>

      <section class=" wrapper project-part">
        <div class="project-part__header">
            <h2 class="project-part__title color-gray">{{ getCurrentProject.project_vimeo.title }}</h2>
            <p class="text project-part__intro">{{ getCurrentProject.project_vimeo.intro }}</p>
        </div>

        <div class="project-part__vimeo">
          <iframe :src="getCurrentProject.project_vimeo.url" frameborder="0" webkitallowfullscreen mozallowfullscreen allowfullscreen></iframe>
        </div>
      </section>

      <projectSwitcher 
        v-bind:prevProject="prevProject"
        v-bind:nextProject="nextProject"></projectSwitcher>
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataJson from '../assets/datas.json'
  import ProjectSwitcher from './ProjectSwitcher.vue'

  export default {
    name: 'project',
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    data () {
      return {
        nextProject: null,
        prevProject: null
      }
    },
    components: {
      projectSwitcher: ProjectSwitcher
    },
    mounted () {
      this.$store.commit('SET_PAGE', 'project')
    },
    beforeMount () {
      var pageFound = false
      var currentIndex = 0
      var projects = (this.getProjects === null) ? dataJson.projects : this.getProjects
      var param = this.$route.params.project_name || null

      if (param != null) {
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].slug === param) {
            pageFound = true
            currentIndex = i
          }
        }
        // Redirect home if page does not exist
        if (pageFound === true) {
          this.$store.commit('SET_CURRENT_PROJECT', projects[currentIndex])
        } else {
          this.$router.push('/')
        }
      }

      var nextProject = null
      var prevProject = null

      if (currentIndex < projects.length) {
        nextProject = parseInt(this.getCurrentProject.id) + 1
      } else {
        nextProject = 0
      }

      if (currentIndex > 0) {
        prevProject = currentIndex - 1
      } else {
        prevProject = projects.length - 1
      }

      // Store the next and previous projects datas (will be easy to fetch them then)
      // this.$store.commit('SET_NEXT_PROJECT', projects[nextProject])
      // this.$store.commit('SET_PREV_PROJECT', projects[prevProject])
      this.nextProject = projects[nextProject]
      this.prevProject = projects[prevProject]
    }
  }
</script>
