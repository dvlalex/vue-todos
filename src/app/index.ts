import { createApp } from '@/core'

/**
 * App entry-point
 */
;(async () => {
  await createApp({ layout: () => import('@/app/views/Index'), options: {}, mount: true })
})().catch((error) => {
  console.error(error)
})
