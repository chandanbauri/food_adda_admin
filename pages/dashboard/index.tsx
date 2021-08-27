import * as React from "react"
import OrderCard from "../../components/cards/order"
import Wrapper from "../../components/layout"
import { verifyIdToken } from "../../utilities/firebase_admin"
import { Layout } from "../../components/layout/secondary"
import nookies from "nookies"
import firebase from "firebase"
import { OrderTypes, useResource } from "../../components/context/Resource"

export default function Dashboard({ session }: any) {
  const OrdersCollections = firebase.firestore().collection("orders")
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const Resource = useResource()
  const FetchOrders = async () => {
    try {
      let Orders = await OrdersCollections.get()
      if (Orders) {
        let list: Array<any> = []
        Orders.docs.map((item, index) => {
          list.push({ id: item.id, ...item.data() })
        })
        ProcessOrders(list)
        setInitializing(false)
      } else {
        setInitializing(false)
      }
    } catch (error) {
      throw error
    }
  }
  const checkOrder = (id: string, array: Array<any> | undefined): boolean => {
    let index = array?.findIndex((item, index) => item.id == id)
    if (index != -1) {
      return false
    }
    return true
  }
  const ProcessOrders = (Orders: Array<any>) => {
    if (Orders.length) {
      Orders.map((item, index) => {
        if (item.isPending && checkOrder(item.id, Resource?.Orders.pending)) {
          Resource?.setOrders((prev) => {
            // let list = prev.pending
            // console.log(prev.pending)
            // list.push(item)
            return { ...prev, pending: [...prev.pending, item] }
          })
        } else if (
          item.isOnGoing &&
          checkOrder(item.id, Resource?.Orders.onGoing)
        ) {
          Resource?.setOrders((prev) => {
            // let list = prev.pending
            // console.log(prev.pending)
            // list.push(item)
            return { ...prev, delivered: [...prev.delivered, item] }
          })
        } else if (
          item.isRejected &&
          checkOrder(item.id, Resource?.Orders.rejected)
        ) {
          Resource?.setOrders((prev) => {
            // let list = prev.pending
            // console.log(prev.pending)
            // list.push(item)
            return { ...prev, rejected: [...prev.rejected, item] }
          })
        } else if (
          item.isCanceled &&
          checkOrder(item.id, Resource?.Orders.canceled)
        ) {
          Resource?.setOrders((prev) => {
            // let list = prev.pending
            // console.log(prev.pending)
            // list.push(item)
            return { ...prev, canceled: [...prev.canceled, item] }
          })
        } else if (
          item.isDelivered &&
          checkOrder(item.id, Resource?.Orders.delivered)
        ) {
          Resource?.setOrders((prev) => {
            // let list = prev.pending
            // console.log(prev.pending)
            // list.push(item)
            return { ...prev, delivered: [...prev.delivered, item] }
          })
        }
      })
    }
  }
  React.useEffect(() => {
    FetchOrders().catch((error) => {
      throw error
    })
  }, [])

  if (initializing)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <div className="bg-white flex-1 flex">
        <Wrapper>
          {/* <button
          onClick={async () => {
            await assignOrder({
              deliveryBoyID: "asndasndjasdkka",
              orderID: "5SC56nZkTAIwSJAn8Dpq",
            })
              .then((res) => {
                console.log(res)
              })
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          Test
        </button> */}
          {!Resource?.Orders ? (
            <div className="h-64 w-full flex items-center justify-center">
              <h1 className="text-red-500 text-xl">No Orders Available ...</h1>
            </div>
          ) : (
            <div className="flex h-full flex-wrap flex-row items-start justify-start">
              <OrderCard
                title="Pending"
                qty={Resource?.Orders.pending.length}
                desc="Pending orders Card"
                to="/DB/Orders/pending"
              />
              <OrderCard
                title="On Going"
                qty={Resource?.Orders.onGoing.length}
                desc="Pending orders Card"
                to="/DB/Orders/ongoing"
              />
              <OrderCard
                title="Rejected"
                qty={Resource?.Orders.rejected.length}
                desc="Pending orders Card"
                to="/DB/Orders/rejected"
              />
              <OrderCard
                title="Canceled"
                qty={Resource?.Orders.canceled.length}
                desc="Pending orders Card"
                to="/DB/Orders/canceled"
              />
              <OrderCard
                title="Delivered"
                qty={Resource?.Orders.delivered.length}
                desc="Pending orders Card"
                to="/DB/Orders/delivered"
              />
              <button
                onClick={() => {
                  console.log(Resource)
                }}
              >
                log
              </button>
            </div>
          )}
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
