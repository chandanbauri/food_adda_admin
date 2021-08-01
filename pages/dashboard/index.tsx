import * as React from "react"
import OrderCard from "../../components/cards/order"
import Wrapper from "../../components/layout"

export default function Dashboard() {
  return (
    <div className="bg-gray-200 flex-1 flex">
      <Wrapper>
        <h1>Dashboard</h1>
        <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
      </Wrapper>
    </div>
  )
}
