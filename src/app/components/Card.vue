<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { ICard } from '@/core/types'
import { CardActions } from '@/app/store/cards/types'
import { TaskActions } from '@/app/store/tasks/types'

import Task from '@/app/components/Task'

export default Vue.extend({
  components: {
    Task,
  },

  props: {
    data: {
      type: Object as PropType<ICard<string>>,
      required: true,
    },
  },

  computed: {
    tasks() {
      return this.$store.getters[`tasks/${TaskActions.GET_TASKS}`](this.data.id)
    },

    card(): ICard<string> {
      return this.data as ICard<string>
    },
  },

  methods: {
    ...mapActions('cards', {
      removeCard: CardActions.DELETE_CARD,
    }),
    ...mapActions('tasks', {
      createTask: TaskActions.CREATE_TASK,
    }),
  },
})
</script>

<template lang="pug">
  div
    c-input
    | card {{ card.title }}
    | {{ card.id }}
    div
      task(v-for="(task, index) in tasks" :key="index" :data="task")
      a(@click.prevent="createTask({cardId: card.id})" href="#new-task" title="New Task") New task
    a(@click.prevent="removeCard(card.id)" href="#remove-card" title="Remove Card") Remove
</template>
