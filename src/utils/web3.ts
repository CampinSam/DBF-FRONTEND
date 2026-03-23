// Solana compatibility shim - replaces the old web3.ts BSC implementation
// All blockchain interactions now use @solana/web3.js via utils/solana.ts
export { getConnection as getWeb3, getConnection, getReadOnlyProvider } from 'utils/solana'
