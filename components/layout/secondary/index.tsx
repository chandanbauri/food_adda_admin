import * as React from "react"
import Head from "next/head"
interface LayoutProps {
  title: string
  children: React.ReactNode
}
export const Layout: React.FunctionComponent<LayoutProps> = ({
  title,
  children,
}: LayoutProps) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </div>
  )
}
