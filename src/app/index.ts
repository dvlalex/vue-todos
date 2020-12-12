import { createApp, createStore } from '@/core'
import { cards, tasks } from '@/app/store'

/**
 * App entry-point
 */
;(async () => {
  await createApp({
    layout: () => import('@/app/views/Index'),
    options: { store: createStore({ modules: { cards, tasks } }) },
    mount: true,
  })
})().catch((error) => {
  console.error(error)
})
