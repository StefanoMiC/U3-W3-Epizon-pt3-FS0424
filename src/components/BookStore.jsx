// import { useEffect } from "react";
import { Alert, Col, Row } from "react-bootstrap";
import BookList from "./BookList";
import BookDetail from "./BookDetail";
import { useSelector } from "react-redux";
// import { getBooksAction } from "../redux/actions";
// import { useDispatch } from "react-redux";

const BookStore = () => {
  const hasError = useSelector(state => state.books.hasError);
  const errorMessage = useSelector(state => state.books.errorMessage);

  // const [books, setBooks] = useState([]);
  // const [bookSelected, setBookSelected] = useState(null);

  // const getBooks = async () => {
  //   try {
  //     let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
  //     if (resp.ok) {
  //       let fetchedBooks = await resp.json();
  //       setBooks(fetchedBooks);
  //     } else {
  //       console.log("error");
  //     }
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const changeBook = book => setBookSelected(book);

  return (
    <Row className="center-row">
      {hasError ? (
        <Col>
          <Alert variant="danger">{errorMessage}</Alert>
        </Col>
      ) : (
        <>
          <Col lg={4}>
            <BookList
            // books={books}
            // changeBook={changeBook}
            // bookSelected={bookSelected}
            />
          </Col>
          <Col lg={8}>
            <BookDetail
            // bookSelected={bookSelected}
            />
          </Col>
        </>
      )}
    </Row>
  );
};

export default BookStore;
