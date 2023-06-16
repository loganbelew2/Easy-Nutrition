import { useEffect, useState } from "react"

export const UpdateUser = () => {
    const [customers, setCustomers] = useState([])


    useEffect(() => {
        fetch("http://localhost:8088/customers?_expand=user")
        .then(response => response.json())
        .then(data => setCustomers(data))
    },[])

    

    return (
        <ul>
            {customers.map(customer => <li key={`customer--${customer.id}`}>
                    <div>{customer?.user?.name}</div> 
                    <div>{customer?.user?.email}</div> 
                    <div><input id="loyal"  type="checkbox"/> <label htmlFor="loyal">Loyalty Member?</label></div>
                     </li>)
            }
        </ul>
    )
}