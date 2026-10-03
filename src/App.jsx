import { BrowserRouter, Routes, Route } from "react-router-dom"

import Sidebar from "./components/Sidebar"
import ProtectedRoute from "./components/ProtectedRoute"

import Dashboard from "./pages/Dashboard"
import Books from "./pages/Books"
import Transactions from "./pages/Transactions"
import Users from "./pages/Users"
import Login from "./pages/Login"

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Sidebar />

        <main className="main-content">
          <Routes>

            <Route
              path="/login"
              element={<Login />}
            />

            <Route
              path="/"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Librarian",
                    "Member"
                  ]}
                >
                  <Dashboard />
                </ProtectedRoute>
              }
            />

            <Route
              path="/books"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Librarian",
                    "Member"
                  ]}
                >
                  <Books />
                </ProtectedRoute>
              }
            />

            <Route
              path="/transactions"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin",
                    "Librarian"
                  ]}
                >
                  <Transactions />
                </ProtectedRoute>
              }
            />

            <Route
              path="/users"
              element={
                <ProtectedRoute
                  allowedRoles={[
                    "Admin"
                  ]}
                >
                  <Users />
                </ProtectedRoute>
              }
            />

          </Routes>
        </main>
      </div>
    </BrowserRouter>
  )
}

export default App