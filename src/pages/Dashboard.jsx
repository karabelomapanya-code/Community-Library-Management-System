import { useEffect, useState } from "react"

function Dashboard() {

  const [books, setBooks] = useState([])

  // Load books from Local Storage
  useEffect(() => {

    const savedBooks = localStorage.getItem("libraryBooks")

    if (savedBooks) {
      setBooks(JSON.parse(savedBooks))
    }

  }, [])

  // Calculate dashboard information
  const totalBooks = books.length

  const availableCopies = books.reduce(
    (total, book) => total + Number(book.quantity),
    0
  )

  const lowStock = books.filter(
    (book) => Number(book.quantity) < 2
  ).length

  return (

    <div className="dashboard-page">

      <h1>📊 Library Dashboard</h1>

      <p className="page-description">
        Overview of the current library books and availability.
      </p>

      {/* Dashboard Cards */}

      <div className="dashboard-cards">

        <div className="dashboard-card">

          <h3>📚 Total Books</h3>

          <p>{totalBooks}</p>

        </div>

        <div className="dashboard-card">

          <h3>📦 Available Copies</h3>

          <p>{availableCopies}</p>

        </div>

        <div className="dashboard-card">

          <h3>⚠️ Low Stock</h3>

          <p>{lowStock}</p>

        </div>

      </div>

      {/* Book Availability */}

      <div className="dashboard-table-card">

        <h2>📖 Current Book Availability</h2>

        {books.length === 0 ? (

          <p className="empty-message">
            No books have been added yet.
          </p>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Title</th>
                  <th>Author</th>
                  <th>Genre</th>
                  <th>Available Copies</th>
                  <th>Status</th>
                </tr>

              </thead>

              <tbody>

                {books.map((book) => (

                  <tr key={book.id}>

                    <td>{book.title}</td>

                    <td>{book.author}</td>

                    <td>{book.genre}</td>

                    <td>{book.quantity}</td>

                    <td>

                      {book.quantity < 2 ? (

                        <span className="status-low">
                          Low Stock
                        </span>

                      ) : (

                        <span className="status-available">
                          Available
                        </span>

                      )}

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

export default Dashboard