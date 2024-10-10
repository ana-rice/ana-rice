import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./index.css";
import ImageUpload from "./pages/ImageUpload";

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
