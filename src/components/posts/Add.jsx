import axios from 'axios'
import {  Card, Label, Textarea, TextInput, Toast } from 'flowbite-react'
import React from 'react'
import { useRef } from 'react'
import { useForm } from 'react-hook-form'
import { FaCamera } from 'react-icons/fa'
import AppButton from '../shared/Appbutton/AppButton'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
export default function Add({onPostCreated}) {

 const fileInputRef  = useRef()
const {mutate , isPending}=useMutation({
  mutationFn: AddPost,
  onSuccess: () => {


    reset();
    fileInputRef.current.value = "";

    toast.success('post created successfully', {
      theme: "dark",
    });
    onPostCreated()
  },
  onError:()=>{
     toast.error('post created faild', {
      theme: "dark",
    });
  }
});
const schema = z.object({
      body:z.string(),
    //   image:z.object()
     
})
const {
  register,
  handleSubmit,
  reset,
  formState: {  isValid },
} = useForm({
  defaultValues: {
    body: "",
    
  },
  mode: "onChange",
  resolver: zodResolver(schema),
});


 async function AddPost(values){
    console.log(values.body ,fileInputRef.current.files[0]);
 const formData = new FormData()  
 formData.append("body",values.body) 
 if (fileInputRef.current.files[0]) {
   formData.append("image",fileInputRef.current.files[0]) 
       
 }

return  await axios.post(`${import.meta.env.VITE_BASE_URL}/posts`, 
    formData
    ,{
    headers:{
        token:localStorage.getItem('token')
    }
   }) 
  
   }
  
   


  return  <section className='pb-4'>
    <div className=" container lg:max-w-3xl mx-auto">
       
        <Card className='mb-0'>
      <form onSubmit={handleSubmit(mutate)}  className="flex flex-col gap-4">
        <div>
          <div className="mb-2 block">
            <Label htmlFor="post">post some thing</Label>
          </div>
             <div className='flex items-center gap-x-2'>
                 <Textarea 
                  id="post" placeholder="whats is on your mind?..."  rows={2} 
                 {...register('body')}
                 />
                 <input className='hidden' 
                 {...register('image')}
                 type='file'
                  ref={fileInputRef} 
                  name=''  
                 
                  />            
                 <FaCamera
                  onClick={()=>fileInputRef.current.click()} 
                  className='text-3xl cursor-pointer' />

             </div>

        </div>
<AppButton
  disabled={!isValid || isPending}
  isloading={isPending}
>
  create post
</AppButton>
      </form>
    </Card>
        
        </div>
        
      
        </section>
}
