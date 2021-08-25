import * as React from "react"
import MenuContainer from "../../../components/FoodMenu/Container"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import { useResource } from "../../../components/context/Resource"

export default function AddNewCategory({ session }: any) {
  const Resource = useResource()
  const [catFormFields, setCatFormFields] = React.useState({
    name: "",
  })
  const [FoodFormFields, setFoodFormFields] = React.useState({
    name: "",
    id: "",
    desc: "",
  })
  function handleHoursInput(e: any) {
    // let newEdit = { ...editing };

    // newEdit.hours = e.target.value;
    // setEditing(newEdit);
    setFoodFormFields((prev) => ({ ...prev, desc: e.target.value }))
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
          <div className="flex flex-col mt-4 mb-2">
            <label>Food Name</label>
            <input
              className="border-2 border-green-500 my-2"
              value={FoodFormFields.name}
              onChange={(e) => {
                setFoodFormFields((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }}
            />
          </div>
          <div className="flex flex-col mt-4 mb-2">
            <label>Food Description</label>
            <textarea
              className="border-2 border-green-500 my-2"
              //value={FoodFormFields.desc}
              onChange={handleHoursInput}
            />
          </div>
          <div className="flex flex-grow items-center justify-center">
            <button
              onClick={() => {
                Resource?.foodMenu.addCategory(catFormFields.name, [
                  {
                    name: FoodFormFields.name,
                    id: `${catFormFields.name}/${FoodFormFields.name}`,
                    desc: FoodFormFields.desc,
                  },
                ])
                console.log(Resource?.foodMenu.displayFoods())
              }}
            >
              <div className="py-2 px-10 bg-green-500 shadow-md rounded-md">
                <h1 className="text-white">Save</h1>
              </div>
            </button>
          </div>
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
