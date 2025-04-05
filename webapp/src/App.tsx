import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Layout } from './components/Layout'
import { getAllCardsRoute, getViewCardsRoute } from './lib/routes'
import { TrpcProvider } from './lib/trpc'
import { AllCardsPage } from './pages/AllCardsPage'
import { ViewCardsPage } from './pages/ViewCardsPage'
import './styles/global.scss'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path={getAllCardsRoute()} element={<AllCardsPage />} />
            <Route path={getViewCardsRoute({ cardNick: ':cardNick' })} element={<ViewCardsPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
