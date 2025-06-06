const getRouteParams = <T extends Record<string, boolean>>(object: T) => {
  return Object.keys(object).reduce((acc, key) => ({ ...acc, [key]: `:${key}` }), {}) as Record<keyof T, string>
}
export const getAllCardsRoute = () => '/'
export type ViewCardRouteParams = typeof viewCardRouteParams
export const getViewCardsRoute = ({ cardNick }: { cardNick: string }) => `/cards/${cardNick}`

export const viewCardRouteParams = getRouteParams({ cardNick: true })

export const editCardRouteParams = getRouteParams({ cardNick: true })
export type EditCardRouteParams = typeof viewCardRouteParams
export const getEditCardRoute = ({ cardNick }: EditCardRouteParams) => `/cards/${cardNick}/edit`

export const getNewCardRoute = () => '/cards/new'

export const getSignUpRoute = () => '/sign-up'

export const getSignInRoute = () => '/sign-in'

export const getSignOutRoute = () => '/sign-out'
