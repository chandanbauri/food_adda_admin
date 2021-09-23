import * as React from "react"
import * as Feather from "react-feather"

type props = {
  keys: Array<string>
  info: any
  action: (data: any) => void
  index: number
}

export default function FoodCard({ keys, info, action, index }: props) {
  const isAdded = React.useRef<boolean>(false)
  return (
    <tr className={index % 2 == 0 ? "bg-green-100" : "bg-white"}>
      <td className="px-4 py-2">
        <button
          className={`p-2 rounded ${
            isAdded.current ? "text-green-500" : "text-gray-700"
          }`}
          onClick={() => {
            action(info)
            // setAdded((prev) => !prev)
            isAdded.current = !isAdded.current
            // console.log("I AM WORKING")
          }}
        >
          <Feather.CheckSquare
            size={20}
            color={isAdded.current ? `rgba(16, 185, 129)` : `rgba(55, 65, 81)`}
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
