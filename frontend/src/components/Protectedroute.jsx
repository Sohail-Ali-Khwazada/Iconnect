import { useGlobalContext } from '../context/GlobalContext';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const { authUser } = useGlobalContext();

  if (!authUser) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
