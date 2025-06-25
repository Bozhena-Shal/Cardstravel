import _ from 'lodash'
import { trpc } from '../../../lib/trpc.js'
import { zGetCardsTrpcInput } from './input.js'

export const getCardsTrpcRoute = trpc.procedure.input(zGetCardsTrpcInput).query(async ({ ctx, input }) => {
  const rawCards = await ctx.prisma.card.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
      serialNumber: true,
      _count: {
        select: {
          cardsLikes: true,
        },
      },
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
  const nextCard = rawCards.at(input.limit)
  const nextCursor = nextCard?.serialNumber
  const rawIdeasExceptNext = rawCards.slice(0, input.limit)
  const cardsExceptNext = rawIdeasExceptNext.map((card) => ({
    ..._.omit(card, ['_count']),
    likesCount: card._count.cardsLikes,
  }))
  return { cards: cardsExceptNext, nextCursor }
})
