import { useContext } from "react"
import PermissionContext from "./permissionContext"

const usePermission = permission => {
  const { isAllowedTo } = useContext(PermissionContext)
  return isAllowedTo(permission)
}

export default usePermission
