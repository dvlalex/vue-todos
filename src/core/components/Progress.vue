<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    fill: {
      type: Number,
      default: 0,
    },
  },

  data: () => {
    const strokeWidth = 5
    const radius = 70 / 2
    const outerRadius = radius - strokeWidth * 2
    const outerCircumference = 2 * Math.PI * outerRadius

    return {
      radius,
      strokeWidth,
      outerRadius,
      outerCircumference,
    }
  },

  computed: {
    outerOffset() {
      return (this.outerCircumference as number) - ((this.fill as number) / 100) * (this.outerCircumference as number)
    },
  },
})
</script>

<template lang="pug">
  .c-progress
    svg.c-progress__svg(xmlns="http://www.w3.org/2000/svg", aria-hidden="true", width="70", height="70")
      circle.c-progress__svg__circle.circle--path(:stroke-width="strokeWidth" :r="outerRadius" :cx="radius" :cy="radius")
      circle.c-progress__svg__circle.circle--fill(:stroke-dashoffset="outerOffset" :stroke-dasharray="outerCircumference + ' ' + outerCircumference" :stroke-width="strokeWidth" :r="outerRadius" :cx="radius" :cy="radius")
    p(:class="['c-progress__text', {'c-progress__text--ok': fill === 100}]")
      span(v-if="fill < 100") {{ fill }}
      c-icon(v-else :iconPath="$icons.tick" :size="24")
</template>

<style lang="sass" scoped>
.c-progress
  position: relative
  display: inline-block
  .c-progress__text
    font-size: 2rem
    top: 48%
    left: 50%
    position: absolute
    transform: translate(-50%, -50%)
    &--ok
      margin-top: 2px

  .c-progress__svg__circle
    stroke: rgb(var(--color-secondary))
    &.circle--path
      fill: rgb(var(--color-default))
      stroke-opacity: .4
    &.circle--fill
      fill: transparent
      transform: rotate(-90deg)
      transform-origin: 50% 50%
      transition: stroke-dashoffset .2s ease-in
</style>
