import * as React from "react"

type foodMenuProps = {
  title: string
}

const FoodMenuItem: React.FunctionComponent<foodMenuProps> = ({ title }) => {
  return (
    <div className="w-full my-2 bg-white p-2">
      <h2 className="text-gray-700 text-lg font-sans">{title}</h2>
    </div>
  )
}

export default FoodMenuItem
