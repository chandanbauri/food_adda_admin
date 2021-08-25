import * as React from "react"

type actionProps = {
  Icon: React.ReactNode
  action: (props: any) => void
}

type tableProps = {
  tableFileds: Array<string>
  tableData: Array<any>
  actions?: Array<actionProps>
}

const PopUpTable = ({ tableData, tableFileds, actions }: tableProps) => {
  return (
    <div>
      <table className="w-full table-auto">
        <thead className="w-full">
          <tr className=" bg-green-400">
            {tableFileds.map((item, index: number) => (
              <th key={index} className="p-4">
                {item}
              </th>
            ))}
            <th className="p-4">actions</th>
          </tr>
        </thead>
        <tbody className="w-full overflow-x-scroll">
          {tableData.map((data: any, index: number) => (
            <tr
              key={index}
              className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
            >
              {tableFileds.map((item: string, index: number) => (
                <td key={`${index}item`} className={`px-4 py-4`}>
                  {data[item]}
                </td>
              ))}
              {actions && (
                <td key={`${index}item`} className=" px-4 py-4">
                  {actions.map(
                    ({ Icon, action }: actionProps, index: number) => (
                      <button
                        key={index}
                        onClick={() => {
                          action(data)
                        }}
                        className="box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2"
                      >
                        {Icon}
                      </button>
                    )
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default PopUpTable
