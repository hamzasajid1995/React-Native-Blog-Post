const BASE_URL = 'https://jsonplaceholder.typicode.com/';

const fetchPosts = () => {
  return fetch(`${BASE_URL}posts`).then(r => r.json());
};

const PostService = {fetchPosts};

export default PostService;
