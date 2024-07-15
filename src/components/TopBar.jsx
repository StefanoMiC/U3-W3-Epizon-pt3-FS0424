import { Col, Image, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartIndicator from "./CartIndicator";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getBooksAction } from "../redux/actions";

const TopBar = () => {
  const bookSelected = useSelector(state => state.bookSelected.content);

  const dispatch = useDispatch();
  useEffect(() => {
    // getBooks();

    // gli action creator vanno sempre usati dentro a delle dispatch, ANCHE SE usano una dispatch internamente, non è la stessa cosa!
    // quella interna segnala a quella esterna quando è il momento di riprendere le operazioni.
    dispatch(getBooksAction());
  }, []);
  return (
    <Row>
      <Col sm={12} className="text-center background-div">
        <Link to="/" className="text-decoration-none">
          <h1 className="display-4 d-inline-block align-middle me-3">Epizon Book Store</h1>
          {bookSelected && <Image src={bookSelected.imageUrl} height={100} />}
        </Link>
      </Col>
      <Col>
        <CartIndicator />
      </Col>
    </Row>
  );
};
export default TopBar;
