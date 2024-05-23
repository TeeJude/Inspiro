import React,{useEffect, useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import logo from   "../assets/logo/image1.jpg"
import {loginAction} from "../redux/actions/auth/loginAction";
import { useNavigate, Navigate , useLocation, Link} from 'react-router-dom';
import auth from "../services/auth/authService";
import { ScreenLoader } from "./commons/ScreenLoader";


export const AdminLogin = () => {
  const error = useSelector(state => state.login.error);
 const statusCode = useSelector(state => state.login.statusCode);
 const loading = useSelector(state => state.login.loading);
 const userData = useSelector(state => state.login.data); 

 const navigation = useNavigate()
 const location = useLocation()
 const { from } = location.state || { from: { pathname: '/' } };

  const dispatch = useDispatch();
 const [formData, setFormData] = useState({
    email: '',
    password: '',
    device_name: 'web'
  })

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

    const login = async (e) => {
      e.preventDefault();
       await dispatch(loginAction({ ...formData }));
    };
      
    const setUser = () => {
      if(statusCode && statusCode ===201){
        const data = userData?.data
        auth.setJWT(data.token)
        auth.setUser( JSON.stringify(data))
        navigation(from)
      }
    }

    
    useEffect(()=>{
       setUser()
    }, [statusCode])


  if (auth.getCurrentUser()) { return <Navigate to='/' /> }

   return (
      <div>
        <ScreenLoader status={loading} />
        <div className="row justify-content-center">

          <div className="col-sm-10 col-md-8 col-lg-5">
             <div className="card border-0">
              <div className="card-body">
              <div>
                   
                   <div className="row justify-content-center mt-3">
                      <div className="col-8">
                       <h3 className="whitespace-nowrap tracking-tight text-2xl font-bold">
                        Sign In
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        Fill in your credentials below to get started 😎
                      </p>
                      </div>
                     
                   </div>
              </div>

              <form onSubmit={login}>
                <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input 
                 type="email" 
                 value={formData.email} 
                 className="form-control" 
                 id="email"
                 name="email"
                 placeholder="name@example.com"
                 onChange={handleInputChange}
                 required
                 />
                </div>

                <div className="mb-3">
                <label htmlFor="passowrd" className="form-label">Password</label>
                <input 
                 type="password" 
                 onChange={handleInputChange} 
                 name="password"
                 value={formData.password} 
                 className="form-control" id="passowrd" 
                 placeholder="*********"
                 required
                 />
                </div>

                <div className="mb-3 text-end">
                    <Link to="/forgot-password">Forgot Password?</Link>
                </div>

                <div className="mb-3">
                  {
                      error && <div className="alert alert-danger mb-2">{error?.message}</div>
                    }
                  <button  className="form-control btn btn-primary">Login</button>
                </div>

                <div className="mb-3 text-center">
                  <span className="d-inline-block me-2">
                      Don't have an account?
                  </span>
                    <Link to="/register" className=" text-end">
                      Sign up
                    </Link>
                </div>
                
              </form>

              </div>
             </div>
          </div>
        </div>
      </div>

   )
}
