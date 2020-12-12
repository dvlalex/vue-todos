import { MutationTree } from 'vuex'
import { ICard } from '@/core/types'
import { CardActions, CardsState } from '@/app/store/cards/types'

export const useMutations = (): MutationTree<CardsState> => ({
  [CardActions.GET_CARDS]: (state, cards: Array<ICard<string>>) => {
    // state.Cards = new Map(cards.map((c) => [c.id, c]))
    state.Cards = [...cards]
  },

  [CardActions.CREATE_CARD]: (state, card: ICard<string>) => {
    // state.Cards.set(card.id, card)
    state.Cards.push(card)
  },

  [CardActions.DELETE_CARD]: (state, cardId: string) => {
    // state.Cards.delete(cardId)
    state.Cards.splice(
      state.Cards.findIndex((c) => c.id === cardId),
      1
    )
  },

  [CardActions.UPDATE_CARD]: (state, card: ICard<string>) => {
    // state.Cards.set(card.id, card)
    state.Cards[state.Cards.findIndex((c) => c.id === card.id)] = card
  },
})
