import { Navigate, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user, children }) {
  const location = useLocation();

  // console.log(location.pathname, isAuthenticated);

  if (
    !isAuthenticated &&
    location.pathname !== "/auth/login" &&
    location.pathname !== "/auth/register"
  ) {
    if (location.pathname.includes("/checkout")) {
      // Allow guest checkout
      return <>{children}</>;
    } else if (location.pathname.includes("/payment-success")) {
      return <>{children}</>;
    } else {
      return <Navigate to="/auth/login" />;
    }
  }

  if (
    !isAuthenticated &&
    !(
      location.pathname.includes("/login") ||
      location.pathname.includes("/register")
    )
  ) {
    if (
      location.pathname.includes("/checkout") ||
      location.pathname.includes("/payment-success")
    ) {
      return <>{children}</>;
    } else {
      return <Navigate to="/auth/login" />;
    }
  }

  if (
    isAuthenticated &&
    (location.pathname.includes("/login") ||
      location.pathname.includes("/register"))
  ) {
    if (user?.role === "admin") {
      return <Navigate to="/admin/dashboard" />;
    } else {
      return <Navigate to="/shop/home" />;
    }
  }

  // Prevent non-admin users from accessing admin routes
  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("shop")
  ) {
    return <Navigate to="/admin/dashboard" />;
  }

  return <>{children}</>;
}

export default CheckAuth;
