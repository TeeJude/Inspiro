import React, {useEffect, useState} from "react"
import { useDispatch,useSelector } from "react-redux";
import { resetPasswordEmailAction } from "../redux/actions/auth/resetPasswordEmailAction";
import { useNavigate } from 'react-router-dom';
import { ScreenLoader } from "./commons/ScreenLoader";
import { toast } from "react-toastify";


export const SendForgotPasswordEmail = () => {
 const dispatch = useDispatch();
 const navigation = useNavigate()
 const error = useSelector(state => state.reset_password.error);
 const statusCode = useSelector(state => state.reset_password.statusCode);
 const loading = useSelector(state => state.reset_password.loading);



 const [formData, setFormData] = useState({
    email: '',
    source: 'web'
  })
  
  const handleInputChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  
    const resetPassword = async (e) => {
        e.preventDefault();
        await dispatch(resetPasswordEmailAction({ ...formData }));
  };

  const navigateToNextPage = () => {
    if(statusCode >= 200 && statusCode <=299){
      toast.success("Verification successfull", {autoClose:300})
      navigation('/reset-password')    }
  }

  
  useEffect(()=>{
     navigateToNextPage()
  }, [statusCode])

  return (
      <div>
        <ScreenLoader status={loading}/>
        <div className="row justify-content-center">

          <div className="col-sm-8 col-md-6 col-lg-4">
             <div className="card border-0">
              <div className="card-body">
              <div>
                   
                   <div className="row justify-content-center">
                      <div className="col">
                      
                      <p className="text-center text-muted">
                        Enter Your email to continue
                      </p>
                      </div>
                     
                   </div>
              </div>

              <form onSubmit={resetPassword}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input 
                   type="email" 
                   required
                   name="email" 
                   className="form-control"
                   id="email" 
                    placeholder="email@example.com"
                    value={formData.email}
                    onChange={handleInputChange}
                   />
                </div>

                <div className="mb-3">
                  
                  {
                    error && <div className="alert alert-danger mb-2">{error?.message}</div>
                  }

                <button  className="form-control btn btn-primary">Send Email</button>
                </div>
              </form>

              </div>
             </div>
          </div>
        </div>
      </div>

   )
}
