import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Spinner } from "../../../components/spinner";
import { Post } from "../../../app/services/posts";

const schema = z.object({
  title: z.string().min(1).max(100),
  body: z.string().min(1).max(1000),
});
type SchemaType = z.infer<typeof schema>;

function PostForm({
  onSubmit,
  isLoading,
  defaultValues,
}: {
  onSubmit: any;
  isLoading: boolean;
  defaultValues?: Post;
}) {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SchemaType>({
    resolver: zodResolver(schema), // Configuration the validation with the zod schema.
    defaultValues: defaultValues
      ? defaultValues
      : {
          body: "",
          title: "",
        },
  });

  const submitHandler = async (data: SchemaType) => {
    await onSubmit({ id, ...data });
    navigate("/");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(submitHandler)} className="max-w-md mx-auto">
      <div className="mb-4">
        <label htmlFor="title" className="block text-gray-700 font-bold mb-2">
          Title:
        </label>
        <input
          type="text"
          id="title"
          {...register("title")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.title ? "border-red-500" : ""
          }`}
        />
        {errors.title && (
          <p className="text-red-500 text-xs italic">{errors.title.message}</p>
        )}
      </div>

      <div className="mb-4">
        <label htmlFor="body" className="block text-gray-700 font-bold mb-2">
          Body:
        </label>
        <textarea
          id="body"
          {...register("body")}
          className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
            errors.body ? "border-red-500" : ""
          }`}
        />
        {errors.body && (
          <p className="text-red-500 text-xs italic">{errors.body.message}</p>
        )}
      </div>
      <div className="flex items-center justify-center">
        <button
          disabled={isLoading}
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          {isLoading ? <Spinner showSpinner={isLoading} /> : "Submit"}
        </button>
      </div>
    </form>
  );
}

export default PostForm;
