import * as React from "react"
import Drawer from "../general/Drawer"
import Footer from "../general/Footer"
import NavBar from "../general/Nav"

interface props {
  children?: React.ReactNode
}

function Wrapper({ children }: props): JSX.Element {
  return (
    <div className=" w-screen">
      <NavBar />
      <div className="md:ml-80 mt-20 z-40">{children}</div>
      <Footer />
    </div>
  )
}

export default Wrapper
