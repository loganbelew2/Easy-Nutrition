import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [user, setUser] = useState({
        name: "",
        email: "",
        isEmployee: false
    });
    const [customer, setCustomer] = useState({
        address: "",
        phoneNumber: "",
        userId: 0
    })
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")


    let navigate = useNavigate();

    const registerNewUser = () => {
        return fetch("http://localhost:8088/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user),
        })
            .then((res) => res.json())
            .then((createdUser) => {
                if (createdUser.hasOwnProperty("id")) {
                    localStorage.setItem(
                        "easy_user",
                        JSON.stringify({
                            id: createdUser.id,
                            staff: createdUser.isEmployee,
                        })
                    );
                    if (createdUser.isEmployee) {
                        return fetch("http://localhost:8088/employees", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ payRate: 25, userId: createdUser.id }),
                        });
                    } else {
                        return fetch("http://localhost:8088/customers", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify({ address: address, phoneNumber: phone, userId: createdUser.id })
                        })
                    }
                }
            })
            .then(() => {
                navigate("/login");
            });
    };

    const handleRegister = (e) => {
        e.preventDefault();
        return fetch(`http://localhost:8088/users?email=${user.email}`)
            .then((res) => res.json())
            .then((response) => {
                if (response.length > 0) {
                    // Duplicate email. No good.
                    window.alert("Account with that email address already exists");
                } else {
                    // Good email, create user
                    registerNewUser();
                }
            });
    };



    const updateUser = (evt) => {
        const copy = { ...user };
        copy[evt.target.id] = evt.target.value;
        setUser(copy);
    };



    return (
        <main style={{ textAlign: "center" }}>
            <form className="form--login" onSubmit={handleRegister}>
                <h1 className="h3 mb-3 font-weight-normal">
                    Please Register for Easy Nutrition
                </h1>
                <fieldset>
                    <label htmlFor="name"> Full Name </label>
                    <input
                        onChange={updateUser}
                        type="text"
                        id="name"
                        className="form-control"
                        placeholder="Enter your name"
                        required
                        autoFocus
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="email"> Email address </label>
                    <input
                        onChange={updateUser}
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email address"
                        required
                    />
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> Address</label>
                    <input
                        onChange={(evt) => setAddress(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="7631 royal drive"
                        id="address"
                        required>
                    </input>
                </fieldset>
                <fieldset>
                    <label htmlFor="address"> phone number</label>
                    <input
                        onChange={(evt) => setPhone(evt.target.value)}
                        type="text"
                        className="form-control"
                        placeholder="722-843-8906"
                        id="phoneNumber"
                        required>
                    </input>
                </fieldset>
                <fieldset>
                    <input
                        onChange={(evt) => {
                            const copy = { ...user };
                            copy.isEmployee = evt.target.checked;
                            setUser(copy);
                        }}
                        type="checkbox"
                        id="isEmployee"
                    />
                    <label htmlFor="email"> I am an employee </label>
                </fieldset>
                <fieldset>
                    <button type="submit"> Register </button>
                </fieldset>
            </form>
        </main>
    );
};


