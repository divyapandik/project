import {BrowserRouter ,Route, Router, Routes} from "react-router-dom"
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import AddEdit from "./Pages/AddEdit";
import Home from "./Pages/Home";

function App() {
  return (
    <BrowserRouter>   
    <Routes>
    <Route exact path='/' element={< Home />}></Route>    
    <Route exact path='/addDetails' element={< AddEdit />}></Route>    
    <Route exact path='/update/:id' element={< AddEdit />}></Route>    

    </Routes>
    </BrowserRouter>

  );
}

export default App;
