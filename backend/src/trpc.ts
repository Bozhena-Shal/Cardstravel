import { initTRPC } from '@trpc/server'
import _ from 'lodash'
import { z } from 'zod'

const cards = _.times(100, (i) => ({
  nick: `cool-card-nick-${i}`,
  name: `Card ${i}`,
  description: `Description of card ${i}...`,
  text: _.times(100, (j) => `<p>Text paragrph ${j} of idea ${i}...</p>`).join(''),
}))

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getCards: trpc.procedure.query(() => {
    return { cards: cards.map((card) => _.pick(card, ['nick', 'name', 'description'])) }
  }),
  getCard: trpc.procedure
    .input(
      z.object({
        cardNick: z.string(),
      })
    )
    .query(({ input }) => {
      const card = cards.find((card) => card.nick === input.cardNick)
      return { card: card || null }
    }),
})

export type TrpcRouter = typeof trpcRouter
