import * as React from "react"
import OrderCard from "../../components/cards/order"
import Wrapper from "../../components/layout"
import { Chart, ChartConfiguration } from "chart.js"
import { Line, Pie } from "react-chartjs-2"
import { verifyIdToken } from "../../utilities/firebase_admin"
import { fireBaseClient } from "../../utilities/firebase"
import { Layout } from "../../components/layout/secondary"
import nookies from "nookies"

export default function Dashboard({ session }: any) {
  fireBaseClient()
  const labels = ["JAN", "FEB", "MAR", "APR", "MAY", "JUNE", "JUL"]
  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First Dataset",
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        borderColor: "rgb(75, 192, 192)",
        tension: 0.1,
      },
    ],
  }
  let config: ChartConfiguration = {
    type: "line",
    data: data,
  }
  if (session)
    return (
      <div className="bg-white flex-1 flex">
        <Wrapper>
          {/* <button
          onClick={async () => {
            await assignOrder({
              deliveryBoyID: "asndasndjasdkka",
              orderID: "5SC56nZkTAIwSJAn8Dpq",
            })
              .then((res) => {
                console.log(res)
              })
              .catch((error) => {
                console.log(error)
              })
          }}
        >
          Test
        </button> */}
          <div className="flex h-full flex-wrap flex-row items-start justify-start">
            <OrderCard
              title="Pending"
              qty={10}
              desc="Pending orders Card"
              to="/DB/Orders/pending"
            />
            <OrderCard
              title="Pending"
              qty={10}
              desc="Pending orders Card"
              to="/DB/Orders/active"
            />
            <OrderCard
              title="Pending"
              qty={10}
              desc="Pending orders Card"
              to="/DB/Orders/rejected"
            />
            <OrderCard
              title="Pending"
              qty={10}
              desc="Pending orders Card"
              to="/DB/Orders/some"
            />
            <OrderCard
              title="Pending"
              qty={10}
              desc="Pending orders Card"
              to="/DB/Orders/other"
            />
          </div>
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
