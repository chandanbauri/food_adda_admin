import * as React from "react"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import { useRouter } from "next/router"
import ContentTable from "../../../components/table"
import { useResource } from "../../../components/context/Resource"
import { GetStaticPaths } from "next"
export default function AddNewFood({ session }: any) {
  const router = useRouter()
  const { category } = router.query
  const Resource = useResource()
  if (session)
    return (
      <Wrapper>
        <ContentTable
          tableData={Resource?.foodMenu.displayCategory(category)}
          tableFileds={["name", "id", "desc"]}
          actions={[]}
          tableTitle="Add New Food"
        />
      </Wrapper>
    )
  return (
    <Layout title="Not Authenticated">
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-2xl font-bold">Loading ... </h1>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  try {
    let cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    if (token) {
      const { uid, email } = token
      return {
        props: { session: `your email is ${email},and your uid is ${uid}` },
      }
    }
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  } catch (error) {
    // console.log(error)
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  }
}


