import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { getAllCardsRoute, getViewCardsRoute } from './lib/routes'

import { TrpcProvider } from './lib/trpc'
import { AllCardsPage } from './pages/AllCardsPage'
import { ViewCardsPage } from './pages/ViewCardsPage'

export const App = () => {
  return (
    <TrpcProvider>
      <BrowserRouter>
        <Routes>
          <Route path={getAllCardsRoute()} element={<AllCardsPage />} />
          <Route path={getViewCardsRoute({ cardNick: ':cardNick' })} element={<ViewCardsPage />} />
        </Routes>
      </BrowserRouter>
    </TrpcProvider>
  )
}
