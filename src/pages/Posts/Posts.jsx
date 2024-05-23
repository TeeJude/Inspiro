import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime, getSubString } from "../../services/helpers";
import {getPostDataAction} from "../../redux/actions/posts/postDataActions";
import {deletePostAction} from "../../redux/actions/posts/deletePostActions";
import { ScreenLoader } from "../commons/ScreenLoader";
import { toast } from "react-toastify";
import { AdminHeader } from "../commons/AdminHeader";
import { Link } from 'react-router-dom';


export const Posts = () => {

 const dispatch = useDispatch();

 const loading = useSelector(state => state.post_data.loading);
 const postData = useSelector(state => state.post_data.data);
 const statusCode = useSelector(state => state.post_delete.statusCode);
 const deletePostLoading = useSelector(state => state.post_delete.loading);

 const deletePost =(id) => {
    dispatch(deletePostAction(id))
 }

 const navigateToNextPage = () => {
  if(statusCode && statusCode >=200 && statusCode <= 299){
    toast.success("post deleted successfull", {autoClose:300})
      dispatch(getPostDataAction({}))
    }
}


useEffect(() => {
     dispatch(getPostDataAction({}))
     navigateToNextPage
  }, [statusCode]);


  return (
        <>
        
         <ScreenLoader status={deletePostLoading}/>
         <ScreenLoader status={loading}/>
         <AdminHeader/>
          <div className="posts-wrapper">
            <div className="container p-4">
               <div className="d-flex justify-content-between mb-2">
                 <h5>Blog Post</h5>
                 <Link to="/create/post" className="btn btn-sm btn-primary">+Add New Post</Link>
               </div>
            <div className="table-responsive">
            <table className="table">
                <thead>
                  <tr className="text-center">
                    <th scope="col">Title</th>
                    <th scope="col">Author</th>
                    <th scope="col">Date Posted</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    postData ?  
                    postData?.data?.map((data) => (
                    <tr key={data?.title} className="text-center">
                      <td >{getSubString( data?.title,15)}</td>
                      <td>{data?.creator?.name}</td>
                      <td>{formatDateTime(data?.created_on)}</td>
                      <td>
                        <Link to = {`/post/edit/${data?.id}`}  className="btn btn-sm btn-primary me-4">
                          Edit
                        </Link>
                        <button onClick={()=> deletePost(data?.id)} className="btn btn-sm btn-danger">
                          Delete
                        </button>
                      </td>
                    </tr>
                    
                    ))
                      
                    :
                    <tr>
                      <td>No Data</td>
                    </tr>
                  }
                  
                </tbody>
              </table>
            </div>
            </div>

          </div>
        </>

   )
}
