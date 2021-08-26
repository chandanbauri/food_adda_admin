import * as React from "react"
import NavBar from "../general/Nav"

interface props {
  children?: React.ReactNode
}

function Wrapper({ children }: props): JSX.Element {
  return (
    <div className=" w-screen">
      <NavBar />
      <div className="md:ml-80 mt-14 z-40">{children}</div>
    </div>
  )
}

export default Wrapper
