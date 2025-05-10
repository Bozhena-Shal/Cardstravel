import { trpc } from '../../../lib/trpc.js'
import { zGetCardsTrpcInput } from './input.js'

export const getCardsTrpcRoute = trpc.procedure.input(zGetCardsTrpcInput).query(async ({ ctx, input }) => {
  const cards = await ctx.prisma.card.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
    },
    orderBy: [
      {
        createdAt: 'desc',
      },
      {
        serialNumber: 'desc',
      },
    ],
    cursor: input.cursor ? { serialNumber: input.cursor } : undefined,
    take: input.limit + 1,
  })
  const nextCard = cards.at(input.limit)
  const nextCursor = nextCard?.serialNumber
  const cardsExceptNext = cards.slice(0, input.limit)

  return { cards: cardsExceptNext, nextCursor }
})
