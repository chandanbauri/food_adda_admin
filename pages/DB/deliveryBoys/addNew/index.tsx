import * as React from "react"
import nookies from "nookies"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import Wrapper from "../../../../components/layout"
import { Layout } from "../../../../components/layout/secondary"
import { createNewDeliveryPartner } from "../../../../utilities/functions"
import PopUpContainer from "../../../../components/popUp/container"
import * as Feather from "react-feather"

export default function AddNewDeliveryBoy({ session }: any) {
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)
  let initialState = {
    // email: "user@example.com",
    // emailVerified: false,
    // phoneNumber: "+11234567890",
    // password: "secretPassword",
    // displayName: "John Doe",
    // photoURL: "http://www.example.com/12345678/photo.png",
    // disabled: false,
    email: "",
    emailVerified: false,
    phoneNumber: "",
    password: "",
    displayName: "",
    photoURL: "",
    disabled: false,
  }
  const [app, setApp] = React.useState(initialState)
  let fields = [
    {
      label: "Name",
      name: "displayName",
      value: app.displayName,
    },
    {
      label: "Email",
      name: "email",
      value: app.email,
    },
    { label: "Phone Number", name: "phoneNumber", value: app.phoneNumber },
    {
      label: "Password",
      name: "password",
      value: app.password,
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
      <h1 className="mt-10 font-bold text-xl">Delivery Partner</h1>
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
          <h1 className="text-green-500 text-2xl">Add New Delivery Boy</h1>
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
                  let res = await createNewDeliveryPartner(app)
                  if (res) {
                    setTrigger(true)
                    setError(false)
                  } else {
                    setTrigger(true)
                    setError(true)
                  }
                } catch (error) {
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
