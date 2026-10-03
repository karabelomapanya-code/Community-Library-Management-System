import { useEffect, useState } from "react"

function Transactions() {

  const [books, setBooks] = useState(() => {
    const savedBooks = localStorage.getItem("libraryBooks")

    return savedBooks ? JSON.parse(savedBooks) : []
  })

  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("libraryTransactions")

    return savedTransactions ? JSON.parse(savedTransactions) : []
  })

  const [bookId, setBookId] = useState("")
  const [type, setType] = useState("borrow")
  const [quantity, setQuantity] = useState("1")

  // Save books whenever they change
  useEffect(() => {
    localStorage.setItem("libraryBooks", JSON.stringify(books))
  }, [books])

  // Save transactions whenever they change
  useEffect(() => {
    localStorage.setItem(
      "libraryTransactions",
      JSON.stringify(transactions)
    )
  }, [transactions])

  function handleSubmit(event) {

    event.preventDefault()

    if (!bookId) {
      alert("Please select a book.")
      return
    }

    const amount = Number(quantity)

    if (amount <= 0) {
      alert("Quantity must be greater than 0.")
      return
    }

    const selectedBook = books.find(
      (book) => book.id === Number(bookId)
    )

    if (!selectedBook) {
      alert("Book not found.")
      return
    }

    // Borrowing a book
    if (type === "borrow") {

      if (selectedBook.quantity < amount) {
        alert("Not enough copies available.")
        return
      }

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === selectedBook.id
            ? {
                ...book,
                quantity: book.quantity - amount
              }
            : book
        )
      )

    }

    // Adding stock
    if (type === "return") {

      setBooks((currentBooks) =>
        currentBooks.map((book) =>
          book.id === selectedBook.id
            ? {
                ...book,
                quantity: book.quantity + amount
              }
            : book
        )
      )

    }

    // Create transaction record
    const newTransaction = {
      id: Date.now(),
      bookTitle: selectedBook.title,
      type: type,
      quantity: amount,
      date: new Date().toLocaleString()
    }

    setTransactions((currentTransactions) => [
      newTransaction,
      ...currentTransactions
    ])

    // Reset form
    setBookId("")
    setQuantity("1")
  }

  return (

    <div className="transactions-page">

      <h1>🔄 Transactions</h1>

      <p className="page-description">
        Borrow books and add returned or new stock.
      </p>

      {/* Transaction Form */}

      <div className="transaction-form-card">

        <h2>➕ New Transaction</h2>

        <form onSubmit={handleSubmit}>

          <div className="transaction-form-grid">

            <div className="form-group">

              <label>Book</label>

              <select
                value={bookId}
                onChange={(event) => setBookId(event.target.value)}
              >

                <option value="">
                  Select a book
                </option>

                {books.map((book) => (

                  <option
                    key={book.id}
                    value={book.id}
                  >
                    {book.title} — {book.quantity} available
                  </option>

                ))}

              </select>

            </div>

            <div className="form-group">

              <label>Transaction Type</label>

              <select
                value={type}
                onChange={(event) => setType(event.target.value)}
              >

                <option value="borrow">
                  Borrow Book
                </option>

                <option value="return">
                  Add Stock / Return
                </option>

              </select>

            </div>

            <div className="form-group">

              <label>Quantity</label>

              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(event) => setQuantity(event.target.value)}
              />

            </div>

          </div>

          <div className="form-buttons">

            <button
              type="submit"
              className="primary-button"
            >
              Save Transaction
            </button>

          </div>

        </form>

      </div>

      {/* Transaction History */}

      <div className="transaction-history-card">

        <h2>📋 Transaction History</h2>

        {transactions.length === 0 ? (

          <p className="empty-message">
            No transactions have been recorded yet.
          </p>

        ) : (

          <div className="table-container">

            <table>

              <thead>

                <tr>
                  <th>Book</th>
                  <th>Type</th>
                  <th>Quantity</th>
                  <th>Date</th>
                </tr>

              </thead>

              <tbody>

                {transactions.map((transaction) => (

                  <tr key={transaction.id}>

                    <td>{transaction.bookTitle}</td>

                    <td>

                      {transaction.type === "borrow"
                        ? "📖 Borrowed"
                        : "📦 Stock Added"}

                    </td>

                    <td>{transaction.quantity}</td>

                    <td>{transaction.date}</td>

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

export default Transactions

