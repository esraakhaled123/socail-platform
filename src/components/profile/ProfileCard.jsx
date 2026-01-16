import { Avatar, Button, Card, FileInput, Label, Modal, ModalBody, ModalHeader, TextInput } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { MdEdit } from "react-icons/md";
import { profileImageSchema } from "../../scema/profileimage.schema";
import { zodResolver } from '@hookform/resolvers/zod';

export default function ProfileCard() {
    const { userData, getUserData } = useContext(AuthContext);
  const [openModal, setOpenModal] = useState(false);
  const queryClient = useQueryClient();

  const { register, handleSubmit ,formState:{errors}} = useForm({
    defaultValues: { name: userData?.name },
    resolver: zodResolver(profileImageSchema),
    mode:"onChange"
  });

  const { mutate: updateProfile, isPending } = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      if (data.photo && data.photo[0]) {
        formData.append("photo", data.photo[0]);
      }

      return await axios.put(`${import.meta.env.VITE_BASE_URL}/users/upload-photo`, formData, {
        headers: { token: localStorage.getItem("token") }
      });
    },
    onSuccess: () => {
      toast.success("Profile updated successfully");
      setOpenModal(false);
      queryClient.invalidateQueries(['profile-posts']);
      getUserData(localStorage.getItem('token'))
    },
    onError: () => toast.error("Update failed")
  });

  if (!userData) return null;

  return (
    <>
      <div className="container lg:max-w-3xl mx-auto my-3">
        <Card>
          <div className="flex flex-col items-center pb-10">
          <div className="relative inline-block"> 
  <Avatar
    img={userData?.photo}
    className="rounded-full shadow-lg"
    size="xl"
    rounded
  />
  
  <MdEdit
    onClick={() => setOpenModal(true)}
    size={30} 
    className="absolute bottom-0 end-3 p-1 bg-gray-900 text-white rounded-full cursor-pointer "
  />
</div>
            <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{userData.name}</h5>
            <span className="text-sm text-gray-500 dark:text-gray-400">{userData.email}</span>
                       <span className="text-sm text-gray-500 dark:text-gray-400">{userData.gender}</span>

          </div>
        </Card>
      </div>

      {/* مودال التعديل */}
      <Modal show={openModal} size="md" onClose={() => setOpenModal(false)} popup>
        <ModalHeader />
        {errors.photo && <p className="text-red-800 text-center text-lg my-3">{errors.photo.message}</p>}
        <ModalBody>
          <form onSubmit={handleSubmit((data) => updateProfile(data))} className="space-y-6">
            <h3 className="text-xl font-medium text-gray-900 dark:text-white">Update your photo</h3>
            
        
            <div>
              <div className="mb-2 block">
                <Label htmlFor="photo" value="Profile Picture" />
              </div>
              <FileInput {...register("photo")} id="photo" accept="image/*" helperText="A profile picture is useful to confirm your identity" />
            </div>

            <div className="flex w-full gap-2">
              <Button type="submit" className="w-full" disabled={isPending}>
                {isPending ? "Saving..." : "Save Changes"}
              </Button>
              <Button color="gray" className="w-full" onClick={() => setOpenModal(false)}>
                Cancel
              </Button>
            </div>
          </form>
        </ModalBody>
      </Modal>
    </>
  );
}