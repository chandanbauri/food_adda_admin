import * as React from "react"
import Wrapper from "../../components/layout"
import firebase from "firebase"
import Link from "next/link"
import Image from "next/image"
export default function Promotions() {
  const storageRef = firebase.storage().ref("promotions")
  const [promtions, setPromotions] = React.useState<Array<string>>([])
  const getPromotionBanners = async () => {
    try {
      const res = await storageRef.list()
      // console.log("RES :", res)
      if (res && res.items) {
        let images = await Promise.all(
          res.items.map(async (item, index) => {
            return await item.getDownloadURL()
          })
        )
        console.log(images)
        setPromotions(images)
      }
    } catch (error) {
      throw error
    }
  }
  React.useEffect(() => {
    getPromotionBanners().catch((error) => {
      throw error
    })
    return
  }, [])
  return (
    <Wrapper>
      <div className="mt-16 px-2">
        <div>
          <h1 className="text-xl text-green-500 font-bold ">Promotions</h1>
        </div>
        {promtions && promtions.length ? (
          promtions.map((item, index) => (
            <div
              key={index}
              className="w-full h-40 my-5 relative rounded-md overflow-hidden"
            >
              <Image src={item} className="h-full w-full" layout="fill" />
              <div className="absolute bottom-0 pl-2 py-2 bg-black bg-opacity-20 w-full">
                <span className="text-white font-bold capitalize">{`baanner ${
                  index + 1
                }`}</span>
              </div>
            </div>
          ))
        ) : (
          <span className="text-red-500"> No Promotions Available</span>
        )}
        <Link href="/promotions/addNew">
          <button
            className="px-14 py-2 bg-green-500 rounded shadow-xl"
            // onClick={() => getPromotionBanners()}
          >
            <span className="text-white">Add One more</span>
          </button>
        </Link>
      </div>
    </Wrapper>
  )
}
