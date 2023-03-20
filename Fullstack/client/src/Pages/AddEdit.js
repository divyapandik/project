import React, { useEffect, useState } from 'react'
import { useNavigate,useParams,Link } from 'react-router-dom'
import "./AddEdit.css";
import axios from 'axios';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button } from 'react-bootstrap';
import {AiOutlineArrowLeft} from 'react-icons/ai'


const initialState = {
  firstname:"",
  lastname:"",
  location:"",
  email:"",
  date_of_birth:"",
  education:""
}

function AddEdit() {
  const [state, setState] = useState(initialState);
  const {firstname,lastname,location,email,date_of_birth,education} = state;
  const [dateOfBirth, setDateOfBirth] = useState("");
  let navigate = useNavigate();
  const {id} = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/api/get/${id}`)
      .then((resp) => setState({ ...resp.data[0]}));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if(!firstname||!lastname||!location||!email||!date_of_birth||!education){
      toast.error("please provide details");
    } else { 
      if(!id){
        axios.post("http://localhost:5000/api/post",{
          firstname,
          lastname,
          location,
          email,
          date_of_birth,
          education
        })
        .then(() => setState(initialState))
        .catch((err) => toast.error(err.response.data));
        toast.success("contact added successfully");
      } else {
        axios.put(`http://localhost:5000/api/update/${id}`,{
          firstname,
          lastname,
          location,
          email,
          date_of_birth,
          education
        })
        .then(() => setState(initialState))
        .catch((err) => toast.error(err.response.data));
        toast.success("contact updated successfully");
      }
      setTimeout(() => navigate("/"), 500);
    }
  };
 
  const handleInputChange = (e) => {
    const { name, value } = e.target;
  
    if (name === "date_of_birth") {
      const formattedDate = new Date(value).toISOString().substring(0, 10);
      setState({ ...state, [name]: formattedDate });
    } else {
      setState({ ...state, [name]: value });
    }
  };

  return ( 
    <><Link to="/">
      <button type="button" className='btn btn-edit'>  <AiOutlineArrowLeft /></button>
    </Link><div className="container" style={{ marginTop: '100px' }}>
        <form style={{ maxWidth: '700px', margin: 'auto' }} onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="row mb-4">
              <label htmlFor='firstname' className="col-sm-3 col-form-label">FirstName</label>
              <input type="text"
                id="firstname"
                className="form-control"
                name="firstname"
                placeholder="Enter your first name..."
                value={firstname || ""}
                onChange={handleInputChange} />
            </div>
            <div className="row mb-4">
              <label htmlFor='lastname' className="col-sm-3 col-form-label">LastName</label>
              <input type="text"
                className="form-control"
                id="lastname"
                name="lastname"
                placeholder="Enter your last name..."
                value={lastname || ""}
                onChange={handleInputChange} />
            </div>


            <div className="row mb-4">
              <label htmlFor="location" className="col-sm-3 col-form-label">Location:</label>
              <input
                type="text"
                className="form-control"
                id="location"
                name="location"
                placeholder="Enter location"
                value={location || ""}
                onChange={handleInputChange} />
            </div>
            <div className="row mb-4">
              <label htmlFor="email" className="col-sm-3 col-form-label">Email:</label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter email"
                value={email || ""}
                onChange={handleInputChange} />
            </div>

            <div className="row mb-4">
              <label htmlFor="date_of_birth" className="col-sm-3 col-form-label">date_of_birth:</label>
              <input
                type="Date"
                className="form-control"
                id="date_of_birth"
                name="date_of_birth"
                placeholder="Enter date_of_birth"
                value={date_of_birth || ""}
                onChange={handleInputChange} />
            </div>
            <div className="row mb-4">
              <label htmlFor="education" className="col-sm-3 col-form-label">education:</label>
              <input
                type="text"
                className="form-control"
                id="education"
                name="education"
                placeholder="Enter education"
                value={education || ""}
                onChange={handleInputChange} />
            </div>


            <button type="submit" style={{ width: '100px', borderRadius: '30px' }} className="btn bg-dark  text-white"> submit  </button>

          </div>
        </form>
      </div></>
  )
}

export default AddEdit