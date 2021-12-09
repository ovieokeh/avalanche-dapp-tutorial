import ErrorBoundary from '../components/error-boundary/ErrorBoundary'
import { AuthProvider } from '../context/auth/authContext'
import { AvaxboxProvider } from '../context/avaxbox/avaxboxContext'

import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <AvaxboxProvider>
          <Component {...pageProps} />
        </AvaxboxProvider>
      </AuthProvider>
    </ErrorBoundary>
  )
}

export default MyApp
