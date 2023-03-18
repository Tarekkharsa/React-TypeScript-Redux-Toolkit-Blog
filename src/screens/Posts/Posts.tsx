import { Link, useNavigate } from "react-router-dom";
import {
  useDeletePostMutation,
  useGetPostsQuery,
} from "../../app/services/posts";
import ArrowIcon from "../../components/ArrowIcon";
import DeleteIcon from "../../components/DeleteIcon";
import EditIcon from "../../components/EditIcon";
import { Spinner } from "../../components/spinner";
import { useState } from "react";

interface IsDeletingMap {
  [postId: number]: boolean;
}
const Posts = () => {
  const [isDeletingMap, setIsDeletingMap] = useState<IsDeletingMap>({});
  const [page, setPage] = useState(1);

  const { data: posts, isLoading } = useGetPostsQuery({
    start: (page - 1) * 5,
    limit: 5,
  });
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation();
  const navigate = useNavigate();

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <Spinner showSpinner={isLoading} />
      </div>
    );
  }

  if (!posts) {
    return <div>No posts :(</div>;
  }

  function handleDeletePost(e: any, id: number): void {
    e.preventDefault();
    setIsDeletingMap((prevState) => ({
      ...prevState,
      [id]: true,
    }));
    deletePost(id).then(() => {
      setIsDeletingMap((prevState) => ({
        ...prevState,
        [id]: false,
      }));
      navigate("/posts");
    });
  }

  return (
    <>
      <div className="flex justify-end items-center">
        <Link
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold my-4 py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          to="add"
        >
          Create a new post
        </Link>
      </div>
      <ul className="w-full">
        {posts.map((post) => (
          <li
            key={post.id}
            className="md:first:rounded-t-lg md:last:rounded-b-lg backdrop-blur-lg bg-white dark:bg-black dark:bg-opacity-30 bg-opacity-10 hover:bg-opacity-20 dark:hover:bg-opacity-50 transition border border-gray-800 dark:border-white border-opacity-10 dark:border-opacity-10 border-b-0 last:border-b hover:border-b hovered-sibling:border-t-0"
          >
            <Link to={`/posts/${post.id}`}>
              <a className="py-6 lg:py-10 px-6 lg:px-16 block focus:outline-none focus:ring-4">
                <h2 className="text-2xl md:text-3xl">{post.title}</h2>
                {post.body && (
                  <p className="mt-3 text-lg opacity-60">{post.body}</p>
                )}
                <div className="flex justify-between items-center">
                  <ArrowIcon className="mt-4" />
                  <div className="flex justify-center items-center gap-8">
                    <Link to={`/posts/edit/${post.id}`}>
                      <EditIcon className="mt-4" />
                    </Link>
                    <div
                      className="cursor-pointer"
                      onClick={(e) => handleDeletePost(e, post.id)}
                    >
                      {isDeletingMap[post.id] ? (
                        <Spinner showSpinner={true} />
                      ) : (
                        <DeleteIcon className="mt-4" />
                      )}
                    </div>
                  </div>
                </div>
              </a>
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex justify-center my-8">
        <button
          className="px-4 py-2 text-white bg-gray-900 rounded-md shadow-md mr-4 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={page === 1}
          onClick={() => setPage(page - 1)}
        >
          Previous
        </button>
        <button
          className="px-4 py-2 text-white bg-gray-900 rounded-md shadow-md"
          onClick={() => setPage(page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
};

export default Posts;
