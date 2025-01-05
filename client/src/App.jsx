import { Route, Routes, Navigate } from "react-router-dom";
import AuthLayout from "./components/auth/layout";
import AuthLogin from "./pages/auth/login";
import AuthRegister from "./pages/auth/register";
import AdminLayout from "./components/admin-view/layout";
import AdminDashboard from "./pages/admin-view/dashboard";
import AdminProducts from "./pages/admin-view/products";
import AdminOrders from "./pages/admin-view/orders";
import AdminFeatures from "./pages/admin-view/features";
import ShoppingLayout from "./components/shop-view/layout";
import NotFound from "./pages/not-found";
import ShoppingHome from "./pages/shop-view/home";
import ShoppingListing from "./pages/shop-view/listing";
import ShoppingCheckout from "./pages/shop-view/checkout";
import ShoppingAccount from "./pages/shop-view/account";
import CheckAuth from "./components/common/check-auth";
import UnauthPage from "./pages/unauth-page";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { checkAuth } from "./store/auth-slice";
import { Skeleton } from "@/components/ui/skeleton";
// import PaypalReturnPage from "./pages/shop-view/paypal-return";
import PaymentSuccessPage from "./pages/shop-view/payment-success";
import SearchProducts from "./pages/shop-view/search";
import AdminCategories from "./pages/admin-view/categories";
import ManageUsers from "./pages/admin-view/manageUsers";

function App() {
  const { user, isAuthenticated, isLoading } = useSelector(
    (state) => state.auth
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (isLoading) return <Skeleton className="w-[800] bg-primaryBlue h-[600px]" />;

  return (
    <div className="flex flex-col overflow-hidden bg-white">
      <Routes>
        {/* Home and default shop layout */}
        <Route path="/" element={<ShoppingLayout />}>
          <Route path="/" element={<ShoppingHome />} />
        </Route>

        {/* Auth routes */}
        <Route
          path="/auth"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AuthLayout />
            </CheckAuth>
          }
        >
          <Route path="login" element={<AuthLogin />} />
          <Route path="register" element={<AuthRegister />} />
        </Route>

        {/* Unauthenticated users can access store routes */}
        <Route path="/shop" element={<ShoppingLayout />}>
          <Route path="home" element={<ShoppingHome />} />
          <Route path="listing" element={<ShoppingListing />} />
          {/* Shop account inaccessible without authentication */}
          <Route
            path="account"
            element={
              isAuthenticated ? (
                <ShoppingAccount />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          {/* Checkout inaccessible without authentication */}
          <Route
            path="checkout"
            element={
              isAuthenticated ? (
                <ShoppingCheckout />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          {/* Payment inaccessible without authentication */}
          <Route
            path="payment-success"
            element={
              isAuthenticated ? (
                <PaymentSuccessPage />
              ) : (
                <Navigate to="/auth/login" />
              )
            }
          />
          {/* <Route path="paypal-return" element={<PaypalReturnPage />} /> */}
          <Route path="search" element={<SearchProducts />} />
        </Route>

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <CheckAuth isAuthenticated={isAuthenticated} user={user}>
              <AdminLayout />
            </CheckAuth>
          }
        >
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="products" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="featured-images" element={<AdminFeatures />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="manage-users" element={<ManageUsers /> } />
        </Route>
        <Route path="/unauth-page" element={<UnauthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  );
}

export default App;
