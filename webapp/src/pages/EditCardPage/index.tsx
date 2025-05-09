import type { TrpcRouterOutput } from '@cardstravel/backend/src/router'
import { zUpdateCardTrpcInput } from '@cardstravel/backend/src/router/updateCard/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../components/Alert'
import { Button } from '../../components/Button'
import { FormItems } from '../../components/FormItems'
import { Input } from '../../components/Input'
import { Segment } from '../../components/Segment'
import { Textarea } from '../../components/Textarea'
import { useForm } from '../../lib/form'
import { getViewCardsRoute, type EditCardRouteParams } from '../../lib/routes'
import { trpc } from '../../lib/trpc'

const EditCardComponent = ({ card }: { card: NonNullable<TrpcRouterOutput['getCard']['card']> }) => {
  const navigate = useNavigate()
  const updateCard = trpc.updateCard.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(card, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateCardTrpcInput.omit({ cardId: true }),
    onSubmit: async (values) => {
      await updateCard.mutateAsync({ cardId: card.id, ...values })
      void navigate(getViewCardsRoute({ cardNick: values.nick }))
    },
    resetOnSuccess: false,
    showValidationAlert: true,
  })

  return (
    <Segment title={`Edit Card: ${card.nick}`}>
      <form onSubmit={formik.handleSubmit}>
        <FormItems>
          <Input label="Nick" name="nick" formik={formik} />
          <Input label="Description" name="description" maxWidth={500} formik={formik} />
          <Textarea label="Text" name="text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Card</Button>
        </FormItems>
      </form>
    </Segment>
  )
}

export const EditCardPage = () => {
  const { cardNick } = useParams() as EditCardRouteParams

  const getCardResult = trpc.getCard.useQuery({
    cardNick,
  })
  const getMeResult = trpc.getMe.useQuery()

  if (getCardResult.isLoading || getCardResult.isFetching || getMeResult.isLoading || getMeResult.isFetching) {
    return <span>Loading...</span>
  }

  if (getCardResult.isError) {
    return <span>Error: {getCardResult.error.message}</span>
  }

  if (getMeResult.isError) {
    return <span>Error: {getMeResult.error.message}</span>
  }

  if (!getCardResult.data?.card) {
    return <span>Card not found</span>
  }

  const card = getCardResult.data.card
  const me = getMeResult.data?.me

  if (!me) {
    return <span>Only for authorized</span>
  }

  if (me.id !== card.authorId) {
    return <span>An card can only be edited by the author</span>
  }

  return <EditCardComponent card={card} />
}
