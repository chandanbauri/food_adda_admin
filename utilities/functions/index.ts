import firebase from "firebase"
export const functions = firebase.functions()

export const assignOrder = functions.httpsCallable("assignOrder")
export const createNewDeliveryPartner = functions.httpsCallable(
  "createNewDeliveryPartner"
)