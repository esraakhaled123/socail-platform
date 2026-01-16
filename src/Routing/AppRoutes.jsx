import { createBrowserRouter } from "react-router-dom";

import NotFound from "../pages/NotFound/NotFound";
import Layout from "../components/Layout/Layout";
import ProutectedRoutes from "./ProutectedRoutes";
import ProtectedAuthRouting from "./ProtectedAuthRouting";
import { lazy, Suspense } from "react";
import AuthLayout from "../components/AuthLayout/AuthLayout";

// lazy loading

const Posts = lazy(()=>import('../pages/posts/Posts'))
const Profile = lazy(()=>import('../pages/profile/Profile'))
const Login = lazy(()=>import('../pages/auth/login/Login'))
const Register = lazy(()=>import('../pages/auth/register/Register'))
const PostDetails = lazy(()=>import('../components/postDetails/PostDetails'))
 export const router = createBrowserRouter([
  {path :'',
     element:<Layout/> ,
      children :[
        {
          index: true,
          element:<ProutectedRoutes>
            <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
                  <Posts/>
            </Suspense>
          </ProutectedRoutes>
        },
         {
          path:'/posts',
          element:<ProutectedRoutes>
            
            <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
                  <Posts/>
            </Suspense>
          </ProutectedRoutes>
        },
        //  {
        //   path: '/login',
        //   element:<ProtectedAuthRouting>
        //       <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
        //           <Login/>
        //     </Suspense>
           
        //   </ProtectedAuthRouting>
        // },
         {
          path: '/login',
          element:<AuthLayout/>,
          children:[{
            index:true,
            element: <ProtectedAuthRouting>
              <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
                  <Login/>
            </Suspense>
           
          </ProtectedAuthRouting>
          }]
         
        },

           {
          path: '/register',
          element:<AuthLayout/>,
          children:[{
            index:true,
            element: <ProtectedAuthRouting>
              <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
                  <Register/>
            </Suspense>
           
          </ProtectedAuthRouting>
          }]
         
        },
        //  {
        //   path: '/register',
        //   element:<ProtectedAuthRouting>
           
        //     <Suspense fallback={<div className="flex items-center justify-center text-xl">loading...</div>}>
        //            <Register/>
        //     </Suspense>
        //   </ProtectedAuthRouting>
        // },
         {
          path: '/Profile',
          element:
          <ProutectedRoutes>
            <Suspense fallback={<div className="flex items-center justify-center text-xl h-screen">loading...</div>}>
              <Profile/>
          </Suspense>
          </ProutectedRoutes>
          
        },
        {
          path: '/posts/:id',
          element:
         
        <Suspense fallback={<div className="flex items-center justify-center">loading...</div>}>
                 <PostDetails/>
            </Suspense>
        },
         {
         path:'*' ,
          element:<NotFound/>
        }
      ]}
])










//    /login == layout children image login 