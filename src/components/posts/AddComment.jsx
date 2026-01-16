import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios';
import { Button, Label, Spinner, Textarea } from 'flowbite-react'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner';

export default function AddComment({post}) {

  const { register, handleSubmit ,reset , formState:{isValid }} = useForm({
  mode: "onChange"
});
  const queryClient = useQueryClient();

   const{mutate ,isPending}= useMutation({
    mutationFn:addComment,
    onSuccess: (data) => {
    reset();
    toast.success(data.data.message, {
      theme: "dark",
    });
 queryClient.invalidateQueries(['details-post', post]);
 queryClient.invalidateQueries(['posts', post]);
 queryClient.invalidateQueries(['profile-posts', post]);
  },
  onError:(data)=>{
     toast.error(data.data.error, {
      theme: "dark",
    });
  }
});

 async  function addComment(data){
       console.log({...data,post});
       const commentData = {...data , post}
       return await axios.post(`${import.meta.env.VITE_BASE_URL}/comments`, commentData,
      {
         headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
       
   }
  return <>
    <form onSubmit={handleSubmit(mutate)}  className="flex flex-col gap-4">
          <div>
  <div className="relative">
    <Textarea
      id="post"
      placeholder="Add your comment..."
      rows={2}
      {...register("content", { required: true })}
      className="pr-24 resize-none"
    />

 <Button
  type="submit"
  disabled={!isValid || isPending}
  className="absolute top-2 right-2 flex items-center justify-center min-w-22.5"
>
  {isPending ? (
    <Spinner size="sm" aria-label="Loading" light />
  ) : (
    "Comment"
  )}
</Button>


  </div>
</div>

  
         </form>
  </>
}
