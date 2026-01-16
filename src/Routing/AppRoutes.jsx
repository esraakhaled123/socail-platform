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
         
        <Suspense fallback={

<div role="status" class="flex items-center justify-center h-56 max-w-sm bg-neutral-quaternary rounded-base animate-pulse">
    <svg class="w-11 h-11 text-fg-disabled" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linejoin="round" stroke-width="2" d="M10 3v4a1 1 0 0 1-1 1H5m14-4v16a1 1 0 0 1-1 1H6a1 1 0 0 1-1-1V7.914a1 1 0 0 1 .293-.707l3.914-3.914A1 1 0 0 1 9.914 3H18a1 1 0 0 1 1 1ZM9 12h2a1 1 0 0 1 1 1v2a1 1 0 0 1-1 1H9a1 1 0 0 1-1-1v-2a1 1 0 0 1 1-1Zm5.697 2.395v-.733l1.269-1.219v2.984l-1.268-1.032Z"/></svg>
    <span class="sr-only">Loading...</span>
</div>
}>
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