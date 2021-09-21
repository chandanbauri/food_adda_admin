import * as React from "react"
import * as Feather from "react-feather"

type props = {
  keys: Array<string>
  info: any
  action: (data: any) => void
  index: number
}

export default function DeliveryBoyCard({ keys, info, action, index }: props) {
  const [isAdded, setAdded] = React.useState<boolean>(false)
  return (
    <tr className={index % 2 == 0 ? "bg-green-100" : "bg-white"}>
      <td className="px-4 py-2">
        <button
          className={`p-2 rounded ${
            isAdded ? "text-green-500" : "text-gray-700"
          }`}
          onClick={() => {
            action(info)
            setAdded((prev) => !prev)
          }}
        >
          <Feather.CheckSquare size={24} />
        </button>
      </td>
      {keys.map((key, index) => (
        <td key={index} className="px-4 py-2">
          <div className="flex items-center justify-center">{info[key]}</div>
        </td>
      ))}
    </tr>
  )
}
