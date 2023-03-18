import * as React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostQuery,
  useUpdatePostMutation,
} from "../../app/services/posts";
import EditIcon from "../../components/EditIcon";
import { Spinner } from "../../components/spinner";
import DeleteIcon from "../../components/DeleteIcon";

export const PostDetail = () => {
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();

  const { id } = useParams<{ id: any }>();
  const navigate = useNavigate();

  const [isEditing, setIsEditing] = React.useState(false);

  const {
    data: post,
    isFetching,
    isLoading,
  } = useGetPostQuery(id, {
    pollingInterval: 0,
  });

  function handleDeletePost(e: any, id: number): void {
    e.preventDefault();
    deletePost(id).then(() => {
      navigate("/posts");
    });
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!post) {
    return <div>Missing post!</div>;
  }

  return (
    <div className="container mx-auto my-8">
      <div className="p-8 bg-gray-900 rounded-lg shadow-lg">
        <h1 className="text-2xl font-bold mb-4 text-white">{post.title}</h1>
        <p className="text-gray-300 leading-relaxed">{post.body}</p>
      </div>
      <div className="flex justify-center items-center w-full mt-4">
        <div className="flex justify-center items-center gap-8">
          <Link to={`/posts/edit/${post.id}`}>
            <EditIcon className="mt-4" />
          </Link>
          <div
            className="cursor-pointer"
            onClick={(e) => handleDeletePost(e, post.id)}
          >
            {isDeleting ? (
              <Spinner showSpinner={true} />
            ) : (
              <DeleteIcon className="mt-4" />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
