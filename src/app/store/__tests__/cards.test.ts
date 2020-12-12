import { createLocalVue } from '@vue/test-utils'
import Vuex, { ActionContext, ActionHandler, Module, Store } from 'vuex'
import { CardActions, CardsState } from '@/app/store/cards/types'
import { Card } from '@/app/models/card'

const Vue = createLocalVue()
Vue.use(Vuex)

const actionContext = (
  commit: () => void,
  dispatch: () => Promise<void> = async () => undefined
): ActionContext<CardsState, unknown> => ({
  commit,
  dispatch,
  state: { Cards: new Map() },
  getters: {},
  rootState: {},
  rootGetters: {},
})

describe('/app/store/cards', () => {
  let cards: Module<CardsState, unknown>
  let state: CardsState
  let card: Card<string>
  let moduleStore: Store<unknown>

  beforeAll(async () => {
    jest.mock('@/core/utils/factory', () => ({
      Factory: {
        createInstance: () => ({
          getAll: () => [
            { id: 'a', title: 'a' },
            { id: 'b', title: 'b' },
          ],
          create: (input: Record<string, unknown>) => input,
          delete: () => null,
          update: (cardId: string, input: Record<string, unknown>) => ({ ...input, id: cardId }),
        }),
      },
    }))

    cards = await import('@/app/store/cards').then((i) => i.cards)
    state = { Cards: new Map() }
    moduleStore = new Vuex.Store({ modules: { cards } })
  })

  test('getters ~ GET_CARDS', () => {
    const getters = cards.getters?.[CardActions.GET_CARDS]
    if (getters) {
      expect(getters({ Cards: new Map() }, null, null, null).size).toEqual(0)
    }
  })

  test('actions ~ GET_CARDS', async () => {
    expect.assertions(4)
    const commit = jest.fn()
    const dispatch = jest.fn()

    const getCards = <ActionHandler<CardsState, unknown>>cards.actions?.[CardActions.GET_CARDS]
    if (getCards) {
      await getCards.bind(moduleStore)(actionContext(commit, dispatch))

      expect(commit.mock.calls.length).toEqual(1)
      expect(dispatch.mock.calls.length).toEqual(2)
      expect(commit).toBeCalledWith(CardActions.GET_CARDS, [
        { id: 'a', title: 'a' },
        { id: 'b', title: 'b' },
      ])
      expect(dispatch).toBeCalledTimes(2)
    }
  })

  test('actions ~ CREATE_CARD', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const cardInput = { title: 'Card title' }
    const createCard = <ActionHandler<CardsState, unknown>>cards.actions?.[CardActions.CREATE_CARD]
    if (createCard) {
      await createCard.bind(moduleStore)(actionContext(commit), cardInput)

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(CardActions.CREATE_CARD, cardInput)
    }
  })

  test('actions ~ DELETE_CARD', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const cardId = 'random-id-card'
    const deleteCard = <ActionHandler<CardsState, unknown>>cards.actions?.[CardActions.DELETE_CARD]
    if (deleteCard) {
      await deleteCard.bind(moduleStore)(actionContext(commit), cardId)

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(CardActions.DELETE_CARD, cardId)
    }
  })

  test('actions ~ UPDATE_CARD', async () => {
    expect.assertions(2)
    const commit = jest.fn()

    const cardId = 'random-id-card'
    const cardInput = { title: 'Card title' }
    const updateCard = <ActionHandler<CardsState, unknown>>cards.actions?.[CardActions.UPDATE_CARD]
    if (updateCard) {
      await updateCard.bind(moduleStore)(actionContext(commit), { cardId, cardInput })

      expect(commit.mock.calls.length).toEqual(1)
      expect(commit).toBeCalledWith(CardActions.UPDATE_CARD, { id: cardId, ...cardInput })
    }
  })

  test('mutations ~ GET_CARDS', () => {
    expect.assertions(2)
    const getCards = cards.mutations?.[CardActions.GET_CARDS]
    if (getCards) {
      card = new Card<string>({ title: 'Special Card' })
      getCards(state, [
        new Card<string>({ title: 'Card 1' }),
        new Card<string>({ title: 'Card 2' }),
        card,
        new Card<string>({ title: 'Card 3' }),
      ])

      expect(state.Cards.size).toEqual(4)
      expect(Array.from(state.Cards.keys())[2]).toEqual(card.id)
    }
  })

  test('mutations ~ CREATE_CARD', () => {
    expect.assertions(2)
    const createCard = cards.mutations?.[CardActions.CREATE_CARD]
    if (createCard) {
      const newCard = new Card<string>({ title: 'Card 5' })
      createCard(state, newCard)

      expect(state.Cards.size).toEqual(5)
      expect(Array.from(state.Cards.keys())[4]).toEqual(newCard.id)
    }
  })

  test('mutations ~ UPDATE_CARD', () => {
    expect.assertions(1)
    const updateCard = cards.mutations?.[CardActions.UPDATE_CARD]
    if (updateCard) {
      const updatedCard = { ...card, title: 'New special title' }
      updateCard(state, updatedCard)

      expect(state.Cards.get(card.id)).toEqual(updatedCard)
    }
  })

  test('mutations ~ DELETE_CARD', () => {
    expect.assertions(2)
    const deleteCard = cards.mutations?.[CardActions.DELETE_CARD]
    if (deleteCard) {
      deleteCard(state, card.id)

      expect(state.Cards.size).toEqual(4)
      expect(Array.from(state.Cards.keys())[2]).not.toEqual(card.id)
    }
  })
})
