import { useEffect, useState } from "react";
import { createUser ,updateUser} from "../features/userDeailSlice"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate,Navigate, useParams } from "react-router-dom";
import { BeatLoader } from "react-spinners"
import { Axios } from "../api/axios";

const Create = () => {
  const [user, setUsers] = useState({});
  const navigate = useNavigate()
  const { id } = useParams()
  const dispatch = useDispatch()
  const { isLoading, error } = useSelector((state) => state.app)

  useEffect(() => {
    if(id == undefined) return
    Axios.get(`crud/${id}`)
      .then((res) => {
        console.log(res.data)
        setUsers((prev) => prev = res.data)
      }).catch((error) => {
        navigate("/post")
        console.log(error)
      })
  }, [])

  const setUserData = (e) => {
    setUsers({ ...user, [e.target.name]: e.target.value });
  }

  const submitHandler = (event) => {
    event.preventDefault()
    dispatch(createUser(user))
    setUsers({})
  }

  const updateHandler = ()=>{
    dispatch(updateUser({id,user}))
  }


  if (error != null) { return <Navigate to="/create" />; }

  return (
    <>
      <h1 className="text-center my-2">Crete Post</h1>
      <form onSubmit={submitHandler} className="w-50 mx-auto my-5">
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" name="name" value={id && user.name} onChange={setUserData} className="form-control" />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" name="email" value={id && user.email} onChange={setUserData} className="form-control" />
        </div>
        <div className="mb-3 form-check">
          <label className="form-label">age</label>
          <input type="number" name="age" value={id && (user.age)} onChange={setUserData} className="form-control" />
        </div>
        <div className="form-check">
          <input checked={id && (user.gender == "Male")}
            name="gender" value="Male" className="form-check-input" type="radio" onChange={setUserData} id="flexCheckChecked" />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            Male
          </label>
        </div>
        <div className="form-check">
          <input name="gender" checked={id && (user.gender == "Female")}
            value="Female"
            onChange={setUserData} className="form-check-input" type="radio" id="flexCheckChecked" />
          <label className="form-check-label" htmlFor="flexCheckChecked">
            female
          </label>
        </div>

        {
          (id === undefined) ? <button type="submit" className="btn btn-primary">
            {isLoading ? <BeatLoader /> : "Submit"}
          </button> :
            <button onClick={updateHandler} type="button"  className="btn btn-primary">
              {isLoading ? <BeatLoader /> : "Edit"}
            </button>
        }



      </form>
    </>
  )
}

export default Create