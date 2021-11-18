import * as React from "react"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import { useRouter } from "next/router"
import ContentTable from "../../../components/table"
import firebase from "firebase"
import * as Feather from "react-feather"
import { GetServerSideProps } from "next"
export default function View({ session }: any) {
  const router = useRouter()
  const { category, name } = router.query
  let CategoriesCollection = firebase.firestore().collection("categories")
  const [tableData, setTableData] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  const getList = async () => {
    if (typeof category == "string") {
      let res = await CategoriesCollection.doc(category).collection("foods").get()
      if (res.size) {
        let list: Array<any> = []
        res.docs.map((item, index) => {
          list.push({ ...item.data(), id: item.id })
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
  let actions = [
    {
      Icon: <Feather.Trash2 />,
      // isLink: true,
      // to: "/foodMenu/view",
      action: async (data: any) => {
        setInitializing(true)
        try {
          let res = await RestaurantCollection.get()
          if (res && !res.empty) {
            let restaurants = res.docs.map((restaurant) => {
              return { id: restaurant.id }
            })
            await Promise.all(
              restaurants.map(async (restaurant) => {
                let foods = await RestaurantCollection.doc(restaurant.id)
                  .collection("foods")
                  .where("id", "==", `${data.id}`)
                  .get()
                if (foods && !foods.empty) {
                  await Promise.all(
                    foods.docs.map(async (item) => {
                      await RestaurantCollection.doc(restaurant.id)
                        .collection("foods")
                        .doc(item.id)
                        .delete()
                    }),
                  )
                }
              }),
            )
            setTableData((prev: any) => {
              let index = prev.findIndex((item: any) => item.id == data.id)
              if (index != -1) {
                if (index == 0) {
                  return [...prev.slice(1)]
                }
                return [...prev.slice(0, index), ...prev.slice(index + 1)]
              }
              return prev
            })
            await CategoriesCollection.doc(category?.toString())
              .collection("foods")
              .doc(data.id)
              .delete()
            setInitializing(false)
          }
        } catch (error) {
          console.error(error)
        }
      },
    },
  ]
  React.useEffect(() => {
    getList().catch((error) => {
      throw error
    })
    return
  }, [])
  if (initializing)
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <h1 className='text-green-500 text-xl'>Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <Wrapper>
        {!tableData.length ? (
          <div className='h-64 w-full flex items-center justify-center'>
            <h1 className='text-green-500 text-2xl font-bold'>No data available</h1>
          </div>
        ) : (
          <ContentTable
            tableData={tableData}
            tableFileds={["name", "cost", "desc"]}
            actions={actions}
            tableTitle={`${name}`}
          />
        )}
      </Wrapper>
    )
  return (
    <Layout title='Not Authenticated'>
      <div className='h-screen w-screen flex items-center justify-center'>
        <h1 className='text-green-500 text-2xl font-bold'>Loading ... </h1>
      </div>
    </Layout>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
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
