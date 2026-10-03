import { useState } from "react"
import { useNavigate } from "react-router-dom"

function Login() {

  const navigate = useNavigate()

  const [name, setName] = useState("")
  const [membershipId, setMembershipId] = useState("")

  function handleLogin(event) {

    event.preventDefault()

    // Get users saved in Local Storage
    const savedUsers = localStorage.getItem("libraryUsers")

    if (!savedUsers) {

      alert("No users have been registered yet.")

      return
    }

    const users = JSON.parse(savedUsers)

    // Find a user with matching name and membership ID
    const user = users.find(
      (currentUser) =>
        currentUser.name.toLowerCase() ===
          name.trim().toLowerCase() &&
        currentUser.membershipId.toLowerCase() ===
          membershipId.trim().toLowerCase()
    )

    if (!user) {

      alert("Invalid name or membership ID.")

      return
    }

    // Save the logged-in user
    sessionStorage.setItem(
      "loggedInUser",
      JSON.stringify(user)
    )

    alert(`Welcome, ${user.name}!`)

    // Go to Dashboard
    navigate("/")
  }

  return (

    <div className="login-page">

      <div className="login-card">

        <div className="login-icon">
          🔐
        </div>

        <h1>Library Login</h1>

        <p>
          Login using your library membership details.
        </p>

        <form onSubmit={handleLogin}>

          <div className="form-group">

            <label>Name</label>

            <input
              type="text"
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
              placeholder="Enter your name"
            />

          </div>

          <div className="form-group">

            <label>Membership ID</label>

            <input
              type="text"
              value={membershipId}
              onChange={(event) =>
                setMembershipId(event.target.value)
              }
              placeholder="Enter membership ID"
            />

          </div>

          <button
            type="submit"
            className="login-button"
          >
            🔓 Login
          </button>

        </form>

      </div>

    </div>
  )
}

export default Login
