import * as React from "react"
import {
  askForAcceptingOrder,
  getListOfDeliveryBoys,
} from "../../../utilities/functions"
import DeliveryBoyCard from "../../cards/delivery-boy/delivery-boy"
import FoodCard from "../../cards/food/food-card"
import PopUpContainer from "../../popUp/container"
import firebase from "firebase"

type TableProps = {
  restaurant?: any
  isEditMode: boolean
  setBasket?: any
}

const keys = ["category", "name", "desc", "cost"]
export default function FoodTable({
  restaurant,
  isEditMode,
  setBasket,
}: TableProps) {
  const [Foods, setFoods] = React.useState<Array<any>>([])
  const [deleteFoodList, setDFL] = React.useState<Array<any>>([])
  const [addList, setAddList] = React.useState<Array<any>>([])
  const [trigger, setTrigger] = React.useState<boolean>(false)
  const [initializing, setInitializing] = React.useState<boolean>(false)
  const RestaurantCollection = firebase.firestore().collection("restaurants")
  const CategoriesCollection = firebase.firestore().collection("categories")
  const [foodList, setFoodList] = React.useState<Array<any>>([])

  const getRestaurantFood = async () => {
    if (isEditMode && restaurant) {
      try {
        let FoodList: Array<any> = []
        let res = await RestaurantCollection.doc(restaurant?.toString())
          .collection("foods")
          .get()
        if (res.size) {
          FoodList = res.docs.map((item) => ({
            ...item.data(),
            irid: item.id,
          }))
        }
        console.log(`RESTAURANT ${restaurant} FOOD`, FoodList)
        setFoods(FoodList)
      } catch (error) {
        console.error(error)
      }
    }
  }
  const getFood = async () => {
    try {
      //   setInitializing(true)
      let list: Array<any> = []
      let FoodList: Array<any> = []
      let finalList: Array<any> = []

      let res = await CategoriesCollection.get()
      if (res.size) {
        res.docs.map((item) => {
          list.push({ ...item.data(), id: item.id })
        })
        await Promise.all(
          list.map(async (item, index) => {
            let response = await CategoriesCollection.doc(item.id)
              .collection("foods")
              .get()
            if (response.size) {
              response.docs.map((item) => {
                FoodList.push({ ...item.data(), id: item.id })
              })
            }
            if (index == list.length - 1) setInitializing(false)
          })
        )
        console.log("RESTAURANT FOOD LENGTH", Foods.length)
        console.log("TOTAL SIZE", FoodList.length)
        //FoodList)
        if (Foods.length) {
          finalList = FoodList.map((item) => {
            let index = Foods.findIndex((food) => food.id == item.id)
            if (index == -1) {
              return item
            } else return
          })
          console.log(
            "FINAL LIST",
            finalList.filter((item) => item != undefined).length
          )
          setFoodList(finalList.filter((item) => item != undefined))
          return
        }
        console.log(
          "FINAL LIST 2",
          FoodList.filter((item) => item != undefined).length
        )
        setFoodList(FoodList)
        setInitializing(false)
      }
    } catch (error) {
      setInitializing(false)
      throw error
    }
  }
  //   const fetchDeliveryBoyes = async () => {
  //     setInitializing(true)
  //     try {
  //       let res = await getListOfDeliveryBoys()
  //       if (res) {
  //         let parsedResponse = JSON.parse(res.data)
  //         if (parsedResponse.success) {
  //           let list: Array<any> = parsedResponse.data.map((boy: any) => {
  //             let index = boy.requests.findIndex(
  //               (item: any) => item.orderId == order.id
  //             )
  //             if (index == -1) {
  //               return boy
  //             } else return
  //           })
  //           setDeliveryBoys(list.filter((item) => item !== undefined))
  //           // setInitializing(false)
  //         } else {
  //           // setInitializing(false)
  //           setDeliveryBoys([])
  //         }
  //       }
  //       setInitializing(false)
  //     } catch (error) {
  //       console.error("DELIVERY BOYS API", error)
  //     }
  //   }

  //   const assignEveryOneAtOnce = async () => {
  //     try {
  //       await Promise.all(
  //         AssignedDeliveryBoys.map(async (boy) => {
  //           try {
  //             await askForAcceptingOrder({
  //               order: order,
  //               deliveryBoyID: boy.uid,
  //             })
  //           } catch (error) {
  //             console.error(error)
  //           }
  //         })
  //       )
  //     } catch (error) {
  //       console.error(error)
  //     }
  //   }
  const addToDFLList = (info: any) => {
    setDFL((prev) => {
      let index = prev.findIndex((item) => item.id == info.id)
      if (index == -1) {
        return [...prev, info]
      } else {
        if (index == 0) {
          return [...prev.slice(1)]
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      }
    })
  }
  const addToList = (info: any) => {
    setAddList((prev) => {
      let index = prev.findIndex((item) => item.id == info.id)
      if (index == -1) {
        return [...prev, info]
      } else {
        if (index == 0) {
          return [...prev.slice(1)]
        }
        return [...prev.slice(0, index), ...prev.slice(index + 1)]
      }
    })
  }

  //   React.useEffect(() => {
  //     fetchDeliveryBoyes().catch((error) => console.error(error))
  //   }, [])

  const PopUpContent = () => (
    <div>
      <div className="w-full overflow-x-scroll pb-16">
        <div>
          <table className="w-full table-auto shadow-xl">
            <thead>
              <tr className="bg-green-500 z-10">
                <th>
                  <span className="text-white capitalize">actions</span>
                </th>
                {keys.map((key, index) => (
                  <th key={index} className="px-4 py-4 capitalize">
                    <span className="text-white">{key}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {foodList.length
                ? foodList.map((info, index) => (
                    <FoodCard
                      key={index}
                      index={index}
                      keys={keys}
                      info={info}
                      action={addToList}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="fixed bottom-20 left-0 right-0 flex items-center justify-center">
        <div className="max-w-sm w-full px-4 box-border">
          <button
            className="w-full py-2 bg-green-500 rounded shadow-xl"
            onClick={async () => {
              console.log("NEW IITEMs", addList)
              if (isEditMode && restaurant) {
                try {
                  if (addList.length) {
                    await Promise.all(
                      addList.map(async (item, index) => {
                        await RestaurantCollection.doc(restaurant)
                          .collection("foods")
                          .add(item)
                        if (index === addList.length - 1) {
                          // setTrigger(true)
                          // setError(false)
                          alert("Food items added !!")
                        }
                      })
                    )
                    setFoods((prev) => [...prev, ...addList])
                  } else {
                    alert("Please select a food item first!!")
                  }
                } catch (error) {
                  console.error(error)
                }
              } else {
                // new mode
                setFoods((prev) => {
                  if (setBasket) setBasket([...prev, ...addList])
                  return [...prev, ...addList]
                })
              }
            }}
          >
            <span className="text-white capitalize">add to food list</span>
          </button>
        </div>
      </div>
    </div>
  )
  React.useEffect(() => {
    getRestaurantFood().catch((error) => console.error(error))
  }, [])
  React.useEffect(() => {
    getFood().catch((error) => console.log(error))
  }, [])
  //   React.useEffect(() => {
  //     getFood().catch((error) => console.log(error))
  //   }, ])
  if (initializing)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <h1 className="text-green-500 text-xl">Please wait ...</h1>
      </div>
    )
  return (
    <div>
      <div className="flex flex-grow justify-between items-center text-green-600 sticky top-0 bg-white">
        <h1 className="py-4 text-lg ">Food List</h1>
      </div>
      <div className="w-full overflow-x-scroll">
        <div>
          <table className="w-full table-auto shadow-xl">
            <thead>
              <tr className="bg-green-500 z-10">
                <th>
                  <span className="text-white capitalize">actions</span>
                </th>
                {keys.map((key, index) => (
                  <th key={index} className="px-4 py-4 capitalize">
                    <span className="text-white">{key}</span>
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {Foods.length
                ? Foods.map((info, index) => (
                    <FoodCard
                      key={index}
                      index={index}
                      keys={keys}
                      info={info}
                      action={addToDFLList}
                    />
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <PopUpContainer
          trigger={trigger}
          content={<PopUpContent />}
          onClose={() => {
            setAddList([])
            setTrigger(false)
          }}
        />
      </div>
      <div className="w-full my-3 flex items-center justify-center">
        <button
          className="px-4 py-2 bg-green-500 rounded shadow-xl w-full mmy-4"
          onClick={async () => {
            try {
              await getFood()
              setTrigger(true)
            } catch (error) {
              console.error(error)
            }
          }}
        >
          <span className="text-white">Add Food</span>
        </button>
      </div>
      <div className="w-full my-3 flex items-center justify-center">
        <button
          className="px-4 py-2 bg-red-500 rounded shadow-xl w-full"
          onClick={async () => {
            // console.log("DELETE LIST", deleteFoodList)
            if (isEditMode && restaurant) {
              try {
                if (deleteFoodList.length) {
                  setFoods((prev) => {
                    let list = prev.map((item) => {
                      let index = deleteFoodList.findIndex(
                        (food) => item.id == food.id
                      )
                      if (index == -1) {
                        return item
                      }
                      return
                    })
                    return list.filter((item) => item != undefined)
                  })
                  await Promise.all(
                    deleteFoodList.map(async (food) => {
                      await RestaurantCollection.doc(restaurant)
                        .collection("foods")
                        .doc(food.irid)
                        .delete()
                    })
                  )
                  alert("Seleted Food Items Have Been Deleted")
                  setDFL([])
                } else {
                  alert("Please select food items to delete")
                }
              } catch (error) {
                console.error(error)
              }
            } else {
              // add new mode
              setFoods((prev) => {
                let list = prev.map((item) => {
                  let index = deleteFoodList.findIndex(
                    (food) => item.id == food.id
                  )
                  if (index == -1) {
                    return item
                  }
                  return
                })
                if (setBasket)
                  setBasket(list.filter((item) => item != undefined))
                return list.filter((item) => item != undefined)
              })
            }
          }}
        >
          <span className="text-white">delete</span>
        </button>
      </div>
    </div>
  )
}
