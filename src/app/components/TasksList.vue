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

  watch: {
    tasks(items: Array<ITask<string>>) {
      const completedTasks = items.filter((i) => i.completed).length
      this.$events.$emit(`tasksPercentage-${this.cardId}`, Math.floor((completedTasks * 100) / this.length))
    },
  },

  async created() {
    this.$events.$on(`completeTasks-${this.cardId}`, (progress: number) => {
      const completeTasks = Math.round((progress * this.length) / 100)
      this.tasks.forEach((task: ITask<string>, index: number) => {
        if (index < completeTasks && !task.completed) this.completeTask(this.tasks[index].id)
        if (index > completeTasks && task.completed) this.unCompleteTask(this.tasks[index].id)
      })
    })
  },

  methods: {
    ...mapActions('tasks', {
      createTaskInStore: TaskActions.CREATE_TASK,
      updateTask: TaskActions.UPDATE_TASK,
    }),

    completeTask(taskId: string) {
      this.updateTask({ taskId, taskInput: { completed: true } })
    },

    unCompleteTask(taskId: string) {
      this.updateTask({ taskId, taskInput: { completed: false } })
    },

    async createTask() {
      const newTask = await this.createTaskInStore({ cardId: this.cardId, taskInput: { title: 'New Task' } })
      this.focusedTask = newTask.id
    },
  },
})
</script>

<template lang="pug">
  .tasks-list.flex.flex--column
    .tasks-list__grid
      template(v-if="length > 0")
        task(v-for="(task, index) in tasks" :key="index" :data="task" :focused="focusedTask === task.id")
      slot(v-else :createTask="createTask" name="no-results")
    a.tasks-list__new-task(v-if="length > 0" @click.prevent="createTask" href="#new-task" title="New Task") New task
</template>

<style lang="sass" scoped>
.tasks-list__grid
  display: grid
  gap: 1rem
  width: 100%

.tasks-list__new-task
  display: inline-block
  margin: 2.5rem auto 0
</style>
