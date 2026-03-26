import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./theme/MasterLayout";
import HomePage from "./pages/HomePage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <MasterLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
      ],
    },
  ]);
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App
