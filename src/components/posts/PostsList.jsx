import React, { useContext } from 'react'
import { PostsItem } from './PostsItem'
import { AuthContext } from '../Context/AuthContext';
import PostSkeleton from '../../PostSkeleton';

export default function PostsList({ error , data ,isLoading}) {

  const {userData}=useContext(AuthContext)
  console.log(userData);



  return <>
  <section className='pt-0'>
     { isLoading && <div className="container lg:max-w-3xl mx-auto ">
            {isLoading &&
            Array.from({ length: 40 }).map((_, i) => (
              <PostSkeleton key={i} />
            ))
          }
  </div>}
 
    <div className=" container lg:max-w-3xl mx-auto">
       <div className='flex flex-col gap-4'>
        {error&& <div className='text-center text-lg text-red-800'>{error}</div>}
      {data && data.map((post)=><PostsItem key={post._id} post={post}/>)}
       </div>
    </div>
  </section>
  </>
}
