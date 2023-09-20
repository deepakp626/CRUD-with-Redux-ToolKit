import './App.css'
import Create from './components/Create'
import NavBar from './components/NavBar'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Card from './components/Card'
import MyVerticallyCenteredModal from './components/MyVerticallyCenteredModal'

function App() {

  return (
    <>
      <BrowserRouter>
        <MyVerticallyCenteredModal />
        <NavBar />
        <Routes>
          <Route path='/' element={<Card />} />
          <Route path='/post' element={<Card />} />
          <Route path='/createAndUpdate'   element={<Create />} >
                <Route path='/createAndUpdate/:id' element={<Create />} />
          </Route>
        </Routes>

      </BrowserRouter>
    </>
  )
}

export default App
