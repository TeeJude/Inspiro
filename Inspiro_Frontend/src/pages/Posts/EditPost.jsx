import React, {useState, useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { editPostAction } from "../../redux/actions/posts/createPostActions";
import { getPostDetailAction } from "../../redux/actions/posts/postActions";
import { ScreenLoader } from "../commons/ScreenLoader";
import { Link, useNavigate} from 'react-router-dom';
import { toast } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { categories } from "../../services/helpers";
import { FaArrowLeft } from "react-icons/fa";


export const EditPost = () => {

 const dispatch = useDispatch();
 const error = useSelector(state => state.post_create.error);
 const statusCode = useSelector(state => state.post_create.statusCode);
 const loading = useSelector(state => state.post_create.loading);
 const post = useSelector(state => state.posts.data);
 const navigation = useNavigate()
 const {id} = useParams()

const [formData, setFormData] = useState({
    title: "",
    body: "",
    category: ''
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState('');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewURL(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewURL('');
    }
  };

  
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  
    const updatePost = async (e) => {
      e.preventDefault();
      const data = new FormData();
      if(selectedFile){
        data.append('media', selectedFile)
      }
      data.append('title', formData.title)
      data.append('body', formData.body)
      data.append('category', formData.category)
      dispatch(editPostAction({data,id}));
  };

  const successMessage = () => {
    if(statusCode && statusCode >= 200 && statusCode <= 299){
      toast.success("Post updated", {autoClose:300})
       window.location.href='/blogs'
    }
  }
  

  
  
  useEffect(() => {
    if (!post) {
      dispatch(getPostDetailAction(id));
    } else {
      setFormData({
        title: post.data.title || "",
        body: post.data.body || "",
        category: post.data.category || ''
      });
    }
    successMessage()
  }, [post, dispatch, id, statusCode]);
  console.log(statusCode)

   return (
      <>
        <ScreenLoader status={loading} />

      {
        post &&
        <div className="row justify-content-center">
          
          <div className="col-sm-8 col-md-8 col-lg-6">
             <div className="card border-0">
              <div className="card-body">

              <form onSubmit={updatePost}>
              <div>
                  {
                    error && <div className="alert alert-danger mb-2">{error?.message}</div>
                  }
                   <div className="row mb-3">
                    <div className="col-12 mb-4">
                        <Link to="/blogs" className="text-secondary">
                            <FaArrowLeft className="text-primary me-3" /> Back
                        </Link>
                      </div>
                      <div className="col d-flex justify-content-between">
                       <h4 className="text-s">
                        Create A Post
                      </h4>
                      <button className=" btn btn-primary btn-sm">
                        Publis Post
                      </button>
                      </div>
                     
                   </div>
              </div>



              <div className="file-input-div">
                  <input 
                   type="file" 
                   name="media" 
                   className="form-control"
                    onChange={handleFileChange}
                   />
                   <div className="row">
                    <div className="col-12">
                      {previewURL && <img src={previewURL} alt="File Preview" style={{ maxWidth: '100%', maxHeight: '6rem' }} />}

                    </div>
                   </div>

                </div>

            
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input 
                   type="text" 
                   name="title" 
                   className="form-control"
                   id="title" 
                    placeholder="Investments"
                    value={formData.title}
                    onChange={handleInputChange}
                    required
                   />
                </div>

                <div className="mb-3">
                  <label htmlFor="category" className="form-label">Category</label>
                  <select
                      name="category"
                      className="form-control"
                      id="body"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                    >
                      <option value="">Select category</option>
                      {
                        categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))
                      }
                    </select>
                </div>

              
                
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Body</label>
                  <textarea 
                   
                  className="form-control" 
                  id="password" 
                  placeholder="Good services"
                   value={formData.body}
                   required
                   onChange={handleInputChange}
                   name="body"
                  />
                </div>

              </form>
              </div>
             </div>
          </div>
        </div>
      }
      </>

   )
}
