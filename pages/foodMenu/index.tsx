import * as React from "react"
import MenuContainer from "../../components/FoodMenu/Container"
import Wrapper from "../../components/layout"

export default function FoodMenu() {
  // let data = Array.apply(
  //   null,
  //   Array(20).map((item, index: number) => index)
  // )

  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  return (
    <div className="bg-gray-200 flex-1 flex">
      <Wrapper>
        <h1>Food Menu</h1>
        <MenuContainer title="Food Menu" data={data} />
      </Wrapper>
    </div>
  )
}
