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
  },

  computed: {
    task(): ITask<string> {
      return this.data
    },
  },

  methods: {
    ...mapActions('tasks', {
      removeTask: TaskActions.DELETE_TASK,
    }),
  },
})
</script>

<template lang="pug">
  div
    | task {{ task.title }}
    | {{ task.id }}
    a(@click.prevent="removeTask(task.id)" href="#remove-task" title="Remove Task") Remove
</template>
