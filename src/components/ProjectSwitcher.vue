<template>
	<div class="project-switcher wrapper">
		
		<router-link :to="prevProject.slug" class="project-link previous-project-link">

			<span class="project-part__title">{{ prevProject.name }}</span>
      <div class="project-link__skills">
        <span v-for="skill in prevProject.skills">{{ skill }} - </span>
      </div>
      <span class="project-link__rect" :style="{ 'background-color': prevProject.color_code }"></span>

		</router-link>


		<router-link :to="nextProject.slug" class="project-link next-project-link">

      <span class="project-part__title">{{ nextProject.name }}</span>
			<div class="project-link__skills">
        <span v-for="skill in nextProject.skills">{{ skill }} - </span>
      </div>
      <span class="project-link__rect" :style="{ 'background-color': nextProject.color_code }"></span>

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
        'getCurrentProject'
      ])
    },
    props: ['nextProject', 'prevProject']
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
      background-color: #EAEAEA
      overflow: hidden

      &:hover
        .project-link__rect
          transform: translateX(0) !important

      &.previous-project-link
        float: left

        .project-link__rect
          right: 0
          transform: translateX(100%)

      &.next-project-link
        float: right

        .project-link__rect
          left: 0
          transform: translateX(-100%)

      .project-part__title
        letter-spacing: 3.38px
        color: white
        line-height: 45px
        z-index: 2

      &__skills
        color: $dark
        font-size: 12px
        font-weight: 800
        z-index: 2

      &__rect
        position: absolute
        width: 100%
        height: 100%
        transition: transform .4s cubic-bezier(0.77, 0, 0.175, 1)
        z-index: 1

</style>
