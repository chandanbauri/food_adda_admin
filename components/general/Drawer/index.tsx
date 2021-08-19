import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/router"

function Drawer() {
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

  const DrawerHeader = () => (
    <div className="h-14 shadow-xl bg-white flex items-center justify-start pl-2">
      <h1 className="text-2xl font-medium text-green-600">Food Adda</h1>
    </div>
  )
  return (
    <div className="h-screen w-72 bg-white shadow-xl box-border fixed top-0 left-0">
      <DrawerHeader />
      <div className="flex flex-1 flex-col mt-5">
        <Link href="/dashboard">
          {router.route === "/dashboard" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer ">
              <p>Dashbord</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer ">
              <p>Dashbord</p>
            </div>
          )}
        </Link>

        <Link href="/foodMenu">
          {router.route === "/foodMenu" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Menu</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Menu</p>
            </div>
          )}
        </Link>

        <Link href="/transactions">
          {router.route === "/transactions" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Transaction</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Transaction</p>
            </div>
          )}
        </Link>

        <Link href="/DB/users">
          {router.route === "/DB/users" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>User</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>User</p>
            </div>
          )}
        </Link>

        <Link href="/DB/restaurants">
          {router.route === "/DB/restaurants" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Restaurants</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Restaurants</p>
            </div>
          )}
        </Link>

        <Link href="/DB/deliveryBoys">
          {router.route === "/DB/deliveryBoys" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>DeliveryBoy</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>DeliveryBoy</p>
            </div>
          )}
        </Link>
      </div>
    </div>
  )
}

export default Drawer
