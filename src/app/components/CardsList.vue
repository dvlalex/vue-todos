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

  created() {
    this.$events.$on('card:focus', (cardId: string) => {
      this.focusedCard = cardId
    })
  },

  methods: {
    ...mapActions('cards', {
      createCardInStore: CardActions.CREATE_CARD,
    }),

    async createCard() {
      const newCard = await this.createCardInStore({ title: '' })
      this.$events.$emit('card:focus', newCard.id)
    },
  },
})
</script>

<template lang="pug">
  div
    div(v-if="length > 0")
      card(v-for="(card, index) in cards" :key="index" :data="card" :focused="focusedCard === card.id")
        template(v-slot:default)
          slot(:cardId="card.id" name="tasks-list")
      a(@click.prevent="createCard" href="#new-card" title="New Card") New card
    slot(v-else :createCard="createCard" name="no-results")
</template>
