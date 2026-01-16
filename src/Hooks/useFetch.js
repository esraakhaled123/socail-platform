// import { useQuery } from "@tanstack/react-query"
// import axios from "axios"


// export  default function useFetch(queryKey,endPoint,userData){
// const {data  ,isLoading ,error ,isError }=useQuery(
//     { queryKey:  queryKey,
//       enabled:!!userData,
//    queryFn: getOnePost ,
//    select:(data)=>data?.data
//  })
// async function getOnePost() {
//   return await axios.get(
//          `${import.meta.env.VITE_BASE_URL}/${endPoint}`,
//         {
//           headers: {
//             token: localStorage.getItem("token"),
//           },
//    })

// }
// return {data , isLoading ,error ,isError ,getOnePost}
// }

import { useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

export default function useFetch(queryKey, endPoint) {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const res = await axios.get(
      `${import.meta.env.VITE_BASE_URL}/${endPoint}`,
      {
        headers: {
          token: localStorage.getItem("token"),
        },
      }
    );
    return res.data;
  };

  const { data, isLoading, error  , isError} = useQuery({
    queryKey,
    queryFn: fetchData,
  });

  const refetchData = () => {
    queryClient.invalidateQueries(queryKey);
  };

  return { data, isLoading, error, refetchData ,isError};
}
