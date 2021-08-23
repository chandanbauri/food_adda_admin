import * as React from "react"
import MenuContainer from "../../components/FoodMenu/Container"
import Wrapper from "../../components/layout"
import nookies from "nookies"
import { verifyIdToken } from "../../utilities/firebase_admin"
import { Layout } from "../../components/layout/secondary"
export default function FoodMenu({ session }: any) {
  // let data = Array.apply(
  //   null,
  //   Array(20).map((item, index: number) => index)
  // )

  let data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
  if (session)
    return (
      <div className="bg-gray-200 flex-1 flex">
        <Wrapper>
          <h1>Food Menu</h1>
          <MenuContainer title="Food Menu" data={data} />
        </Wrapper>
      </div>
    )
  return (
    <Layout title="Not Authenticated">
      <div className="h-screen w-screen flex items-center justify-center">
        <h1 className="text-green-500 text-2xl font-bold">Loading ... </h1>
      </div>
    </Layout>
  )
}

export async function getServerSideProps(context: any) {
  try {
    let cookies = nookies.get(context)
    const token = await verifyIdToken(cookies.token)
    if (token) {
      const { uid, email } = token
      return {
        props: { session: `your email is ${email},and your uid is ${uid}` },
      }
    }
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  } catch (error) {
    // console.log(error)
    context.res.writeHead(302, { location: "/auth/login" })
    context.res.end()
    return { props: {} }
  }
}