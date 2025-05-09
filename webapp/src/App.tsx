import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { AppContextProvider } from './lib/ctx'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllCardsPage } from './pages/AllCardsPage'
import { EditCardPage } from './pages/EditCardPage'
import { NewCardPage } from './pages/NewCardPage'
import { NotFoundPage } from './pages/NotFoundPage'
import { SignInPage } from './pages/SignInPage'
import { SignOutPage } from './pages/SignOutPage'
import { SignUpPage } from './pages/SingUpPage'
import './styles/global.scss'
import { ViewCardPage } from './pages/ViewCardsPage'

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
