import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ImageUpload from "./ImageUpload";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ImageUpload />,
  },
]);

const root = document.getElementById("root");

if (root) {
  createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  );
}
