<template>
	<div id="loader">
		<div class="wrapper">
      <p class="text">Loading...</p>  
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
    background-color: #121639
    text-align: center
    z-index: 6

    .wrapper
      display: flex
      justify-content: center
      align-items: center
      height: 100%

    .text
      color: white
      text-transform: uppercase

</style>
