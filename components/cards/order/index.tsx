import * as React from "react"

type props = {
  title: string
  qty: number
  desc: string
  color?: string
}

export default function OrderCard({ title, qty, desc, color }: props) {
  return (
    <div className="w-60 max-w-xs min-w-max px-3 py-4 text-white rounded-2xl shadow-xl bg-gradient-to-r from-indigo-700 to-indigo-600">
      <h1 className="text-3xl">{qty}</h1>
      <h1 className="text-xl">{title}</h1>
      <p className="text-xs">{desc}</p>
    </div>
  )
}
