import * as React from "react"
import nookies from "nookies"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import Wrapper from "../../../../components/layout"
import { Layout } from "../../../../components/layout/secondary"
import { createNewDeliveryPartner } from "../../../../utilities/functions"
import PopUpContainer from "../../../../components/popUp/container"
import * as Feather from "react-feather"
import firebase from "firebase"

export default function AddNewRestaurant({ session }: any) {
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)
  let initialState = {
    // email: "",
    // emailVerified: false,
    // phoneNumber: "",
    // password: "",
    // displayName: "",
    // photoURL: "",
    //   disabled: false,
    restaurantName: "",
    phone: "",
    address: "",
    preparationDuration: "",
  }
  const [app, setApp] = React.useState(initialState)
  let fields = [
    {
      label: "Restaurant Name",
      name: "restaurantName",
      value: app.restaurantName,
    },
    {
      label: "Phone",
      name: "phone",
      value: app.phone,
    },
    {
      label: "Preparation Duration (in minutes)",
      name: "preparationDuration",
      value: app.preparationDuration,
    },
    {
      label: "Full Address",
      name: "address",
      value: app.address,
    },
  ]
  let handleText = (name: string) => (e: any) => {
    // setCatFormFields((prev) => ({
    //   ...prev,
    //   name: e.target.value,
    // }))
    console.log(e.target.value)
    setApp((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const closePopUp = () => {
    setError(false)
    setTrigger(false)
    setApp(initialState)
  }
  const Success = () => (
    <div className="h-64 flex flex-col items-center justify-center text-green-500">
      <div>
        <Feather.CheckCircle size={80} />
      </div>
      <h1 className="mt-10 font-bold text-xl">Restaurant</h1>
      <h1 className="font-bold text-xl"> Added Successfully</h1>
    </div>
  )
  const Failure = () => (
    <div className="h-64 flex flex-col items-center justify-center text-red-500">
      <div>
        <Feather.XCircle size={80} />
      </div>
      <h1 className="mt-10 font-bold text-xl">Something</h1>
      <h1 className="font-bold text-xl">Went wrong</h1>
    </div>
  )
  const PopUpContent = () => {
    if (!error) return <Success />
    return <Failure />
  }

  if (session)
    return (
      <Wrapper>
        <div className="w-full px-4 mt-5 box-border">
          <h1 className="text-green-500 text-2xl">Add New Restaurant</h1>
          {fields.map((item, index) => (
            <div className="flex flex-col mt-4 mb-2" key={index}>
              <label className="capitalize">{item.label}</label>
              <input
                className="border-2 border-green-500 my-2"
                value={item.value || ""}
                onChange={handleText(item.name)}
              />
            </div>
          ))}

          <div className="flex flex-grow items-center justify-center">
            <button
              onClick={async () => {
                try {
                  await RestaurantCollection.add(app)
                  setTrigger(true)
                  setError(false)
                } catch (error) {
                  setTrigger(true)
                  setError(true)
                  throw error
                }
                // setTrigger(true)
              }}
            >
              <div className="py-2 px-10 bg-green-500 shadow-md rounded-md">
                <h1 className="text-white">Save</h1>
              </div>
            </button>
          </div>
          <PopUpContainer
            trigger={trigger}
            content={<PopUpContent />}
            onClose={closePopUp}
          />
        </div>
      </Wrapper>
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
