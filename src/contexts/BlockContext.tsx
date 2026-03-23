import React, { useState, useEffect, useRef } from 'react'
import { getConnection } from 'utils/solana'

const BlockContext = React.createContext(0)

const BlockContextProvider = ({ children }) => {
  const previousSlot = useRef(0)
  const [slot, setSlot] = useState(0)

  useEffect(() => {
    const connection = getConnection()
    const interval = setInterval(async () => {
      const currentSlot = await connection.getSlot()
      if (currentSlot !== previousSlot.current) {
        previousSlot.current = currentSlot
        setSlot(currentSlot)
      }
    }, 6000)

    return () => clearInterval(interval)
  }, [])

  return <BlockContext.Provider value={slot}>{children}</BlockContext.Provider>
}

export { BlockContext, BlockContextProvider }
