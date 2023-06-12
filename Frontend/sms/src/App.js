import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import './Static/style.css';
import Login from './Components/Pages/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Pages/Home';
import AddStudent from './Components/Pages/AddStudent';
import AddSubjects from './Components/Pages/AddSubjects';
import ShowSubjects from './Components/Pages/ShowSubjects';
import UpdateSubject from './Components/Pages/UpdateSubject';
import Logout from './Components/Pages/Logout';

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path='login/' element={<Login/>}/>
              <Route path='home/' element={<Home/>}/>
              <Route path='add/student/' element={<AddStudent/>}/>
              <Route path='add/subject/' element={<AddSubjects/>}/>
              <Route path='show/subjects/' element={<ShowSubjects/>}/>
              <Route path='update/subject/:id/' element={<UpdateSubject/>}/>
              <Route path='logout/' element={<Logout/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
