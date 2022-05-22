//import '../styles/globals.css'
import { AuthProvider } from "../context/AuthContext";
import { GlobalStyles } from 'twin.macro'

function MyApp({ Component, pageProps }) {

  return (
    <>
      <AuthProvider>
      <GlobalStyles />
        <Component {...pageProps} />
      </AuthProvider>
    </>
  )
}

export default MyApp