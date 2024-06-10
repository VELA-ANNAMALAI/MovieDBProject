import React from 'react'
import { ClerkProvider as CP } from '@clerk/clerk-react'
import { useNavigate } from 'react-router-dom'


const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
 
if (!PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}

const ClerkProvider = ({ children }) => {
  return (
    <CP publishableKey={PUBLISHABLE_KEY}>
      {children}
    </CP>
  )
}

export default ClerkProvider