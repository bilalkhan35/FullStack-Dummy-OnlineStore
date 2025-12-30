import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { Provider } from "react-redux";
import store from "./store.js";
import { NavbarProvider } from "./NavBarContext.jsx";
import { WishlistProvider } from "./WishlistContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <NavbarProvider>
      <WishlistProvider>
        <Provider store={store}>
          <App />
        </Provider>
      </WishlistProvider>
    </NavbarProvider>
  </StrictMode>
);
