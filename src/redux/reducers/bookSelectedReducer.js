import { SELECT_BOOK } from "../actions";

const initialState = {
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  content: null // iniziamo con null perché content riceverà un oggetto
};

const bookSelectedReducer = (state = initialState, action) => {
  switch (action.type) {
    case SELECT_BOOK:
      return {
        ...state,
        updatedAt: new Date().toISOString(),
        content: action.payload
      };

    default:
      return state;
  }
};

export default bookSelectedReducer;
