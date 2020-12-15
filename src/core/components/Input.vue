<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    model: {
      type: String,
      default: '',
    },

    focus: {
      type: Boolean,
      default: false,
    },

    title: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    hasFocus: false,
    refClass: 'c-input',
  }),

  watch: {
    focus(v) {
      if (v) this.focusInput()
    },
  },

  methods: {
    focusInput() {
      this.hasFocus = true
      this.$nextTick(() => {
        const input = this.$refs['c-input-field'] as HTMLInputElement
        input.focus()
      })
    },

    onInputKeydown(e: KeyboardEvent) {
      if (e.key === 'Enter') {
        const input = this.$refs['c-input-field'] as HTMLInputElement
        input.blur()
      }
    },

    onInputChange() {
      const input = this.$refs['c-input-field'] as HTMLInputElement
      this.$emit('update:title', input.value)
    },
  },
})
</script>

<template lang="pug">
  div(:class="[refClass, {[`${refClass}--title`]: title}, { [`${refClass}--is-focused`]: hasFocus }]")
    template(v-if="title")
      h3(v-show="!hasFocus" :class="`${refClass}__placeholder`" @click="focusInput")
        | {{ model }}
    template(v-else)
      p(v-show="!hasFocus" :class="`${refClass}__placeholder`" @click="focusInput")
        | {{ model }}
    input(v-show="hasFocus" :ref="`${refClass}-field`" :class="`${refClass}__field`" type="text" :value="model" @keydown="onInputKeydown" @change="onInputChange" @blur="hasFocus = false")
</template>

<style lang="sass" scoped>
.c-input
  position: relative

  &__placeholder,
  &__field
    padding: .4rem .8rem

  &__placeholder
    &:hover
      cursor: text
  &__placeholder:hover,
  &__field
    background-color: rgba(var(--color-primary), .05)

  &__field
    border: 0
    outline: none
    appearance: none
    font-family: 'Noto Sans', sans-serif
    border-radius: 1rem
    width: 100%
    font-size: 1.6rem
    line-height: 1.35
  &--title
    .c-input__placeholder,
    .c-input__field
      text-align: center

    .c-input__field
      font-size: 1.17em
      font-weight: bold
</style>
