import React from 'react'
import { useParams } from 'react-router-dom'
import { PostsItem } from '../posts/PostsItem';
import useFetch from '../../Hooks/useFetch';

export default function PostDetails() {
    const {id} =useParams()
    console.log(id);
//     const [post, setPost] = useState([])
//    async function getOnePost(id) {
//     try {
//             const {data :{post}} = await axios.get(`${import.meta.env.VITE_BASE_URL}/posts/${id}`,{
//              headers:{
//                token:localStorage.getItem('token')
//              }
//             })
           
//             setPost(post)
//          console.log(post);
       
//          } catch (error) {
//            console.log(error);
           
//          }}
         
//   console.log(import.meta.env.VITE_BASE_URL);
//  useEffect(() => {
//             getOnePost(id)
//          }, [])
// const {data  ,isLoading}=useQuery({ queryKey: 
//   ['details-post', id],
//    queryFn: getOnePost ,
//   //  select:(data)=>data?.data?.post
//  })
// async function getOnePost() {
//   return await axios.get(
//          `${import.meta.env.VITE_BASE_URL}/posts/${id}`,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//    })

// }
const{data , 
  isLoading ,isError ,error }=useFetch(['details-post', id] ,`posts/${id}`)
  //  const post = data?.data?.post
console.log(data);

  return <>
    <section>
        <div className="  dark:bg-gray-900 py-8">
          { isLoading && <div className="container text-4xl  text-center mx-auto">
           loading.....
  </div>}
    { isError && <div className="container text-4xl  text-center mx-auto">
           {error}
  </div>}
  <div className="max-w-xl mx-auto px-4">
    {data && <PostsItem post={data.post} showAllComments = {true}/> }
  </div>
</div>

    </section>
  </>
}
