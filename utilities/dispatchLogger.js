/* eslint-disable no-console */
const PROD_ENVS = ['']

/**
 * This util logs all dispatch calls to the console
 * on non-production environment.
 *
 * This is useful for debugging what actions are being
 * made and what data is being passed around.
 *
 * @param {function} dispatch
 * @returns {void}
 */
function dispatchLogger(dispatch) {
  return (action) => {
    if (!PROD_ENVS.includes(window.location.href)) {
      console.log(action)
    }

    dispatch(action)
  }
}

export default dispatchLogger
