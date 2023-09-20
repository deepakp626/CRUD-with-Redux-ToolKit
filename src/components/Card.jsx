import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { useDispatch } from "react-redux"
import { getAllUsers, deleteUser, openModal } from "../features/userDeailSlice"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { BarLoader } from "react-spinners"
import SearchType from "./SearchType"
import { Button } from "react-bootstrap"


const Card = () => {
  let navigate = useNavigate()
  const dispatch = useDispatch()
  const { users, isLoading, error } = useSelector((state) => state.app)

  useEffect(() => {
    dispatch(getAllUsers())
  }, [])

  const updateHandler = (id) => {
    navigate(`/createAndUpdate/${id}`)
  }

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center mt-5  ">
        <BarLoader
          color="#e86511"
          height={10}
          loading
          width={200}
        />
      </div>
    )
  }
  if (error !== null) {
    return <h3 className="text-center mt-4">User not found</h3>
  }
  return (
    <>
      <h1 className='text-center'>All Data</h1>
      <SearchType />
      {
        users.map((item, id) => (
          <div key={id} className="card w-75 mx-auto mt-3 text-center">
            <div className="card-body">
              <h2 className="card-title">{item.name}</h2>
              <Link className="card-text">{item.email}</Link>
              <h4>{item.gender}</h4>
              <div className="d-flex justify-content-center gap-4">


                <Button variant="primary" onClick={() => dispatch(openModal(item.id))}>
                  View
                </Button>

                <button onClick={() => updateHandler(item.id)} className="btn btn-primary">Edit</button>
                <button className="btn btn-primary"
                  onClick={() => dispatch(deleteUser(item.id))}>Delete</button>
              </div>
            </div>
          </div>
        ))
      }
    </>
  )
}

export default Card