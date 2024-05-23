import { useEffect } from 'react';
import auth from '../../services/auth/authService';

// import { useNavigate } from 'react-router-dom';


const Logout = () => {
  // const navigate = useNavigate()
  useEffect(() => {
    auth.logout()
    window.location.href = '/'
  }, [])

  return (null)
}

export default Logout;
