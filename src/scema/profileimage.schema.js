// import z, { file } from "zod";




// const MAX_UPLOAD_SIZE = 4* 1024 *1024 
// const ALLOWED_IMAGE_TYPE= ['image/jpeg','image/png','image/jpg']
// export const profileImageSchema = z.object({
//   photo:z.instanceof(File)
//       .refine((file)=>{file.size <= MAX_UPLOAD_SIZE,'file size must be less than 4MB'})
//       .refine((file)=>ALLOWED_IMAGE_TYPE.includes(file.type),'file type must be jpeg , png or jpg')
// })
import { z } from "zod";

const MAX_UPLOAD_SIZE = 4 * 1024 * 1024;
const ALLOWED_IMAGE_TYPE = ["image/jpeg", "image/png", "image/jpg"];

export const profileImageSchema = z.object({
  photo: z
    .any()
    .refine((files) => files?.length === 1, {
      message: "Please select an image"
    })
    .refine(
      (files) => files?.[0]?.size <= MAX_UPLOAD_SIZE,
      { message: "File size must be less than 4MB" }
    )
    .refine(
      (files) => ALLOWED_IMAGE_TYPE.includes(files?.[0]?.type),
      { message: "File type must be jpeg, png or jpg" }
    )
});
