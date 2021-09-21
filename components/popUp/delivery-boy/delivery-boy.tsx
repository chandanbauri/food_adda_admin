import * as React from "react"
import {
  askForAcceptingOrder,
  getListOfDeliveryBoys,
} from "../../../utilities/functions"
import DeliveryBoyCard from "../../cards/delivery-boy/delivery-boy"

type TableProps = {
  order: any
}

const keys = ["displayName", "phoneNumber"]
export default function DeliveryBoyTable({ order }: TableProps) {
  const [deliveryBoys, setDeliveryBoys] = React.useState<Array<any>>([])
  const [AssignedDeliveryBoys, setADB] = React.useState<Array<any>>([])
  const [initializing, setInitializing] = React.useState<boolean>(false)

  const fetchDeliveryBoyes = async () => {
    setInitializing(true)
    try {
      let res = await getListOfDeliveryBoys()
      if (res) {
        let parsedResponse = JSON.parse(res.data)
        if (parsedResponse.success) {
          let list: Array<any> = parsedResponse.data.map((boy: any) => {
            let index = boy.requests.findIndex(
              (item: any) => item.orderId == order.id
            )
            if (index == -1) {
              return boy
            } else return
          })
          setDeliveryBoys(list.filter((item) => item !== undefined))
          // setInitializing(false)
        } else {
          // setInitializing(false)
          setDeliveryBoys([])
        }
      }
      setInitializing(false)
    } catch (error) {
      console.error("DELIVERY BOYS API", error)
    }
  }

  const assignEveryOneAtOnce = async () => {
    try {
      await Promise.all(
        AssignedDeliveryBoys.map(async (boy) => {
          try {
            await askForAcceptingOrder({
              order: order,
              deliveryBoyID: boy.uid,
            })
          } catch (error) {
            console.error(error)
          }
        })
      )
    } catch (error) {
      console.error(error)
    }
  }
  const addToList = (info: any) => {
    setADB((prev) => {
      let index = prev.findIndex((item) => item.uid == info.uid)
      if (index == -1) {
        return [...prev, info]
      } else {
        if (index == 0) {
          return [...prev.slice(1)]
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      }
    })
  }

  React.useEffect(() => {
    fetchDeliveryBoyes().catch((error) => console.error(error))
  }, [])
  if (initializing)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Please wait ...</h1>
      </div>
    )
  return (
    <div>
      <div className="flex flex-grow justify-between items-center text-green-600 sticky top-0 bg-white">
        <h1 className="py-4 text-lg ">Assign Order</h1>
      </div>
      <div className="w-full overflow-x-scroll">
        <div>
          <table className="w-full table-auto shadow-xl">
            <thead>
              <tr className="bg-green-500 z-10">
                <th>
                  <span className="text-white capitalize">actions</span>
                </th>
                {keys.map((key, index) => (
                  <th key={index} className="px-4 py-4 capitalize">
                    <span className="text-white">{key}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {deliveryBoys.length &&
                deliveryBoys.map((info, index) => (
                  <DeliveryBoyCard
                    key={index}
                    index={index}
                    keys={keys}
                    info={info}
                    action={addToList}
                  />
                ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full my-3 flex items-center justify-center">
        <button
          className="px-4 py-2 bg-green-500 rounded shadow-xl w-full"
          onClick={async () => {
            console.log("ORDER INFO", order)
            console.log("ASSIGNED LIST", AssignedDeliveryBoys)
            try {
              console.log("ASSGINING ....")
              await assignEveryOneAtOnce()
              console.log("ASSGINMENT COMPLETE")
            } catch (error) {
              console.error(error)
            }
          }}
        >
          <span className="text-white">Assign</span>
        </button>
      </div>
    </div>
  )
}
