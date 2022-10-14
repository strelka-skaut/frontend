/** @jsxImportSource @emotion/react */
import type { NextPage } from "next"
import Head from "next/head"
import { BlockTemplates } from "../blocks/BlockTemplates"
import { GlobalStyles } from "../components/GlobaStyles/GlobalStyles"
import { MetaTags } from "../components/MetaTags/MetaTags"
import { linkData, personData } from "../mockData/mockData"
import { theme } from "../styles/theme"
import { Page } from "../types/Page"

const Home: NextPage<Props> = ({ page }) => (
  <div>
    <Head>
      <MetaTags
        title={""}
        description={""}
        brandColor={theme.color.lightAccent}
        themeColor={theme.color.darkAccent}
        url={""}
        image=""
        manifest=""
        icons={{
          appleTouchIcon: "",
          largeIcon: "",
          smallIcon: "",
          maskIcon: "",
        }}
      />
    </Head>

    <GlobalStyles />

    <main>
      <h1>Home page</h1>
    </main>
  </div>
)

// export const getServerSideProps: GetServerSideProps<Props> = async () => ({
export const getServerSideProps: () => { props: Props } = () => ({
  props: {
    page: {
      blocks: [
        {
          id: "",
          template: BlockTemplates.Header,
          fields: {
            content: linkData,
          },
        },
        {
          id: "",
          template: BlockTemplates.Heading2,
          fields: {
            content: { content: "Vedení" },
          },
        },
        {
          id: "",
          template: BlockTemplates.PersonList,
          fields: {
            content: personData,
          },
        },

        {
          id: "",
          template: BlockTemplates.Heading2,
          fields: {
            content: { content: "Fotogalerie" },
          },
        },
      ],
    },
  },
})

interface Props {
  page: Page
}

export default Home