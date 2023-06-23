import { EmployeeNavBar } from "./EmployeeNav.js"
import { CustomerNavBar } from "./CustomerNav.js"
import "./nav.css"
export const NavBar = () => {
    const localEasyUser = localStorage.getItem("easy_user")
    const EasyUserObject = JSON.parse(localEasyUser)
    
    return EasyUserObject.staff ? <EmployeeNavBar /> : <CustomerNavBar />;
   
    
}