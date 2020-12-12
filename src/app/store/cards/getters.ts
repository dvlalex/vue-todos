import { GetterTree } from 'vuex'
import { CardActions, CardsState } from '@/app/store/cards/types'

export const useGetters = <R>(): GetterTree<CardsState, R> => ({
  [CardActions.GET_CARDS]: (state) => state.Cards,
})
