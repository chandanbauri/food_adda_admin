import * as React from "react"
import Wrapper from "../../../components/layout/"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import * as Feather from "react-feather"
import ContentTable from "../../../components/table/restaurant/restaurant-table"
import PopUpContainer from "../../../components/popUp/container"
import firebase from "firebase"
import {
  askForAcceptingOrder,
  getListOfDeliveryBoys,
  rejectOrder,
} from "../../../utilities/functions"
import DeliveryBoyTable from "../../../components/popUp/delivery-boy"
import { GetServerSideProps } from "next"
interface InitOrders {
  pending: Array<any>
  onGoing: Array<any>
  rejected: Array<any>
  canceled: Array<any>
  delivered: Array<any>
}
export default function Orders({ session, type }: any) {
  const firestore = firebase.firestore
  const OrdersCollections = firestore().collection("orders")
  let initOrders: InitOrders = {
    pending: [],
    onGoing: [],
    rejected: [],
    canceled: [],
    delivered: [],
  }
  const [orders, setOrders] = React.useState(() => initOrders)
  const focusedItem = React.useRef<any>()
  const [popUp, setPopUp] = React.useState<boolean>(false)
  const [success, setSuccess] = React.useState<boolean>(false)
  const [Error, setError] = React.useState<boolean>(false)
  const [DeliveryBoys, setDeliveryBoys] = React.useState<Array<any>>([])
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
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
          },
          {
            Icon: <Feather.CheckSquare size={24} />,
            action: (data: any) => {
              focusedItem.current = data
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
      case "rejected":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
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
      case "canceled":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
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
      case "delivered":
        actions = [
          {
            Icon: <Feather.Eye size={24} />,
            isLink: true,
            to: "/DB/Orders/inspect",
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
    }
    return actions
  }

  const getOrders = (type: string) => {
    switch (type) {
      case "pending":
        return orders?.pending
      case "rejected":
        return orders?.rejected
      case "canceled":
        return orders?.canceled
      case "ongoing":
        return orders?.onGoing
      case "delivered":
        return orders?.delivered
    }
  }
  const PopUpConent = () => (
    <div>
      <DeliveryBoyTable
        order={focusedItem.current}
        onAssigning={() => {
          focusedItem.current
          setOrders((prev) => {
            let { pending, ...rest } = prev
            let list = pending.filter((item) => item.id != focusedItem.current.id)
            return { ...prev, pending: list }
          })
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
  const checkOrder = (id: string, array: Array<any> | undefined): boolean => {
    let index = array?.findIndex((item, index) => item.id == id)
    if (index != -1) {
      return false
    }
    return true
  }
  const removePreviousOrderInstance = (id: string) => {
    setOrders((prev) => {
      let { pending, onGoing, delivered, rejected } = prev
      let pendingIndex = pending.findIndex((value, index) => value.id == id)
      let onGoingIndex = onGoing.findIndex((value, index) => value.id == id)
      let deliveredIndex = delivered.findIndex((value, index) => value.id == id)
      let rejectedIndex = rejected.findIndex((value, index) => value.id == id)

      return {
        ...prev,
        pending:
          pendingIndex == -1
            ? pending
            : [...pending.slice(0, pendingIndex), ...pending.slice(pendingIndex + 1)],
        onGoing:
          onGoingIndex == -1
            ? onGoing
            : [...onGoing.slice(0, onGoingIndex), ...pending.slice(onGoingIndex + 1)],
        delivered:
          deliveredIndex == -1
            ? delivered
            : [...delivered.slice(0, deliveredIndex), ...pending.slice(deliveredIndex + 1)],
        rejected:
          rejectedIndex == -1
            ? rejected
            : [...rejected.slice(0, rejectedIndex), ...pending.slice(rejectedIndex + 1)],
      }
    })
  }
  React.useEffect(() => {
    setInitializing(true)
    let Orders = OrdersCollections.onSnapshot((snap) => {
      if (snap.empty) {
        setInitializing(false)
      } else {
        snap.forEach((item) => {
          console.log(item.data())
          removePreviousOrderInstance(item.id)
          if (item.data().isPending && checkOrder(item.id, orders.pending)) {
            setOrders((prev) => {
              return {
                ...prev,
                pending: [...prev.pending, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isOnGoing && checkOrder(item.id, orders.onGoing)) {
            setOrders((prev) => {
              return {
                ...prev,
                onGoing: [...prev.onGoing, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isRejected && checkOrder(item.id, orders.rejected)) {
            setOrders((prev) => {
              return {
                ...prev,
                rejected: [...prev.rejected, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isCanceled && checkOrder(item.id, orders.canceled)) {
            setOrders((prev) => {
              return {
                ...prev,
                canceled: [...prev.canceled, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isDelivered && checkOrder(item.id, orders.delivered)) {
            setOrders((prev) => {
              return {
                ...prev,
                delivered: [...prev.delivered, { id: item.id, ...item.data() }],
              }
            })
          }
        })

        setInitializing(false)
      }
    })
    return () => {
      Orders()
    }
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
          {/* <div className="w-full md:px-4">
            <h1 className="w-full bg-green-500 py-5 flex items-center justify-center text-white uppercase">{`${type} Orders`}</h1>
          </div> */}
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
                        window.location.reload()
                        setSuccess((prev) => false)
                        setData(null)
                        setIsDeleting(false)
                        // setInitializing(false)
                      } catch (error) {
                        setError((prev) => false)
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
            tableData={getOrders(type)}
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
    let { type } = context.query
    const token = await verifyIdToken(cookies.token)
    if (token) {
      const { uid, email } = token
      return {
        props: {
          session: `your email is ${email},and your uid is ${uid}`,
          type,
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
