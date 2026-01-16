// import axios from "axios";

// export async function fetchAllPosts(setPosts, setError) {
//   try {
//     const { data: { posts } } = await axios.get(
//       `${import.meta.env.VITE_BASE_URL}/posts?limit=20&sort=-createdAt`,
//       {
//         headers: {
//           token: localStorage.getItem("token"),
//         },
//       }
//     );
//     setPosts(posts);
//   } catch (error) {
//     setError(error.response?.data?.error);
//     setPosts([]);
//   }
// }
