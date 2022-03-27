
import './config/axiosConfig';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from './pages/login/login';
import SignUp from './pages/signup/signup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './privateRoute';

function App() {
  return (
    <div>
      <ToastContainer />
      <Routes>
        <Route exact path='/' element={<Navigate to='/login' />} />
        <Route exact path='/login' element={<Login />} />
        <Route exact path='/signup' element={<SignUp />} />
        {/* <Route exact path='/buy/:productId' element={
          <PrivateRoute>
            <ProductInfo />
          </PrivateRoute>
        } /> */}
      </Routes>
    </div>
  );
}

export default App;
