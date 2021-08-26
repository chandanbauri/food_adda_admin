import * as React from "react"
type props = {
  content: React.ReactNode
  trigger: boolean
  onClose: () => void
}

const PopUpContainer: React.FunctionComponent<props> = ({
  content,
  trigger,
  onClose,
}: props) => {
  if (trigger)
    return (
      <div className="fixed top-0 left-0 right-0 bottom-0 bg-black z-50 bg-opacity-25 overflow-y-scroll">
        <div className="flex items-center h-full w-full flex-col box-border mt-14 px-4">
          <div className="max-w-full md:max-w-2xl w-full bg-white shadow-lg md:rounded-md box-border p-4">
            {content}
            <div className="w-full flex items-center justify-center mt-5 sticky bottom-8">
              <button
                onClick={() => {
                  onClose()
                }}
              >
                <div className="px-10 py-2 bg-red-500 text-white uppercase rounded-md shadow-md">
                  close
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  else return null
}

export default PopUpContainer
