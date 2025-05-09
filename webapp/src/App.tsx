import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllCardsPage } from './pages/AllCardsPage'
import { NewCardPage } from './pages/NewCardPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SingUpPage'
import { ViewCardsPage } from './pages/ViewCardsPage'
import './styles/global.scss'
import { EditCardPage } from './pages/EditCardPage'
import { AppContextProvider } from './lib/ctx'

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
              <Route path={routes.getViewCardsRoute(routes.viewCardRouteParams)} element={<ViewCardsPage />} />
              <Route path={routes.getNewCardRoute()} element={<NewCardPage />} />
              <Route path={routes.getEditCardRoute(routes.editCardRouteParams)} element={<EditCardPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </AppContextProvider>
    </TrpcProvider>
  )
}
