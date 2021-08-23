import * as React from "react"
import firebase from "firebase"
import nookies from "nookies"
import { fireBaseClient } from "../../../utilities/firebase"
import {
  deleteValueFromLocalStorage,
  setValueToLocalStorage,
} from "../../../utilities/local_storage"

type contextProps = {
  user: any
}

export const AuthContext = React.createContext<contextProps | null>(null)

export const AuthProvider: React.FunctionComponent = ({ children }) => {
  fireBaseClient() // intializing firebase client
  const [user, setUser] = React.useState<any>(null)
  React.useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null)
        // deleteValueFromLocalStorage("token")
        nookies.set(undefined, "token", "", {})
        return
      }
      const token = await user.getIdToken()
      setUser(user)
      nookies.set(undefined, "token", token, {})
      // setValueToLocalStorage("token", token)
    })
  }, [])
  return (
    <AuthContext.Provider
      value={{
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => React.useContext(AuthContext)
