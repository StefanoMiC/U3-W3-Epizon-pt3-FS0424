import { Badge, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { selectBookAction } from "../redux/actions";

// const Book = ({ book, changeBook, bookSelected }) => (
const Book = ({ book }) => {
  // useDispatch non ha bisogno di argomenti, vuole solo essere chiamata e ritornerà un'altra funzione che si salverà dentro la nostra variabile
  // questa variabile la potremo chiamare per attivare il processo di SCRITTURA nello Store
  const dispatch = useDispatch();

  // useSelector ci chiede una funzione per selezionare una porzione di stato, quello che ritorna la funzione sarà il dato trovato in quel valore di stato,
  // che verrà prelevato e assegnato alla variabile associata
  const bookSelected = useSelector(state => state.bookSelected.content);

  return (
    <Card
      className={bookSelected?.id === book.id ? "border-2 border-primary mt-3" : "border-2 mt-3"}
      onClick={
        () =>
          // changeBook(book)

          // la funzione dispatch ci chiede un oggetto ACTION come argomento
          // questo oggetto vuole un TYPE obbligatoriamente! e un eventuale PAYLOAD (questa volta ci servirà di sicuro per inviare il nostro book allo Store)

          // chiamare dispatch attiva il processo di cambio di stato globale:

          // dispatch(action) ==> Store ==> Reducer(state, action) ==> nuovo State

          // 1) il processo inizia con l'invio di una dispatch contenente un'azione
          // 2) questa azione viene ricevuta dallo Store che la passa al reducer come secondo argomento, e lo stato attuale come primo
          // 3) il reducer valuta l'action.type, capisce quale operazione dev'essere fatta grazie ad un matching-case, e infine computa il nuovo stato
          // 4) con il nuovo stato, tutti i componenti sottoscritti a quella porzione di stato vengono ri-renderizzati
          dispatch(selectBookAction(book))
        // dispatch({ type: SELECT_BOOK, payload: book })
      }
      style={{ cursor: "pointer" }}
    >
      <Card.Body className="d-flex">
        <img className="book-image" src={book.imageUrl} alt="book cover" />
        <div>
          <Card.Text className="font-weight-bold">
            <span className="d-block"> {book.title}</span>
            <Badge bg="info" text="dark">
              <small>{book.price}€</small>
            </Badge>
          </Card.Text>
        </div>
      </Card.Body>
    </Card>
  );
};

export default Book;
