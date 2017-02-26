<template>
	<div class="project-switcher wrapper">
		
		<router-link to="" class="project-link previous-project-link purple">

			<span class="project-part__title">{{ getPreviousProject.name }}</span>
      <div class="project-link__skills">
        <span v-for="skill in getPreviousProject.skills">{{ skill }} - </span>
      </div>
      <span class="project-link__image" :style="{ 'background-image': 'url('+ getPreviousProject.main_image +')' }"></span>

		</router-link>


		<router-link to="" class="project-link next-project-link green">

      <span class="project-part__title">{{ getNextProject.name }}</span>
			<div class="project-link__skills">
        <span v-for="skill in getNextProject.skills">{{ skill }} - </span>
      </div>
      <span class="project-link__image" :style="{ 'background-image': 'url('+ getNextProject.main_image +')' }"></span>

		</router-link>

	</div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import dataJson from '../assets/datas.json'

  export default {
    name: 'projectswitcher',
    computed: {
      ...mapGetters([
        'getProjects',
        'getCurrentProject',
        'getPreviousProject',
        'getNextProject'
      ])
    },
    beforeMount () {
      var currentProjectId = this.getCurrentProject.id
      var projects = (this.getProjects === null) ? dataJson.projects : this.getProjects.length
      var nbProjects = projects.length
      var nextProject = null
      var prevProject = null

      if (currentProjectId < nbProjects) {
        nextProject = parseInt(this.getCurrentProject.id) + 1
      } else {
        nextProject = 0
      }

      if (currentProjectId > 0) {
        prevProject = this.getCurrentProject.id - 1
      } else {
        prevProject = nbProjects - 1
      }

      // Store the next and previous projects datas (will be easy to fetch them then)
      this.$store.commit('SET_NEXT_PROJECT', projects[nextProject])
      this.$store.commit('SET_PREV_PROJECT', projects[prevProject])
    },
    mounted () {
    }
  }
</script>

<style lang="sass">
  @import '../stylesheets/common/_color'
  
  .project-switcher
    padding-top: 120px
    padding-bottom: 75px
    overflow: hidden

    .project-link
      position: relative
      display: flex
      flex-direction: column
      justify-content: center
      height: 120px
      width: 50%
      text-transform: uppercase
      text-decoration: none
      text-align: center
      overflow: hidden

      &:hover
        .project-link__image
          transform: translateY(0)

      &.previous-project-link
        float: left

      &.next-project-link
        float: right

      .project-part__title
        letter-spacing: 3.38px
        color: white
        line-height: 45px

      &__skills
        color: $dark
        font-size: 12px
        font-weight: 800

      &__image
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        background-size: cover
        background-repeat: no-repeat
        background-position: center center
        transform: translateY(100%)
        transition: transform .4s cubic-bezier(0.77, 0, 0.175, 1)

</style>
