import React, { useContext,  } from 'react'
import Add from '../../components/posts/Add'
import PostsList from '../../components/posts/PostsList'
import { AuthContext } from '../../components/Context/AuthContext'
import useFetch from '../../Hooks/useFetch'
import ProfileCard from '../../components/profile/ProfileCard'
import { Helmet } from 'react-helmet'

export default function Profile() {
 const {userData} =useContext(AuthContext)

const { data, isLoading, error, refetchData } =
  useFetch(['profile-posts', userData?._id], `users/${userData?._id}/posts`);
    
  return <>
   <Helmet>
    <title>profile</title>
  </Helmet>
 <Add onPostCreated={refetchData}/>
 <ProfileCard/>
    <PostsList error={error} data={[...(data?.posts || [])].reverse()}
 isLoading={isLoading}/>
  </>
}
