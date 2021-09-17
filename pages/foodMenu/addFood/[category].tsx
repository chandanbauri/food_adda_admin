import * as React from "react"
import Wrapper from "../../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../../utilities/firebase_admin"
import { Layout } from "../../../components/layout/secondary"
import { useRouter } from "next/router"
import ContentTable from "../../../components/table"
import { useResource } from "../../../components/context/Resource"
import { GetStaticPaths } from "next"
import * as Feather from "react-feather"
import PopUpContainer from "../../../components/popUp/container"
import firebase from "firebase"
import Image from "next/image"
export default function AddNewFood({ session }: any) {
  const router = useRouter()
  const { category, name } = router.query
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [error, setError] = React.useState<boolean>(true)
  let CategoriesCollection = firebase.firestore().collection("categories")
  const [image, setImage] = React.useState<any>(null)
  let imageURL = React.useRef<string>("")
  const [previewImage, setPreviewImage] = React.useState<any>(null)
  let initialState = {
    // email: "user@example.com",
    // emailVerified: false,
    // phoneNumber: "+11234567890",
    // password: "secretPassword",
    // displayName: "John Doe",
    // photoURL: "http://www.example.com/12345678/photo.png",
    // disabled: false,
    name: "",
    desc: "",
    cost: "",
  }
  const [app, setApp] = React.useState(initialState)
  let fields = [
    {
      label: "Name",
      name: "name",
      value: app.name,
    },
    {
      label: "Description",
      name: "desc",
      value: app.desc,
    },
    {
      label: "Cost",
      name: "cost",
      value: app.cost,
    },
  ]
  let handleText = (name: string) => (e: any) => {
    // setCatFormFields((prev) => ({
    //   ...prev,
    //   name: e.target.value,
    // }))
    //e.target.value)
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
      <h1 className="mt-10 font-bold text-xl">Food Item</h1>
      <h1 className="font-bold text-xl">Added Successfully</h1>
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
      <h1 className="font-bold text-xl">The Food Item already exists</h1>
    </div>
  )
  const PopUpContent = () => {
    if (!error) return <Success />
    return <Failure />
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
    if (image) {
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
    } else {
      throw alert("Please upload an image first.")
    }
  }
  if (session)
    return (
      <Wrapper>
        <div className="w-full px-4 mt-5 box-border">
          <h1 className="text-green-500 text-2xl">Add new item to {name}</h1>
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
          <div className="flex flex-grow items-center justify-center">
            <button
              onClick={async () => {
                try {
                  await uploadToFirebase()
                  if (typeof category == "string") {
                    let res = await CategoriesCollection.doc(category)
                      .collection("foods")
                      .where("name", "==", app.name)
                      .get()

                    if (res.size) {
                      setError(true)
                      setTrigger(true)
                    } else {
                      await CategoriesCollection.doc(category)
                        .collection("foods")
                        .add({
                          ...app,
                          category: name,
                          image: imageURL.current,
                        })
                      setError(false)
                      setTrigger(true)
                    }
                  }
                } catch (error) {
                  setError(true)
                  setTrigger(true)
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
