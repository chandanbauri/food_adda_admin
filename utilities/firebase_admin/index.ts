import * as admin from "firebase-admin"

const config = require("../../Configs/service_account.json")

export const verifyIdToken = async (token: string) => {
  if (!admin.apps.length) {
    admin.initializeApp({
      credential: admin.credential.cert(config),
    })
  }
  return await admin
    .auth()
    .verifyIdToken(token)
    .catch((error) => {
      //error)
      throw error
    })
}
