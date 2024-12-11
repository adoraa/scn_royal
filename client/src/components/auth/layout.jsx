import { Outlet } from "react-router-dom";
import logoLight from "../../assets/logo-light.webp"

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full">
      <div className="hidden lg:flex items-center justify-center w-1/2 px-12 relative">
        <img src={logoLight} alt="logo" className="relative z-10" />
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 h-1/2 border-r-2 border-[#85c755]"></div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
