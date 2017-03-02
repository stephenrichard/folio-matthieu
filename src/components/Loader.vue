<template>
	<div id="loader">
		<div class="wrapper">
      <p>Loading...</p>  
    </div>
	</div>
</template>

<script>
  export default {
    name: 'loader'
  }
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'

  #loader
    position: absolute
    left: 0
    top: 0
    width: 100%
    height: 100%
    background-color: $blue
    text-align: center
    z-index: 6
    
</style>
