import { initTRPC } from '@trpc/server'

const cards = [
  { nick: 'cool-card-nick-1', name: 'Card 1', description: 'Description of card 1...' },
  { nick: 'cool-card-nick-2', name: 'Card 2', description: 'Description of card 2...' },
  { nick: 'cool-card-nick-3', name: 'Card 3', description: 'Description of card 3...' },
  { nick: 'cool-card-nick-4', name: 'Card 4', description: 'Description of card 4...' },
  { nick: 'cool-card-nick-5', name: 'Card 5', description: 'Description of card 5...' },
]

// const x: string = 'hello'
// if (Math.random() + 1) {
//   console.info(x)
// }

const trpc = initTRPC.create()

export const trpcRouter = trpc.router({
  getCards: trpc.procedure.query(() => {
    return { cards }
  }),
})

export type TrpcRouter = typeof trpcRouter
