import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import {ToastContainer, toast} from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const UpdateStudent = () => {
    const { student_id } = useParams();
    
    useEffect(() => {
        const token = sessionStorage.getItem("accessToken")
        
        axios.get('http://localhost:4000/api/vendor/' + student_id,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        }) 
          .then(res => {
            setData({
              student_id: res.data.student_id,
              firstname: res.data.firstname,
              lastname: res.data.lastname,
              gender: res.data.gender,
              courseid: res.data.courseid,
            });
          })
          .catch(err => console.log(err));
      }, [student_id]);  

      const [data, setData]=useState({
            firstname: "",
            lastname: "",
            gender: "",
            courseid: "",
        })
     const navigate = useNavigate();

    const handleChange =(e)=>{
        setData({...data, [e.target.name]: e.target.value})
    }
//..................................................... 
    const saveVendor = (e)=>{
        e.preventDefault()

        const token = sessionStorage.getItem("accessToken")

        axios.patch(`http://localhost:4000/api/vendor/${student_id}`, data,{
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        })
            // .then(res=>console.log(res))
            .then(res =>{
                // toast.success('Vendor updated successfully',{
                //     position: toast.POSITION.TOP_RIGHT,
                //     autoClose: 3000,
                // })
                alert("student updated successfully")
                navigate("/AllVendors");
            })
            // .catch(err=>console.log(err.message))    
            .catch(err=>{
                toast.error('An error occurred while updating the record.', {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 3000,
                  })
            })      
    }
    return (
    <div className='class="d-flex justify-content-center align-items-center mx-auto col-md-12 p-5 rounded shadow'>
            
            <Form onSubmit={saveVendor}>
            <h4 className='pb-1 display-12'> Edit Vendor</h4>

                 <Form.Group className="mb-3" controlId="unit_Id">
                     {/* <Form.Label>Vendor Id:</Form.Label> */}
                        <Form.Control type="hidden" required onChange={handleChange}
                        value={data.student_id} name="student_id" disabled="disabled"/>
                 </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Firstname:</Form.Label>
                    <Form.Control type="input" onChange={handleChange} name="firstname" 
                     value={data.firstname}placeholder="Enter Firstname" />
                    {/* <p className='text-danger'>{formErrors.firstname}</p> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Lastname:</Form.Label>
                    <Form.Control type="input" onChange={handleChange} name="lastname" 
                      value={data.lastname}placeholder="Enter lastname" />
                    {/* <p className='text-danger'>{formErrors.lastname}</p> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Gender:</Form.Label>
                    <Form.Control type="input" onChange={handleChange} name="gender" 
                     value={data.gender} placeholder="Enter Phone Number" />
                    {/* <p className='text-danger'>{formErrors.phonenumber}</p> */}
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>CourseId:</Form.Label>
                    <Form.Control type="input" onChange={handleChange} name="courseid" 
                     value={data.courseid} placeholder="Enter Email" />
                    {/* <p className='text-danger'>{formErrors.email}</p> */}
                </Form.Group>

                <Button variant="primary" type="submit">
                    Update Student
                </Button>
                <ToastContainer/>
            </Form>
        </div>
    );
      
}
 
export default UpdateStudent;