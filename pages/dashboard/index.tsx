import * as React from "react"
import nookies from "nookies"
import { verifyIdToken } from "../../utilities/firebase_admin"
import firebase from "firebase"
import Wrapper from "../../components/layout"
import OrderCard from "../../components/cards/order"
import { GetServerSideProps } from "next"

interface DASHBOARD_SCREEN_PROPS {
  session: string
}

interface InitOrders {
  pending: Array<any>
  onGoing: Array<any>
  rejected: Array<any>
  canceled: Array<any>
  delivered: Array<any>
}

export default function DashboardScreen({ session }: DASHBOARD_SCREEN_PROPS) {
  const firestore = firebase.firestore
  const OrdersCollections = firestore().collection("orders")
  const CompanyFeatureValues = firestore().collection("Features")
  const [features, setFeatures] = React.useState<any>({})
  const [initializing, setInitializing] = React.useState<boolean>(() => true)
  let initOrders: InitOrders = {
    pending: [],
    onGoing: [],
    rejected: [],
    canceled: [],
    delivered: [],
  }
  const [orders, setOrders] = React.useState(() => initOrders)

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
  React.useEffect(() => {
    let Orders = OrdersCollections.onSnapshot((snap) => {
      if (snap.empty) {
        setInitializing(false)
      } else {
        snap.forEach((item) => {
          console.log(item.data())
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
  React.useEffect(() => {
    FeatchFeatures().catch((error) => {
      throw error
    })
  }, [])
  if (initializing)
    return (
      <div className='h-screen w-screen flex items-center justify-center'>
        <h1 className='text-green-500 text-xl'>Loading ...</h1>
      </div>
    )
  if (session)
    return (
      <div className='bg-white flex-1 flex'>
        <Wrapper>
          {/* <button
            onClick={async () => {
              await assignOrder({
                deliveryBoyID: "asndasndjasdkka",
                orderID: "5SC56nZkTAIwSJAn8Dpq",
              })
                .then((res) => {
                  //res)
                })
                .catch((error) => {
                  //error)
                })
            }}
          >
            Test
          </button> */}
          {!orders ? (
            <div className='h-64 w-full flex items-center justify-center'>
              <h1 className='text-red-500 text-xl'>No Orders Available ...</h1>
            </div>
          ) : (
            <div className='flex h-full flex-wrap flex-row items-start justify-start'>
              <OrderCard
                title='Pending'
                qty={orders.pending.length}
                desc='Pending orders Card'
                to='/DB/Orders/pending'
              />
              <OrderCard
                title='On Going'
                qty={orders.onGoing.length}
                desc='On going orders Card'
                to='/DB/Orders/ongoing'
              />
              <OrderCard
                title='Rejected'
                qty={orders.rejected.length}
                desc='Rejected orders Card'
                to='/DB/Orders/rejected'
              />
              <OrderCard
                title='Delivered'
                qty={orders.delivered.length}
                desc='Delivered orders Card'
                to='/DB/Orders/delivered'
              />
            </div>
          )}
          <div className='ml-5'>
            <div className='my-5'>
              <div className='flex flex-col'>
                <label className=' text-lg text-green-500'>Delivery Charge (₹)</label>
                <input
                  className='border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none'
                  placeholder='Delivery charge'
                  type='number'
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
                onClick={() => updateFeature("delivery_charge", features.delivery_charge)}
                className='px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl'>
                save
              </button>
            </div>
            <div className='my-5'>
              <div className='flex flex-col'>
                <label className=' text-lg text-green-500 capitalize'>GST percentage (%)</label>
                <input
                  className='border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none'
                  placeholder='GST Percentage'
                  type='number'
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
                className='px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl'>
                save
              </button>
            </div>
            <div className='my-5'>
              <div className='flex flex-col'>
                <label className=' text-lg text-green-500'>Minimum Order Cost (₹)</label>
                <input
                  className='border-green-500 border-2 md:h-12 h-10 mt-2 w-52 rounded-lg pl-10 pr-2 focus:border-blue-500 outline-none'
                  placeholder='Minimum Order Cost'
                  type='number'
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
                onClick={() => updateFeature("minimum_order_price", features.minimum_order_price)}
                className='px-10 py-1 bg-blue-500 rounded-lg text-white capitalize mt-5 shadow-xl'>
                save
              </button>
            </div>
          </div>
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
