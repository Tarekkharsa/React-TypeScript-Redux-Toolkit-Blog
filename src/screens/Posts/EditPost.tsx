import { useParams } from "react-router-dom";
import {
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../app/services/posts";
import { Spinner } from "../../components/spinner";
import PostForm from "./Partials/PostForm";

function EditPost() {
  const { id } = useParams();
  const { data: post, isLoading } = useGetPostQuery(parseInt(id as string));
  const [updatePost, { isLoading: isUpdating }] = useUpdatePostMutation();

  if (isLoading) {
    <Spinner showSpinner={isLoading} />;
  }

  return (
    <>
      <h2 className="text-center">Update Post</h2>
      {post && (
        <PostForm
          onSubmit={updatePost}
          isLoading={isUpdating}
          defaultValues={post}
        />
      )}
    </>
  );
}

export default EditPost;
