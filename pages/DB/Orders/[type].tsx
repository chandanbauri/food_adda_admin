import * as React from "react"
import { useRouter } from "next/router"
import Wrapper from "../../../components/layout/"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import * as Feather from "react-feather"
import ContentTable from "../../../components/table"
import PopUpContainer from "../../../components/popUp/container"
import PopUpTable from "../../../components/popUp/table"
import { GetStaticPaths } from "next"
import { useResource } from "../../../components/context/Resource"
import firebase from "firebase"
import {
  askForAcceptingOrder,
  assignOrder,
  getListOfDeliveryBoys,
} from "../../../utilities/functions"
export default function Orders({ session }: any) {
  const OrdersCollection = firebase.firestore().collection("orders")
  const focusedItem = React.useRef<any>()
  let router = useRouter()
  let { type } = router.query
  const [popUp, setPopUp] = React.useState<boolean>(false)
  let Resource = useResource()
  const [success, setSuccess] = React.useState<boolean>(false)
  const [Error, setError] = React.useState<boolean>(false)
  const [DeliveryBoys, setDeliveryBoys] = React.useState<Array<any>>([])
  const [popUpData, setPopUpData] = React.useState<Array<any>>([])
  const getList = async () => {
    try {
      let res = await getListOfDeliveryBoys()
      if (res) {
        let parsedResponse = JSON.parse(res.data)
        if (parsedResponse.success) {
          setPopUpData(parsedResponse.data)
          // setInitializing(false)
        } else {
          // setInitializing(false)
          setPopUpData([])
        }
      }
    } catch (error) {
      throw error
    }
  }

  let tableData = [
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  ]
  let tableFileds = ["F1", "F2", "F3", "F4", "F5", "F6"]
  //   let actions = [
  //     {
  //       Icon: <Feather.Edit size={24} />,
  //       action: (data: any) => console.log(data),
  //     },
  //     {
  //       Icon: <Feather.Trash2 size={24} />,
  //       action: (data: any) => console.log(data),
  //     },
  //   ]

  const getPopUpActions = (type: any) => {
    let actions: Array<any> = []
    switch (type) {
      case "pending":
        actions = [
          {
            Icon: <Feather.CheckSquare size={24} />,
            action: async (data: any) => {
              try {
                let res = await askForAcceptingOrder({
                  order: focusedItem.current,
                  deliveryBoyID: data.uid,
                })
              } catch (error) {
                setPopUp((prev) => false)
              }
            },
          },
        ]
        break
      case "ongoing":
        actions = []
        break
      case "rejected":
        actions = []
        break
      case "canceled":
        actions = []
        break
      case "delivered":
        actions = []
        break
    }
    return actions
  }

  const getActions = (type: any) => {
    let actions: Array<any> = []
    switch (type) {
      case "pending":
        actions = [
          {
            Icon: <Feather.CheckSquare size={24} />,
            action: (data: any) => {
              focusedItem.current = data
              console.log(focusedItem.current)
              setPopUp(true)
            },
          },
          {
            Icon: <Feather.Trash2 size={24} />,
            action: async (data: any) => {
              try {
                await OrdersCollection.doc(data.id).update({
                  isPending: false,
                  isCanceled: false,
                  isOnGoing: false,
                  isDelivered: false,
                  isRejected: true,
                })
                if (Resource?.Orders.pending) {
                  let index = Resource?.Orders?.pending?.findIndex(
                    (item, index) => item.id == data.id
                  )
                  if (index !== undefined) {
                    Resource?.setOrders((prev) => ({
                      ...prev,
                      rejected: [...prev.rejected, prev.pending[index]],
                    }))
                    if (index == 0) {
                      Resource?.setOrders((prev) => ({
                        ...prev,
                        pending: [...prev.pending.slice(1)],
                      }))
                    } else if (index == 1) {
                      Resource?.setOrders((prev) => ({
                        ...prev,
                        pending: [
                          ...prev.pending.slice(0, index),
                          ...prev.pending.slice(index + 1),
                        ],
                      }))
                    }
                  }
                }
                setSuccess((prev) => false)
              } catch (error) {
                setError((prev) => false)
              }
            },
          },
        ]
        break
      case "ongoing":
        actions = []
        break
      case "rejected":
        actions = []
        break
      case "canceled":
        actions = []
        break
      case "delivered":
        actions = []
        break
    }
    return actions
  }

  const getOrders = () => {
    console.log(Resource?.Orders)
    switch (type) {
      case "pending":
        return Resource?.Orders?.pending
      case "rejected":
        return Resource?.Orders?.rejected
      case "canceled":
        return Resource?.Orders?.canceled
      case "ongoing":
        return Resource?.Orders?.onGoing
      case "delivered":
        return Resource?.Orders?.delivered
    }
  }
  const PopUpConent = () => (
    <div>
      <div className="flex flex-grow justify-between items-center text-green-600 sticky top-0 bg-white">
        <h1 className="py-4 text-lg ">Assign Order</h1>
        <Feather.Trash2 size={24} />
      </div>
      <div className="w-full overflow-x-scroll">
        <PopUpTable
          tableData={popUpData}
          tableFileds={["uid", "displayName", "phoneNumber"]}
          actions={getPopUpActions(type)}
        />
      </div>
    </div>
  )
  React.useEffect(() => {
    getList().catch((error) => {
      throw error
    })
    return
  }, [])

  if (session)
    return (
      <div className="bg-gray-200 flex-1 flex">
        <Wrapper>
          {/* <div className="w-full md:px-4">
            <h1 className="w-full bg-green-500 py-5 flex items-center justify-center text-white uppercase">{`${type} Orders`}</h1>
          </div> */}
          <PopUpContainer
            trigger={popUp}
            content={<PopUpConent />}
            onClose={() => {
              setPopUp(false)
            }}
          />
          <ContentTable
            tableData={getOrders()}
            tableFileds={["id", "paymentMethod", "amount"]}
            actions={getActions(type)}
            tableTitle={`${type} Orders`}
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
    // console.log(error)
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  }
}
