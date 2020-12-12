<script lang="ts">
import Vue from 'vue'
import CardsList from '@/app/components/CardsList.vue'

export default Vue.extend({
  components: {
    CardsList,
  },

  mounted() {
    const placeholder = document.getElementById('loading-app')
    if (placeholder !== null) {
      setTimeout(() => (placeholder.style.opacity = '0'), 50)
      setTimeout(() => {
        placeholder.remove()
      }, 450)
    }
  },
})
</script>

<template lang="pug">
  div
    header
      h1 TODOs
    main
      cards-list
        template(v-slot:no-results="{ createCard }")
          p
          | No cards available just yet.
          |
          a(@click.prevent="createCard" href="#create-card" title="Create Card") Create one
    footer
      p TODOs app &copy; 2020 ~ #[a(href="#") source code]
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap')

body
  font-family: 'Noto Sans', sans-serif
</style>
