import { redirect } from 'remix'
import { withSSRContext } from 'aws-amplify'
import { createTask } from '../../src/graphql/mutations'

export async function action ({ request }) {
  const body = await request.formData()
  const SSR = withSSRContext(request)

  const user = await SSR.Auth.currentAuthenticatedUser()

  await SSR.API.graphql({
    query: createTask,
    variables: {
      input: {
        name: body._fields.task[0],
        done: false
      }
    }
  })

  return redirect('/')
}
