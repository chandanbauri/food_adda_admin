import "tailwindcss/tailwind.css"
import "../styles/globals.css"
import type { AppProps } from "next/app"
import { AuthProvider } from "../components/context/auth"
import { ResourceProvider } from "../components/context/Resource"

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthProvider>
      <ResourceProvider>
        <Component {...pageProps} />
      </ResourceProvider>
    </AuthProvider>
  )
}
export default MyApp
