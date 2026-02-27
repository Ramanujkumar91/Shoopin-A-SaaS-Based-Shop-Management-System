import { createContext, useContext, useState } from "react";

const SubscriptionContext = createContext();

export const SubscriptionProvider = ({ children }) => {
  const [plan, setPlan] = useState("BASIC"); // BASIC | PRO | PREMIUM

  const upgradePlan = (newPlan) => {
    setPlan(newPlan);
  };

  return (
    <SubscriptionContext.Provider value={{ plan, upgradePlan }}>
      {children}
    </SubscriptionContext.Provider>
  );
};

export const useSubscription = () => useContext(SubscriptionContext);