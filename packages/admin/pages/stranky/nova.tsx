import { v4 as uuid } from "uuid"
import { NextPage } from "next"
import { createPage } from "../../api/createPage"
import { PageForm } from "../../views/PageForm"
import { BlockTemplates } from "@local/lib/src"

export const PageCreatePage: NextPage = () => (
  <PageForm
    initialValues={{
      name: "",
      content: [
        {
          id: uuid(),
          template: BlockTemplates.Heading,
          fields: { content: "" },
        },
      ],
      siteId: "",
      slug: "",
    }}
    onSave={createPage}
    autoFillSlug
  />
)

export default PageCreatePage
