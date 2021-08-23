import * as React from "react"

interface props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  title: string
}

export const FilledButton = (props: props) => (
  <button {...props}>
    <div className="box-border px-14 py-2 border-2 border-green-600 bg-green-600 rounded-md shadow-lg mx-5">
      <span className="text-white">{props.title}</span>
    </div>
  </button>
)
