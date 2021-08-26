import firebase from "firebase"
import { fireBaseClient } from "../firebase"
fireBaseClient()
export const functions = firebase.functions()
export const assignOrder = functions.httpsCallable("assignOrder")
export const createNewDeliveryPartner = functions.httpsCallable(
  "createNewDeliveryPartner"
)