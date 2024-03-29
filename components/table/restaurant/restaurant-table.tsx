import Link from "next/link"
import * as React from "react"
import Empty from "../../empty/empty"
import moment from "moment"

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
                  {actions && actions.length ? (
                    <th className="px-4 py-4 capitalize">
                      <span className="text-white">actions</span>
                    </th>
                  ) : null}
                  {tableFileds.map((item: string, index: number) => (
                    <th key={index} className={`px-4 py-4`}>
                      <span className="text-white capitalize">{item}</span>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableData &&
                  tableData.map((data: any, index: number) => {
                    let { restaurantDetails, userDetails, items, ...rest } =
                      data
                    let { address, id, ...resRest } = restaurantDetails
                    let { name, ...userRest } = userDetails
                    let newData = {
                      ...rest,
                      restaurantAddress: address,
                      userName: name,
                      ...userRest,
                      restaurantName: resRest.name,
                    }
                    return (
                      <tr key={index} className={index % 2 == 0 ? "bg-green-100" : "bg-white"}>
                        {actions && actions.length ? (
                          <td key={`${index}item`} className=' px-4 py-4 '>
                            <div className='flex items-center justify-around'>
                              {actions.map(
                                ({ Icon, action, isLink, to }: actionProps, index: number) =>
                                  isLink && to ? (
                                    <Link
                                      href={`${to}/${data["id"]}?${
                                        data["name"] ? "name=" + data["name"] : ""
                                      }${
                                        data["restaurantName"]
                                          ? "restaurantName=" + data["restaurantName"]
                                          : ""
                                      }`}
                                      key={index}>
                                      <span className='box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2'>
                                        {Icon}
                                      </span>
                                    </Link>
                                  ) : (
                                    <button
                                      key={index}
                                      onClick={() => {
                                        if (action) action(data)
                                      }}
                                      className='box-border p-2 hover:bg-gray-300 rounded-full transition-all ease-linear mx-2'>
                                      {Icon}
                                    </button>
                                  ),
                              )}
                            </div>
                          </td>
                        ) : null}
                        {tableFileds.map((item: string, index: number) => {
                          if (typeof newData[item] == "boolean")
                            return (
                              <td
                                key={`${index}item`}
                                className={`px-4 py-4 text-center whitespace-nowrap`}>
                                <span>{newData[item] ? "Done" : "Not Done Yet"}</span>
                              </td>
                            )
                          if (typeof newData[item] == "undefined")
                            return (
                              <td
                                key={`${index}item`}
                                className={`px-4 py-4 text-center whitespace-nowrap`}>
                                <span>Not Available</span>
                              </td>
                            )
                          if (item == "placedAt" || item == "acceptedOn" || item == "deliveredOn")
                            return (
                              <td
                                key={`${index}item`}
                                className={`px-4 py-4 text-center whitespace-nowrap`}>
                                {moment(newData[item]).format("DD/MM/YYYY HH:mm a") ??
                                  "Not Available"}
                              </td>
                            )
                          return (
                            <td
                              key={`${index}item`}
                              className={`px-4 py-4 text-center whitespace-nowrap`}>
                              {newData[item]}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
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
