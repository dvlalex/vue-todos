import Vuex from 'vuex'
import { createStore } from '@/core'

describe('core/utils/store', () => {
  test('should bootstrap a store', async () => {
    const state = { flag: true }
    const store = createStore({ state })

    expect(store).toBeInstanceOf(Vuex.Store)
    expect(store.state).toEqual(state)
  })
})
