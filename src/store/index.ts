import { createStore, compose } from "redux";
import rootReducer from "./reducers";

/**
 * turn on redux dev tools, removed in production
 * IMPORTANT: add REACT_APP_STAGING environment variable
 * to turn on/off devtools
 * install redux dev tools:
 * link: (edge) https://microsoftedge.microsoft.com/addons/search/reduxdevtool
 * link: (firefox) https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/
 * link: (chrome) https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd
 */
const composeEnhancers =
  typeof window === "object" &&
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers();

const initialState = {};
const environment = import.meta.env.VITE_APP_STAGING;

const STAGING: boolean = `${environment}` === "DEVELOP" || false;

const store = createStore(
  rootReducer,
  initialState,
  STAGING ? enhancer : undefined
);

export default store;
