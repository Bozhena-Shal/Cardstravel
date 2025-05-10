import { format } from 'date-fns/format'
import { useParams } from 'react-router-dom'
import { LinkButton } from '../../../components/Button/index'
import { Segment } from '../../../components/Segment'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getEditCardRoute, type ViewCardRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'
import css from './index.module.scss'

export const ViewCardPage = withPageWrapper({
  useQuery: () => {
    const { cardNick } = useParams() as ViewCardRouteParams
    return trpc.getCard.useQuery({
      cardNick,
    })
  },
  setProps: ({ queryResult, checkExists, ctx }) => ({
    card: checkExists(queryResult.data.card, 'Card not found'),

    me: ctx.me,
  }),
})(({ card, me }) => (
  <Segment title={card.name} description={card.description}>
    <div className={css.createdAt}>Created At: {format(card.createdAt, 'yyyy-MM-dd')}</div>
    <div className={css.author}>Author: {card.author.nick}</div>
    <div className={css.text} dangerouslySetInnerHTML={{ __html: card.text }} />
    {me?.id === card.authorId && (
      <div className={css.editButton}>
        <LinkButton to={getEditCardRoute({ cardNick: card.nick })}>Edit Card</LinkButton>
      </div>
    )}
  </Segment>
))
