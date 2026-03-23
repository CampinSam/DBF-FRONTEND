// Re-exports useConnection from Solana wallet adapter for backwards compatibility.
// Use useSolanaConnection directly in new code.
export { useConnection as default } from '@solana/wallet-adapter-react'
export { useConnection as useSolanaConnection } from '@solana/wallet-adapter-react'
