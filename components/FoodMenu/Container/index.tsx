import Link from "next/link"
import * as React from "react"
import FoodMenuItem from "../list"

type HeaderOption = {
  Icon: React.ReactNode
  to: string
}
type MenuContainerProps = {
  title: string
  data?: Array<any>
  headerOptions: Array<HeaderOption>
}

const MenuContainer: React.FunctionComponent<MenuContainerProps> = ({
  title,
  data,
  headerOptions,
}) => {
  return (
    <div className="w-full bg-green-100 shadow-xl md:rounded-2xl p-4 scrollBar mt-20">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl text-gray-800 font-sans">{title}</h1>
        <div>
          {headerOptions &&
            headerOptions.map((item, index: number) => (
              <Link href={item.to} key={index}>
                {item.Icon}
              </Link>
            ))}
        </div>
      </div>
      <div className="h-full">
        <div className="pt-1">
          {data?.map((item: any, index: number) => (
            <FoodMenuItem key={`item ${index}`} title={item} />
          ))}
        </div>
      </div>
    </div>
  )
}
export default MenuContainer
