export const INITIAL = 'INITIAL'
export const FETCHING_ACCOUNTS = 'FETCHING_ACCOUNTS'
export const ACCOUNTS_FETCHED = 'ACCOUNTS_FETCHED'
export const ACCOUNTS_ERROR = 'ACCOUNTS_ERROR'
export const ACCOUNTS_CHANGED = 'ACCOUNTS_CHANGED'

export const initialAuthState = {
  isLoading: false,
  status: INITIAL,
  error: {},
  data: {},
}

const authReducer = (state = initialAuthState, action) => {
  switch (action.type) {
    case FETCHING_ACCOUNTS:
      return {
        ...state,
        isLoading: true,
        status: FETCHING_ACCOUNTS,
      }

    case ACCOUNTS_FETCHED:
    case ACCOUNTS_CHANGED:
      return {
        ...state,
        isLoading: false,
        status: ACCOUNTS_FETCHED,
        data: action.payload,
        error: null,
      }

    case ACCOUNTS_ERROR:
      return {
        ...state,
        isLoading: false,
        status: ACCOUNTS_ERROR,
        error: action.payload,
      }

    default:
      return state
  }
}

export default authReducer
