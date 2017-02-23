<template>
  <div class="page page-home">
    <h1>{{ msg }}</h1>

    <h2>Here you can see all the projects from the Vuex store</h2>
    <router-link v-for="(project, index) in getProjects" :to="{ name: 'project', params: { project_name: project.slug } }">{{ project.name }}</router-link>
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
        'getProjects'
      ])
    },
    mounted () {
      this.$store.commit('SET_PAGE', 'home')
    }
  }
</script>

<style scoped lang="sass">
  h1, h2
    font-weight: normal

  ul
    list-style-type: none
    padding: 0

  li
    display: inline-block
    margin: 0 10px

  a
    color: #42b983
    
</style>
