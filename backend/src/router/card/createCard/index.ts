import { trpc } from '../../../lib/trpc.js'
import { zCreateCardTrpcInput } from './input.js'

export const createCardTrpcRoute = trpc.procedure.input(zCreateCardTrpcInput).mutation(async ({ input, ctx }) => {
  if (!ctx.me) {
    throw Error('UNAUTHORIZED')
  }
  const exCard = await ctx.prisma.card.findUnique({
    where: {
      nick: input.nick,
    },
  })
  if (exCard) {
    throw Error('Card with this nick already exists')
  }
  await ctx.prisma.card.create({
    data: { ...input, authorId: ctx.me.id },
  })
  return true
})
