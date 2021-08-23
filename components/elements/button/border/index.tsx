import * as React from "react"

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const BorderButton = (props: props) => (
  <button {...props}>
    <div className="box-border px-10 py-2 border-2 border-green-500 rounded-md shadow-lg mx-5">
      <span className="text-green-500">{props.title}</span>
    </div>
  </button>
)
