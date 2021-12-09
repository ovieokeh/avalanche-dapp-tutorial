import React, {
  createContext,
  useReducer,
  useContext,
  useMemo,
  useEffect,
} from 'react'

import dispatchLogger from '../../utilities/dispatchLogger'
import {
  accountsChangedAction,
  errorStatuses,
  getAccountsAction,
} from './authActions'
import authReducer, { ACCOUNTS_ERROR, initialAuthState } from './authReducer'

const validAvalancheChains = ['0XA868', '0XA869', '0XA86A']

const AuthContext = createContext()

const getInitialAuthState = () => {
  let authState = initialAuthState

  if (typeof window !== 'undefined') {
    const authStateString = localStorage.getItem('authState')
    if (authStateString) {
      authState = JSON.parse(authStateString)
      authState.isHydrated = true
    }
  }

  return authState
}

export const AuthProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, getInitialAuthState())

  useEffect(() => {
    const stringifiedAuthState = JSON.stringify(authState)
    localStorage.setItem('authState', stringifiedAuthState)
  }, [authState])

  const dispatchWithLogging = useMemo(() => dispatchLogger(dispatch), [])

  useEffect(() => {
    const setupAccounts = async () => {
      await getAccountsAction({
        method: 'eth_accounts',
        dispatch: dispatchWithLogging,
        shouldReload: !authState.isHydrated,
      })

      if (window.ethereum) {
        window.ethereum.on('accountsChanged', (accounts) => {
          accountsChangedAction({
            dispatch: dispatchWithLogging,
            accounts,
          })
        })

        window.ethereum.on('chainChanged', () => {
          window.location.reload()
        })
      }
    }

    setupAccounts()
  }, [dispatchWithLogging, authState.isHydrated])

  useEffect(() => {
    if (window.ethereum && window.ethereum.chainId) {
      if (
        !validAvalancheChains.includes(window.ethereum.chainId.toUpperCase())
      ) {
        throw new Error('wrong network')
      }
    }
  }, [])

  const connectWallet = async () => {
    const { status, data } = authState

    const hasNoEthereum =
      status === ACCOUNTS_ERROR &&
      data.error === errorStatuses.NO_ETHEREUM_FOUND
    if (hasNoEthereum) return

    await getAccountsAction({
      method: 'eth_requestAccounts',
      dispatch: dispatchWithLogging,
    })
  }

  return (
    <AuthContext.Provider value={{ authState, dispatch, connectWallet }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuthContext = () => useContext(AuthContext)
