import * as React from "react"
import OrderCard from "../../components/cards/order"
import Wrapper from "../../components/layout"
import { Chart, ChartConfiguration } from "chart.js"
import { Line, Pie } from "react-chartjs-2"
export default function Dashboard() {
  // let chartCanvas = document.getElementById("graph-log")
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

  // React.useEffect(() => {
  // let newChart = new Chart("graph-log", config)
  // })
  return (
    <div className="bg-gray-200 flex-1 flex">
      <Wrapper>
        <h1>Dashboard</h1>
        <div className="flex flex-wrap">
          <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
          <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
          <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
          <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
          <OrderCard title="Pending" qty={10} desc="Pending orders Card" />
        </div>
        <div className="w-full mt-5 flex 2xl:flex-row flex-col mb-10">
          {/* <canvas id="graph-log" className="w-full h-full"></canvas> */}
          <div className="xl:w-4/5 w-full px-2 bg-white shadow-xl rounded-2xl m-2 box-border">
            <Line
              data={data}
              width={300}
              height={400}
              options={{ maintainAspectRatio: false }}
            />
          </div>
          <div className="2xl:w-1/5 xl:w-96 px-2 py-4 bg-white shadow-xl rounded-2xl m-2 box-border">
            <Pie data={data} />
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
