import { useMemo } from "react";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";
import { composeWithDevTools } from "redux-devtools-extension";
import rootReducer from "./redux/reducers";
import { watchAuth } from "./redux/sagas";

const sagaMiddleware = createSagaMiddleware();

export function initStore(initialState = {}) {
  const Store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(sagaMiddleware))
  );
  sagaMiddleware.run(watchAuth);
  return Store;
}

let store;

export const initializeStore = initialState => {
  let _store = store ?? initStore(initialState);
  if (initialState && store) {
    _store = initStore({
      ...store.getState(),
      ...initialState,
    });
    store = undefined;
  }
  // For SSG and SSR always create a new store
  if (typeof window === "undefined") return _store;
  // Create the store once in the client
  if (!store) store = _store;
  return _store;
};

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState]);
  return store;
}
