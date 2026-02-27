import { useSubscription } from "../../context/SubscriptionContext";

function Pricing() {
  const { plan, upgradePlan } = useSubscription();

  const plans = [
    {
      name: "BASIC",
      price: "₹0 / month",
      limit: "5 Products",
    },
    {
      name: "PRO",
      price: "₹499 / month",
      limit: "20 Products",
    },
    {
      name: "PREMIUM",
      price: "₹999 / month",
      limit: "Unlimited Products",
    },
  ];

  return (
    <div>
      <h2>Upgrade Your Plan</h2>
      <p>Current Plan: <strong>{plan}</strong></p>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {plans.map((p) => (
          <div
            key={p.name}
            style={{
              border: "1px solid #ccc",
              padding: "20px",
              width: "220px",
              background: plan === p.name ? "#dcfce7" : "white",
            }}
          >
            <h3>{p.name}</h3>
            <p>{p.price}</p>
            <p>{p.limit}</p>

            {plan === p.name ? (
              <button disabled>Current Plan</button>
            ) : (
              <button onClick={() => upgradePlan(p.name)}>
                Upgrade
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Pricing;