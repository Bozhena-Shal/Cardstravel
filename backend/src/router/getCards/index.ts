import _ from 'lodash'
import { cards } from '../../lib/cards.js'
import { trpc } from '../../lib/trpc.js'

export const getCardsTrpcRoute = trpc.procedure.query(() => {
  return { cards: cards.map((card) => _.pick(card, ['nick', 'name', 'description'])) }
})
