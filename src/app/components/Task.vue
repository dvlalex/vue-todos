<script lang="ts">
import Vue, { PropType } from 'vue'
import { mapActions } from 'vuex'
import { ITask } from '@/core/types'
import { TaskActions } from '@/app/store/tasks/types'

export default Vue.extend({
  props: {
    data: {
      type: Object as PropType<ITask<string>>,
      required: true,
    },

    focused: {
      type: Boolean,
      default: false,
    },
  },

  computed: {
    task(): ITask<string> {
      return this.data
    },
  },

  methods: {
    ...mapActions('tasks', {
      removeTask: TaskActions.DELETE_TASK,
      updateTask: TaskActions.UPDATE_TASK,
    }),

    onUpdateTitle(newTitle: string) {
      this.updateTask({ taskId: this.task.id, taskInput: { title: newTitle } })
    },
  },
})
</script>

<template lang="pug">
  div
    c-input(:model="task.title" :focus="focused" @update:title="onUpdateTitle")
    | {{ task.id }}
    a(@click.prevent="removeTask(task.id)" href="#remove-task" title="Remove Task") Remove
</template>
