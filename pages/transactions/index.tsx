import * as React from "react"
import Wrapper from "../../components/layout"
import ContentTable from "../../components/table"
import nookies from "nookies"
import { Layout } from "../../components/layout/secondary"
export default function Transactions({ session }: any) {
  let tableData = [
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
    {
      F1: "I1 asknjnasdsadas",
      F2: "I2",
      F3: "I3",
      F4: "I4",
      F5: "I5",
      F6: "Iun",
    },
    { F1: "I6 gadsdafsd", F2: "I7", F3: "I8", F4: "I9", F5: "I10", F6: "Iun" },
    { F1: "I11", F2: "I12", F3: "I13", F4: "I14", F5: "I15", F6: "Iun" },
    { F1: "I16", F2: "I17", F3: "I18", F4: "I19", F5: "I20", F6: "Iun" },
    { F1: "I21", F2: "I22", F3: "I23", F4: "I24", F5: "I25", F6: "Iun" },
  ]
  let tableFileds = ["F1", "F2", "F3", "F4", "F5", "F6"]
  if (session)
    return (
      <div className="bg-gray-200 flex-1 flex">
        <Wrapper>
          <ContentTable tableData={tableData} tableFileds={tableFileds} />
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
