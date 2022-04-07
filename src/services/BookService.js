import axios from "axios";

const BOOK_API_BASE_URL = "http://localhost:8080/api/v1/books";

class BookService {
  getBooks() {
    return axios.get(BOOK_API_BASE_URL);
  }

  addBook(book) {
    return axios.post(BOOK_API_BASE_URL, book);
  }

  getBookById(id) {
    return axios.get(BOOK_API_BASE_URL + "/" + id);
  }

  updateBook(book, bookId) {
    return axios.put(BOOK_API_BASE_URL + "/" + bookId, book);
  }

  deleteBook(bookId) {
    return axios.delete(BOOK_API_BASE_URL + "/" + bookId);
  }
}

export default new BookService();
