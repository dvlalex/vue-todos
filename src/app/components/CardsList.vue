<script lang="ts">
import Vue from 'vue'
import { mapActions, mapGetters } from 'vuex'
import { CardActions } from '@/app/store/cards/types'
import Card from '@/app/components/Card'

export default Vue.extend({
  components: {
    Card,
  },

  computed: {
    ...mapGetters('cards', {
      cards: CardActions.GET_CARDS,
    }),

    length(): number {
      return this.cards.length
    },
  },

  async created() {
    await this.getCards()
  },

  methods: {
    ...mapActions('cards', {
      createCard: CardActions.CREATE_CARD,
      getCards: CardActions.GET_CARDS,
    }),
  },
})
</script>

<template lang="pug">
  div
    div(v-if="length > 0")
      card(v-for="(card, index) in cards" :key="index" :data="card")
      a(@click.prevent="createCard" href="#new-card" title="New Card") New card
    slot(v-else v-bind:createCard="createCard" name="no-results")
</template>
