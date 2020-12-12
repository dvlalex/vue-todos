import { MutationTree } from 'vuex'
import { ICard } from '@/core/types'
import { CardActions, CardsState } from '@/app/store/cards/types'

export const useMutations = (): MutationTree<CardsState> => ({
  [CardActions.GET_CARDS]: (state, cards: Array<ICard<string>>) => {
    state.Cards = new Map(cards.map((c) => [c.id, c]))
  },

  [CardActions.CREATE_CARD]: (state, card: ICard<string>) => {
    state.Cards.set(card.id, card)
  },

  [CardActions.DELETE_CARD]: (state, cardId: string) => {
    state.Cards.delete(cardId)
  },

  [CardActions.UPDATE_CARD]: (state, card: ICard<string>) => {
    state.Cards.set(card.id, card)
  },
})
