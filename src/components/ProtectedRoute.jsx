import { Navigate } from "react-router-dom"

function ProtectedRoute({ children, allowedRoles }) {
  const savedUser = sessionStorage.getItem("loggedInUser")

  if (!savedUser) {
    return <Navigate to="/login" replace />
  }

  const user = JSON.parse(savedUser)

  if (
    allowedRoles &&
    !allowedRoles.includes(user.role)
  ) {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute