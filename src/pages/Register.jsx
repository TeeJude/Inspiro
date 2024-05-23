import React, {useState,useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { registerAction } from "../redux/actions/auth/registerAction";
import { useNavigate,Navigate } from 'react-router-dom';
import auth from "../services/auth/authService";
import { ScreenLoader } from "./commons/ScreenLoader";
import { toast } from "react-toastify";



export const Register = () => {
 const dispatch = useDispatch();
 const navigation = useNavigate()
 const error = useSelector(state => state.register.error);
 const statusCode = useSelector(state => state.register.statusCode);
 const loading = useSelector(state => state.register.loading);


 const [formData, setFormData] = useState({
    email: '',
    password: '',
    name:'',
    user_type:'Visitor',
    password_confirmation:''
  })
  const [invalidPassord, setInvalidPassord] = useState(false)
  const [invalidPassordError, setInvalidPassordError] = useState('')

  const handleInputChange = (e) => {
   setInvalidPassord(false)
   setInvalidPassordError('')
  
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const register = async (e) => {
    e.preventDefault();
    if(formData.password !== formData.password_confirmation){
      setInvalidPassord(true)
      setInvalidPassordError("Password and conform passwrod must match")
    }else{
      setInvalidPassord(false)
      setInvalidPassordError("")
       dispatch(registerAction({ data:formData, url: 'register'}));
    }
  };

  const navigateToNextPage = () => {
    if(statusCode && statusCode ===201){
      toast.success("Registration successfull", {autoClose:300})
      navigation('/verify/email-otp')
    }
  }

  
  useEffect(()=>{
     navigateToNextPage()
  }, [statusCode])

  if (auth.getCurrentUser()) { return <Navigate to='/' /> }

  return (
      <div>
        <ScreenLoader status={loading} />
        <div className="row justify-content-center">

          <div className="col-sm-8 col-md-6 col-lg-4">
             <div className="card border-0">
              <div className="card-body">
              <div>
                   
                   <div className="row justify-content-center">
                      <div className="col">
                       <h3 className="text-center">
                        Sign Up
                      </h3>
                      <p className="text-center text-muted">
                        Fill in your credentials below to get started 😎
                      </p>
                      </div>
                     
                   </div>
              </div>

              <form onSubmit={register}>
                <div className="mb-3">
                  <label htmlFor="fullname" className="form-label">Fullname</label>
                  <input 
                   type="text" 
                   name="name" 
                   className="form-control"
                   id="fullname" 
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                   />
                </div>

                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email address</label>
                  <input 
                  type="email" 
                  className="form-control" 
                  id="email" 
                  placeholder="johndoe@example.com"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input 
                  type="password" 
                  className="form-control" 
                  id="password" 
                  placeholder="*********"
                   value={formData.password}
                   onChange={handleInputChange}
                   name="password"
                   required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="password_confirmation" className="form-label">Confirm Password</label>
                  <input 
                  type="password" 
                  className="form-control" 
                  id="password_confirmation" 
                  placeholder="*********"
                  name="password_confirmation"
                  value={formData.password_confirmation}
                  onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  {
                    invalidPassord && <div className="alert alert-danger mb-2">{invalidPassordError}</div>
                  }
                  {
                    error && <div className="alert alert-danger mb-2">{error?.message}</div>
                  }
                <button  className="form-control btn btn-primary">Sign Up</button>
                </div>
              </form>

              </div>
             </div>
          </div>
        </div>
      </div>

   )
}
