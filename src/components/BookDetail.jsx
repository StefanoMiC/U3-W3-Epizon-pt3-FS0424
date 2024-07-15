import { Col, Row, Button, Alert } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addToCartActionWithThunk } from "../redux/actions";

// const BookDetail = ({bookSelected}) => {
const BookDetail = () => {
  const bookSelected = useSelector(state => state.bookSelected.content);
  const user = useSelector(state => state.user.content);

  const dispatch = useDispatch();

  return (
    <div className="mt-3 mb-4 mb-lg-0">
      {bookSelected ? (
        <>
          <Row>
            <Col sm={12}>
              <h1>{bookSelected.title}</h1>
            </Col>
          </Row>
          <Row className="mt-3">
            <Col sm={4}>
              <div className="mt-3">
                <img className="book-cover" src={bookSelected.imageUrl} alt="book selected" />
              </div>
            </Col>
            <Col sm={8}>
              <p>
                <span className="font-weight-bold">Description:</span>&nbsp;
                {bookSelected.description}
              </p>
              <p>
                <span className="fs-1 fw-lighter">{bookSelected.price}€</span>
              </p>

              {user ? (
                <Button
                  color="primary"
                  onClick={() => {
                    dispatch(addToCartActionWithThunk(bookSelected));
                    // dispatch(addToCartAction(bookSelected));
                    // dispatch({ type: ADD_TO_CART, payload: bookSelected });
                  }}
                >
                  Aggiungi al carrello
                </Button>
              ) : (
                <Alert bg="info" text="dark">
                  Devi loggarti per poter inserire prodotti nel carrello ☝️
                </Alert>
              )}
            </Col>
          </Row>
        </>
      ) : (
        <Row>
          <Col sm={12}>
            <h3 className="display-6">👈 Seleziona un libro per cominciare!</h3>
          </Col>
        </Row>
      )}
    </div>
  );
};

export default BookDetail;
