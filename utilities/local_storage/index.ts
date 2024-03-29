export const setValueToLocalStorage = (key: string, value: any) => {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch (error) {
    //error)
  }
}

export const getValueFromLocalStorage = (key: string) => {
  try {
    let value = localStorage.getItem(key)
    if (value) {
      return value
    } else return null
  } catch (error) {
    //error)
    return error
  }
}

export const deleteValueFromLocalStorage = (key: string) => {
  try {
    localStorage.removeItem(key)
  } catch (error) {
    //error)
  }
}
