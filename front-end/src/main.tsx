import React from "react";
import { createRoot } from "react-dom/client";
// import "bootstrap/dist/css/bootstrap.css";
import "font-awesome/css/font-awesome.css";
import App from "./App";
import './styles/main.scss'

// const loggerMiddleware = createLogger();

// const persistentState = loadUserData();

// const store = createStore(
//   rootReducer,
//   persistentState,
//   applyMiddleware(thunkMiddleware, loggerMiddleware)
// );

// store.subscribe(() => {
//   saveUserData({
//     userReducer: store.getState().userReducer,
//   });
// });

const container = document.getElementById("app") as HTMLElement;
const root = createRoot(container);
root.render(<App />);
