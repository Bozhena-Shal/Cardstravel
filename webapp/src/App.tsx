import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import * as routes from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllCardsPage } from './pages/AllCardsPage'
import { NewCardPage } from './pages/NewCardPage'
import { ViewCardsPage } from './pages/ViewCardsPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={routes.getAllCardsRoute()} element={<AllCardsPage />} />
            <Route path={routes.getViewCardsRoute(routes.viewCardRouteParams)} element={<ViewCardsPage />} />
            <Route path={routes.getNewCardRoute()} element={<NewCardPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
