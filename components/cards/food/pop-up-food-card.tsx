import * as React from "react"
import * as Feather from "react-feather"

type props = {
  keys: Array<string>
  info: any
  action: (data: any) => void
  index: number
}

export default function PopUpFoodCard({ keys, info, action, index }: props) {
  const [isAdded, setAdded] = React.useState<boolean>(false)
  //   let isAdded = React.useRef<boolean>(false)
  const changeState = () => {
    console.log("I AM WORKING")
    setAdded((prev) => !prev)
    action(info)
    console.log("I AM WORKING")
  }
  return (
    <tr className={index % 2 == 0 ? "bg-green-100" : "bg-white"}>
      <td className="px-4 py-2">
        <button
          className={
            "p-4 rounded" + (isAdded ? "text-green-500" : "text-gray-700")
          }
          onClick={() => {
            // isAdded.current = !isAdded.current

            changeState()
            // //console.log("I AM WORKING")
          }}
        >
          <Feather.CheckSquare
            size={20}
            color={isAdded ? "rgba(16, 185, 129)" : "rgba(55, 65, 81)"}
          />
        </button>
      </td>
      {keys.map((key, index) => (
        <td key={index} className="px-4 py-2">
          <div className="flex items-center justify-center text-xs">
            {info[key]}
          </div>
        </td>
      ))}
    </tr>
  )
}
