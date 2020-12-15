<script lang="ts">
import Vue from 'vue'
import CardsList from '@/app/components/CardsList'
import TasksList from '@/app/components/TasksList'

export default Vue.extend({
  components: {
    CardsList,
    TasksList,
  },

  mounted() {
    const placeholder = document.getElementById('loading-app')
    if (placeholder !== null) {
      setTimeout(() => (placeholder.style.opacity = '0'), 50)
      setTimeout(() => {
        placeholder.remove()
      }, 550)
    }
  },
})
</script>

<template lang="pug">
  .wrapper.flex.content-center
    header
      h1.text-center TODOs
    main.flex.justify-center
      cards-list
        template(v-slot:no-results="{ createCard }")
          p.text-center No cards available.
            |<br/>
            a(@click.prevent="createCard" href="#create-card" title="Create Card") Create one
        template(v-slot:tasks-list="{ cardId }")
          tasks-list(:cardId="cardId")
            template(v-slot:no-results="{ createTask }")
              p.text-center No tasks available.
                |<br/>
                a(@click.prevent="createTask" href="#create-task" title="Create Task") Create one
    footer
      p.text-center TODOs app &copy; 2020 ~ #[a(href="#") source code]
</template>

<style lang="sass">
@use '~@/app/assets/sass/global'
@use '~@/app/assets/sass/mixin'

@import '~@/app/assets/sass/utility'
@import '~@/app/assets/sass/animation'
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap')

:root
  @each $key, $color in global.$colors
    --color-#{$key}: #{$color}

*
  margin: 0
  padding: 0
  box-sizing: border-box
  &:focus
    outline: 0

a
  color: rgb(var(--color-link))

.button
  padding: 1rem 1.3rem
  background-color: rgb(var(--color-accent-light))
  border-radius: 1.8rem
  transition: background-color .15s ease-in

  &:hover
    background-color: rgb(var(--color-accent))

html
  font-size: 62.5%
  font-family: 'Noto Sans', sans-serif
  body
    line-height: 1.35
    color: rgb(var(--color-primary))
    animation: color-change 12s linear infinite alternate both
    @extend .min-h-screen
    @extend .flex

    .wrapper
      +mixin.container
      flex-direction: column

      main
        font-size: 1.6rem
        flex-direction: column

      header > h1
        font-weight: bold
        font-size: 6.8rem
        letter-spacing: .5rem
        @extend .mt-2p5

      footer > p
        font-size: 1.3rem
        @extend .mt-2p5
</style>
