import logo from './logo.svg';
import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Navbar from './Components/Layouts/Navbar';
import './Static/style.css';
import Login from './Components/Pages/Login';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Home from './Components/Pages/Home';

function App() {
  return (
    <>
      <BrowserRouter>
          <Navbar/>
          <Routes>
              <Route path='login/' element={<Login/>}/>
              <Route path='home/' element={<Home/>}/>
          </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
