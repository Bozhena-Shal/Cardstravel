import { zUpdateCardTrpcInput } from '@cardstravel/backend/src/router/card/updateCard/input'
import pick from 'lodash/pick'
import { useNavigate, useParams } from 'react-router-dom'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { getViewCardsRoute, type EditCardRouteParams } from '../../../lib/routes'
import { trpc } from '../../../lib/trpc'

export const EditCardPage = withPageWrapper({
  authorizedOnly: true,
  useQuery: () => {
    const { cardNick } = useParams() as EditCardRouteParams
    return trpc.getCard.useQuery({
      cardNick,
    })
  },
  setProps: ({ queryResult, ctx, checkExists, checkAccess }) => {
    const card = checkExists(queryResult.data.card, 'Card not found')
    checkAccess(ctx.me?.id === card.authorId, 'An card can only be edited by the author')
    return {
      card,
    }
  },
})(({ card }) => {
  const navigate = useNavigate()
  const updateCard = trpc.updateCard.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: pick(card, ['name', 'nick', 'description', 'text']),
    validationSchema: zUpdateCardTrpcInput.omit({ cardId: true }),
    onSubmit: async (values) => {
      await updateCard.mutateAsync({ cardId: card.id, ...values })
      navigate(getViewCardsRoute({ cardNick: values.nick }))
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
})
