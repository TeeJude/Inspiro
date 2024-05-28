import React, {useEffect} from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime, getSubString } from "../../services/helpers";
import { getPostDetailAction } from "../../redux/actions/posts/postActions";
import { ScreenLoader } from "../commons/ScreenLoader";
import { useParams } from 'react-router-dom';
import {getPostDataAction} from "../../redux/actions/posts/postDataActions";
import { Comment } from "./Comments";
import auth from "../../services/auth/authService";
import { AdminHeader } from "../commons/AdminHeader";




export const SinglePost = () => {

 const dispatch = useDispatch();
 const {id} = useParams()

 const loading = useSelector(state => state.posts.loading);
 const props = useSelector(state => state.posts.data);
 const posts = useSelector(state => state.post_data.data);
 const user = auth.getCurrentUser()
  useEffect(() => {
     dispatch(getPostDetailAction(id))
     dispatch(getPostDataAction())
  }, []);
  

  return (
        <>
         <ScreenLoader status={loading}/>
         {
         user?.user_type =="Admin" &&
         <AdminHeader/>
        }
          <div className="row justify-content-center ">
              <div className="col-sm-11 col-md-9 col-lg-10">
                  <div className="card border-0">
                      <div className="card-body">
                          <img src= {props?.data?.media} alt="Logo" style={{width:"100%"}} />
                      <div className="card-footer px-1 border-0 px-5">
                          <h6 className="mb-5">
                              {props?.data?.title}
                          </h6>
                          <div className="d-flex justify-content-between mb-2">
                          <small className="btn btn-sm btn-secondary d-inline-block">
                              {props?.data?.category}
                          </small>
                          <small className="text-end d-inline-block">
                              {props?.data?.comments_count} comment(s)
                          </small>

                          </div>

                          <div className="d-flex justify-content-between px-1">
                              <small>
                                <span className="d-inline-block me-4">{props?.data?.creator?.name}</span>
                                <span>
                                  {formatDateTime( props?.data?.created_on)}

                                </span>
                              </small>
                              
                          </div>

                          <article>
                          <p className="mt-4">
                              {props?.data?.body}
                          </p>
                          </article>
                      </div>
                      </div>
                  </div>
                  {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
              </div>
          </div>

           {/* Related Stories */}
           <div className="row justify-content-center  mt-2">
              <div className="col-md-10 col-lg-10">
                <h6 className="ps-3">Related Stories</h6>
              <div className="row">
                {
                  posts?.data[2] && 
                  <div className="col-sm-11 col-md-9 col-lg-4">
                      <div className="card border-0">
                          <div className="card-body">
                              <img src= {posts?.data[2]?.media} alt="Logo" style={{width:"100%"}} />
                          <div className="card-footer px-1 border-0">
                              <small className="btn btn-sm btn-secondary">
                                  {posts?.data[2]?.category}
                              </small>
                              <article>
                                  <h6>
                                      {getSubString( posts?.data[2]?.title,15)}
                                  </h6>
                                  <p>
                                      {getSubString(posts?.data[2]?.body,20)}
                                  </p>

                              </article>
                              <div className="d-flex justify-content-between px-1">
                                  <small>
                                      {formatDateTime( posts?.data[2]?.created_on)}
                                  </small>
                                  <small>
                                      <a href={`/post/details/${posts?.data[2]?.id}`}>Read More </a>
                                  </small>
                              </div>
                          </div>
                          </div>
                      </div>
                      {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                  </div>
                }
                {
                  posts?.data[1] &&
                  <div className="col-sm-11 col-md-9 col-lg-4">
                      <div className="card border-0">
                          <div className="card-body">
                              <img src= {posts?.data[1]?.media} alt="Logo" style={{width:"100%"}} />
                          <div className="card-footer px-1 border-0">
                              <small className="btn btn-sm btn-secondary">
                                  {posts?.data[0]?.category}
                              </small>
                              <article>
                                  <h6>
                                      {getSubString( posts?.data[1]?.title,15)}
                                  </h6>
                                  <p>
                                      {getSubString(posts?.data[1]?.body,20)}
                                  </p>

                              </article>
                              <div className="d-flex justify-content-between px-1">
                                  <small>
                                      {formatDateTime( posts?.data[1]?.created_on)}
                                  </small>
                                  <small>
                                      <a href={`/post/details/${posts?.data[1]?.id}`}>Read More </a>
                                  </small>
                              </div>
                          </div>
                          </div>
                      </div>
                      {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                  </div>
                }
                {
                  posts?.data[3] &&
                  <div className="col-sm-11 col-md-9 col-lg-4">
                      <div className="card border-0">
                          <div className="card-body">
                              <img src= {posts?.data[3]?.media} alt="Logo" style={{width:"100%"}} />
                          <div className="card-footer px-1 border-0">
                              <small className="btn btn-sm btn-secondary">
                                  {posts?.data[3]?.category}
                              </small>
                              <article>
                                  <h6>
                                      {getSubString( posts?.data[3]?.title,15)}
                                  </h6>
                                  <p>
                                      {getSubString(posts?.data[3]?.body,20)}
                                  </p>

                              </article>
                              <div className="d-flex justify-content-between px-1">
                                  <small>
                                      {formatDateTime( posts?.data[3]?.created_on)}
                                  </small>
                                  <small>
                                      <a href={`/post/details/${posts?.data[3]?.id}`}>Read More </a>
                                  </small>
                              </div>
                          </div>
                          </div>
                      </div>
                      {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                  </div>
                }
              </div>
              </div>
            </div>

            <Comment/>
        </>

   )
}
