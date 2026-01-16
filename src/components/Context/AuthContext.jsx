import axios from "axios";
import { createContext, useEffect, useState } from "react";




 export const AuthContext = createContext()




export default function AuthContextProvider({children}) {

  const [token, setToken] = useState(null)
  const [userData,setUser ] = useState(null)
  console.log(token);
  
 
   useEffect(() => {
     const token = localStorage.getItem("token");
      const storedToken = token
    
      if (storedToken) {
        setToken(storedToken);
      }
    
    }, []);

    useEffect(() => {
        if (token) {
           getUserData(token)
        }
    }, [token])
    
    async function getUserData(token) {
  try {
    const { data } = await axios.get(
      "https://linked-posts.routemisr.com/users/profile-data",
      {
        headers: {
          token: token,
        },
      }
    );
    
if(data.message == 'success'){
  setUser(data.user)
}else if(data.error){
  throw new Error(data.error);
  
}
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}


    
  return <>
  <AuthContext.Provider value={{token ,setToken  ,userData , setUser ,getUserData }}>
{children}
  </AuthContext.Provider>
  </>
}
