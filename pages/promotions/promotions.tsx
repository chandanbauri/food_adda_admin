import * as React from "react"
import Wrapper from "../../components/layout"
import firebase from "firebase"
import Link from "next/link"
import Image from "next/image"
import * as Feather from "react-feather"
export default function Promotions() {
  const storageRef = firebase.storage().ref("promotions")
  const [promtions, setPromotions] = React.useState<Array<any>>([])
  const [refresh, setRefresh] = React.useState<boolean>(false)
  const getPromotionBanners = async () => {
    try {
      const res = await storageRef.list()
      // //"RES :", res)
      if (res && res.items) {
        let images = await Promise.all(
          res.items.map(async (item, index) => {
            // console.log(`BANNER ${index}`, item.fullPath)
            return { url: await item.getDownloadURL(), path: item.fullPath }
          })
        )
        //images)
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
  React.useEffect(() => {
    getPromotionBanners().catch((error) => {
      throw error
    })
    return
  }, [refresh])
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
              <Image src={item.url} className="h-full w-full" layout="fill" />
              <div className="absolute bottom-0 px-2 py-2 bg-black bg-opacity-20 w-full flex items-center justify-between">
                <span className="text-white font-bold capitalize">{`baanner ${
                  index + 1
                }`}</span>
                <button
                  onClick={async () => {
                    try {
                      await firebase.storage().ref(item.path).delete()
                      alert("Banner Deleted")
                      setRefresh((prev) => !prev)
                    } catch (error) {
                      console.error(error)
                    }
                  }}
                  className="text-white"
                >
                  <Feather.Trash2 size={24} />
                </button>
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
