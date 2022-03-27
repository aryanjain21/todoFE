import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
    const user = JSON.parse(localStorage.getItem('setUser'));
    return user && user.token ? children : <Navigate to="/login" />
}

export default PrivateRoute;