import { ADD_TO_CART, REMOVE_FROM_CART } from "../actions";

const initialState = {
  // qui ci potrebbero essere altre proprietà di stato, vale la pena prevedere di mantenerle tutte
  content: [] // iniziamo con un array vuoto perché content riceverà un array dal nostro reducer
};

const cartReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return {
        ...state,
        // content: state.cart.content.concat(action.payload) // questo metodo prende il valore di state.cart.content precedente,
        // // ne concatena un nuovo e ritorna un NUOVO ARRAY!

        content: [...state.content, action.payload]
      };

    case REMOVE_FROM_CART:
      return {
        ...state,
        // content: state.cart.content.slice(0, action.payload).concat(state.cart.content.slice(action.payload + 1))
        //   content: [...state.cart.content.slice(0, action.payload), ...state.cart.content.slice(action.payload + 1)]
        content: state.content.filter((_, i) => i !== action.payload)
        // ❌ da non usare assolutamente metodi che mutano: es. splice!
      };
    default:
      return state;
  }
};

export default cartReducer;
