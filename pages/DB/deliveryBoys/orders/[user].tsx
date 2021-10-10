import * as React from "react"
import Wrapper from "../../../../components/layout"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import nookies from "nookies"
import { Layout } from "../../../../components/layout/secondary"
import * as Feather from "react-feather"
import ContentTable from "../../../../components/table"
import {
  deleteDeliveryBoy,
  getListOfDeliveryBoys,
} from "../../../../utilities/functions"
import firebase from "firebase"
import { useRouter } from "next/router"
export default function ViewOrders({ session }: any) {
  const DeliveryBoysCollection = firebase
    .firestore()
    .collection("deliveryPartners")
  const OrdersCollection = firebase.firestore().collection("orders")
  const [tableData, setTableData] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const { user } = useRouter().query
  // const getList = async () => {
  //   try {
  //     let res = await getListOfDeliveryBoys()
  //     if (res) {
  //       let parsedResponse = JSON.parse(res.data)
  //       if (parsedResponse.success) {
  //         //console.log("DELIVERY BOYS", parsedResponse.data)
  //         let list = parsedResponse.data.map((item: any) => {
  //           let { uid, ...details } = item
  //           //console.log("DELIVERY BOY", item)
  //           return { id: uid, ...details }
  //         })
  //         setTableData(list)
  //         setInitializing(false)
  //       } else {
  //         setInitializing(false)
  //         setTableData([])
  //       }
  //     }
  //   } catch (error) {
  //     throw error
  //   }
  // }
  // let tableData = [
  //   {
  //     F1: "I1 asknjnasdsadas",
  //     F2: "I2",
  //     F3: "I3",
  //     F4: "I4",
  //     F5: "I5",
  //     F6: "Iun",
  //   },
  //   { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
  //   { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
  //   { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
  //   { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  //   {
  //     F1: "I1 asknjnasdsadas",
  //     F2: "I2",
  //     F3: "I3",
  //     F4: "I4",
  //     F5: "I5",
  //     F6: "Iun",
  //   },
  //   { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
  //   { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
  //   { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
  //   { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  //   {
  //     F1: "I1 asknjnasdsadas",
  //     F2: "I2",
  //     F3: "I3",
  //     F4: "I4",
  //     F5: "I5",
  //     F6: "Iun",
  //   },
  //   { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
  //   { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
  //   { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
  //   { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  //   {
  //     F1: "I1 asknjnasdsadas",
  //     F2: "I2",
  //     F3: "I3",
  //     F4: "I4",
  //     F5: "I5",
  //     F6: "Iun",
  //   },
  //   { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
  //   { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
  //   { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
  //   { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  // ]
  let tableFileds = ["paymentMethod", "amount", "gst", "deliveryCharge"]

  let HeaderActions = [
    {
      Icon: <Feather.Plus />,
      to: "/DB/deliveryBoys/addNew",
    },
  ]
  let actions = [
    {
      Icon: <Feather.Edit size={24} />,
      // action: (data: any) => {},
      isLink: true,
      to: "/DB/deliveryBoys/update",
    },
    {
      Icon: <Feather.Eye size={24} />,
      // action: (data: any) => {},
      isLink: true,
      to: "/DB/deliveryBoys/update",
    },
  ]
  const fetchRejectedList = async () => {
    setInitializing(true)
    try {
      let rejectd: Array<any> = []
      let rejectedRes = await DeliveryBoysCollection.doc(user?.toString())
        .collection("rejected")
        .get()
      if (rejectedRes && !rejectedRes.empty) {
        rejectd = rejectedRes.docs.map((item) => ({
          ...item.data(),
        }))
      }
      setTableData(rejectd)
      setInitializing(false)
    } catch (error) {
      console.error(error)
    }
  }
  const fetchOngoingList = async () => {
    setInitializing(true)
    try {
      let ongoing: Array<any> = []
      let ongoingRes = await DeliveryBoysCollection.doc(user?.toString())
        .collection("completed")
        .get()
      if (ongoingRes && !ongoingRes.empty) {
        ongoing = ongoingRes.docs.map((item) => ({
          ...item.data(),
        }))
      }
      setTableData(ongoing)
      setInitializing(false)
    } catch (error) {
      console.error(error)
    }
  }
  // React.useEffect(() => {
  //   getList().catch((error) => {
  //     throw error
  //   })
  //   return
  // }, [])
  React.useEffect(() => {
    fetchRejectedList().catch((error) => console.error(error))
  }, [])
  if (initializing)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <div className="flex-1 flex">
        <Wrapper>
          <div className="flex w-full">
            <button
              className="flex-1 flex items-center justify-center py-2"
              onClick={() => {
                fetchOngoingList().catch((error) => console.error(error))
              }}
            >
              <span>Accepted</span>
            </button>
            <button
              className="flex-1 flex items-center justify-center py-2"
              onClick={() => {
                fetchRejectedList().catch((error) => console.error(error))
              }}
            >
              <span>Rejected</span>
            </button>
          </div>
          <ContentTable
            tableData={tableData}
            tableFileds={tableFileds}
            // actions={actions}
            headerActions={HeaderActions}
            tableTitle="Delivery Boy"
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
