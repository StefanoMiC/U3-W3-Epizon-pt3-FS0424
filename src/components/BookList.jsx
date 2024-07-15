import { useSelector } from "react-redux";
import Book from "./Book";
import { Spinner } from "react-bootstrap";

// const BookList = ({ books, changeBook, bookSelected }) => (
const BookList = () => {
  const books = useSelector(state => state.books.content);
  const isLoading = useSelector(state => state.books.isLoading);
  return (
    <div className="mb-3">
      {isLoading ? (
        <Spinner animatino="border" variant="primary" />
      ) : (
        books.map(book => (
          <Book
            key={book.id}
            book={book}
            // changeBook={changeBook}
            // bookSelected={bookSelected}
          />
        ))
      )}
    </div>
  );
};

export default BookList;
