import * as React from "react"
import OrderCard from "../../components/cards/order"
import Wrapper from "../../components/layout"
import { verifyIdToken } from "../../utilities/firebase_admin"
import { Layout } from "../../components/layout/secondary"
import nookies from "nookies"
import firebase from "firebase"
import { useResource } from "../../components/context/Resource"

export default function Dashboard({ session }: any) {
  const OrdersCollections = firebase.firestore().collection("orders")
  const CompanyFeatureValues = firebase.firestore().collection("Features")
  const [features, setFeatures] = React.useState<any>({})
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const Resource = useResource()
  const updateFeature = async (field: string, value: string) => {
    try {
      setInitializing(true)
      let res = await CompanyFeatureValues.doc("production").get()
      if (!res.exists) {
        await CompanyFeatureValues.doc("production").set({
          [field]: value,
        })
        return
      }
      await CompanyFeatureValues.doc("production").update({
        [field]: value,
      })
      setInitializing(false)
    } catch (error) {
      throw error
    }
  }
  const FeatchFeatures = async () => {
    try {
      let res = await CompanyFeatureValues.doc("production").get()
      if (res.exists) {
        let featchedFeatures = res.data()
        if (featchedFeatures) {
          setFeatures(featchedFeatures)
        }
      }
    } catch (error) {
      console.log("ERROR", error)
    }
  }
  const checkOrder = (id: string, array: Array<any> | undefined): boolean => {
    let index = array?.findIndex((item, index) => item.id == id)
    if (index == -1) {
      return false
    }
    return true
  }
  // const ProcessOrders = (Orders: Array<any>) => {
  //   if (Orders.length) {
  //     Orders.map((item, index) => {
  //       if (item.isPending && !checkOrder(item.id, Resource?.Orders.pending)) {
  //         Resource?.setOrders((prev) => {
  //           // let list = prev.pending
  //           // //prev.pending)
  //           // list.push(item)
  //           return { ...prev, pending: [...prev.pending, item] }
  //         })
  //       } else if (item.isOnGoing && checkOrder(item.id, Resource?.Orders.onGoing)) {
  //         Resource?.setOrders((prev) => {
  //           // let list = prev.pending
  //           // //prev.pending)
  //           // list.push(item)
  //           return { ...prev, delivered: [...prev.delivered, item] }
  //         })
  //       } else if (item.isRejected && checkOrder(item.id, Resource?.Orders.rejected)) {
  //         Resource?.setOrders((prev) => {
  //           // let list = prev.pending
  //           // //prev.pending)
  //           // list.push(item)
  //           return { ...prev, rejected: [...prev.rejected, item] }
  //         })
  //       } else if (item.isCanceled && checkOrder(item.id, Resource?.Orders.canceled)) {
  //         Resource?.setOrders((prev) => {
  //           // let list = prev.pending
  //           // //prev.pending)
  //           // list.push(item)
  //           return { ...prev, canceled: [...prev.canceled, item] }
  //         })
  //       } else if (item.isDelivered && checkOrder(item.id, Resource?.Orders.delivered)) {
  //         Resource?.setOrders((prev) => {
  //           // let list = prev.pending
  //           // //prev.pending)
  //           // list.push(item)
  //           return { ...prev, delivered: [...prev.delivered, item] }
  //         })
  //       }
  //     })
  //   }
  // }
  React.useEffect(() => {
    let Orders = OrdersCollections.onSnapshot((snap) => {
      if (snap.empty) {
        setInitializing(false)
      } else {
        console.log(Resource?.Orders)
        snap.forEach((item) => {
          if (item.data().isPending && !checkOrder(item.id, Resource?.Orders.pending)) {
            Resource?.setOrders((prev) => {
              // let list = prev.pending
              // //prev.pending)
              // list.push(item)
              return {
                ...prev,
                pending: [...prev.pending, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isOnGoing && !checkOrder(item.id, Resource?.Orders.onGoing)) {
            Resource?.setOrders((prev) => {
              // let list = prev.pending
              // //prev.pending)
              // list.push(item)
              return {
                ...prev,
                onGoing: [...prev.delivered, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isRejected && !checkOrder(item.id, Resource?.Orders.rejected)) {
            Resource?.setOrders((prev) => {
              // let list = prev.pending
              // //prev.pending)
              // list.push(item)
              return {
                ...prev,
                rejected: [...prev.rejected, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isCanceled && !checkOrder(item.id, Resource?.Orders.canceled)) {
            Resource?.setOrders((prev) => {
              // let list = prev.pending
              // //prev.pending)
              // list.push(item)
              return {
                ...prev,
                canceled: [...prev.canceled, { id: item.id, ...item.data() }],
              }
            })
          } else if (item.data().isDelivered && !checkOrder(item.id, Resource?.Orders.delivered)) {
            Resource?.setOrders((prev) => {
              // let list = prev.pending
              // //prev.pending)
              // list.push(item)
              if (!checkOrder(item.id, Resource?.Orders.delivered))
                return {
                  ...prev,
                  delivered: [...prev.delivered, { id: item.id, ...item.data() }],
                }
              return prev
            })
          }
        })
        // ProcessOrders(list)
        setInitializing(false)
      }
    })
    return () => {
      Orders()
    }
  }, [])
  React.useEffect(() => {
    FeatchFeatures().catch((error) => {
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
                desc="On going orders Card"
                to="/DB/Orders/ongoing"
              />
              <OrderCard
                title="Rejected"
                qty={Resource?.Orders.rejected.length}
                desc="Rejected orders Card"
                to="/DB/Orders/rejected"
              />
              <OrderCard
                title="Canceled"
                qty={Resource?.Orders.canceled.length}
                desc="Canceled orders Card"
                to="/DB/Orders/canceled"
              />
              <OrderCard
                title="Delivered"
                qty={Resource?.Orders.delivered.length}
                desc="Delivered orders Card"
                to="/DB/Orders/delivered"
              />
            </div>
          )}
          <div className="ml-5">
            <div className="my-5">
              <div className="flex flex-col">
                <label className=" text-lg text-green-500">
                  Delivery Charge (₹)
                </label>
                <input
                  className="border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none"
                  placeholder="Delivery charge"
                  type="number"
                  min={0}
                  value={features ? features.delivery_charge : 0}
                  onChange={(e) => {
                    setFeatures((prev: any) => ({
                      ...prev,
                      delivery_charge: e.target.value,
                    }))
                  }}
                />
              </div>
              <button
                onClick={() =>
                  updateFeature("delivery_charge", features.delivery_charge)
                }
                className="px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl"
              >
                save
              </button>
            </div>
            <div className="my-5">
              <div className="flex flex-col">
                <label className=" text-lg text-green-500 capitalize">
                  GST percentage (%)
                </label>
                <input
                  className="border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none"
                  placeholder="GST Percentage"
                  type="number"
                  min={0}
                  value={features ? features.gst : 0}
                  onChange={(e) => {
                    setFeatures((prev: any) => ({
                      ...prev,
                      gst: e.target.value,
                    }))
                  }}
                />
              </div>
              <button
                onClick={() => updateFeature("gst", features.gst)}
                className="px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl"
              >
                save
              </button>
            </div>
            <div className="my-5">
              <div className="flex flex-col">
                <label className=" text-lg text-green-500">
                  Minimum Order Cost (₹)
                </label>
                <input
                  className="border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none"
                  placeholder="Minimum Order Cost"
                  type="number"
                  min={0}
                  value={features ? features.minimum_order_price : 0}
                  onChange={(e) => {
                    setFeatures((prev: any) => ({
                      ...prev,
                      minimum_order_price: e.target.value,
                    }))
                  }}
                />
              </div>
              <button
                onClick={() =>
                  updateFeature(
                    "minimum_order_price",
                    features.minimum_order_price
                  )
                }
                className="px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl"
              >
                save
              </button>
            </div>
          </div>
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
