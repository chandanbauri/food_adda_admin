import * as React from "react"
import { FoodMenuConstructor } from "../../FoodMenu/tools"

export type OrderTypes = {
  pending: Array<any>
  onGoing: Array<any>
  rejected: Array<any>
  canceled: Array<any>
  delivered: Array<any>
}
type contextProps = {
  foodMenu: FoodMenuConstructor
  Orders: OrderTypes
  setOrders: React.Dispatch<React.SetStateAction<OrderTypes>>
}

const ResourceContext = React.createContext<contextProps | null>(null)
let foodMenu = new FoodMenuConstructor()

export const ResourceProvider: React.FunctionComponent = ({ children }) => {
  let initOrders: OrderTypes = {
    pending: [],
    onGoing: [],
    rejected: [],
    canceled: [],
    delivered: [],
  }
  let [Orders, setOrders] = React.useState<OrderTypes>(initOrders)
  return (
    <ResourceContext.Provider
      value={{
        foodMenu: foodMenu,
        Orders,
        setOrders,
      }}
    >
      {children}
    </ResourceContext.Provider>
  )
}

export const useResource = () => React.useContext(ResourceContext)
