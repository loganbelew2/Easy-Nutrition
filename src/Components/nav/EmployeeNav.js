import { Link, useNavigate } from "react-router-dom"

export const EmployeeNavBar = () => {
    const navigate = useNavigate()
  

    // return <ul className="navbar">
    //     <li className="navbar__item navbar__Search">
    //         <Link className="navbar__link" to="/searchFood">
    //             Search for foods
    //         </Link>
    //     </li>
    //     {
    //         <li className="navbar__item navbar__createList">
    //             <Link  className= "navbar__link" to="/createList">
    //                 Create a List
    //             </Link>
    //         </li>
    //     }
    //     {
    //         <li className="navbar__item navbar__Lists">
    //             <Link className="navbar__link" to="/foodLists">
    //                  Your food Lists
    //             </Link>
    //         </li>
    //     }
    //     {
    //         <li className="navbar__item navbar__Update">
    //             <Link className= "navbar__link" to="/updateUser">
    //                 Update a user
    //             </Link>
    //         </li>
    //     }
      

    //     {
    //     localStorage.getItem("easy_user")
    //          ? <li className="navbar__item navbar__logout">
    //              <Link className="navbar__link" to="" onClick={() => {
    //                  localStorage.removeItem("easy_user")
    //                  navigate("/", { replace: true })
    //              }}>Logout</Link>
    //             </li>
    //             : ""
    //     }
    // </ul>

  return  <div className="navbar">
  <div className="dropdown">
    <button className="dropdown__toggle">Menu</button>
    <ul className="dropdown__menu">
      <li className="navbar__item navbar__createList">
        <Link className="navbar__link" to="/createList">Create a List</Link>
      </li>
      <li className="navbar__item navbar__Search">
        <Link className="navbar__link" to="/searchFood">Search for foods</Link>
      </li>
      <li className="navbar__item navbar__Lists">
        <Link className="navbar__link" to="/foodLists">Your food Lists</Link>
      </li>
      <li className="navbar__item navbar__Update">
        <Link className="navbar__link" to="/updateUser">Update a user</Link>
      </li>
      {localStorage.getItem("easy_user") ? (
        <li className="navbar__item navbar__logout">
          <Link
            className="navbar__link"
            to=""
            onClick={() => {
              localStorage.removeItem("easy_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : null}
    </ul>
  </div>
</div>



}