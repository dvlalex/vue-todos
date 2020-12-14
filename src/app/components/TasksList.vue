<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'
import { ITask } from '@/core/types'
import { TaskActions } from '@/app/store/tasks/types'

import Task from '@/app/components/Task'

export default Vue.extend({
  components: {
    Task,
  },

  props: {
    cardId: {
      type: String,
      default: '',
    },
  },

  data: (): { focusedTask: string | null } => ({
    focusedTask: null,
  }),

  computed: {
    tasks(): Array<ITask<string>> {
      return this.$store.getters[`tasks/${TaskActions.GET_TASKS}`](this.cardId)
    },

    length(): number {
      return this.tasks.length
    },
  },

  async created() {
    this.$events.$on('card:focus', (cardId: string) => {
      this.focusedCard = cardId
    })
  },

  methods: {
    ...mapActions('tasks', {
      createTaskInStore: TaskActions.CREATE_TASK,
    }),

    async createTask() {
      const newTask = await this.createTaskInStore({ cardId: this.cardId, taskInput: { title: '' } })
      this.$events.$emit('task:focus', newTask.id)
    },
  },
})
</script>

<template lang="pug">
  div
    div(v-if="length > 0")
      task(v-for="(task, index) in tasks" :key="index" :data="task" :focused="focusedTask === task.id")
      a(@click.prevent="createTask" href="#new-task" title="New Task") New task
    slot(v-else :createTask="createTask" name="no-results")
</template>
