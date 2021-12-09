import {
  ACCOUNTS_CHANGED,
  ACCOUNTS_ERROR,
  ACCOUNTS_FETCHED,
  FETCHING_ACCOUNTS,
} from './authReducer'

export const errorStatuses = {
  NO_ETHEREUM_FOUND: 'NO_ETHEREUM_FOUND',
  NO_ACCOUNTS_FOUND: 'NO_ACCOUNTS_FOUND',
  UNAUTHORIZED: 'UNAUTHORIZED',
}

const handleAccount = async ({ dispatch, accounts, isChanged }) => {
  try {
    if (accounts.length === 0) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: errorStatuses.NO_ACCOUNTS_FOUND,
      })
    } else {
      dispatch({
        type: isChanged ? ACCOUNTS_CHANGED : ACCOUNTS_FETCHED,
        payload: accounts,
      })
    }
  } catch (error) {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: error,
    })
  }
}

export const getAccountsAction = async ({
  method,
  dispatch,
  contract,
  shouldReload = true,
}) => {
  const { ethereum } = window

  if (shouldReload) {
    dispatch({ type: FETCHING_ACCOUNTS })
  }

  if (ethereum) {
    try {
      const accounts = await ethereum.request({ method })

      if (accounts.length) {
        handleAccount({ accounts, dispatch, contract })
      } else {
        dispatch({
          type: ACCOUNTS_ERROR,
          payload: errorStatuses.NO_ACCOUNTS_FOUND,
        })
      }
    } catch (error) {
      dispatch({
        type: ACCOUNTS_ERROR,
        payload: error.code,
      })
    }
  } else {
    dispatch({
      type: ACCOUNTS_ERROR,
      payload: errorStatuses.NO_ETHEREUM_FOUND,
    })
  }
}

export const accountsChangedAction = async ({
  dispatch,
  accounts,
  onSuccess,
}) => {
  await handleAccount({ accounts, dispatch, isChanged: true })

  if (onSuccess && typeof onSuccess === 'function') {
    onSuccess()
  }
}
