import { createBrowserRouter, RouterProvider } from "react-router-dom";
import MasterLayout from "./theme/MasterLayout";
import HomePage from "./pages/HomePage";
import CartLayout from "./theme/CartLayout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";

function App() {

  useEffect(() => {
    useAuthStore.getState().checkAuth();
  }, [])

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
    },
    {
      path: "/checkout",
      element: <ProtectedRoute><CartLayout/></ProtectedRoute> ,
      children: [
        {
          index: true,
          element: <CheckoutPage />,
        },
      ],
    }
  ]);
  return (
    <div>
      <RouterProvider router={router} />
      <Toaster />
    </div>
  );
}

export default App
