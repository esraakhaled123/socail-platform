
  

import { Avatar, Card } from "flowbite-react";
import { AiOutlineLike } from "react-icons/ai";
import { FaComment, FaShare } from "react-icons/fa";
import { Link } from "react-router-dom";
import ComponentPostHeader from "./ComponentPostHeader";
import AddComment from "./AddComment";


export function PostsItem({post , showAllComments = false}) {
console.log(post);

const {
  user,
  _id,
  image,
  createdAt,
  comments = [],
  body
} = post || {}




  return (
    <Card>
      <ComponentPostHeader user={{...user , body , createdAt }} mediaId ={_id}/>
      {image &&<img src={image} className="h-96 object-cover" alt="imagee" />}
     
      {/* footer */}

         <div className="flex items-center justify-between ">
              <AiOutlineLike className="text-2xl cursor-pointer" />
              <div className="flex items-center gap-x-1 cursor-pointer">
               
             <Link
  to={`/posts/${_id}`}
  className="flex items-center gap-1  cursor-pointer"
 >
  <FaComment />
  <span>{comments?.length || 0}</span>
</Link>

              </div>

             <Link to={`/posts/${_id}`}>
              <FaShare  className="text-xl cursor-pointer " />
             </Link>
         </div>
         
      {/* comments */}
   {comments && comments.length > 0 && (
  showAllComments ? (
    comments.map((comment) => (
      <ComponentPostHeader
        key={comment._id}
        user={{
          ...comment.commentCreator,
          createdAt: comment.createdAt,
          body: comment.content
        }}
        iscomment={true}
        mediaId={comment._id}
      />
    ))
  ) : (
   <ComponentPostHeader
  user={{
    ...comments[comments.length - 1].commentCreator,
    createdAt: comments[comments.length - 1].createdAt,
    body: comments[comments.length - 1].content,
  }}
  mediaId={comments[comments.length - 1]._id}
  postId = {_id}
  iscomment={true}
/>

  
))


  
}


<AddComment post={_id}/>
    </Card>
  );
}

 

