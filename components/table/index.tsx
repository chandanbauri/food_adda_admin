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

const ContentTable: React.FunctionComponent<tableProps> = ({
  tableData,
  tableFileds,
  actions,
}: tableProps) => {
  return (
    <div className="w-full box-border md:p-4">
      <table className="w-full table-auto shadow-xl">
        <thead>
          <tr className="bg-green-500 sticky top-14 md:top-14 z-10">
            {tableFileds.map((item: string, index: number) => (
              <th key={index} className="px-4 py-4">
                <span className="text-white">{item}</span>
              </th>
            ))}
            {actions && (
              <th className="px-4 py-4">
                <span className="text-white">actions</span>
              </th>
            )}
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

export default ContentTable
