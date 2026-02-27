import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import { AuthProvider } from "./context/AuthContext";
import { SubscriptionProvider } from "./context/SubscriptionContext";
import { ProductProvider } from "./context/ProductContext";
import { InvoiceProvider } from "./context/InvoiceContext";
import { CustomerProvider } from "./context/CustomerContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <SubscriptionProvider>
        <ProductProvider>
          <InvoiceProvider>
            <CustomerProvider>
              <App />
            </CustomerProvider>
          </InvoiceProvider>
        </ProductProvider>
      </SubscriptionProvider>
    </AuthProvider>
  </React.StrictMode>
);