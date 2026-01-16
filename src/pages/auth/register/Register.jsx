
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { Alert, Button, Datepicker, Label, Radio, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom';
import * as z from "zod";
import AppButton from '../../../components/shared/Appbutton/AppButton';
import { HiInformationCircle } from 'react-icons/hi';
import { Helmet } from 'react-helmet';


export default function Register() {

  const [ApiError, setApiError] = useState(null)
  
  const schema = z.object({
      name: 
      z.string().nonempty("name is required")
      .min(3 ,{message : "name must be at least 2 characters long"}), 
      email: z.email({message : "Invalid email address"}), 
      password: z.string().nonempty("password is required")
      // .min(3 , {message : "password must be at least 8 characters"}),
      .regex( /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
 , {message :"Password must be at least 8 characters long and include uppercase, lowercase, number, and special character",
}),
      rePassword:z.string().nonempty("This field is required"),
      dateOfBirth: z.string().nonempty("date is required")
      .refine((value) => {
      return new Date(value) <= new Date();
    }, {
      message: "Date cannot be in the future",
    }),
      gender: z.enum(['male' , 'female'],({message : "please select your required"})), 
  }).refine((data)=> data.password === data.rePassword  ,{

    message:'passwords dont match ',
    path:['rePassword']
  }
  
)
  
const navigate = useNavigate()
const inputs = [
  {
     name: "name",
    label: "Your name",
    type: "text",
    placeholder: "Esraa Khaled",
    // rules: {
    //   required: "Email is required",
    // },
  },
  {
   name: "email",
    label: "Your email",
    type: "email",
    placeholder: "esraa@gmail.com",
    // rules: {
    //   required: "Name is required",
    //   minLength: {
    //     value: 3,
    //     message: "Name must be at least 3 characters",
    //   },
    // },
  },
  {
    name: "password",
    label: "Your password",
    type: "password",
    placeholder: "******",
    // rules: {
    //   required: "Password is required",
    //   minLength: {
    //     value: 6,
    //     message: "Password must be at least 6 characters",
    //   },
    // },
  },
  {
    name: "rePassword",
    label: "Confirm password",
    type: "password",
    placeholder: "******",
    // rules: {
    //   required: "wrong password",
    // },
  },
  {
    name: "dateOfBirth",
    label: "Date of birth",
    type: "date",
    // rules: {
    //   required: "Date of birth is required",
    // },
  },
   

];
 const {register,handleSubmit,
  formState: { errors , isSubmitting },} = useForm({
    defaultValues: {
      email: "",
      name: "",
      password: "",
      rePassword: "",
      dateOfBirth: "",
      gender: "",
     },

     resolver : zodResolver(schema),
     mode:onblur
  });


  /// calling api ////

 async function onSubmit(data) {
  console.log(data);

  try {
      const {data:resp }  = await axios.post(`https://linked-posts.routemisr.com/users/signup`,data)
      console.log(resp);
    
      if (resp.message==='success') {
        console.log(resp.message);
        setApiError(null)
        navigate('/login')
      }else if(resp.error){
        // const err = resp.response.data.error
        console.log(resp.error);
        
        throw new Error('nooooooooo', resp.error)
      }
  } catch (err) {
  const apiMessage = err?.response?.data?.error;

  if (apiMessage === "user already exists.") {
    setApiError("Email already exists");
  } else if (apiMessage?.includes("password")) {
    setApiError(null);
  } else {
    setApiError("Something went wrong, please try again");
  }
}

 }

 
  return (
   <>
     <Helmet>
    <title>profile</title>
  </Helmet>
    <section className='py-12 '>
      <div className="container">
       <div className=' max-w-md  mx-auto p-5 shadow-lg dark:bg-gray-800  '>
         <h1 className='text-center '>register</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2 ">

          {/* ****** email ******* */}
     {inputs.map(({ name, label, type, placeholder }) => (
    <div key={name} className='mt-0'>
      <div className="mb-1 block">
        <Label htmlFor={name}>{label}</Label>
      </div>

      <TextInput
        id={name}
        type={type}
        placeholder={placeholder}
       {...register(name, {
    onChange: () => setApiError(null),
  
  })}
     
        shadow
      />
      
     
{/* دي اسمها Bracket Notation
ومش معناها Array خالص  */}

     {errors[name] && (
      <p className="text-red-600 text-sm text-center m-3">
        {errors[name].message}
      </p>
    )}
    </div>
  ))}
  
  <div className="mt-2">
  <Label>Gender</Label>

  <div className="flex gap-4 mt-2">
    <div className="flex items-center gap-2">
      <Radio
        id="male"
        value="male"
        {...register("gender")}
      />
      <Label htmlFor="male">Male</Label>
    </div>

    <div className="flex items-center gap-2">
      <Radio
        id="female"
        value="female"
        {...register("gender")}
      />
      <Label htmlFor="female">Female</Label>
    </div>
  </div>

  {errors.gender && (
    <p className="text-red-600 text-sm text-center mt-2">
      {errors.gender.message}
    </p>
  )}
</div>
  <AppButton disabled ={isSubmitting} isloading = {isSubmitting}>Register</AppButton>
  <span className="text-gray-400 text-center mt-2 ">
 <span className="text-sm"> Do you have an account? </span>
  <Link to="/login" className="text-blue-500 hover:underline ml-1">
    login
  </Link>
</span>

     {ApiError && <Alert  color="failure" icon={HiInformationCircle}>
      <span className="font-medium">{ApiError}</span>
    </Alert>}
     </form>

       </div>
      </div>
    </section>
   </>
  )
}
