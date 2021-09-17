import * as React from "react"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import { useRouter } from "next/router"
import ContentTable from "../../../components/table"
import firebase from "firebase"
export default function View({ session }: any) {
  const router = useRouter()
  const { category, name } = router.query
  let CategoriesCollection = firebase.firestore().collection("categories")
  const [tableData, setTableData] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const getList = async () => {
    if (typeof category == "string") {
      let res = await CategoriesCollection.doc(category)
        .collection("foods")
        .get()
      if (res.size) {
        let list: Array<any> = []
        res.docs.map((item, index) => {
          list.push(item.data())
        })
        //list)
        setInitializing(false)
        setTableData(list)
      } else {
        setTableData([])
        setInitializing(false)
      }
    }
  }
  React.useEffect(() => {
    getList().catch((error) => {
      throw error
    })
    return
  }, [])
  if (initializing)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <Wrapper>
        {!tableData.length ? (
          <div className="h-64 w-full flex items-center justify-center">
            <h1 className="text-green-500 text-2xl font-bold">
              No data available
            </h1>
          </div>
        ) : (
          <ContentTable
            tableData={tableData}
            tableFileds={["name", "cost", "desc"]}
            // actions={[]}
            tableTitle={`${name}`}
          />
        )}
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
    // //error)
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  }
}
