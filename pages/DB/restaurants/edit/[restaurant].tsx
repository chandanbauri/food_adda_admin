import * as React from "react"
import nookies from "nookies"
import { verifyIdToken } from "../../../../utilities/firebase_admin"
import Wrapper from "../../../../components/layout"
import { Layout } from "../../../../components/layout/secondary"
// import { createNewDeliveryPartner } from "../../../../utilities/functions"
import PopUpContainer from "../../../../components/popUp/container"
import * as Feather from "react-feather"
import firebase from "firebase"
// import ContentTable from "../../../../components/table"
import Image from "next/image"
import TimeField from "react-simple-timefield"
import { useRouter } from "next/router"
import FoodTable from "../../../../components/table/food-table/food-table"
let initialState = {
  restaurantName: "",
  phone: "",
  address: "",
  preparationDuration: "",
  opening: "00:00",
  closing: "00:00",
}
export default function EditRestaurant({ session }: any) {
  const { restaurant, restaurantName } = useRouter().query
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  // const CategoriesCollection = firebase.firestore().collection("categories")
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)
  // const [foodList, setFoodList] = React.useState<Array<any>>([])
  // const [restaurantFoodList, setRestaurantFoodList] = React.useState<
  //   Array<any>
  // >([])
  const [initializing, setInitializing] = React.useState<boolean>(true)
  // const [basket, setBasket] = React.useState<Array<any>>([])
  const [tags, setTags] = React.useState<Array<any>>([])
  const [tag, setTag] = React.useState<any>()
  const [image, setImage] = React.useState<any>(null)
  let imageURL = React.useRef<string>("")
  // let openingRef = React.useRef(null)
  // let closingRef = React.useRef(null)
  const [previewImage, setPreviewImage] = React.useState<any>(null)
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
    setApp((prev) => ({ ...prev, [name]: e.target.value }))
  }
  const closePopUp = () => {
    setError(false)
    setTrigger(false)
    setApp(initialState)
    // setBasket([])
  }

  const onImageChange = (e: any) => {
    const reader = new FileReader()
    let file = e.target.files[0] // get the supplied file
    // if there is a file, set image to that file
    if (file) {
      reader.onload = () => {
        if (reader.readyState === 2) {
          //file)
          setImage(file)
          setPreviewImage(reader.result)
        }
      }
      reader.readAsDataURL(e.target.files[0])
      // if there is no file, set image back to null
    } else {
      setImage(null)
      setPreviewImage(null)
    }
  }
  const uploadToFirebase = async () => {
    if (!image && previewImage) {
    } else if ((image && previewImage) || (image && !previewImage)) {
      try {
        const storageRef = firebase.storage().ref()
        const imageRef = storageRef.child(`restaurant/${image.name}`)
        let snap = await imageRef.put(image)
        imageURL.current = await snap.ref.getDownloadURL()
        setImage(null)
        setPreviewImage(null)
      } catch (error) {
        throw error
      }
    } else if (!previewImage && !image) {
      throw alert("Please upload an image first.")
    }
  }

  const PopUpContent = () => {
    if (!error) return <Success />
    return <Failure />
  }
  const RemoveType = (text: string) => {
    setTags((prev) => {
      let list = prev.filter((item) => item != text)
      return list
    })
  }
  const Chips = ({ text }: any) => (
    <div className="pl-3 py-2 bg-purple-500 rounded-full m-2 flex items-center justify-between">
      <span className="text-white text-xs">{text}</span>
      <div className="px-3 text-white" onClick={() => RemoveType(text)}>
        <Feather.X size={18} />
      </div>
    </div>
  )

  // const getRestaurantFood = async () => {
  //   try {
  //     let list: Array<any> = []
  //     let FoodList: Array<any> = []
  //     let res = await RestaurantCollection.doc(restaurant?.toString())
  //       .collection("foods")
  //       .get()
  //     if (res.size) {
  //       FoodList = res.docs.map((item) => ({
  //         ...item.data(),
  //         irid: item.id,
  //       }))
  //     }
  //     //console.log(`RESTAURANT ${restaurant} FOOD`, FoodList)
  //     setRestaurantFoodList(FoodList)
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const getRestaurantDetails = async () => {
    setInitializing(true)
    try {
      let res = await RestaurantCollection.doc(restaurant?.toString()).get()
      if (res.exists && res.data()) {
        let data = res.data()
        initialState.restaurantName = data?.restaurantName
        initialState.address = data?.address
        initialState.phone = data?.phone
        initialState.closing = data?.closing
        initialState.opening = data?.opening
        initialState.preparationDuration = data?.preparationDuration
        if (data?.image) {
          setPreviewImage(data.image)
          imageURL.current = data.image
        }
        if (data?.tags.length) setTags(data?.tags)
        //console.log(`RESTAURANT ${restaurant} DETAILS`, res.data())
      }
      setInitializing(false)
    } catch (error) {
      setInitializing(false)
      console.error(error)
    }
  }
  // const actions = [
  //   {
  //     Icon: <Feather.Plus />,
  //     action: (data: any) => {
  //       setBasket((prev) => [...prev, data])
  //     },
  //   },
  // ]

  React.useEffect(() => {
    getRestaurantDetails().catch((error) => console.log(error))
  }, [])
  // React.useEffect(() => {
  //   getFood().catch((error) => {
  //     throw error
  //   })
  //   return
  // }, [])
  // React.useEffect(() => {
  //   getRestaurantFood().catch((error) => console.error(error))
  // }, [])

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
          <h1 className="text-green-500 text-2xl">{`Update Restaurant`}</h1>
          <h1 className="text-green-500 text-xl">{restaurantName}</h1>
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
          <div className="flex flex-col mt-4 mb-2">
            <label className="capitalize">Restaurant Types</label>
            <textarea
              className="border-2 border-green-500 my-2"
              value={tag}
              onChange={(e) => {
                setTag(e.target.value)
              }}
            />
            <div className="flex flex-row items-center justify-start flex-wrap">
              {tags.map((item, index) => (
                <Chips text={item} key={index} />
              ))}
            </div>
          </div>
          <div className=" my-3">
            <button
              className="px-14 py-2 bg-green-500 shadow-xl rounded"
              onClick={() => {
                if (tag != "") {
                  setTags((prev) => {
                    let list = [...prev, tag.replace("\n", "")]
                    //list)
                    return Array.from(new Set(list))
                  })
                  setTag("")
                }
              }}
            >
              <span className=" capitalize text-white">add type</span>
            </button>
          </div>
          <div className="flex justify-between md:flex-row flex-col">
            <div className="flex flex-col">
              <label>Opens at</label>
              <TimeField
                value={app.opening}
                onChange={(event, value) => {
                  setApp((prev) => ({ ...prev, opening: value }))
                }}
                input={
                  <input
                    type="text"
                    className="border-2 border-green-500 my-2 px-2 py-1"
                  />
                }
                colon=":"
                showSeconds={false}
              />
            </div>
            <div className="flex flex-col">
              <label>Closes At</label>
              <TimeField
                value={app.closing}
                onChange={(event, value) => {
                  setApp((prev) => ({ ...prev, closing: value }))
                }}
                input={
                  <input
                    type="text"
                    className="border-2 border-green-500 my-2 px-2 py-1"
                  />
                }
                colon=":"
                showSeconds={false}
              />
            </div>
          </div>
          <div className=" bg-green-50 h-52 w-full sm:max-w-max rounded overflow-hidden relative outline-none my-10">
            <div className="absolute top-0 left-0 right-0 bottom-0 outline-none">
              {previewImage != null && (
                <Image
                  src={previewImage}
                  className="h-full w-full"
                  layout="fill"
                />
              )}
            </div>
            <div className="absolute bottom-0 w-full bg-black bg-opacity-25 px-2 box-border py-3 outline-none">
              <span className="text-white capitalize">
                {previewImage ? "change" : "upload Restaurant image"}
              </span>
            </div>
            <input
              type="file"
              className="opacity-0 h-full w-full z-20 outline-none"
              accept="image/x-png,image/jpeg"
              onChange={(e) => {
                onImageChange(e)
              }}
            />
          </div>

          <div className="flex flex-grow items-center justify-center my-5">
            <button
              onClick={async () => {
                // //app)
                try {
                  await uploadToFirebase()
                  if (imageURL.current !== "") {
                    //console.log()
                    await RestaurantCollection.doc(
                      restaurant?.toString()
                    ).update({
                      ...app,
                      tags,
                      image: imageURL.current,
                    })
                    // if (res) {
                    //   await Promise.all(
                    //     basket.map(async (item, index) => {
                    //       await RestaurantCollection.doc(res.id)
                    //         .collection("foods")
                    //         .add(item)
                    //       if (index === basket.length - 1) {
                    //         setTrigger(true)
                    //         setError(false)
                    //       }
                    //     })
                    //   )
                    // }
                    setTrigger(true)
                    setError(false)
                    setTags([])
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
          {/* <ContentTable
            tableData={restaurantFoodList}
            tableFileds={["category", "name", "desc", "cost"]}
            tableTitle={`Food list of ${restaurantName}`}
            actions={actions}
          /> */}

          <FoodTable restaurant={restaurant} isEditMode={true} />

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
