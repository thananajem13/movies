import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './Navbar/Navbar';
import Particle from './Particle/Particle';
import SignUp from './SignUp/SignUp';
import SignIn from './SignIn/SignIn';
import ContextContent from './ContextContent/ContextContent';
import Home from './Home/Home';
import ProtectedRoute from './ProtectedRoute/ProtectedRoute';


function App() {
  return (
    <>
      <Particle />

      <ContextContent>
        <Navbar />
        <Routes>
          <Route path='signup' element={
            <SignUp /> }></Route>
          <Route path='signin' element={<SignIn /> }></Route>
          <Route path='/' element={<Home /> }></Route>
          <Route path='/profile' element={<Home /> }></Route>
        </Routes> 
        </ContextContent>


    </>
  );
}

export default App;
