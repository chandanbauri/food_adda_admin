import Link from "next/link"
import * as React from "react"

type actionProps = {
  Icon: React.ReactNode
  action: (props: any) => void
}
type HeaderAction = {
  Icon: React.ReactNode
  to: string
}

type tableProps = {
  tableFileds: Array<string>
  tableData?: Array<any>
  actions?: Array<actionProps>
  headerActions?: Array<HeaderAction>
  tableTitle: string
}

const ContentTable: React.FunctionComponent<tableProps> = ({
  tableData,
  tableFileds,
  actions,
  tableTitle,
  headerActions,
}: tableProps) => {
  return (
    <>
      <div className="bg-green-500 p-4 text-white text-xl items-center justify-between flex w-full">
        <h1 className=" capitalize">{`${tableTitle}`}</h1>
        <div>
          {headerActions?.map(({ Icon, to }: HeaderAction, index: number) => (
            <Link key={index} href={to}>
              <div className="box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2">
                {Icon}
              </div>
            </Link>
          ))}
        </div>
      </div>
      <div className="w-full bg-white md:bg-transparent md:p-0 overflow-x-scroll">
        <div className="w-full box-border md:p-4">
          <table className="w-full table-auto shadow-xl">
            <thead>
              <tr className="bg-green-500 z-10">
                {tableFileds.map((item: string, index: number) => (
                  <th key={index} className={`px-4 py-4`}>
                    <span className="text-white capitalize">{item}</span>
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
              {tableData &&
                tableData.map((data: any, index: number) => (
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
      </div>
    </>
  )
}

export default ContentTable
