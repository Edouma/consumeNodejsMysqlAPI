import axios from 'axios';
// import { Button } from 'react-bootstrap/Button'
import { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const AllStudents = () => {

    const [records, setRecords]= useState([])

    useEffect(()=>{
        const token = sessionStorage.getItem("accessToken")

        axios.get('http://localhost:4001/Student/getAllStudents', {
            headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'application/json',
              },
        })
        .then(res =>{setRecords(res.data)})
        .catch(err => console.log(err))
    }, [])

    const navigate = useNavigate();

    const loadEdit=(id)=>{
        navigate("/UpdateStudent/" + id);
    }

    const LoadStudent=(id)=>{
        navigate("/StudentDetails/" + id);  
    }

    const LoadDelete=(id)=>{
        navigate("/DeleteStudent/" + id);
    }

    return ( 

        <div>
            
            <div className="container">
            <h2> All Students </h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Firstname</th>
                            <th>Lastname</th>
                            <th>Gender</th>
                            <th>CourseId</th>
                            <th>Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                    {records.map((r, i)=>(
                        <tr key={i}>
                        <td>{r.firstname}</td>
                        <td>{r.lastname}</td>
                        <td>{r.gender}</td>
                        <td>{r.course_id}</td>
                        <td> <Button className="mr-1 btn-sm"onClick={()=>loadEdit(r.student_id)}> Update </Button>
                             <Button variant='success' className="btn-sm ml-1" onClick={()=>LoadStudent(r.student_id)}> Details </Button>
                            <Button variant='danger' className="btn-sm" onClick={()=>LoadDelete(r.student_id)}> Delete </Button>
                        </td> 
                    </tr>
                    ))}
                </tbody>

                </table>

            </div>
        </div>
     );
}
 
export default AllStudents;