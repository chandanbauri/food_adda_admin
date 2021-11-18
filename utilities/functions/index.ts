import firebase from "firebase/app"
import "firebase/functions"
import { fireBaseClient } from "../firebase"
fireBaseClient()
export const functions = firebase.functions()
export const assignOrder = functions.httpsCallable("assignOrder")
export const askForAcceptingOrder = functions.httpsCallable("askForAcceptingOrder")
export const createNewDeliveryPartner = functions.httpsCallable("createNewDeliveryPartner")

export const getListOfDeliveryBoys = functions.httpsCallable("getListOfDeliveryBoys")
export const getListUsers = functions.httpsCallable("getListUsers")
export const updateDeliveryPartner = functions.httpsCallable("updateDeliveryPartner")
export const deleteDeliveryBoy = functions.httpsCallable("deleteDeliveryBoy")
export const rejectOrder = functions.httpsCallable("rejectOrder")
export const updateCategory = functions.httpsCallable("updateCategory")
