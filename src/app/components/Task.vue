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
  .task(:class="['flex', 'justify-space-between']")
    c-input.task__title(:model="task.title" :focus="focused" :completed="task.completed" @update:title="onUpdateTitle")
    a.task__remove(@click.prevent="removeTask(task.id)" href="#remove-task" title="Remove Task")
      c-icon(:iconPath="$icons.trashcan")
</template>

<style lang="sass" scoped>
.task
  gap: 1rem
  align-items: center

  .task__title
    flex: 1

  .task__remove
    color: rgb(var(--color-secondary))
    transition: transform .2s ease-in
    &:hover
      transform: scale(1.1)
</style>
