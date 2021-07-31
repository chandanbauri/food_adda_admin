import * as React from 'react'
import Drawer from '../Drawer'

function NavBar() {
    return (
        <div className="fixed top-0 left-0 right-0 bottom-0 flex box-border">
            <Drawer />
            <div className="bg-white shadow-lg h-14 w-full py-2 px-4">
                NavBar
            </div>
            </div>
    )
}

export default NavBar