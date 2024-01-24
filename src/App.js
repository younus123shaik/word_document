import logo from './logo.svg';
import './App.css';
import TextEditor from './components/TextEditor';

import {BrowserRouter, Routes, Route,Navigate} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import Register from './components/Register';
import Login from './components/Login';
import UserAccout from './components/UserAccout';
import Home from './components/Home';
function App() {
  return (
    
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<UserAccout/>}/>
      <Route path='/home/:name' element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Register/>}/>
      <Route path='/files/:name/:id' element={<TextEditor/>}/>
      </Routes>
    </BrowserRouter>
    
  );
}

export default App;
