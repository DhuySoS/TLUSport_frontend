import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./theme/MasterLayout";
import HomePage from "./pages/HomePage";
import CartLayout from "./theme/CartLayout";
import CartPage from "./pages/CartPage";

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
    {
      path: "/cart",
      element: <CartLayout />,
      children: [
        {
          index: true,
          element: <CartPage />,
        },
      ],
    }
  ]);
  return (
    <div>
        <RouterProvider router={router} />
    </div>
  );
}

export default App
