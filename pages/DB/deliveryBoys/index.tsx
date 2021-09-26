import * as React from "react"
import Wrapper from "../../../components/layout"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import nookies from "nookies"
import { Layout } from "../../../components/layout/secondary"
import * as Feather from "react-feather"
import ContentTable from "../../../components/table"
import {
  deleteDeliveryBoy,
  getListOfDeliveryBoys,
} from "../../../utilities/functions"
export default function DeliveryBoyDB({ session }: any) {
  const [tableData, setTableData] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const getList = async () => {
    try {
      let res = await getListOfDeliveryBoys()
      if (res) {
        let parsedResponse = JSON.parse(res.data)
        if (parsedResponse.success) {
          console.log("DELIVERY BOYS", parsedResponse.data)
          let list = parsedResponse.data.map((item: any) => {
            let { uid, ...details } = item
            console.log("DELIVERY BOY", item)
            return { id: uid, ...details }
          })
          setTableData(list)
          setInitializing(false)
        } else {
          setInitializing(false)
          setTableData([])
        }
      }
    } catch (error) {
      throw error
    }
  }
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
  let tableFileds = ["displayName", "phoneNumber", "state"]

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
      to: "/DB/deliveryBoys/orders",
    },
    {
      Icon: <Feather.Trash2 size={24} />,
      action: async (data: any) => {
        try {
          await deleteDeliveryBoy({ uid: data.id })
          setTableData((prev) => {
            let index = prev.findIndex((item) => item.id == data.id)
            if (index != -1) {
              if (index == 0) {
                return [...prev.slice(1)]
              }
              return [...prev.slice(0, index), ...prev.slice(index + 1)]
            }
            return prev
          })
          alert("deleted successfully")
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
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <div className=" flex-1 flex">
        <Wrapper>
          <ContentTable
            tableData={tableData}
            tableFileds={tableFileds}
            actions={actions}
            headerActions={HeaderActions}
            tableTitle="Delivery Boys"
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
