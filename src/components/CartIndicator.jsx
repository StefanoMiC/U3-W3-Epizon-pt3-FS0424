import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { Button, Container, Form, FormControl } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setUserAction } from "../redux/actions";

const CartIndicator = () => {
  const [inputValue, setInputValue] = useState("");

  const dispatch = useDispatch();

  const cartLength = useSelector(state => state.cart.content.length);
  const user = useSelector(state => state.user.content);

  return (
    <Container>
      <div className="text-end mt-3 mb-4 px-0">
        <div className="d-flex justify-content-end align-items-center">
          {user ? (
            <>
              <span className="me-2">
                Ciao, <strong>{user}</strong>
              </span>
              <Link to="/cart" className="btn btn-primary">
                <FaShoppingCart />
                <span className="ms-2">{cartLength}</span>
              </Link>
            </>
          ) : (
            <Form
              className="d-inline-flex"
              onSubmit={e => {
                e.preventDefault();

                dispatch(setUserAction(inputValue));
                // dispatch({ type: SET_USER, payload: inputValue });
              }}
            >
              <FormControl placeholder="Inserisci il tuo nome" value={inputValue} onChange={e => setInputValue(e.target.value)} />
              <Button variant="info" type="submit" className="flex-shrink-0">
                Log In
              </Button>
            </Form>
          )}
        </div>
      </div>
    </Container>
  );
};

export default CartIndicator;
