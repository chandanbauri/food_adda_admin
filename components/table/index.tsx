import * as React from "react"

type tableProps = {
  tableFileds: Array<string>
  tableData: Array<any>
}

const ContentTable: React.FunctionComponent<tableProps> = ({
  tableData,
  tableFileds,
}: tableProps) => {
  return (
    <div className="w-full box-border p-4">
      <table className="w-full table-auto shadow-xl">
        <thead>
          <tr className="bg-green-500 sticky top-14">
            {tableFileds.map((item: string, index: number) => (
              <th key={index} className="px-4 py-4">
                <span className="text-white">{item}</span>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {tableData.map((data: any, index: number) => (
            <tr
              key={index}
              className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
            >
              {tableFileds.map((item: string, index: number) => (
                <td key={`${index}item`} className=" px-4 py-4">
                  {data[item]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default ContentTable
