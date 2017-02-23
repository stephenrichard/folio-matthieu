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

      <section class="project-part">
        <img :src="getCurrentProject.first_decoration.url" alt="">
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

      <section class=" wrapper project-part">
          <div class="project-part__header">
              <h2 class="project-part__title color-gray">{{ getCurrentProject.project_parts[1].title }}</h2>
              <p class="text project-part__intro">{{ getCurrentProject.project_parts[1].intro }}</p>
          </div>

          <div class="project-part__bannerIMG ">
            <img :src="getCurrentProject.project_parts[1].picture" alt="">
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
    </div>
	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataJson from '../assets/datas.json'

  export default {
    name: 'project',
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject'
      ])
    },
    mounted () {
    },
    beforeMount () {
      var pageFound = false
      var index = 0
      var projects = (this.getProjects === null) ? dataJson.projects : this.getProjects
      var param = this.$route.params.project_name || null

      if (param != null) {
        for (var i = 0; i < projects.length; i++) {
          if (projects[i].slug === param) {
            pageFound = true
            index = i
          }
        }
        // Redirect home if page does not exist
        if (pageFound === true) {
          this.$store.commit('SET_CURRENT_PROJECT', projects[index])
        } else {
          this.$router.push('/')
        }
      }
    }
  }
</script>
