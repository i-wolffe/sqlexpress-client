import React from "react"
import PermissionContext from "./permissionContext"

// This provider is intended to be surrounding the whole application.
// It should receive the users permissions as parameter
const PermissionProvider = ({ permissions, children }) => {
  // Creates a method that returns whether the requested permission is available in the list of permissions
  // passed as parameter
  const isAllowedTo = permission => permissions.includes(permission)

  // This component will render its children wrapped around a PermissionContext's provider whose
  // value is set to the method defined above
  return (
    <PermissionContext.Provider value={{ isAllowedTo }}>
      {children}
    </PermissionContext.Provider>
  )
}

export default PermissionProvider