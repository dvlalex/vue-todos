<script lang="ts">
import { createComponent } from '@/core'

export default createComponent({
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
  .wrapper
    p Index
</template>

<style lang="sass">
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans:wght@400;700&display=swap')

body
  font-family: 'Noto Sans', sans-serif
</style>
