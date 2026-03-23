// Constructs Raydium liquidity URL path parts for a token pair
// Each part represents a token mint address on Solana
const getLiquidityUrlPathParts = ({ quoteTokenAdresses, quoteTokenSymbol, tokenAddresses }) => {
  const cluster = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'
  // On Solana, native SOL is represented by the wrapped SOL mint
  const WSOL_MINT = 'So11111111111111111111111111111111111111112'
  const firstPart = quoteTokenSymbol === 'SOL' ? WSOL_MINT : quoteTokenAdresses[cluster]
  const secondPart = tokenAddresses[cluster]
  return `${firstPart}/${secondPart}`
}

export default getLiquidityUrlPathParts
