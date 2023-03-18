import { useAddPostMutation } from "../../app/services/posts";
import PostForm from "./Partials/PostForm";

function AddPost() {
  const [addPost, { isLoading }] = useAddPostMutation();

  return (
    <>
      <h2 className="text-center">Add Post</h2>
      <PostForm onSubmit={addPost} isLoading={isLoading} />
    </>
  );
}

export default AddPost;
