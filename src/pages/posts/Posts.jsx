import React, { useContext } from 'react'
import { Button } from "flowbite-react";
import PostsList from '../../components/posts/PostsList';
import Add from '../../components/posts/Add';

import useFetch from '../../Hooks/useFetch';
import { AuthContext } from '../../components/Context/AuthContext';
import { Helmet } from 'react-helmet';

export default function Posts() {
   const {userData} =useContext(AuthContext)
  

  const{data , isLoading  ,error , refetchData}=useFetch(['posts'] ,`posts?limit=40&sort=-createdAt`,userData)
  //  const post = data?.data?.post
console.log(data);
  return <>
  <Helmet>
    <title>Home</title>
<meta name="description" content="Kudo is a social platform where users can share posts, interact, and connect with others." />
  </Helmet>
  <Add onPostCreated={refetchData}/>
   <PostsList error={error} data ={data?.posts} isLoading={isLoading}/>
  </>
}
