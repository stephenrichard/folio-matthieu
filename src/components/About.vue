<template>
  <div class="page page-about">
    <h1>{{ pageName }} page</h1>
    <h2>Hi there</h2>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      pageName: 'About'
    }
  },
  beforeMount () {
    this.$store.commit('SET_PAGE', 'about')
  }
}
</script>
