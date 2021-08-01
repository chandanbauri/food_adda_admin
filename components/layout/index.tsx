import * as React from 'react'
import Drawer from '../general/Drawer'
import Footer from '../general/Footer'
import NavBar from '../general/Nav'

interface props {
    children?:React.ReactNode
}

function Wrapper({ children }:props):JSX.Element{
    return (
        <div className="bg-gray-100 w-screen">
            <NavBar />
            <div className="ml-80 mt-14">

            {children}
            <Footer />
            </div>
        </div>
    )
}

export default Wrapper