import * as React from "react"
import MenuContainer from "../../components/FoodMenu/Container"
import Wrapper from "../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../utilities/firebase_admin"
import { Layout } from "../../components/layout/secondary"
import * as Feather from "react-feather"
import { useResource } from "../../components/context/Resource"
import ContentTable from "../../components/table"
import firebase from "firebase"

export default function FoodMenu({ session }: any) {
  let CategoriesCollection = firebase.firestore().collection("categories")
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const [tableData, setTableData] = React.useState<any>()
  const getList = async () => {
    try {
      let res = await CategoriesCollection.get()
      if (res.size) {
        let list: Array<any> = []
        res.docs.map((item, index) => {
          list.push({ id: item.id, ...item.data() })
        })
        //list)
        setTableData(list)
        setInitializing(false)
      }
      setInitializing(false)
    } catch (error) {
      setInitializing(false)
      throw error
    }
  }
  React.useEffect(() => {
    getList().catch((error) => {
      throw error
    })
    return
  }, [])
  const HeaderActions = [
    {
      Icon: <Feather.Plus size={18} />,
      to: "/foodMenu/addCategory",
    },
  ]
  let actions = [
    {
      Icon: <Feather.Plus size={18} />,
      isLink: true,
      to: "/foodMenu/addFood",
      action: () => {},
    },
    {
      Icon: <Feather.Eye size={18} />,
      isLink: true,
      to: "/foodMenu/view",
      action: () => {},
    },
    {
      Icon: <Feather.Trash2 />,
      // isLink: true,
      // to: "/foodMenu/view",
      action: async (data: any) => {
        try {
          setInitializing(true)
          let res = await RestaurantCollection.get()
          let restaurants: Array<any> = []
          if (res && !res.empty) {
            restaurants = res.docs.map((item) => {
              return { id: item.id }
            })
          }
          await Promise.all(
            restaurants.map(async (item) => {
              let list: Array<any> = []
              let foods = await RestaurantCollection.doc(item.id)
                .collection("foods")
                .where("category", "==", `${data.name}`)
                .get()
              if (foods && !foods.empty) {
                list = foods.docs.map((food) => ({ id: food.id }))
                await Promise.all(
                  list.map(async (val) => {
                    await RestaurantCollection.doc(item.id)
                      .collection("foods")
                      .doc(val.id)
                      .delete()
                  })
                )
              }
            })
          )

          await CategoriesCollection.doc(data.id).delete()
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
          setInitializing(false)
        } catch (error) {
          console.error(error)
        }
      },
    },
  ]

  if (initializing)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <div className="flex-1 flex flex-col">
        <Wrapper>
          <ContentTable
            tableData={tableData}
            tableFileds={["name"]}
            tableTitle="Menu Categories"
            headerActions={HeaderActions}
            actions={actions}
          />
        </Wrapper>
      </div>
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
