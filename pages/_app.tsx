import "tailwindcss/tailwind.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthProvider } from "../components/context/auth"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  )
}
export default MyApp
