import { useQuery } from 'react-query';
import axios from 'axios';
import {  API_KEY } from '../config';


export const fetchPosts = async (id) =>
{
              const { data } = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`);
              return data;
          }

const fetchPost = async (post_Id) => {
 
	const { data } = await axios.get(`https://api.themoviedb.org/3/movie/${post_Id}?api_key=${API_KEY}&append_to_response=credits`);
	return data;
};

const usePost = (postId) => useQuery([ 'posts', postId ], () => fetchPost(postId));

export default usePost;
