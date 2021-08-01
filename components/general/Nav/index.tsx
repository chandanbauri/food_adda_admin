import * as React from 'react'
import { useRouter } from "next/router"
import Drawer from "../Drawer"

function NavBar() {
  const router = useRouter()

  const getTitle = (): string => {
    let title: string = ""
    switch (router.route) {
      case "/dashboard":
        title = "Dashboard"
        break
      case "/foodMenu":
        title = "Food Menu"
        break
      case "/transactions":
        title = "Transactions"
        break
      case "/DB/users":
        title = "Dashboard"
        break
      case "/DB/restaurants":
        title = "Food Menu"
        break
      case "/DB/deliveryBoys":
        title = "Delivery Partners"
        break
    }
    return title
  }
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex box-border">
      <Drawer />
      <div className="bg-white shadow-lg h-14 w-full flex items-center justify-start pl-3 box-border text-green-500 text-xl">
        {getTitle()}
      </div>
    </div>
  )
}

export default NavBar