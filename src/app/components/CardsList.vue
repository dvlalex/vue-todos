<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ICard } from '@/core/types'
import { CardActions } from '@/app/store/cards/types'

import Card from '@/app/components/Card'

export default Vue.extend({
  components: {
    Card,
  },

  data: (): { focusedCard: string | null } => ({
    focusedCard: null,
  }),

  computed: {
    cards(): Array<ICard<string>> {
      return this.$store.getters[`cards/${CardActions.GET_CARDS}`]
    },

    length(): number {
      return this.cards.length
    },
  },

  methods: {
    ...mapActions('cards', {
      createCardInStore: CardActions.CREATE_CARD,
    }),

    async createCard() {
      const newCard = await this.createCardInStore({ title: 'New Card' })
      this.focusedCard = newCard.id
    },
  },
})
</script>

<template lang="pug">
  .cards-list
    .cards-list__grid
      template(v-if="length > 0")
        card(v-for="(card, index) in cards" :key="index" :data="card" :focused="focusedCard === card.id")
          template(v-slot:default="")
            slot(:cardId="card.id" name="tasks-list")
      slot(v-else :createCard="createCard" name="no-results")
    a.cards-list__new-card.text-center(v-if="length > 0" @click.prevent="createCard" href="#new-card" title="New Card") New card
</template>

<style lang="sass" scoped>
@use "~@/app/assets/sass/global"

.cards-list__grid
  display: grid
  grid-template-columns: repeat(auto-fit, minmax(450px, 1fr))
  gap: 1.5rem

  @media only screen and (min-width: #{map-get(global.$viewports, 'lg')}px)
    gap: 3rem

.cards-list__new-card
  display: block
  margin-top: 2.5rem
</style>
