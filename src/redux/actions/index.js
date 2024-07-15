export const ADD_TO_CART = "ADD_TO_CART";
export const REMOVE_FROM_CART = "REMOVE_FROM_CART";
export const SELECT_BOOK = "SELECT_BOOK";
export const SET_USER = "SET_USER";
export const GET_BOOKS = "GET_BOOKS";
export const GET_BOOKS_LOADING_ON = "GET_BOOKS_LOADING_ON";
export const GET_BOOKS_LOADING_OFF = "GET_BOOKS_LOADING_OFF";
export const GET_BOOKS_ERROR_ON = "GET_BOOKS_ERROR_ON";
export const GET_BOOKS_ERROR_OFF = "GET_BOOKS_ERROR_OFF";

// ACTION CREATORS - Funzioni che ritornano l'azione (l'oggetto)

// export const addToCartAction = (bookSelected) => {
//     // operazioni da fare, prima di tornare l'action
//     return { type: ADD_TO_CART, payload: bookSelected }
// }

// export const addToCartAction = bookSelected => ({ type: ADD_TO_CART, payload: bookSelected });
// riscriviamo l'action creator per l'aggiunta al carrello in modo che possa gestire un inserimento CONDIZIONALE, ovvero inserire solo libri univoci.
// (vedi addToCartActionWithThunk qui sotto )

export const removeFromCartAction = i => ({ type: REMOVE_FROM_CART, payload: i });
export const selectBookAction = book => ({ type: SELECT_BOOK, payload: book });
export const setUserAction = inputValue => ({ type: SET_USER, payload: inputValue });

// grazie a redux-thunk, che è un middleware GIA' INTEGRATO nel nostro configureStore dei redux toolkit
// possiamo creare degli action creator che ritornino NON SOLO una singola ACTION (oggetto)
// ma anche FUNZIONI! col vantaggio che queste funzioni possono eseguire della logica PRIMA di tornare l'oggetto e soprattutto

export const addToCartActionWithThunk = bookSelected => {
  return (dispatch, getState) => {
    const currentState = getState();
    const userName = currentState.user.content;

    // .findIndex() restituisce il valore numerico dell'indice della posizione trovata nell'array su cui è utilizzato
    // quindi ci darà un valore positivo SE trova un un libro nel carrello con lo stesso id di bookSelected.id
    // tornerà -1 invece quando NON avrà trovato corrispondenza per il libro (bookSelected) che stiamo cercando di inserire in quel momento nel carrello
    const foundIndexBook = currentState.cart.content.findIndex(book => book.id === bookSelected.id);
    // se foundIndexBook è -1 significa che il findIndex non ha trovato corrispondenza, non esiste ancora uno stesso libro nel carrello
    const bookIsNotAlreadyInCart = foundIndexBook === -1;
    // questa variabile di conseguenza sarà true quando non c'è stata corrispondenza, ovvero quando il carrello non ha ancora un libro simile all'interno.
    if (bookIsNotAlreadyInCart) {
      // se siamo qui vuol dire che possiamo inserire il libro selezionato, perché non è già presente nel carrello.
      dispatch({ type: ADD_TO_CART, payload: bookSelected });
    } else {
      // altrimenti diamo un messaggio all'utente che il libro esiste già
      alert(userName + " guarda che il libro l'hai già inserito prima...!");
    }
  };
};
// essendo funzioni possono essere dichiarate come async, o eseguire delle promise all'interno! per poi chiamare la dispatch ad operazione conclusa!

// export const getBooksAction = (outerParam) => { // outerParam è un eventuale parametro che possiamo passare da fuori quando usiamo l'action creator.
export const getBooksAction = () => {
  // la funzione RITORNATA dal nostro action creator è quella che possiamo rendere async,
  // thunk ci permetterà di eseguire le nostre logiche e di azionare la dispatch in un secondo momento
  return async (dispatch, getState) => {
    // come primo parametro ci viene regalata la funzione dispatch, SEMPRE necessaria per l'invio di un'action al reducer
    // per essere sincronizzati col momento effettivo in cui siamo pronti ad inviarla, dopo l'arrivo dei dati da una fetch che è asincrona
    console.log("GET STATE", getState()); // ritorna l'intero oggetto di stato globale

    dispatch({ type: GET_BOOKS_LOADING_ON });
    try {
      let resp = await fetch("https://striveschool-api.herokuapp.com/food-books");
      if (resp.ok) {
        let fetchedBooks = await resp.json();
        // a questo punto avremo aspettato la risoluzione della fetch e ottenuto i dati dei libri
        // e quindi potremmo fare la dispatch di un'azione con fetchedBooks come payload!

        // questa dispatch interna comunica a quella esterna che è il momento di riprendere il flusso redux e di far arrivare l'action al reducer
        dispatch({ type: GET_BOOKS, payload: fetchedBooks });
        dispatch({ type: GET_BOOKS_ERROR_OFF });
      } else {
        throw new Error("Errore nel reperimento dei dati 😥");
      }
    } catch (error) {
      console.log(error);
      dispatch({ type: GET_BOOKS_ERROR_ON, payload: error.message });
    } finally {
      dispatch({ type: GET_BOOKS_LOADING_OFF });
    }
  };
};
