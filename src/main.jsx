import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { Provider } from "react-redux";
import store from "./redux/store/store.js";
import { BrowserRouter } from "react-router-dom";
// import { StrictMode } from "react";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // <StrictMode>
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
  //</StrictMode>
);
