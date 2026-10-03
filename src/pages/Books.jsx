import { useEffect, useState } from "react"

function Books() {

  // Load saved books from Local Storage when the component starts
  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("libraryBooks")

    return savedBooks ? JSON.parse(savedBooks) : []
  })

  const [formData, setFormData] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    quantity: ""
  })

  const [editingId, setEditingId] = useState(null)

  // Save books to Local Storage whenever the books change
  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books))
  }, [books])

  // Handle input changes
  function handleChange(event) {

    const { name, value } = event.target

    setFormData({
      ...formData,
      [name]: value
    })
  }

  // Add or update a book
  function handleSubmit(event) {

    event.preventDefault()

    // Check that all fields have been filled
    if (
      !formData.title.trim() ||
      !formData.author.trim() ||
      !formData.genre.trim() ||
      !formData.isbn.trim() ||
      formData.quantity === ""
    ) {
      alert("Please fill in all fields.")
      return
    }

    if (Number(formData.quantity) < 0) {
      alert("Quantity cannot be negative.")
      return
    }

    // Update existing book
    if (editingId !== null) {

      setBooks(
        books.map((book) =>
          book.id === editingId
            ? {
                ...book,
                title: formData.title.trim(),
                author: formData.author.trim(),
                genre: formData.genre.trim(),
                isbn: formData.isbn.trim(),
                quantity: Number(formData.quantity)
              }
            : book
        )
      )

      setEditingId(null)

    } else {

      // Create a new book
      const newBook = {
        id: Date.now(),
        title: formData.title.trim(),
        author: formData.author.trim(),
        genre: formData.genre.trim(),
        isbn: formData.isbn.trim(),
        quantity: Number(formData.quantity)
      }

      setBooks((currentBooks) => [...currentBooks, newBook])
    }

    // Clear the form
    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: ""
    })
  }

  // Edit a book
  function handleEdit(book) {

    setEditingId(book.id)

    setFormData({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      quantity: book.quantity
    })

    // Scroll back to the form
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  // Delete a book
  function handleDelete(id) {

    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    )

    if (confirmed) {
      setBooks((currentBooks) =>
        currentBooks.filter((book) => book.id !== id)
      )
    }
  }

  // Cancel editing
  function handleCancel() {

    setEditingId(null)

    setFormData({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      quantity: ""
    })
  }

  return (

    <div className="books-page">

      <h1>📚 Book Management</h1>

      <p className="page-description">
        Add, update and manage library books.
      </p>

      {/* Book Form */}

      <div className="book-form-card">

        <h2>
          {editingId !== null
            ? "✏️ Update Book"
            : "➕ Add New Book"}
        </h2>

        <form onSubmit={handleSubmit}>

          <div className="form-grid">

            <div className="form-group">

              <label>Title</label>

              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter book title"
              />

            </div>

            <div className="form-group">

              <label>Author</label>

              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="Enter author name"
              />

            </div>

            <div className="form-group">

              <label>Genre</label>

              <input
                type="text"
                name="genre"
                value={formData.genre}
                onChange={handleChange}
                placeholder="Enter genre"
              />

            </div>

            <div className="form-group">

              <label>ISBN</label>

              <input
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                placeholder="Enter ISBN"
              />

            </div>

            <div className="form-group">

              <label>Initial Quantity</label>

              <input
                type="number"
                name="quantity"
                min="0"
                value={formData.quantity}
                onChange={handleChange}
                placeholder="Enter quantity"
              />

            </div>

          </div>

          <div className="form-buttons">

            <button
              type="submit"
              className="primary-button"
            >
              {editingId !== null
                ? "Update Book"
                : "Add Book"}
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

      {/* Books Table */}

      <div className="books-table-card">

        <h2>📖 Library Books</h2>

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
                  <th>ISBN</th>
                  <th>Stock</th>
                  <th>Actions</th>
                </tr>

              </thead>

              <tbody>

                {books.map((book) => (

                  <tr key={book.id}>

                    <td>{book.title}</td>

                    <td>{book.author}</td>

                    <td>{book.genre}</td>

                    <td>{book.isbn}</td>

                    <td>

                      <span
                        className={
                          book.quantity < 2
                            ? "stock low-stock"
                            : "stock"
                        }
                      >
                        {book.quantity}
                      </span>

                    </td>

                    <td>

                      <button
                        className="edit-button"
                        onClick={() => handleEdit(book)}
                      >
                        Edit
                      </button>

                      <button
                        className="delete-button"
                        onClick={() => handleDelete(book.id)}
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

export default Books