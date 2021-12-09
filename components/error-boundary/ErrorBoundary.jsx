import React from 'react'

import Button from '../button/Button'
import Error from '../error/Error'

import addAvalancheNetwork from '../../utilities/injectAvalancheNetwork'

import styles from './ErrorBoundary.module.scss'

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    // Update state so the next render will show the fallback UI.
    return { hasError: true }
  }

  renderConnectButtons() {
    const networks = ['local', 'test', 'main']

    return networks.map((network) => (
      <Button
        key={network}
        onClick={() => addAvalancheNetwork(network)}
        extraClassnames={styles.boundaryButton}
      >
        Connect to Avalanche {network} network
      </Button>
    ))
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return (
        <div className={styles.boundary}>
          <Error />

          {this.renderConnectButtons()}
        </div>
      )
    }

    return this.props.children
  }
}
