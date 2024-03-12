import logo from './logo.svg';
import './App.css';
import Register from './componets/register';
import Login from './componets/login';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './componets/home';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<Home />} />
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
