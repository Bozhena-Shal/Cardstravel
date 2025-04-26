import { trpc } from '../lib/trpc.js'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCardTrpcRoute } from './createCard/index.js'
import { getCardTrpcRoute } from './getCard'
import { getCardsTrpcRoute } from './getCards'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createCard: createCardTrpcRoute,
  getCard: getCardTrpcRoute,
  getCards: getCardsTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
