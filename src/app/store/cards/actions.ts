import { ActionTree } from 'vuex'
import { Factory } from '@/core/utils/factory'
import { CardInput, ICard, ICardService } from '@/core/types'
import { CardService } from '@/app/services/cardService'
import { CardActions, CardsState } from '@/app/store/cards/types'
import { TaskActions } from '@/app/store/tasks/types'

export const useActions = <R>(): ActionTree<CardsState, R> => ({
  [CardActions.GET_CARDS]: async ({ commit, dispatch }) => {
    const cardService = Factory.createInstance<ICardService<string>>(CardService)
    const cards = cardService.getAll()

    commit(CardActions.GET_CARDS, cards)
    cards.forEach((c) => {
      dispatch(`tasks/${TaskActions.GET_TASKS}`, c.id, { root: true })
    })
  },

  [CardActions.CREATE_CARD]: async ({ commit }, cardInput: CardInput<string>): Promise<ICard<string>> => {
    const cardService = Factory.createInstance<ICardService<string>>(CardService)
    const card = cardService.create(cardInput)

    commit(CardActions.CREATE_CARD, card)
    return card
  },

  [CardActions.DELETE_CARD]: async ({ commit }, cardId: string) => {
    const cardService = Factory.createInstance<ICardService<string>>(CardService)
    cardService.delete(cardId)

    commit(CardActions.DELETE_CARD, cardId)
  },

  [CardActions.UPDATE_CARD]: async ({ commit }, payload: { cardId: string; cardInput: CardInput<string> }) => {
    const cardService = Factory.createInstance<ICardService<string>>(CardService)
    const card = cardService.update(payload.cardId, payload.cardInput)

    commit(CardActions.UPDATE_CARD, card)
  },
})
