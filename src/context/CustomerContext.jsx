import { createContext, useContext, useState } from "react";

const CustomerContext = createContext();

export const CustomerProvider = ({ children }) => {
  const [customers, setCustomers] = useState([]);

  const addCustomer = (customer) => {
    setCustomers((prev) => [
      ...prev,
      { ...customer, credit: 0, purchases: [] },
    ]);
  };

  const addPurchase = (customerId, invoice) => {
    setCustomers((prev) =>
      prev.map((c) =>
        c.id === customerId
          ? {
              ...c,
              totalSpent: c.totalSpent + Number(invoice.total),
              credit: c.credit + (invoice.isCredit ? Number(invoice.total) : 0),
              purchases: [invoice, ...c.purchases],
            }
          : c
      )
    );
  };

  return (
    <CustomerContext.Provider value={{ customers, addCustomer, addPurchase }}>
      {children}
    </CustomerContext.Provider>
  );
};

export const useCustomers = () => useContext(CustomerContext);