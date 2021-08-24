import * as React from "react"
import FoodMenuItem from "../list"

type MenuContainerProps = {
  title: string
  data: Array<any>
}

const MenuContainer: React.FunctionComponent<MenuContainerProps> = ({
  title,
  data,
}) => {
  return (
    <div className="max-h-96 w-full max-w-md bg-green-100 shadow-xl md:rounded-2xl p-4 scrollBar">
      <h1 className="text-2xl text-gray-800 font-sans">{title}</h1>
      <div className="h-full max-h-80 overflow-y-scroll">
        <div className="pt-1">
          {data.map((item: any, index: number) => (
            <FoodMenuItem key={`item ${index}`} title={`item ${index}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default MenuContainer
