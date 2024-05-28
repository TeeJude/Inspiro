import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { updateUserAction } from "../../redux/actions/users/updateUserAction";
import { getUserDetailAction } from "../../redux/actions/users/singleUserActions";
import { useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { ButtonLoader } from "../commons/ButtonLoader";


export const EditUser = ({userId}) => {

 const dispatch = useDispatch();
 const error = useSelector(state => state.user_update.error);
 const statusCode = useSelector(state => state.user_details.statusCode);

 const loading = useSelector(state => state.user_update.loading);
 const userData = useSelector(state => state.user_details.data);
 const navigation = useNavigate()

const [formData, setFormData] = useState({
    name: "",
    email: "",
    user_type: 'Admin'
  });

  
  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  
    const updateUser = async (e) => {
      e.preventDefault();
      dispatch(updateUserAction({data:formData,id: userId}));
  };

  
  
  useEffect(() => {
    if (!userData) {
      dispatch(getUserDetailAction(userId));
    } else {
      setFormData({
        name: userData.data.name || "",
        email: userData.data.email || "",
        user_type:'Admin'
      });
    }
  }, [userData, dispatch, userId, statusCode]);

  return (
    <div>
      <div className="row justify-content-center">

        <div className="col-sm-12 col-md-10 col-lg-10">
           <div className="card border-0">
            <div className="card-body">
            <form onSubmit={updateUser}>
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
                
                {
                  error && <div className="alert alert-danger mb-2">{error?.message}</div>
                }

              <ButtonLoader status={loading}/>

              <button  className="form-control btn btn-primary">Update</button>
              </div>
            </form>

            </div>
           </div>
        </div>
      </div>
    </div>

 )
}
