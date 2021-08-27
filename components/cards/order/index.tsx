import * as React from "react"
import Link from "next/link"
type props = {
  title: string
  qty: number
  desc: string
  color?: string
  to: string
}

export default function OrderCard({ title, qty, desc, color, to }: props) {
  const getColor = () => {
    switch (title) {
      case "Pending":
        return "bg-yellow-400"
      case "Rejected":
        return "bg-red-600"
      case "Canceled":
        return "bg-red-500"
      case "On Going":
        return "bg-yellow-500"
      case "Delivered":
        return "bg-green-500"
    }
  }
  return (
    <Link href={to}>
      <div
        className={`md:w-60 w-40 max-w-xs min-w-max px-3 py-4 text-white rounded-2xl shadow-xl  m-4 ${getColor()}`}
      >
        <h1 className="md:text-3xl text-lg">{qty}</h1>
        <h1 className="md:text-xl text-sm">{title}</h1>
        <p className="text-xs">{desc}</p>
      </div>
    </Link>
  )
}
