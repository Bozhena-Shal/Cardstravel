import { useParams } from 'react-router-dom'

export const ViewCardsPage = () => {
  const { cardNick } = useParams() as { cardNick: string }
  return (
    <div>
      <h1>{cardNick}</h1>
      <p>Description of card 1...</p>
      <div>
        <p>Text paragrph 1 of card 1...</p>
        <p>Text paragrph 2 of card 1...</p>
        <p>Text paragrph 3 of card 1...</p>
      </div>
    </div>
  )
}
