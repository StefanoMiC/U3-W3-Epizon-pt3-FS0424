// questo file si occuperà di creare il nostro Redux Store all'avvio dell'applicazione

import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bookSelectedReducer from "../reducers/bookSelectedReducer";
import cartReducer from "../reducers/cartReducer";
import userReducer from "../reducers/userReducer";
import booksReducer from "../reducers/booksReducer";
import storage from "redux-persist/lib/storage"; // di default è localStorage
import persistReducer from "redux-persist/es/persistReducer";
import persistStore from "redux-persist/es/persistStore";
import { encryptTransform } from "redux-persist-transform-encrypt";
// import mainReducer from "../reducers";

const persistConfig = {
  key: "root",
  storage,
  transforms: [
    encryptTransform({
      secretKey: import.meta.env.VITE_PERSIST_KEY
    })
  ]
};

// non avremo più un reducer principale,
// ma singoli reducers che verranno combinati insieme in un unico oggetto di stato anche grazie alla funzione combineReducers

const rootReducer = combineReducers({
  cart: cartReducer,
  books: booksReducer,
  bookSelected: bookSelectedReducer,
  user: userReducer
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// questa funzione si occuperà di creare lo Store grazie ad una funzione esportata dal pacchetto @reduxjs/toolkit,
// la funzione ci chiede delle opzioni (tra cui il nostro reducer) e restituirà un oggetto di stato che avermo poi all'interno della variabile store.
export const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware => getDefaultMiddleware({ serializableCheck: false }) // spegne il warning sui serializable checks
});

export const persistor = persistStore(store);
