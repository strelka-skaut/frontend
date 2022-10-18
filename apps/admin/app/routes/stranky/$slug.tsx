import { LoaderFunction, ActionFunction } from "@remix-run/node"
import { useLoaderData, useSubmit } from "@remix-run/react"
import { getPage, updatePage } from "firebase/page"
import { PageForm } from "~/forms/PageForm"

export const loader: LoaderFunction = async ({ params }) => {
  if (!params.slug) {
    throw new Error(`Stránka se slugem ${params.slug} neexistuje.`)
  }
  return await getPage(params.slug)
}

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData()
  const title = formData.get("title") as string
  const slug = formData.get("slug") as string
  const blocks = formData.get("blocks") as any
  const blocksParsed = JSON.parse(blocks)

  await updatePage(slug, { title, blocks: blocksParsed })
  return null
}

export default function UpdatePage() {
  const submit = useSubmit()
  const page = useLoaderData()
  return (
    <PageForm
      initialData={page}
      onSubmit={async (values) => {
        submit(
          { ...values, blocks: JSON.stringify(values.blocks) },
          { method: "post" }
        )
      }}
    />
  )
}
