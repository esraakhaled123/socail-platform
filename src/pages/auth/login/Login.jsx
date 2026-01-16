import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { Alert, Button, Checkbox, Label, TextInput } from "flowbite-react";
import {   useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import * as z from "zod";
import AppButton from "../../../components/shared/Appbutton/AppButton";
import { HiInformationCircle } from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../../../components/Context/AuthContext";
import { Helmet } from "react-helmet";

export default function Login() {

const passwordRegex =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;

  const {setToken } = useContext(AuthContext)
    const [ApiError, setApiError] = useState(null)
  const schema = z.object({
        email: z.email({message : "Invalid email address"}), 
        password: z.string().nonempty("password is required")
       .regex(passwordRegex, {
      message:
        "Password must be at least 8 characters and include uppercase, lowercase, number, and special character"
    })
       
    })
    
  
  const navigate= useNavigate()
  const inputs = [
    {
      name: "email",
      label: "Your email",
      type: "email",
      placeholder: "name@flowbite.com",
    
    },
    {
      name: "password",
      label: "Your password",
      type: "password",
     
    },
  ];

  const {
    register,
    handleSubmit,
    formState: { errors , isSubmitting },
  } = useForm({
    defaultValues: {
      email: "",
      password: "",
     },
     resolver:zodResolver(schema)
  });

   async function onSubmit(data) {
   
  try {
      const {data:resp}  = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/signin`,data)
      console.log(resp);
      if (resp.message==='success') {
        setApiError(null)
        console.log('yes');
        localStorage.setItem("token" , resp.token)
        setToken(resp.token)
        
        navigate('/')

      
        
      }else if(resp.error){
        throw new Error(resp.response.data.error)
      }
  }catch (error) {
  const msg = error?.response?.data?.error || "Something went wrong";

  setApiError(msg);

  setTimeout(() => {
    setApiError(null);
  }, 10000);
}

    
  }


  return (
    <>
      <Helmet>
    <title>Login</title>
  </Helmet>
    <section className='py-12   '>
         <div className="container">
          <div className=' max-w-md  mx-auto p-5 shadow-lg dark:bg-gray-800  '>
            <h1 className='text-center '>login</h1>
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
           {...register(name)}
        
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
  
   
        <AppButton disabled={isSubmitting} isloading={isSubmitting}>Login</AppButton>
          <span className="text-gray-400 text-center mt-2 ">
 <span className="text-sm"> Don't have an account? </span>
  <Link to="/register" className="text-blue-500 hover:underline ml-1">
    register
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
  );
}
