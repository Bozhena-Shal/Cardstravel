import { inferRouterInputs, inferRouterOutputs } from '@trpc/server'
import { trpc } from '../lib/trpc.js'
// @index('./**/index.ts', f => `import { ${f.path.split('/').slice(0, -1).pop()}TrpcRoute } from '${f.path.split('/').slice(0, -1).join('/')}'`)
import { createCardTrpcRoute } from './createCard/index.js'
import { getCardTrpcRoute } from './getCard/index.js'
import { getCardsTrpcRoute } from './getCards/index.js'
import { getMeTrpcRoute } from './getMe/index.js'
import { signInTrpcRoute } from './signIn/index.js'
import { signUpTrpcRoute } from './signUp/index.js'
import { updateCardTrpcRoute } from './updateCard/index.js'
// @endindex

export const trpcRouter = trpc.router({
  // @index('./**/index.ts', f => `${f.path.split('/').slice(0, -1).pop()}: ${f.path.split('/').slice(0, -1).pop()}TrpcRoute,`)
  createCard: createCardTrpcRoute,
  getCard: getCardTrpcRoute,
  getMe: getMeTrpcRoute,
  getCards: getCardsTrpcRoute,
  signUp: signUpTrpcRoute,
  signIn: signInTrpcRoute,
  updateCard: updateCardTrpcRoute,
  // @endindex
})

export type TrpcRouter = typeof trpcRouter
export type TrpcRouterInput = inferRouterInputs<TrpcRouter>
export type TrpcRouterOutput = inferRouterOutputs<TrpcRouter>
