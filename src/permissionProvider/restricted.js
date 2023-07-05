import React from "react"
import usePermission from "./usePermissions"

// This component is meant to be used everywhere a restriction based on user permission is needed
const Restricted = ({ to, fallback, children }) => {
  // We "connect" to the provider thanks to the permission hook
  const allowed = usePermission(to)

  // If the user has that permission, render the children
  if (allowed) {
    return <>{children}</>
  }

  // Otherwise, render the fallback
  return <>{fallback}</>
}

export default Restricted