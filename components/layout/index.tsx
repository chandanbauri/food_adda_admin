import * as React from "react"
import Drawer from "../general/Drawer"
import Footer from "../general/Footer"
import NavBar from "../general/Nav"

interface props {
  children?: React.ReactNode
}

function Wrapper({ children }: props): JSX.Element {
  return (
    <div className="bg-gray-100 w-screen">
      <NavBar />
      <div className="md:ml-80 md:mt-16 z-40">{children}</div>
      <Footer />
    </div>
  )
}

export default Wrapper
