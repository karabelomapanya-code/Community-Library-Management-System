import { useEffect, useState } from "react"

function Users() {

  // Load users from Local Storage when the page starts
  const [users, setUsers] = useState(() => {

    const savedUsers = localStorage.getItem("libraryUsers")

    if (savedUsers) {
      return JSON.parse(savedUsers)
    }

    return []
  })

  // Form data
  const [formData, setFormData] = useState({
    name: "",
    membershipId: "",
    role: "Member"
  })

  // Store the ID of the user being edited
  const [editingId, setEditingId] = useState(null)

  // Save users to Local Storage whenever users change
  useEffect(() => {

    localStorage.setItem(
      "libraryUsers",
      JSON.stringify(users)
    )

  }, [users])

  // Handle form changes
  function handleChange(event) {

    const { name, value } = event.target

    setFormData((currentData) => ({
      ...currentData,
      [name]: value
    }))
  }

  // Add or update user
  function handleSubmit(event) {

    event.preventDefault()

    // Check required fields
    if (
      !formData.name.trim() ||
      !formData.membershipId.trim()
    ) {

      alert("Please fill in all fields.")

      return
    }

    // Update user
    if (editingId !== null) {

      setUsers((currentUsers) =>
        currentUsers.map((user) =>
          user.id === editingId
            ? {
                ...user,
                name: formData.name.trim(),
                membershipId: formData.membershipId.trim(),
                role: formData.role
              }
            : user
        )
      )

      setEditingId(null)

    } else {

      // Add new user
      const newUser = {
        id: Date.now(),
        name: formData.name.trim(),
        membershipId: formData.membershipId.trim(),
        role: formData.role
      }

      setUsers((currentUsers) => [
        ...currentUsers,
        newUser
      ])
    }

    // Clear form
    setFormData({
      name: "",
      membershipId: "",
      role: "Member"
    })
  }

  // Edit user
  function handleEdit(user) {

    setEditingId(user.id)

    setFormData({
      name: user.name,
      membershipId: user.membershipId,
      role: user.role
    })

    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Delete user
  function handleDelete(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this user?"
    )

    if (confirmed) {

      setUsers((currentUsers) =>
        currentUsers.filter(
          (user) => user.id !== id
        )
      )
    }
  }

  // Cancel editing
  function handleCancel() {

    setEditingId(null)

    setFormData({
      name: "",
      membershipId: "",
      role: "Member"
    })
  }

  return (

    <div className="users-page">

      <h1>👥 User Management</h1>

      <p className="page-description">
        Add, update and manage library users.
      </p>

      {/* User Form */}

      <div className="user-form-card">

        <h2>
          {editingId !== null
            ? "✏️ Update User"
            : "➕ Add New User"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="user-form-grid">

            <div className="form-group">

              <label>Name</label>

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter user's name"
              />

            </div>

            <div className="form-group">

              <label>Membership ID</label>

              <input
                type="text"
                name="membershipId"
                value={formData.membershipId}
                onChange={handleChange}
                placeholder="Enter membership ID"
              />

            </div>

            <div className="form-group">

              <label>Role</label>

              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
              >

                <option value="Member">
                  Member
                </option>

                <option value="Librarian">
                  Librarian
                </option>

                <option value="Admin">
                  Admin
                </option>

              </select>

            </div>

          </div>

          <div className="form-buttons">

            <button
              type="submit"
              className="primary-button"
            >
              {editingId !== null
                ? "Update User"
                : "Add User"}
            </button>

            {editingId !== null && (

              <button
                type="button"
                className="cancel-button"
                onClick={handleCancel}
              >
                Cancel
              </button>

            )}

          </div>

        </form>

      </div>

      {/* Users Table */}

      <div className="users-table-card">

        <h2>👤 Library Users</h2>

        {users.length === 0 ? (

          <p className="empty-message">
            No users have been added yet.
          </p>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Name</th>
                  <th>Membership ID</th>
                  <th>Role</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {users.map((user) => (

                  <tr key={user.id}>

                    <td>{user.name}</td>

                    <td>{user.membershipId}</td>

                    <td>

                      <span className="role-badge">
                        {user.role}
                      </span>

                    </td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() =>
                          handleEdit(user)
                        }
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() =>
                          handleDelete(user.id)
                        }
                      >
                        Delete
                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

    </div>
  )
}

export default Users

