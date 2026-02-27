import { createContext, useContext, useState } from "react";

const InvoiceContext = createContext();

export const InvoiceProvider = ({ children }) => {
  const [invoices, setInvoices] = useState([]);

  const addInvoice = (invoice) => {
    setInvoices((prev) => [invoice, ...prev]);
  };

  return (
    <InvoiceContext.Provider value={{ invoices, addInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoices = () => useContext(InvoiceContext);