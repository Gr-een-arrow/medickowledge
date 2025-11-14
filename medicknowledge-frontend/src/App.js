
import './App.css';
import Login from './Pages/Login';
import Home from './Pages/Home';
import Register from './Pages/Register';

import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
        <div className="App">
          <Routes>
            <Route exact path="/" element={<Login/>} />
          </Routes>
          <Routes>
            <Route exact path="/home" element={<Home/>} />
          </Routes>
          <Routes>
            <Route exact path="/register" element={<Register/>} />
          </Routes>
        </div> 
      </BrowserRouter> 
  );
}

export default App;
