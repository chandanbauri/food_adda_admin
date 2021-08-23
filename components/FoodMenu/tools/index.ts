type Food = {
  name: string
  id: string
  description: string
}

type FoodsObj = {
  [key: string]: Array<Food>
}

export class FoodMenu {
  categories: Array<String> | null
  Foods: FoodsObj | null
  constructor() {
    this.categories = null
    this.Foods = null
  }

  isFoodMenuEmpty() {
    if (!this.categories) return true
    else return false
  }
  findCategoryIndex(name: string) {
    if (!this.isFoodMenuEmpty()) {
      let category = this.categories?.findIndex((value) => value == name)
      if (category) {
        return category
      } else {
        return null
      }
    } else return null
  }
  findFoodIndex(categoryName: string, food: string) {
    if (this.Foods) {
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
      let category = this.categories?.findIndex((value) => value == name)
      if (category) {
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
      if (this.categories && this.Foods) {
        this.categories?.push(name)
        this.Foods[name].push(...foods)
        return `Category added succesfully`
      } else return "there is some issue"
    }
  }
  addFoodItem(categoryName: string, foods: Array<Food>) {
    if (this.isCategoryAlreadyPresent(categoryName) && this.Foods) {
      this.Foods[categoryName].push(...foods)
    }
  }
  deleteCategory(categoryName: string) {
    if (this.isFoodMenuEmpty()) return `The food menu is Empty`
    else {
      let category = this.findCategoryIndex(categoryName)
      if (category) {
        let List = this.categories
        if (List) {
          if (category == 0) {
            this.categories = [...List?.slice(1)]
          } else {
            this.categories = [
              ...List.slice(0, category),
              ...List.slice(category + 1),
            ]
          }
        }
      } else {
        return "The Category no Longer exists"
      }
    }
  }
  deleteFood(categoryName: string, food: string) {
    if (this.Foods) {
      let index = this.findFoodIndex(categoryName, food)
      if (index !== null) {
        let list = this.Foods[categoryName]
        if (index == 0) this.Foods[categoryName] = [...list.slice(1)]
        else
          this.Foods[categoryName] = [
            ...list.slice(0, index),
            ...list.slice(index + 1),
          ]
      } else {
        return "Food item does not exist"
      }
    } else return "Food menu is empty"
  }
}
