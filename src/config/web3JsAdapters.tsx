import { SolanaAdapter } from '@reown/appkit-adapter-solana/react'

// export const projectId = 'b96d7e3096dd5e7397590eaea20e542f' // this is a public projectId only to use on localhost
export const projectId = '9809fb0889c81ef455784b3126b966ee' 

if (!projectId) {
  throw new Error('Project ID is not defined')
}

// Set up Solana Adapter
export const solanaWeb3JsAdapter = new SolanaAdapter()