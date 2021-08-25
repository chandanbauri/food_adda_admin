import * as React from "react"
import Link from "next/link"
import * as Feather from "react-feather"
type foodMenuProps = {
  title: string
  data?: any
}

const FoodMenuItem: React.FunctionComponent<foodMenuProps> = ({
  title,
  data,
}) => {
  return (
    <div className="w-full my-2 bg-white p-2 flex justify-between items-center">
      <h2 className="text-gray-700 text-lg font-sans">{title}</h2>
      <div className="flex items-center text-gray-600">
        <Link href={`/foodMenu/view/${title}`}>
          <Feather.Eye />
        </Link>
        <div className="mx-2" />
        <Link href={`/foodMenu/addFood/${title}`}>
          <Feather.Edit />
        </Link>
      </div>
    </div>
  )
}

export default FoodMenuItem
