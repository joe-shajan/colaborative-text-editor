import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import {
  createBrowserRouter,
  RouterProvider,
  useNavigate,
} from "react-router-dom";
import "./index.css";

const Home = () => {
  const navigage = useNavigate();
  return (
    <div>
      <button onClick={() => navigage("/editor")}>go to editor</button>
    </div>
  );
};
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
  },
  {
    path: "/editor",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
