import * as React from "react"
import Wrapper from "../../../components/layout/"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import * as Feather from "react-feather"
import ContentTable from "../../../components/table/restaurant/restaurant-table"
import PopUpContainer from "../../../components/popUp/container"
import { useResource } from "../../../components/context/Resource"
import {
  // askForAcceptingOrder,
  getListOfDeliveryBoys,
  rejectOrder,
} from "../../../utilities/functions"
import DeliveryBoyTable from "../../../components/popUp/delivery-boy"
import { GetServerSideProps } from "next"
import { OrderPageProps } from "../../../interface"
export default function Orders({ session, query }: OrderPageProps) {
  const focusedItem = React.useRef<any>()
  let { type } = query
  const [popUp, setPopUp] = React.useState<boolean>(false)
  let Resource = useResource()
  // const [success, setSuccess] = React.useState<boolean>(false)
  // const [Error, setError] = React.useState<boolean>(false)
  // const [DeliveryBoys, setDeliveryBoys] = React.useState<Array<any>>([])
  const [popUpData, setPopUpData] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(false)
  const [isDeleting, setIsDeleting] = React.useState<boolean>(false)
  const [data, setData] = React.useState<any>({})
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

  const getActions = (type: any) => {
    let actions: Array<any> = []
    switch (type) {
      case "pending":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
          {
            Icon: <Feather.CheckSquare size={24} />,
            action: (data: any) => {
              focusedItem.current = data
              //focusedItem.current)
              setPopUp(true)
            },
          },
          {
            Icon: <Feather.Trash2 size={24} />,
            action: async (data: any) => {
              setPopUp(true)
              setIsDeleting(true)
              setData(data)
            },
          },
        ]
        break
      case "ongoing":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
        ]
        break
      case "rejected":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
        ]
        break
      case "canceled":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
        ]
        break
      case "delivered":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
        ]
        break
    }
    return actions
  }

  const getOrders = () => {
    //Resource?.Orders)
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
      <DeliveryBoyTable
        order={focusedItem.current}
        onAssigning={() => {
          focusedItem.current
          Resource?.setOrders((prev) => {
            let { pending, ...rest } = prev
            let list = pending.filter((item) => item.id != focusedItem.current.id)
            return { ...prev, pending: list }
          })
          window.location.href = "/dashboard"
        }}
      />
    </div>
  )
  React.useEffect(() => {
    getList().catch((error) => {
      throw error
    })
    return
  }, [])
  if (initializing)
    return (
      <Layout title='Not Authenticated'>
        <div className='h-screen w-screen flex items-center justify-center'>
          <h1 className='text-green-500 text-2xl font-bold'>Loading ... </h1>
        </div>
      </Layout>
    )
  if (session)
    return (
      <div className=' flex-1 flex'>
        <Wrapper>
          <PopUpContainer
            trigger={popUp}
            content={
              isDeleting ? (
                <div className='flex flex-col mb-5 text-center'>
                  <h4 className='text-xl font-sans font-bold'>Are you sure ?</h4>
                  <button
                    className='w-full mt-5 bg-red-500 py-2 flex items-center justify-center rounded-lg shadow-xl'
                    onClick={async () => {
                      // deleteTournament().catch((error) => console.error(error))
                      try {
                        setInitializing(true)
                        await rejectOrder({ order: data })
                        if (Resource?.Orders.pending) {
                          let index = Resource?.Orders?.pending?.findIndex(
                            (item, index) => item.id == data.id,
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
                        // setSuccess((prev) => false)
                        setData(null)
                        setIsDeleting(false)
                        setInitializing(false)
                      } catch (error) {
                        // setError((prev) => false)
                      }
                    }}>
                    <span className='text-white font-bold'>Proceed</span>
                  </button>
                </div>
              ) : (
                <PopUpConent />
              )
            }
            onClose={() => {
              setData(null)
              setIsDeleting(false)
              setPopUp(false)
            }}
          />
          <ContentTable
            tableData={getOrders()}
            tableFileds={[
              "paymentMethod",
              "amount",
              "gst",
              "deliveryCharge",
              "restaurantAddress",
              "restaurantName",
              "userName",
              "phone",
              "deliveryAddress",
              "isPickedUp",
              "isDelivered",
              "isRejected",
              "isPending",
              "placedAt",
              "acceptedOn",
              "deliveredOn",
            ]}
            actions={getActions(type)}
            tableTitle={`${type} Orders`}
          />
        </Wrapper>
      </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  try {
    let cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    if (token) {
      const { uid, email } = token
      return {
        props: {
          session: `your email is ${email},and your uid is ${uid}`,
          query: context.query,
        },
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

// {
//  <div className="w-full md:px-4">
//           <h1 className="w-full bg-green-500 py-5 flex items-center justify-center text-white uppercase">{`${type} Orders`}</h1>
//         </div>
// }

// try {
//   setInitializing(true)
//   await rejectOrder({ order: data })
//   if (Resource?.Orders.pending) {
//     let index = Resource?.Orders?.pending?.findIndex(
//       (item, index) => item.id == data.id
//     )
//     if (index !== undefined) {
//       Resource?.setOrders((prev) => ({
//         ...prev,
//         rejected: [...prev.rejected, prev.pending[index]],
//       }))
//       if (index == 0) {
//         Resource?.setOrders((prev) => ({
//           ...prev,
//           pending: [...prev.pending.slice(1)],
//         }))
//       } else if (index == 1) {
//         Resource?.setOrders((prev) => ({
//           ...prev,
//           pending: [
//             ...prev.pending.slice(0, index),
//             ...prev.pending.slice(index + 1),
//           ],
//         }))
//       }
//     }
//   }
//   setSuccess((prev) => false)
//   setInitializing(false)
// } catch (error) {
//   setError((prev) => false)
// }

// const getPopUpActions = (type: any) => {
//   let actions: Array<any> = []
//   switch (type) {
//     case "pending":
//       actions = [
//         {
//           Icon: <Feather.CheckSquare size={24} />,
//           action: async (data: any) => {
//             try {
//               let res = await askForAcceptingOrder({
//                 order: focusedItem.current,
//                 deliveryBoyID: data.uid,
//               })
//             } catch (error) {
//               setPopUp((prev) => false)
//             }
//           },
//         },
//       ]
//       break
//     case "ongoing":
//       actions = []
//       break
//     case "rejected":
//       actions = []
//       break
//     case "canceled":
//       actions = []
//       break
//     case "delivered":
//       actions = []
//       break
//   }
//   return actions
// }
