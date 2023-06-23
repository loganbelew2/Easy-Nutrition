import { useEffect, useState } from "react";
import "./user.css"
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
    <ul className="list-group">
      {customers.map((customer) => (
        <li className="list-group-item" key={`customer--${customer.id}`}>
          <div>{customer?.user?.name}</div>
          <div>{customer?.user?.email}</div>
          <div>
            <input
              id="employee-checkbox"
              className="checkbox"
              onChange={(event) => handleCheckboxChange(event, customer.id)}
              checked={check[customer.id] || false}
              type="checkbox"
            />{" "}
            <label htmlFor="employee-checkbox" >Loyalty Member?</label>
            <button onClick={() => handleSave(customer.id)}>Save</button>
          </div>
        </li>
      ))}
    </ul>
  );
};



