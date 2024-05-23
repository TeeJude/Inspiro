import React, {useEffect,useState} from "react"
import { useDispatch, useSelector } from "react-redux";
import { formatDateTime, getSubString } from "../../services/helpers";
import { getPostDetailAction } from "../../redux/actions/posts/postActions";
import { ScreenLoader } from "../commons/ScreenLoader";
import { useParams } from 'react-router-dom';
import logo from "../../assets/Rectangle1.png"
import {getPostDataAction} from "../../redux/actions/posts/postDataActions";
import { Comment } from "./CreateUsers";




export const SinglePost = () => {

 const dispatch = useDispatch();
 const {id} = useParams()

 const loading = useSelector(state => state.posts.loading);
 const props = useSelector(state => state.posts.data);
 const posts = useSelector(state => state.post_data.data);


  useEffect(() => {
     dispatch(getPostDetailAction(id))
     dispatch(getPostDataAction())
  }, []);
  

  return (
        <>
         <ScreenLoader status={loading}/>
          <div className="row justify-content-center ">
              <div className="col-sm-11 col-md-9 col-lg-10">
                  <div className="card border-0">
                      <div className="card-body">
                          <img src= {logo} alt="Logo" style={{width:"100%"}} />
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

           {/* The three cards */}
           <div className="row justify-content-center">
              <div className="col-md-10 col-lg-10">
              <div className="row">
                    <div className="col-sm-11 col-md-9 col-lg-4">
                        <div className="card border-0">
                            <div className="card-body">
                                <img src= {logo} alt="Logo" style={{width:"100%"}} />
                            <div className="card-footer px-1 border-0">
                                <small className="btn btn-sm btn-secondary">
                                    {posts?.data[0]?.category}
                                </small>
                                <article>
                                    <h6>
                                        {getSubString( posts?.data[0]?.title,15)}
                                    </h6>
                                    <p>
                                        {getSubString(posts?.data[0]?.body,20)}
                                    </p>

                                </article>
                                <div className="d-flex justify-content-between px-1">
                                    <small>
                                        {formatDateTime( posts?.data[0]?.created_on)}
                                    </small>
                                    <small>
                                        <a href={`/post/details/${posts?.data[0]?.id}`}>Read More </a>
                                    </small>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                    </div>
                    <div className="col-sm-11 col-md-9 col-lg-4">
                        <div className="card border-0">
                            <div className="card-body">
                                <img src= {logo} alt="Logo" style={{width:"100%"}} />
                            <div className="card-footer px-1 border-0">
                                <small className="btn btn-sm btn-secondary">
                                    {posts?.data[0]?.category}
                                </small>
                                <article>
                                    <h6>
                                        {getSubString( posts?.data[0]?.title,15)}
                                    </h6>
                                    <p>
                                        {getSubString(posts?.data[0]?.body,20)}
                                    </p>

                                </article>
                                <div className="d-flex justify-content-between px-1">
                                    <small>
                                        {formatDateTime( posts?.data[0]?.created_on)}
                                    </small>
                                    <small>
                                        <a href={`/post/details/${posts?.data[0]?.id}`}>Read More </a>
                                    </small>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                    </div>
                    <div className="col-sm-11 col-md-9 col-lg-4">
                        <div className="card border-0">
                            <div className="card-body">
                                <img src= {logo} alt="Logo" style={{width:"100%"}} />
                            <div className="card-footer px-1 border-0">
                                <small className="btn btn-sm btn-secondary">
                                    {posts?.data[0]?.category}
                                </small>
                                <article>
                                    <h6>
                                        {getSubString( posts?.data[0]?.title,15)}
                                    </h6>
                                    <p>
                                        {getSubString(posts?.data[0]?.body,20)}
                                    </p>

                                </article>
                                <div className="d-flex justify-content-between px-1">
                                    <small>
                                        {formatDateTime( posts?.data[0]?.created_on)}
                                    </small>
                                    <small>
                                        <a href={`/post/details/${posts?.data[0]?.id}`}>Read More </a>
                                    </small>
                                </div>
                            </div>
                            </div>
                        </div>
                        {/* <img src= {posts?.data[0]?.media} alt="Logo" /> */}
                    </div>
              </div>
              </div>
            </div>

            <Comment/>
        </>

   )
}
