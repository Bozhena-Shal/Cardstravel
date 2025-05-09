import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { SignInPage } from './pages/auth/SignInPage'
import { SignOutPage } from './pages/auth/SignOutPage'
import { SignUpPage } from './pages/auth/SingUpPage'
import { AllCardsPage } from './pages/card/AllCardsPage'
import { EditCardPage } from './pages/card/EditCardPage'
import { NewCardPage } from './pages/card/NewCardPage'
import { ViewCardPage } from './pages/card/ViewCardsPage'
import { NotFoundPage } from './pages/other/NotFoundPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <AppContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path={routes.getSignOutRoute()} element={<SignOutPage />} />
            <Route element={<Layout />}>
              <Route path={routes.getSignUpRoute()} element={<SignUpPage />} />
              <Route path={routes.getSignInRoute()} element={<SignInPage />} />
              <Route path={routes.getAllCardsRoute()} element={<AllCardsPage />} />
              <Route path={routes.getNewCardRoute()} element={<NewCardPage />} />
              <Route path={routes.getViewCardsRoute(routes.viewCardRouteParams)} element={<ViewCardPage />} />
              <Route path={routes.getEditCardRoute(routes.editCardRouteParams)} element={<EditCardPage />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
