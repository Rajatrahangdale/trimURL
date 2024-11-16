import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BeatLoader } from "react-spinners";
import Error from "./Error";
import { useEffect, useState } from "react";
import * as Yup from "yup";
import useFetch from "../Hooks/use-Fetch";
import { login } from "../DB/apiAuth";
import { useNavigate, useSearchParams } from "react-router-dom";
import { UrlState } from "../Context";
const Login = () => {
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { data, loading, error, fn: fnLogin } = useFetch(login, formData);
  const { fetchUser } = UrlState();
  useEffect(() => {
    // console.log(data);

    if (error === null && data) {
      setErrors([]);
      //   Navigate to dashboard
      if (longLink) {
        navigate(`/dashboard?createNew=${longLink}`);
        // fetch user
        fetchUser();
      } else {
        navigate(`/dashboard`);
      }
    }
  }, [data, error]);
  const handleLogin = async () => {
    setErrors([]);
    try {
      const schema = Yup.object().shape({
        email: Yup.string().email().required("Email is Required"),
        password: Yup.string()
          .min(6, "Password must be at least 6 charecters")
          .required("Password is Required"),
      });
      await schema.validate(formData, { abortEarly: false });
      //   Api call
      await fnLogin();
    } catch (e) {
      const newErrors = {};

      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>Enter your Login Details</CardDescription>
          {error && <Error message={error?.message} />}
        </CardHeader>
        <CardContent className="flex w-full flex-col gap-3">
          {/* <p>Email</p> */}
          <div className="space-y-1">
            <Input
              name="email"
              type="email"
              placeholder="Enter Email"
              onChange={HandleInputChange}
            />
          </div>
          {errors.email && <Error message={errors.email} />}
          {/* <p>Password</p> */}
          <div className="space-y-1">
            <Input
              name="password"
              type="password"
              placeholder="Enter Password"
              onChange={HandleInputChange}
            />
          </div>
          {errors.password && <Error message={errors.password} />}
        </CardContent>
        <CardFooter>
          <Button onClick={handleLogin}>
            {loading ? <BeatLoader size={10} color="#36d7b7" /> : "Login"}
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
