
import { useEffect, useState } from "react";

export const UpdateUser = () => {
  const [customers, setCustomers] = useState([]);
  const [check, setCheck] = useState({});

  useEffect(() => {
    fetch("http://localhost:8088/customers?_expand=user")
      .then((response) => response.json())
      .then((data) => {
        const initialCheckState = {};
        data.forEach((customer) => {
          initialCheckState[customer.id] = customer.loyaltyMember || false;
        });
        setCustomers(data);
        setCheck(initialCheckState);
      });
  }, []);

  

  const handleCheckboxChange = (event, customerId) => {
    const updatedCheck = { ...check };
    updatedCheck[customerId] = event.target.checked;
    setCheck(updatedCheck);
  };

  const handleSave = (customerId) => {
    const updatedCustomer = {
      ...customers.find((customer) => customer.id === customerId),
      loyaltyMember: check[customerId],
      user: undefined,
    };

    fetch(`http://localhost:8088/customers/${customerId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedCustomer),
    })
  };

  return (
    <ul>
      {customers.map((customer) => (
        <li key={`customer--${customer.id}`}>
          <div>{customer?.user?.name}</div>
          <div>{customer?.user?.email}</div>
          <div>
            <input
              onChange={(event) => handleCheckboxChange(event, customer.id)}
              checked={check[customer.id] || false}
              id={`loyal-${customer.id}`}
              type="checkbox"
            />{" "}
            <label htmlFor={`loyal-${customer.id}`}>Loyalty Member?</label>
            <button onClick={() => handleSave(customer.id)}>Save</button>
          </div>
        </li>
      ))}
    </ul>
  );
};



