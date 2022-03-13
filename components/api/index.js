import { BASE_URL, API_KEY, SERVER_IMAGE_URL } from '../config';

export const gamesApi = {
  // later convert this url to infinite scrolling
  fetchAllGames: ({ pageParam = 1 }) =>
    fetch(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=${pageParam}`).then(res => {
      return res.json();
    }),
   fetchOne:(post_id) =>
   fetch(`${BASE_URL}/movie/${post_id}?api_key=${API_KEY}&append_to_response=credits`).then(res => {
      return res.json();
    }),
    getImageURL: (path, size = 500) => {
    return `${SERVER_IMAGE_URL}/w${size}${path}`;
}
};

