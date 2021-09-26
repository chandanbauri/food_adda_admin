import Link from "next/link"
import * as React from "react"
import Empty from "../empty/empty"

type actionProps = {
  Icon: React.ReactNode
  action?: (props: any) => void
  isLink?: boolean
  to?: string
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
          {tableData ? (
            <table className="w-full table-auto shadow-xl">
              <thead>
                <tr className="bg-green-500 z-10">
                  {actions && (
                    <th className="px-4 py-4 capitalize">
                      <span className="text-white">actions</span>
                    </th>
                  )}
                  {tableFileds.map((item: string, index: number) => (
                    <th key={index} className={`px-4 py-4`}>
                      <span className="text-white capitalize">{item}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData &&
                  tableData.map((data: any, index: number) => (
                    <tr
                      key={index}
                      className={index % 2 == 0 ? "bg-green-100" : "bg-white"}
                    >
                      {actions && (
                        <td key={`${index}item`} className=" px-4 py-4 ">
                          <div className="flex items-center justify-around">
                            {actions.map(
                              (
                                { Icon, action, isLink, to }: actionProps,
                                index: number
                              ) =>
                                isLink && to ? (
                                  <Link
                                    href={`${to}/${data["id"]}?${
                                      data["name"] ? "name=" + data["name"] : ""
                                    }${
                                      data["restaurantName"]
                                        ? "restaurantName=" +
                                          data["restaurantName"]
                                        : ""
                                    }`}
                                    key={index}
                                  >
                                    <span className="box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2">
                                      {Icon}
                                    </span>
                                  </Link>
                                ) : data.isRequested && index == 1 ? null : (
                                  <button
                                    key={index}
                                    onClick={() => {
                                      if (action) action(data)
                                    }}
                                    className="box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2"
                                  >
                                    {Icon}
                                  </button>
                                )
                            )}
                          </div>
                        </td>
                      )}
                      {tableFileds.map((item: string, index: number) => (
                        <td
                          key={`${index}item`}
                          className={`px-4 py-4 text-center`}
                        >
                          {`${
                            item == "state"
                              ? data[item]
                                ? "Online"
                                : "Off  line"
                              : data[item]
                          }`}
                        </td>
                      ))}
                    </tr>
                  ))}
              </tbody>
            </table>
          ) : (
            <Empty />
          )}
        </div>
      </div>
    </>
  )
}

export default ContentTable
