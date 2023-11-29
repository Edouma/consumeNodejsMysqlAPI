import {Routes, Route} from 'react-router-dom';
import AllStudents from './components/AllStudents';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import UpdateStudent from './components/UpdateStudent';
import DeleteStudent from './components/DeleteStudent';
import StudentDetails from './components/StudentDetails';

function App() {
  return (
    <div className="App">
      <Routes>
          <Route path="AllStudents" element ={<AllStudents/>}/>
          <Route path="/UpdateStudent/:studentid" element ={<UpdateStudent/>}/>
          <Route path="/DeleteStudent/:studentid" element ={<DeleteStudent/>}/>
          <Route path="/StudentDetails/:studentid" element ={<StudentDetails/>}/>
          
      </Routes>
    </div>
  );
}

export default App;
