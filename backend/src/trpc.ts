// // import type { TrpcRouter } from '@cardstravel/backend/src/router'

// import _ from "lodash"
// import { cards } from "./lib/cards.js"
// import { trpc } from "./lib/trpc.js"

// // import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// // import { httpBatchLink } from '@trpc/client'
// // import { createTRPCReact } from '@trpc/react-query'

// export const trpcRouter = trpc.router({
//   getCards: trpc.procedure.query(() => {
//     return { cards: cards.map((card) => _.pick(card, ['nick', 'name', 'description'])) }
//   }),
// })

// export type TrpcRouter = typeof trpcRouter
