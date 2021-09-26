import * as React from "react"
import Link from "next/link"
import { useRouter } from "next/router"
import firebase from "firebase/app"
import * as Feather from "react-feather"
import clsx from "clsx"
function Drawer() {
  const router = useRouter()
  const [drawer, setDrawer] = React.useState<boolean>(false)
  const getTitle = (): string => {
    let title: string = ""
    switch (router.route) {
      case "/dashboard":
        title = "Dashboard"
        break
      case "/foodMenu":
        title = "Food Menu"
        break
      // case "/transactions":
      //   title = "Transactions"
      //   break
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
    <div className="h-14 shadow-md bg-white fixed top-0 left-0 right-0 flex items-center justify-between px-4 box-border z-50">
      <h1 className="text-2xl font-medium text-green-600">Food Dhaba</h1>

      <button
        className="flex md:hidden"
        onClick={() => {
          setDrawer((prev) => !prev)
        }}
      >
        {drawer ? (
          <Feather.X className="text-green-500" size={30} />
        ) : (
          <Feather.Menu className="text-green-500" />
        )}
      </button>
    </div>
  )
  return (
    <>
      <DrawerHeader />
      {/* <div className="md:h-screen w-full md:w-72 shadow-xl box-border fixed top-0 left-0 md:right-auto right-0 md:bottom-auto bottom-0"> */}
      <div
        className={`flex flex-1 flex-col bg-white md:mt-5 md:transform-none transform transition ease-in-out fixed top-14 left-0 w-full md:w-72 z-50 md:z-10 +
        ${drawer ? "translate-x-0" : "-translate-x-full"}`}
      >
        <Link href="/dashboard">
          {router.route === "/dashboard" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer ">
              <p>Dashboard</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer ">
              <p>Dashboard</p>
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

        {/* <Link href="/transactions">
          {router.route === "/transactions" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Transaction</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Transaction</p>
            </div>
          )}
        </Link> */}

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
        <Link href="/promotions">
          {router.route === "/DB/deliveryBoys" ? (
            <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Promotions</p>
            </div>
          ) : (
            <div className="flex p-3 text-gray-700  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
              <p>Promotions</p>
            </div>
          )}
        </Link>
        <button
          onClick={async () => {
            try {
              //"hell")
              await firebase.auth().signOut()
              window.location.href = "/"
            } catch (error) {
              throw error
            }
          }}
        >
          <div className="flex p-3 text-green-600  space-x-4 0 hover:bg-gray-50 hover:text-green-600  cursor-pointer  ">
            <p>Sign out</p>
          </div>
        </button>
      </div>
      {/* </div> */}
    </>
  )
}

export default Drawer
