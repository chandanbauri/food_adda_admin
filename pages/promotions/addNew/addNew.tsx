import * as React from "react"
import Wrapper from "../../../components/layout"
import firebase from "firebase"
import Image from "next/image"
export default function AddNewPromotion() {
  const [image, setImage] = React.useState<any>(null)
  const [previewImage, setPreviewImage] = React.useState<any>(null)
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

  const uploadToFirebase = () => {
    //1.
    if (image) {
      //2.
      // setImage((prev: any) => {
      //   return { ...prev, ["name"]: "promotion1" }
      // })
      //image.name)
      const storageRef = firebase.storage().ref()
      //3.
      const imageRef = storageRef.child(`promotions/${image.name}`)
      //4.
      imageRef
        .put(image)
        //5.
        .then(() => {
          setImage(null)
          alert("Image uploaded successfully to Firebase.")
        })
    } else {
      alert("Please upload an image first.")
    }
  }
  return (
    <Wrapper>
      <div className="pt-10 flex items-center  flex-col">
        <div className=" bg-green-50 h-52 max-w-max rounded overflow-hidden relative outline-none">
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
              {previewImage ? "change" : "choose an image"}
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
        <div>
          <button
            className="px-14 py-2 bg-green-500 mt-5 rounded shadow-lg"
            onClick={() => {
              uploadToFirebase()
            }}
          >
            <span className="text-white capitalize"> upload</span>
          </button>
        </div>
      </div>
    </Wrapper>
  )
}
