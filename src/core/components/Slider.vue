<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    model: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    onInput() {
      const input = this.$refs['slider-input'] as HTMLInputElement
      this.$emit('update:model', parseInt(input.value))
    },

    onChange() {
      this.$emit('update:slider')
    },
  },
})
</script>

<template lang="pug">
  .c-slider
    .c-slider__track
    input.c-slider__input(ref="slider-input" type="range" :value="model" :max="100" @input="onInput" @change="onChange")
</template>

<style lang="sass" scoped>
.c-slider
  position: relative

  &__input
    transform: rotate(90deg) translateY(65px)
    width: 180px
    height: 180px
    appearance: none
    background: transparent
    &::-webkit-slider-thumb
      appearance: none
      background-color: rgb(var(--color-secondary))
      width: 24px
      height: 24px
      border-radius: 50%
      cursor: pointer

  &__track
    position: absolute
    left: calc(50% - 4px)
    top: 0
    width: 8px
    height: 180px
    margin: auto
    background: rgb(var(--color-secondary))
    border-radius: 10px
</style>
