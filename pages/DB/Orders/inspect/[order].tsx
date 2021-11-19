import firebase from "firebase"
import { useRouter } from "next/router"
import * as React from "react"
import Wrapper from "../../../../components/layout"
import { Layout } from "../../../../components/layout/secondary"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import nookies from "nookies"

export default function InspectOrderScreen() {
  let OrdersCollection = firebase.firestore().collection("orders")
  const [Details, setDetails] = React.useState<any>({})
  const [initializing, setInitializing] = React.useState<boolean>(false)
  let router = useRouter()
  let { order } = router.query
  const calculateTotalCost = (list: Array<any>) => {
    let total = 0
    if (list.length) {
      list.forEach((item) => {
        total = total + item.cost * item.count
      })
    }
    return total
  }
  const fetchOrderDetails = async () => {
    try {
      let { order } = router.query
      let details = await OrdersCollection.doc(`${order}`).get()
      if (details.exists) {
        //console.log(details.data())
        setDetails(details.data())
      }
    } catch (error) {
      throw error
    }
  }
  React.useEffect(() => {
    fetchOrderDetails().catch((error) => {
      throw error
    })
  }, [])
  if (initializing)
    return (
      <Layout title="Not Authenticated">
        <div className="h-screen w-screen flex items-center justify-center">
          <h1 className="text-green-500 text-2xl font-bold">Loading ... </h1>
        </div>
      </Layout>
    )
  return (
    <Wrapper>
      <div className="pt-5 mx-5">
        <div className="flex flex-row items-center">
          <h1 className="text-green-500 text-base ">Order Id:</h1>
          <h1 className="uppercase font-sans text-base ml-4">{`${order}`}</h1>
        </div>
        <h1 className="my-5 text-gray-800 text-2xl font-bold">User Details</h1>
        <div className="">
          <div className="flex flex-row items-start">
            <h1 className="text-green-500 text-base ">Name&nbsp;:</h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${Details.userDetails ? Details.userDetails.name ?? "" : ""}`}
            </h1>
          </div>
          <div className="flex flex-row items-start">
            <h1 className="text-green-500 text-base ">Phone&nbsp;:</h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${Details.userDetails ? Details.userDetails.phone ?? "" : ""}`}
            </h1>
          </div>
          <div className="flex flex-row items-start">
            <h1 className="text-green-500 text-base ">Address&nbsp;:</h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${
                Details.userDetails
                  ? Details.userDetails.deliveryAddress ?? ""
                  : ""
              }`}
            </h1>
          </div>
          <div className="flex flex-row items-center ">
            <h1 className="text-green-500 text-base ">
              Alternate Phone&nbsp;:
            </h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${
                Details.userDetails
                  ? Details.userDetails.alternatePhone ?? "Not Available"
                  : "Not Available"
              }`}
            </h1>
          </div>
        </div>
        <h1 className="my-5 text-gray-800 text-2xl font-bold">
          Restaurant Details
        </h1>
        <div>
          <div className="flex flex-row items-center ">
            <h1 className="text-green-500 text-base ">Name&nbsp;:</h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${
                Details.restaurantDetails
                  ? Details.restaurantDetails.name ?? ""
                  : ""
              }`}
            </h1>
          </div>
          <div className="flex flex-row items-center ">
            <h1 className="text-green-500 text-base ">Address&nbsp;:</h1>
            <h1 className="uppercase font-sans text-base ml-3">
              {`${
                Details.restaurantDetails
                  ? Details.restaurantDetails.address ?? ""
                  : ""
              }`}
            </h1>
          </div>
        </div>
        <h1 className="my-5 text-gray-800 text-2xl font-bold">Cart</h1>
        <div className="lg:max-w-2xl max-w-full">
          {Details.items &&
            Details.items.length > 0 &&
            Details.items.map((item: any, index: number) => (
              <div className="my-2 flex flex-row justify-between" key={index}>
                <div className="flex flex-row items-center ">
                  <h1 className="text-green-500 text-xs lg:text-base ">
                    Name&nbsp;:
                  </h1>
                  <h1 className="uppercase font-sans text-xs lg:text-base ml-3">
                    {`${Details ? item.name ?? "" : ""}`}
                  </h1>
                </div>
                <div className="flex flex-row items-center ">
                  <h1 className="text-green-500 text-xs lg:text-base ">
                    Cost&nbsp;:
                  </h1>
                  <h1 className="uppercase font-sans text-xs lg:text-base ml-3">
                    {`${item ? item.cost ?? 0 : 0} x ${
                      item ? item.count ?? 0 : 0
                    } =  ${((item.cost ?? 0) * (item.count ?? 0)).toFixed(
                      2
                    )} ₹`}
                  </h1>
                </div>
              </div>
            ))}
        </div>
        <div
          className=" flex-grow bg-gray-500 my-2"
          style={{ width: "100%", height: "1px" }}
        />
        <div className="lg:max-w-2xl max-w-full">
          <div className="flex flex-row justify-between">
            <h1 className="text-green-500 text-base">Total Item Price</h1>
            <h1 className="uppercase font-sans text-base ml-3">{`${calculateTotalCost(
              Details.items ?? []
            ).toFixed(2)} ₹`}</h1>
          </div>
        </div>
        <div className="lg:max-w-2xl max-w-full">
          <div className="flex flex-row justify-between">
            <h1 className="text-green-500 text-base">GST</h1>
            <h1 className="uppercase font-sans text-base ml-3">{`${(
              Details.gst ?? 0
            ).toFixed(2)} ₹`}</h1>
          </div>
        </div>
        <div className="lg:max-w-2xl max-w-full">
          <div className="flex flex-row justify-between">
            <h1 className="text-green-500 text-base">Delivery Charge</h1>
            <h1 className="uppercase font-sans text-base ml-3">{` ${
              Details.deliveryCharge
                ? parseInt(Details.deliveryCharge).toFixed(2)
                : ""
            } ₹`}</h1>
          </div>
        </div>
        <div
          className=" flex-grow bg-gray-500 my-2"
          style={{ width: "100%", height: "1px" }}
        />
        <div className="lg:max-w-2xl max-w-full">
          <div className="lg:max-w-2xl max-w-full">
            <div className="flex flex-row justify-between">
              <h1 className="text-green-500 text-base">Grand Total</h1>
              <h1 className="uppercase font-sans text-base ml-3">{` ${(
                calculateTotalCost(Details.items ?? []) +
                parseInt(Details.gst ?? "0") +
                parseInt(Details.deliveryCharge ? Details.deliveryCharge : "0")
              ).toFixed(2)} ₹`}</h1>
            </div>
          </div>
        </div>
      </div>
    </Wrapper>
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
