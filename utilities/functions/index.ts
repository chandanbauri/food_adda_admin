import firebase from "firebase"
import { fireBaseClient } from "../firebase"
fireBaseClient()
export const functions = firebase.functions()
export const assignOrder = functions.httpsCallable("assignOrder")
export const askForAcceptingOrder = functions.httpsCallable(
  "askForAcceptingOrder"
)
export const createNewDeliveryPartner = functions.httpsCallable(
  "createNewDeliveryPartner"
)

export const getListOfDeliveryBoys = functions.httpsCallable(
  "getListOfDeliveryBoys"
)
export const getListUsers = functions.httpsCallable("getListUsers")
export const updateDeliveryPartner = functions.httpsCallable(
  "updateDeliveryPartner"
)