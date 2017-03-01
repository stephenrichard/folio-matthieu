<template>
  <div class="page page-about">
    <div class="wrapper">
    
      <div class="about-container">
        <h2 class="page-about-title">{{ name }}</h2>
        <span class="page-about-subtitle">{{ jobTitle }}</span>
        <p 
          v-html="description"
          class="text"></p>
        <a :href="twitter" class="social-link first" target="_blank"><svg width="17" height="14" viewBox="0 0 17 14" xmlns="http://www.w3.org/2000/svg"><title>twitter</title><path class="social-icon" d="M16.505 1.874C16.13 2.5 15.63 3 14.88 3.5v.25c0 2.623-1.25 6.122-4.377 8.12-1.5 1-3.376 1.5-5.25 1.5-1.502 0-3.127-.374-4.378-1.124-.375-.25-.625-.375-.75-.5-.125 0-.125-.125-.125-.25 0-.124.125-.25.25-.25H1c1.25 0 2.376-.25 3.376-.874-1.25-.25-2.125-1.25-2.625-2.374v-.125c0-.125.126-.25.25-.25h.251c-1-.625-1.75-1.75-1.75-3 0-.124.125-.25.375-.25 0 0 .125 0 .25.126.125 0 .25.124.25.124C.875 4 .5 3.25.5 2.374.5 1.75.625 1 1 .624 1 .5 1.125.5 1.25.5s.125 0 .25.125c.5.5.75.875 1 1C4 2.875 5.878 3.75 7.753 3.875v-.376c0-2 1.626-3.5 3.626-3.5 1 0 1.876.25 2.5 1 .626-.125 1.252-.375 1.877-.75h.125c.125 0 .25.125.25.25 0 .25-.375 1-.625 1.25.125 0 .375-.125.625-.25h.25c.125 0 .25.125.25.25 0 0-.125 0-.125.124z" fill="#FFF" fill-rule="evenodd"/></svg></a>
        <a :href="linkedin" class="social-link" target="_blank"><svg width="14" height="14" viewBox="0 0 14 14" xmlns="http://www.w3.org/2000/svg"><title>linkedin</title><g fill="#FFF" fill-rule="evenodd"><path class="social-icon" d="M1.834 0c.917 0 1.68.764 1.68 1.68 0 .458-.152.764-.458 1.07-.305.305-.764.457-1.07.457-.916 0-1.68-.763-1.68-1.68C.153.764.916 0 1.834 0zM3.515 13.135c0 .305-.153.458-.46.458H.46c-.305 0-.458-.153-.458-.458v-8.4c0-.306.153-.46.458-.46h2.598c.306 0 .46.154.46.46v8.4zM13.6 13.135c0 .305-.152.458-.457.458H10.85c-.305 0-.458-.153-.458-.458V7.942c0-.917-.153-1.222-1.07-1.222-1.07 0-1.528.61-1.528 1.833v4.582c0 .305-.153.458-.306.458H5.043c-.306 0-.61-.153-.61-.458V4.582c0-.306.304-.306.61-.306h2.292c.306 0 .46.153.46.46l.152-.154c.61-.306 1.222-.61 2.14-.61 2.29 0 3.667 1.22 3.667 3.36l-.153 5.803z"/></g></svg></a>

        <div class="page-about-rec"><span>rec</span></div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  name: 'About',
  data () {
    return {
      pageName: 'About',
      name: 'Matthieu Tourdes',
      jobTitle: 'Junior art director & motion designer',
      description: 'Hey I’m Matthieu Tourdes, a 21 years old junior art director & motion designer. At a very young age, I tried to find out what magic trick was used to make cartoon and video games, which led me to build my own toys and develop a strong passion for the motion graphics industry. I’m currently in 4th Year at HETIC where I’m studying development, design and marketing.<br/><br/>I’m also looking for a 6 months internship as Motion Designer.',
      twitter: 'https://twitter.com/Tourdes',
      linkedin: 'https://www.linkedin.com/in/tourdes/'
    }
  },
  beforeMount () {
    this.$store.commit('SET_PAGE', 'about')
  }
}
</script>

<style lang="sass" scoped>
  @import '../stylesheets/common/_color'
  @import '../stylesheets/common/_vars'

  .page-about
    display: flex
    align-items: center
    background-image: url(../assets/bg-about-2x.png)
    -webkit-background-size: cover
    background-size: cover
    background-repeat: no-repeat

    @media (max-width: 1280px)
      background-image: url(../assets/bg-about-1x.png)

    .wrapper
      position: relative
      padding-left: 220px

      @media (max-width: $tablet)
        padding-left: 40px

      .about-container
        max-width: 600px

      .page-about-title
        color: $red

      .page-about-subtitle
        display: inline-block
        margin-bottom: 25px

      .text
        color: white
        margin-bottom: 25px

      .social-link
        display: inline-block
        padding: 10px 10px 10px 0
        
        &.first
          margin-right: 10px

        &:hover

          .social-icon
            fill: $red

        .social-icon
          fill: white
          transition: color .3s

      .page-about-rec
        position: absolute
        right: 100px
        bottom: 30px

        span
          position: relative
          font-weight: 800
          font-size: 11px
          letter-spacing: 1.57px
          text-transform: uppercase
          color: white
          
          &:before
            position: absolute
            content: ''
            left: -15px
            top: 2px
            width: 8px
            height: 8px
            background-color: $red
            border-radius: 4px
            opacity: 0.2
            animation: record 1s ease infinite alternate

  @keyframes record
    100%
      opacity: 1

</style>
