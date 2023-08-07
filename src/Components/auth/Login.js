import React, { useState } from "react"
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom"
import "./Login.css"

export const Login = () => {
    const [email, set] = useState("")
    const navigate = useNavigate()

    const handleLogin = (e) => {
        e.preventDefault()

        return fetch(`http://localhost:8088/users?email=${email}`)
            .then(res => res.json())
            .then(foundUsers => {
                if (foundUsers.length === 1) {
                    const user = foundUsers[0]
                    localStorage.setItem("easy_user", JSON.stringify({
                        id: user.id,
                        staff: user.isEmployee
                    }))

                    navigate("/createList")
                }
                else {
                    window.alert("Invalid login")
                }
            })
    }

    return (
        <main className="container--login">
                <form name="Login" className="form--login" onSubmit={handleLogin}>
                    <h1 className="login--header"> Welcome to Easy Nutrition</h1>
                    <h2 className="signIn">Please sign in</h2>
                    <fieldset className="login-fieldset">
                        <input type="email"
                            autoComplete="email"
                            value={email}
                            onChange={evt => set(evt.target.value)}
                            className="form-control"
                            placeholder="Email address"
                            id="inputEmail"
                            required autoFocus />
                    </fieldset>
                    <fieldset >
                        <button type="submit">
                            Sign in
                        </button>
                    </fieldset>
                    <Link className="register" to="/register">Not a member? Register!</Link>
                </form>
        </main>
    )
}