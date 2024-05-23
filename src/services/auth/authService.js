
const tokenKey = 'token'
const userKey = 'user'

function logout() {
  localStorage.removeItem(tokenKey);
  localStorage.removeItem(userKey);
}
// {"token":"12|55QA0uPZyquwvbXKJYJHR0MGjYKO3vN67pmOn6Yq7e525072","name":"Charles Otaru","email":"charleeotaru@gmail.com","expiration_time (hrs)":2,"user_type":"Admin"}

 function getCurrentUser(){
   try {
    
    const user = getUser()
    const userDetails = JSON.parse(user)
    const expiration_time = userDetails.expiration_time
    const date = new Date();
    const now = date.getTime()
    const timeStamp = (Math.ceil(now/1000));
    if (timeStamp > expiration_time) return null;
    else {
      return userDetails
   }
  } catch (error) {
    return null
  }
}
 
 const setJWT= (token) =>{
  localStorage.setItem(tokenKey,token);
}
 const setUser= (user) =>{
  localStorage.setItem(userKey,user);
}
 
 
 
const getJWT =  () => {
   return localStorage.getItem(tokenKey)
 }
const getUser =  ()  => {
   return localStorage.getItem(userKey)
 }

 export const auth = {logout,setJWT,getJWT, setUser, getUser, getCurrentUser}
export default auth
