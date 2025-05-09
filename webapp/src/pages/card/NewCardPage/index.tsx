import { zCreateCardTrpcInput } from '@cardstravel/backend/src/router/card/createCard/input'
import { Alert } from '../../../components/Alert'
import { Button } from '../../../components/Button'
import { FormItems } from '../../../components/FormItems'
import { Input } from '../../../components/Input'
import { Segment } from '../../../components/Segment'
import { Textarea } from '../../../components/Textarea'
import { useForm } from '../../../lib/form'
import { withPageWrapper } from '../../../lib/pageWrapper'
import { trpc } from '../../../lib/trpc'

export const NewCardPage = withPageWrapper({
  authorizedOnly: true,
})(() => {
  const createCard = trpc.createCard.useMutation()
  const { formik, buttonProps, alertProps } = useForm({
    initialValues: {
      name: '',
      nick: '',
      description: '',
      text: '',
    },
    validationSchema: zCreateCardTrpcInput,
    onSubmit: async (values) => {
      await createCard.mutateAsync(values)
      formik.resetForm()
    },
    successMessage: 'Card created!',
    showValidationAlert: true,
  })

  return (
    <Segment title="New Card">
      <form
        onSubmit={(e) => {
          e.preventDefault()
          formik.handleSubmit()
        }}
      >
        <FormItems>
          <Input name="name" label="Name" formik={formik} />
          <Input name="nick" label="Nick" formik={formik} />
          <Input name="description" label="Description" formik={formik} maxWidth={500} />
          <Textarea name="text" label="Text" formik={formik} />
          <Alert {...alertProps} />
          <Button {...buttonProps}>Create Card</Button>
        </FormItems>
      </form>
    </Segment>
  )
})
