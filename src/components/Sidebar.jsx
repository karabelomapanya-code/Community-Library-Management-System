import { useEffect, useState } from "react"
import { NavLink, useLocation, useNavigate } from "react-router-dom"

function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  const [loggedInUser, setLoggedInUser] = useState(null)

  useEffect(() => {
    const savedUser = sessionStorage.getItem("loggedInUser")

    if (savedUser) {
      setLoggedInUser(JSON.parse(savedUser))
    } else {
      setLoggedInUser(null)
    }
  }, [location.pathname])

  function handleLogout() {
    sessionStorage.removeItem("loggedInUser")
    setLoggedInUser(null)
    navigate("/login")
  }

  return (
    <aside className="sidebar">

      <div className="logo">
        <div className="logo-icon">
          🏛️
        </div>

        <h2>Community Library</h2>
      </div>

      <nav className="sidebar-nav">

        <NavLink to="/">
          🏠 Dashboard
        </NavLink>

        <NavLink to="/books">
          📚 Books
        </NavLink>

        {loggedInUser &&
          (loggedInUser.role === "Admin" ||
            loggedInUser.role === "Librarian") && (
            <NavLink to="/transactions">
              🔄 Transactions
            </NavLink>
          )}

        {loggedInUser &&
          loggedInUser.role === "Admin" && (
            <NavLink to="/users">
              👥 Users
            </NavLink>
          )}

        {!loggedInUser && (
          <NavLink to="/login">
            🔐 Login
          </NavLink>
        )}

      </nav>

      {loggedInUser && (
        <div className="logged-in-user">

          <div className="user-icon">
            👤
          </div>

          <div className="user-info">
            <strong>{loggedInUser.name}</strong>
            <span>{loggedInUser.role}</span>
          </div>

          <button
            className="logout-button"
            onClick={handleLogout}
          >
            🚪 Logout
          </button>

        </div>
      )}

    </aside>
  )
}

export default Sidebar