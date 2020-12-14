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

  computed: {
    card(): ICard<string> {
      return this.data as ICard<string>
    },
  },

  methods: {
    ...mapActions('cards', {
      removeCard: CardActions.DELETE_CARD,
      updateCard: CardActions.UPDATE_CARD,
    }),

    onUpdateTitle(newTitle: string) {
      this.updateCard({ cardId: this.card.id, cardInput: { title: newTitle } })
    },
  },
})
</script>

<template lang="pug">
  div
    c-input(:model="card.title" :focus="focused" @update:title="onUpdateTitle")
    | {{ card.id }}
    slot
    a(@click.prevent="removeCard(card.id)" href="#remove-card" title="Remove Card") Remove
</template>
