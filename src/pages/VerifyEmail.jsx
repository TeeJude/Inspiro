import React, {useState, useEffect} from "react"
import { useDispatch,useSelector } from "react-redux";
import { verifyEmailAction } from "../redux/actions/auth/verifyEmailAction";
import { useNavigate } from 'react-router-dom';
import { ScreenLoader } from "./commons/ScreenLoader";
import { toast } from "react-toastify";


export const VerifyEmail = () => {
 const dispatch = useDispatch();
 const navigation = useNavigate()
 const error = useSelector(state => state.verify.error);
 const statusCode = useSelector(state => state.verify.statusCode);
 const loading = useSelector(state => state.verify.loading);



 const [formData, setFormData] = useState({
    token: '',
    device: 'web'
  })
  
  const handleInputChange = (e) => {
   
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  
    const verify = async (e) => {
        e.preventDefault();
        await dispatch(verifyEmailAction({ ...formData }));
  };

  const navigateToNextPage = () => {
    if(statusCode >= 200 && statusCode <=299){
      toast.success("Verification successfull", {autoClose:300})
      navigation('/login')
    }
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
                        Enter Your token To Continue
                      </p>
                      </div>
                     
                   </div>
              </div>

              <form onSubmit={verify}>
                <div className="mb-3">
                  <label htmlFor="token" className="form-label">token</label>
                  <input 
                   type="text" 
                   name="token" 
                   className="form-control"
                   id="token" 
                    placeholder="123458"
                    value={formData.token}
                    onChange={handleInputChange}
                    required
                   />
                </div>

                <div className="mb-3">
                  
                  {
                    error && <div className="alert alert-danger mb-2">{error?.message}</div>
                  }
                <button  className="form-control btn btn-primary">Verify</button>
                </div>
              </form>

              </div>
             </div>
          </div>
        </div>
      </div>

   )
}
