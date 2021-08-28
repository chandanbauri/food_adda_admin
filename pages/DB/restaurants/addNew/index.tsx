import * as React from "react"
import nookies from "nookies"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import Wrapper from "../../../../components/layout"
import { Layout } from "../../../../components/layout/secondary"
import { createNewDeliveryPartner } from "../../../../utilities/functions"
import PopUpContainer from "../../../../components/popUp/container"
import * as Feather from "react-feather"
import firebase from "firebase"
import ContentTable from "../../../../components/table"

export default function AddNewRestaurant({ session }: any) {
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)
  const CategoriesCollection = firebase.firestore().collection("categories")
  const [foodList, setFoodList] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  const [basket, setBasket] = React.useState<Array<any>>([])
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
    setBasket([])
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

  const getFood = async () => {
    try {
      let list: Array<any> = []
      let FoodList: Array<any> = []
      let res = await CategoriesCollection.get()
      if (res.size) {
        res.docs.map((item) => {
          list.push({ ...item.data(), id: item.id })
        })
        list.map(async (item, index) => {
          let response = await CategoriesCollection.doc(item.id)
            .collection("foods")
            .get()
          if (response.size) {
            response.docs.map((item) => {
              FoodList.push({ ...item.data(), id: item.id })
            })
          }
          if (index == list.length - 1) setInitializing(false)
        })
        console.log(FoodList)
        setFoodList(FoodList)
      }
    } catch (error) {
      setInitializing(false)
      throw error
    }
  }
  const actions = [
    {
      Icon: <Feather.Plus />,
      action: (data: any) => {
        setBasket((prev) => [...prev, data])
      },
    },
  ]
  React.useEffect(() => {
    getFood().catch((error) => {
      throw error
    })
    return
  }, [])

  if (initializing)
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Loading ...</h1>
      </div>
    )
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

          <ContentTable
            tableData={foodList}
            tableFileds={["category", "name", "desc", "cost"]}
            tableTitle="Food List"
            actions={actions}
          />

          <div className="flex flex-grow items-center justify-center">
            <button
              onClick={async () => {
                try {
                  let res = await RestaurantCollection.add(app)
                  if (res) {
                    basket.map(async (item, index) => {
                      await RestaurantCollection.doc(res.id)
                        .collection("foods")
                        .add(item)
                      if (index === basket.length - 1) {
                        setTrigger(true)
                        setError(false)
                      }
                    })
                  }
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
