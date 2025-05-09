import { trpc } from '../../../lib/trpc.js'

export const getCardsTrpcRoute = trpc.procedure.query(async ({ ctx }) => {
  const cards = await ctx.prisma.card.findMany({
    select: {
      id: true,
      nick: true,
      name: true,
      description: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  return { cards }
})
