import React, { useState } from 'react'
import {Link} from "react-router-dom";
import "./Home.css";
import axios from "axios";
import { toast } from 'react-toastify';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BsSearch } from "react-icons/bs";
import { FaEdit } from 'react-icons/fa';
import { FaTrash } from 'react-icons/fa';




const Home = () => {
    const [data , setData] = useState([]);


    const loadData = async()=>{
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    }
    useState(()=>{
        loadData();
    },[])

    
const deleteDetails = (id) =>{
    if(
        window.confirm("Are you sure want to delete ")
        ){
            axios.delete(`http://localhost:5000/api/remove/${id}`)
            toast.success("contact deleted successfully");
            setTimeout(()=>loadData(),500)
        }
}



  return (  

      <><div >
      </div>
      
      <div style={{ marginTop: "150px" }}> 
                  <h2 style={{marginLeft: "158px",marginBottom:"48px" }} > Student management system</h2> 

      <div style={{ marginRight: "178px" }} className="d-flex justify-content-end mb-3">
  <Link to="/addDetails">
    <button style={{ width: '100px', borderRadius: '30px' }} className="btn bg-dark  text-white">Add</button>
  </Link>
</div>


              <button style={{marginTop:"-114px",marginLeft:"162px",backgroundColor: '#F0F0F0'}} className="btn btn-light search-btn">
      <BsSearch className="me-5" /> Search
    </button>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                  <div style={{ width: '80%' }}>
                      <table className="table" style={{ margin: 'auto' }}>
                          <thead>
                              <tr>

                                  <th >ID</th>
                                  <th>FirstName</th>
                                  <th>LastName</th>
                                  <th >Location</th>
                                  <th >Email</th>
                                  <th >DOB</th>
                                  <th >Education</th>
                                  <th>Action</th>
                                  <th >Delete</th>

                              </tr>
                          </thead>

                          <tbody>
                              {data.map((item, index) => {
                                  return (
                                      <tr key={item.id}>
                                     <td scope="row">{index+1}</td>
                                          <td>{item.firstname}</td>
                                          <td>{item.lastname}</td>
                                          <td>{item.location}</td>
                                          <td>{item.email}</td>
                                          <td>{new Date(item.date_of_birth).toLocaleDateString()}</td>
                                          <td>{item.education}</td>
                                          <td>
                                              <Link to={`/update/${item.id}`}>
                                                  <button className='btn btn-edit'> <FaEdit /> Edit</button>
                                              </Link>
                                          </td>
                                          <td>
                                              <button className='btn btn-delete' onClick={() => deleteDetails(item.id)}><FaTrash />Delete</button>
                                          </td>

                                    
                                      </tr>
                                  );
                              })}
                          </tbody>
                      </table>
                  </div>
              </div>



          </div></>
  )
}

export default Home