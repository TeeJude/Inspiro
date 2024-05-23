import React,{useEffect} from "react"
import { Hero } from "./Hero"
import { useSelector,useDispatch } from "react-redux";
import {getPostDataAction} from "../redux/actions/posts/postDataActions";
import { Trending } from "./TrendingStories";
import { AdminHeader } from "./commons/AdminHeader";
import auth from "../services/auth/authService";

export const Home  = () => {
  const user = auth.getCurrentUser()
  const posts = useSelector(state => state.post_data.data);
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(getPostDataAction({}))
  },[])

   return (
     <>
     {
         user?.user_type =="Admin" &&
         <AdminHeader/>
      }
       <Hero/>
       <Trending props={posts}/>
     </>

   )
}