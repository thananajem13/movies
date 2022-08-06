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
import AlreadySingned from './AlreadySingned/AlreadySingned';


function App() {
  return (
    <>
      <Particle />

      <ContextContent>
        <Navbar />
        <Routes>
          <Route path='signup' element={
            <AlreadySingned><SignUp /></AlreadySingned>
             }></Route>
          <Route path='signin' element={<AlreadySingned><SignIn /></AlreadySingned> }></Route>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute> }></Route>
          <Route path='/profile' element={<ProtectedRoute><Home /></ProtectedRoute> }></Route>
        </Routes> 
        </ContextContent>


    </>
  );
}

export default App;
