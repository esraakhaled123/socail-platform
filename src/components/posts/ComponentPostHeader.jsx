import { Avatar, Dropdown, DropdownItem, FileInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { formateDate } from '../../lib/formateDate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { toast } from 'sonner';
import { AuthContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';
import AppButton from '../shared/Appbutton/AppButton';

export default function ComponentPostHeader({ 
  user: { photo, name, createdAt, body, _id }, 
  mediaId, 
  iscomment = false 
}) {
  const [isEditting, setIsEditting] = useState(false);
  const queryClient = useQueryClient();
  const { userData } = useContext(AuthContext);
  const isOwner = userData?._id === _id;

  const { register, handleSubmit, reset, formState: { isValid } } = useForm({
    mode: "onChange",
    defaultValues: { content: body } 
  });

  const invalidateQueries = () => {
    queryClient.invalidateQueries(['details-post']);
    queryClient.invalidateQueries(['posts']);
    queryClient.invalidateQueries(['profile-posts']);
  };

  // --- 1. Mutation الحذف ---
  const { mutate: deleteMedia } = useMutation({
    mutationFn: async (id) => {
      const endPoint = iscomment ? "comments" : "posts";
      return await axios.delete(`${import.meta.env.VITE_BASE_URL}/${endPoint}/${id}`, {
        headers: { token: localStorage.getItem('token') }
      });
    },
    onSuccess: () => {
      toast.success('Deleted successfully');
      invalidateQueries();
    }
  });

  // --- 2. Mutation التعديل ---
  const { mutate: updateMedia, isPending: isUpdating } = useMutation({
    mutationFn: async (data) => {
      const endPoint = iscomment ? "comments" : "posts";
      let payload;
      let headers = { token: localStorage.getItem('token') };

      if (iscomment) {
        payload = { content: data.content };
      } else {
        payload = new FormData();
        payload.append('body', data.content);
        if (data.image && data.image[0]) {
          payload.append('image', data.image[0]);
        }
      }

      return await axios.put(
        `${import.meta.env.VITE_BASE_URL}/${endPoint}/${mediaId}`,
        payload,
        { headers }
      );
    },
    onSuccess: () => {
      toast.success('Updated successfully');
      setIsEditting(false);
      invalidateQueries();
    },
    onError: (err) => {
      toast.error(err.response?.data?.message || 'Update failed');
    }
  });

  return (
    <header className={`${iscomment && 'rounded p-3 shadow-[0_0_15px_rgba(0,0,0,0.30)] mb-3 dark:bg-gray-800'}`}>
      <div className='flex justify-between items-center'>
        <div className="flex items-center gap-x-2">
          <Avatar img={iscomment && photo ? "https://www.gravatar.com/avatar/?d=mp":photo} alt="User avatar" rounded size="sm" />
      
          <div>
            <h2 className="text-sm font-bold text-gray-900 dark:text-white">{name}</h2>
            <span className="text-xs text-gray-500">{formateDate(createdAt)}</span>
          </div>
        </div>

        {isOwner && !isEditting && (
          <Dropdown inline label="" className='cursor-pointer'>
            <DropdownItem onClick={() => setIsEditting(true)}>Edit</DropdownItem>
            <DropdownItem onClick={() => deleteMedia(mediaId)} className="text-red-600">Delete</DropdownItem>
          </Dropdown>
        )}
      </div>

      <div className={`${iscomment ? 'ps-11 mt-1' : 'mt-5'}`}>
        {isEditting ? (
          <form onSubmit={handleSubmit((data) => updateMedia(data))} className="space-y-3">
            <textarea
              {...register("content", { required: true })}
              className="w-full p-2 text-sm border rounded-lg dark:bg-gray-700 dark:text-white"
              rows={iscomment ? 2 : 4}
              placeholder={iscomment ? "Update your comment..." : "What's on your mind?"}
            />

            {/*(يظهر فقط في حالة البوست) */}
            {!iscomment && (
              <div className="mt-2">
                <label className="text-xs text-gray-500 mb-1 block">Change image (optional):</label>
                <FileInput {...register("image")} sizing="sm" accept="image/*" />
              </div>
            )}

            <div className="flex gap-2">
              <AppButton type='submit' disabled={!isValid || isUpdating}>
                {isUpdating ? 'Saving...' : 'Update'}
              </AppButton>
              <button 
                type="button" 
                onClick={() => { setIsEditting(false); reset(); }}
                className="px-4 cursor-pointer py-2 text-sm text-gray-500 hover:bg-gray-100 rounded-lg dark:hover:bg-gray-700 transition"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <h3 className="text-sm font-normal text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
            {body}
          </h3>
        )}
      </div>
    </header>
  );
}

