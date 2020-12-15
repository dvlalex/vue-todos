<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { ICard } from '@/core/types'
import { CardActions } from '@/app/store/cards/types'

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<ICard<string>>,
      required: true,
    },

    focused: {
      type: Boolean,
      default: false,
    },
  },

  data: () => ({
    fillProgress: 0,
  }),

  computed: {
    card(): ICard<string> {
      return this.data as ICard<string>
    },
  },

  created() {
    this.$events.$on(`tasksPercentage-${this.card.id}`, (value: number) => {
      this.fillProgress = value
    })
  },

  methods: {
    ...mapActions('cards', {
      removeCard: CardActions.DELETE_CARD,
      updateCard: CardActions.UPDATE_CARD,
    }),

    onUpdateTitle(newTitle: string) {
      this.updateCard({ cardId: this.card.id, cardInput: { title: newTitle } })
    },

    onUpdateSlider() {
      this.$events.$emit(`completeTasks-${this.card.id}`, this.fillProgress)
    },
  },
})
</script>

<template lang="pug">
  .card
    .card__ribbon
    c-progress.card__progress(:fill="fillProgress")
    .flex.justify-space-between
      a.card__remove(@click.prevent="removeCard(card.id)" href="#remove-card" title="Remove Card")
        c-icon(:iconPath="$icons.trashcan" :size="24")
      c-input.card__title(title :model="card.title" :focus="focused" @update:title="onUpdateTitle")
    .card__content
      c-slider(:model.sync="fillProgress" @update:slider="onUpdateSlider")
      slot
</template>

<style lang="sass" scoped>
.card
  padding: 2rem 2rem 2rem 3.2rem
  position: relative
  background-color: rgba(var(--color-default))
  border: 1px solid rgba(0, 0, 0, .1)
  border-radius: 1.8rem
  box-shadow: 0 0 transparent, 0 0 transparent, 0 20px 25px -5px rgba(0,0,0,0.1),0 10px 10px -5px rgba(0,0,0,0.04)

  transform: scale(.98)
  transition: transform .2s ease-in

  &:hover
    transform: scale(1)

  .flex
    align-items: center
    gap: 1rem

  &__ribbon
    position: absolute
    left: 0
    top: 0
    width: 1.2rem
    height: 100%
    border-radius: 1.8rem 0 0 1.8rem
    background-color: rgb(var(--color-accent))

  &__title
    flex: 1
    margin-bottom: 1rem

  &__progress
    top: 0
    right: 0
    position: absolute
    transform: translate(+2.1rem, -2.1rem)

  &__remove
    color: rgb(var(--color-secondary))
    transition: transform .2s ease-in
    width: 50px
    text-align: center
    &:hover
      transform: scale(1.1)

  &__content
    display: grid
    grid-template-columns: 50px auto
    gap: 1rem
</style>
