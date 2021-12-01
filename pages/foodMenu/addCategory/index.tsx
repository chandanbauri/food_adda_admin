import * as React from "react"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import firebase from "firebase"
import * as Feather from "react-feather"
import PopUpContainer from "../../../components/popUp/container"

export default function AddNewCategory({ session }: any) {
  const CategoryCollection = firebase.firestore().collection("categories")
  const [catFormFields, setCatFormFields] = React.useState({
    name: "",
  })
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)

  const closePopUp = () => {
    setError(false)
    setTrigger(false)
    setCatFormFields({ name: "" })
  }
  const Success = () => (
    <div className="h-64 flex flex-col items-center justify-center text-green-500">
      <div>
        <Feather.CheckCircle size={80} />
      </div>
      <h1 className="mt-10 font-bold text-xl">Category</h1>
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
      <h1 className="mt-10 font-bold text-xl">Or</h1>
      <h1 className="font-bold text-xl">May be category already exists</h1>
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
          <h1 className="text-green-500 text-2xl">Add New Category</h1>
          <div className="flex flex-col mt-4 mb-2">
            <label>Cateory Name</label>
            <input
              className="border-2 border-green-500 my-2"
              value={catFormFields.name}
              onChange={(e) => {
                setCatFormFields((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
          </div>
          <div className="flex flex-grow items-center justify-center">
            <button
              onClick={async () => {
                try {
                  let res = await CategoryCollection.where(
                    "name",
                    "==",
                    `${catFormFields.name}`
                  ).get()
                  if (res.size) {
                    setTrigger(true)
                    setError(true)
                  } else {
                    await CategoryCollection.add({
                      name: catFormFields.name,
                    })
                    setTrigger(true)
                    setError(false)
                  }
                } catch (error) {
                  setTrigger(true)
                  setError(true)
                  throw error
                }
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
    // //error)
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  }
}
