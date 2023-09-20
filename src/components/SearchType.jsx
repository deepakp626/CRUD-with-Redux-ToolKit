import { useDispatch } from "react-redux"
import {getAllUsers,maleOrFemale} from "../features/userDeailSlice"


const SearchType = () => {
  const dispatch = useDispatch()

  const genderPosts = (gender) =>{
    // dispatch(genderWisePost(maleOrFemale))
     dispatch(maleOrFemale(gender))
  }

  return (
    <>
      <div className="d-flex justify-content-center gap-4">
        <div>
          <label className="px-2">All</label>
          <input onClick={()=> dispatch(getAllUsers())} checked  name="gender"  type='radio' value="All"  />
        </div>
        <div>
          <label className="px-2">Male</label>
          <input onClick={(e) => genderPosts(e.target.value)} name="gender" type='radio' value="Male"  />
        </div>
        <div>
          <label className="px-2">Female</label>
          <input onClick={(e) => genderPosts(e.target.value)} name="gender" type='radio' value="Female" />
        </div>
      </div></>
  )
}

export default SearchType