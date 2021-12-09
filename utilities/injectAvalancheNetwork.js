const AVALANCHE_MAINNET_PARAMS = {
  chainId: '0xA86A',
  chainName: 'Avalanche Mainnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://snowtrace.io/'],
}

const AVALANCHE_TESTNET_PARAMS = {
  chainId: '0xA869',
  chainName: 'Avalanche Testnet C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://api.avax-test.network/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
}

const AVALANCHE_LOCAL_PARAMS = {
  chainId: '0xA868',
  chainName: 'Avalanche Local C-Chain',
  nativeCurrency: {
    name: 'Avalanche',
    symbol: 'AVAX',
    decimals: 18,
  },
  rpcUrls: ['https://localhost:9650/ext/bc/C/rpc'],
  blockExplorerUrls: ['https://testnet.snowtrace.io/'],
}

export default function addAvalancheNetwork(network) {
  window.ethereum
    .request({
      method: 'wallet_addEthereumChain',
      params: [
        network === 'main'
          ? AVALANCHE_MAINNET_PARAMS
          : network === 'test'
          ? AVALANCHE_TESTNET_PARAMS
          : AVALANCHE_LOCAL_PARAMS,
      ],
    })
    .catch((error) => {
      console.log(error)
    })
}
