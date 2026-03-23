import addresses from 'config/constants/contracts'

const cluster = process.env.REACT_APP_SOLANA_CLUSTER || 'devnet'

export const getCakeAddress = () => {
  return addresses.cake[cluster]
}
export const getCake3Address = () => {
  return addresses.cake3[cluster]
}
export const getMasterChefAddress = () => {
  return addresses.masterChef[cluster]
}
export const getMasterChef3Address = () => {
  return addresses.masterChef3[cluster]
}
export const getWsolAddress = () => {
  return addresses.wsol[cluster]
}
export const getLotteryAddress = () => {
  return addresses.lottery[cluster]
}
export const getLotteryTicketAddress = () => {
  return addresses.lotteryNFT[cluster]
}
