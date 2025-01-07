import CommonForm from "@/components/common/form";
import { loginFormControls } from "@/config";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useToast } from "@/hooks/use-toast";
import { loginUser } from "@/store/auth-slice";
import { ChevronLeft } from "lucide-react";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-foreground font-primary">
          Login to your account
        </h1>
        <p className="mt-2">
          Don't have an account{" "}
          <Link
            className="font-medium text-primary ml-2 hover:underline"
            to="/auth/register"
          >
            Register
          </Link>{" "}
        </p>
        <p className="mt-2 flex justify-center">
          <Link
            className="flex font-medium ml-2 hover:text-primary text-gradient"
            to="/"
          >
            <ChevronLeft className="text-primary-Green hover:text-primary" />
            <span className="font-primary font-bold">Shop</span>
          </Link>{" "}
        </p>
      </div>
      <CommonForm
        formControls={loginFormControls}
        buttonText={"Login"}
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AuthLogin;
