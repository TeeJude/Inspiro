import React, {useEffect,} from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime, getSubString } from "../../services/helpers";
import { ScreenLoader } from "../commons/ScreenLoader";
import {getPostDataAction} from "../../redux/actions/posts/postDataActions";
import { Link } from "react-router-dom";
import { AdminHeader } from "../commons/AdminHeader";
import auth from "../../services/auth/authService";
import { BiTimer } from "react-icons/bi";


export const BlogPosts = () => {

 const dispatch = useDispatch();
 const loading = useSelector(state => state.posts.loading);
 const posts = useSelector(state => state.post_data.data);
 const user = auth.getCurrentUser()

  useEffect(() => {
     dispatch(getPostDataAction())
  }, []);
  

  return (
        <>
         <ScreenLoader status={loading}/>
         {
         user?.user_type =="Admin" &&
         <AdminHeader/>
        }
           <div className="row justify-content-center">
              <div className="col-md-10 col-lg-10">
                
                    
                    <div className="row">
                        {
                            posts?.data?.map((data) => (
                            <div className="col-sm-11 col-md-6 col-lg-4">
                                <div className="card border-0">
                                    <div className="card-body">
                                        <img src= {data?.media} alt="Logo" style={{width:"100%", height:"200px"}} />
                                    <div className="card-footer px-1 border-0">
                                        <small className="btn btn-sm btn-secondary">
                                            {data?.category}
                                        </small>
                                        <article>
                                            <h6>
                                                {getSubString( data?.title,15)}
                                            </h6>
                                            <p>
                                                {getSubString(data?.body,20)}
                                            </p>

                                        </article>
                                        <div className="d-flex justify-content-between px-1">
                                            <small>
                                            <BiTimer/>    {formatDateTime( data?.created_on)}
                                            </small>
                                            <small>
                                                <Link to={`/post/details/${data?.id}`}>Read More </Link>
                                            </small>
                                        </div>
                                    </div>
                                    </div>
                                </div>
                            </div>
                                ))
                            }
                        </div>
              </div>
            </div>
        </>

   )
}
