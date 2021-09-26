import * as React from "react"
import { FilledButton } from "../../../components/elements/button/filled"
import { Layout } from "../../../components/layout/secondary"
import firebase from "firebase/app"
import { getValueFromLocalStorage } from "../../../utilities/local_storage"
import { verifyIdToken } from "../../../utilities/firebase_admin"

const TextInput = (
  props: React.DetailedHTMLProps<
    React.InputHTMLAttributes<HTMLInputElement>,
    HTMLInputElement
  >
) => <input className="py-2 border-2 border-green-500 pl-1" {...props} />

export default function Login() {
  const [email, setEmail] = React.useState<string | null>(null)
  const [password, setPassword] = React.useState<string | null>(null)
  return (
    <Layout title="Login">
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <h1 className="text-green-500 xs:text-xl sm:text-2xl md:text-3xl mb-5">
            Food Dhaba
          </h1>
          <div className="mt-2">
            <TextInput
              placeholder="Email"
              type="email"
              onChange={(e) => {
                setEmail(e.target.value)
              }}
            />
          </div>
          <div className="mt-2">
            <TextInput
              placeholder="Password"
              type="password"
              onChange={(e) => {
                setPassword(e.target.value)
              }}
            />
          </div>
          <div className="mt-5">
            <FilledButton
              title="Log in"
              onClick={async () => {
                try {
                  if (email && password) {
                    await firebase
                      .auth()
                      .signInWithEmailAndPassword(email, password)
                      .then(() => (window.location.href = "/"))
                      .catch((error) => {
                        //error)
                      })
                  } else {
                    //"email or password is invalid")
                  }
                } catch (error) {
                  //error)
                }
              }}
            />
          </div>
        </div>
      </div>
    </Layout>
  )
}
