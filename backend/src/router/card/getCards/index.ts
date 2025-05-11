import _ from 'lodash'
import { trpc } from '../../../lib/trpc.js'
import { zGetCardsTrpcInput } from './input.js'

export const getCardsTrpcRoute = trpc.procedure.input(zGetCardsTrpcInput).query(async ({ ctx, input }) => {
  // const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, '_') : undefined
  const normalizedSearch = input.search ? input.search.trim().replace(/[\s\n\t]/g, ' & ') : undefined
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
    where: !input.search
      ? undefined
      : {
          OR: [
            {
              name: {
                search: normalizedSearch,
              },
            },
            {
              description: {
                search: normalizedSearch,
              },
            },
            {
              text: {
                search: normalizedSearch,
              },
            },
          ],
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
  const rawCardsExceptNext = rawCards.slice(0, input.limit)
  const cardsExceptNext = rawCardsExceptNext.map((card) => ({
    ..._.omit(card, ['_count']),
    likesCount: card._count.cardsLikes,
  }))
  return { cards: cardsExceptNext, nextCursor }
})
