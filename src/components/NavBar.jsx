import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { searchUser } from "../features/userDeailSlice"
import { Button } from "react-bootstrap"
import { useAuth0 } from "@auth0/auth0-react";
// import { loginUser, logoutUser } from "../features/userDeailSlice"
const NavBar = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { users } = useSelector((state) => state.app)
  const { user, loginWithRedirect, isAuthenticated, logout } = useAuth0();
  console.log({ user })

  const logoutHandler = () => {
    logout()
  }
  const loginHandler = async () => {
    loginWithRedirect()
  }

  const searchHandler = async (event) => {
    const searchData = event.target.value
    dispatch(searchUser(searchData))
  }
  return (
    <>
      <nav className=" navbar navbar-expand-lg navbar-light bg-light container-fluid  d-flex   justify-content-center align-items-center">
        <a className="navbar-brand" href="#">Redux RTK</a>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <Link to="/createAndUpdate" className="nav-link" >Create post  </Link>
            </li>
            <li className="nav-item">
              <Link to="/post" className="nav-link" href="#">All Post  {`( ${users.length} )`}  </Link>
            </li>
          </ul>
          <form className="form-inline my-2 my-lg-0 d-flex">
            <input onChange={searchHandler} onClick={() => navigate("/post")} name="search" className="form-control mr-sm-2" type="search" placeholder="Search by name and age" aria-label="Search" />
            <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
          </form>

          {
            isAuthenticated ? <Button className="ms-5 " variant="primary"
              onClick={logoutHandler} > logout
            </Button> :
              <Button className="ms-5 " variant="primary"
                onClick={loginHandler} >
                login
              </Button>
          }
        </div>
      </nav>
    </>
  )
}

export default NavBar