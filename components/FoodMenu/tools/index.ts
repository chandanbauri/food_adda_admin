type Food = {
  name: string
  id: string
  desc: string
}

type FoodsObj = {
  [key: string]: Array<Food>
}

export class FoodMenuConstructor {
  categories: Array<String>
  Foods: FoodsObj
  constructor() {
    this.categories = []
    this.Foods = {}
    console.log("Menu created ...")
  }
  initialize(categories: Array<string>, foods: FoodsObj) {
    this.categories = categories
    this.Foods = foods
  }
  isFoodMenuEmpty() {
    if (this.categories.length == 0) return true
    else return false
  }
  findCategoryIndex(name: string) {
    if (!this.isFoodMenuEmpty()) {
      let category = this.categories?.findIndex((value) => value == name)
      console.log(category)
      if (category >= 0) {
        return category
      } else {
        return null
      }
    } else return null
  }
  findFoodIndex(categoryName: string, food: string) {
    if (!this.isFoodMenuEmpty()) {
      let index = this.Foods[categoryName].findIndex(
        (value) => value.name == food
      )
      if (index) {
        return index
      } else return null
    } else return null
  }
  isCategoryAlreadyPresent(name: string) {
    if (!this.isFoodMenuEmpty()) {
      let category = this.categories.findIndex((value) => value == name)
      console.log(category)
      if (category >= 0) {
        return true
      } else {
        return false
      }
    } else return false
  }
  addCategory(name: string, foods: Array<Food>) {
    if (this.isCategoryAlreadyPresent(name)) {
      return `Category named ${name} is already present`
    } else {
      if (this.categories !== null && this.Foods !== null) {
        this.categories.push(name)
        this.Foods[name] = foods

        return `Category added succesfully`
      } else return "there is some issue"
    }
  }
  addFoodItem(categoryName: string, foods: Array<Food>) {
    if (this.isCategoryAlreadyPresent(categoryName)) {
      console.log("working ...")
      this.Foods[categoryName].push(...foods)
    }
  }
  deleteCategory(categoryName: string) {
    if (this.isFoodMenuEmpty()) return `The food menu is Empty`
    else {
      let category = this.findCategoryIndex(categoryName)
      if (category) {
        let List = this.categories
        if (category == 0) {
          this.categories = [...List?.slice(1)]
          return "category deleted successfully"
        } else {
          this.categories = [
            ...List.slice(0, category),
            ...List.slice(category + 1),
          ]
          delete this.Foods[categoryName]
          return "category deleted successfully"
        }
      } else {
        return "The Category no Longer exists"
      }
    }
  }
  deleteFood(categoryName: string, food: string) {
    if (this.isCategoryAlreadyPresent(categoryName)) {
      let index = this.findFoodIndex(categoryName, food)
      if (index !== null) {
        let list = this.Foods[categoryName]
        if (index == 0) this.Foods[categoryName] = [...list.slice(1)]
        else
          this.Foods[categoryName] = [
            ...list.slice(0, index),
            ...list.slice(index + 1),
          ]
        return "category deleted successfully"
      } else {
        return "Food item does not exist"
      }
    } else return "Food menu is empty"
  }
  displayMainMenu() {
    return this.categories
  }
  displayFoods() {
    return this.Foods
  }
  displayCategory(name: any) {
    if (this.isCategoryAlreadyPresent(name)) return this.Foods[name]
  }
}
