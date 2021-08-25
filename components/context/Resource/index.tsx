import * as React from "react"
import { FoodMenuConstructor } from "../../FoodMenu/tools"

type contextProps = {
  foodMenu: FoodMenuConstructor
}
const ResourceContext = React.createContext<contextProps | null>(null)
let foodMenu = new FoodMenuConstructor()

export const ResourceProvider: React.FunctionComponent = ({ children }) => {
  return (
    <ResourceContext.Provider value={{ foodMenu: foodMenu }}>
      {children}
    </ResourceContext.Provider>
  )
}

export const useResource = () => React.useContext(ResourceContext)
