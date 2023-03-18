import React from "react";
import ReactDOM from "react-dom/client";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import "./index.css";

import {
  Navigate,
  RouterProvider,
  createBrowserRouter,
} from "react-router-dom";
import ErrorPage from "./screens/ErrorPage";
import PostsManager from "./screens/Posts/Posts";
import { PostDetail } from "./screens/Posts/PostDetail";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        path: "/posts",
        element: <PostsManager />,
      },
      {
        path: "/posts/:id",
        element: <PostDetail />,
      },
      {
        path: "/",
        element: <Navigate to={`posts`} replace />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
