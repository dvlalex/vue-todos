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
        template(v-slot:tasks-list="{ cardId }")
          tasks-list(:cardId="cardId")
            template(v-slot:no-results="{ createTask }")
              p
              | No tasks available.
              |
              a(@click.prevent="createTask" href="#create-task" title="Create Task") Create one
    footer
      p TODOs app &copy; 2020 ~ #[a(href="#") source code]
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap')

body
  font-family: 'Noto Sans', sans-serif
</style>
