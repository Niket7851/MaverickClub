import { BrowserRouter as Router ,Route,Routes,Link } from 'react-router-dom';
import './App.css';
import Home from './pages/Home/Home.jsx';
import Login from './pages/login/Login';
import Profile from './pages/profile/Profile';
import Register from './pages/register/Register';
import Dashboard from './components/dashboard/Dashboard';
function App() {
  return (
      // <Router>
      //   <Routes>
      //     <Route path='/' element={<Home/>}/>
      //   </Routes>
      // </Router>
      <Router>
      <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route path="/dashboard" element={<Dashboard/>} />
      </Routes>
  </Router>
  );
}

export default App;
