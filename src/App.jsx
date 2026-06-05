import { createBrowserRouter, RouterProvider, Outlet } from "react-router-dom";
import MasterLayout from "./theme/MasterLayout";
import HomePage from "./pages/HomePage";
import CartLayout from "./theme/CartLayout";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import useCartStore from "./store/useCartStore";
import ProtectedRoute from "./components/common/ProtectedRoute";
import { Toaster } from "./components/ui/sonner";
import CheckoutLayout from "./theme/CheckoutLayout";
import ProductListingPage from "./pages/ProductListingPage";
import ProductDetailPage from "./pages/ProductDetailPage";
import ProfilePage from "./pages/ProfilePage";
import NotFound from "./pages/NotFound";
import WishlistPage from "./pages/WishlistPage";
import SearchPage from "./pages/SearchPage";
import PaymentResultPage from "./pages/PaymentResultPage";
import OAuth2RedirectHandler from "./pages/OAuth2RedirectHandler";

function App() {
  useEffect(() => {
    const init = async () => {
      await useAuthStore.getState().checkAuth();
      await useCartStore.getState().fetchCart();
    };
    init();
  }, []);

  const router = createBrowserRouter([
    {
      element: (
        <>
          <Outlet />
          <Toaster richColors position="top-right" />
        </>
      ),
      children: [
        {
          path: "/",
          element: <MasterLayout />,
      children: [
        {
          index: true,
          element: <HomePage />,
        },
        {
          path: "list-products/:slug",
          element: <ProductListingPage />,
        },
        {
          path: "product-detail/:id/:slug",
          element: <ProductDetailPage />,
        },
        {
          path: "my-profile/:tab",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "my-profile",
          element: (
            <ProtectedRoute>
              <ProfilePage />
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <WishlistPage />
            </ProtectedRoute>
          ),
        },
        {
          path: "search",
          element: <SearchPage />,
        },
        {
          path: "payment-result",
          element: <PaymentResultPage />,
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
      // element: <CheckoutLayout />,
      element: (
        <ProtectedRoute>
          <CheckoutLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          index: true,
          element: <CheckoutPage />,
        },
      ],
    },
    {
      path: "/oauth-redirect",
      element: <OAuth2RedirectHandler />,
    },
    {
      path: "*",
      element: <NotFound />,
    },
  ]
}]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
