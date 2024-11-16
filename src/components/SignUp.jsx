import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Error from "./Error";
import { useState } from "react";
const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const HandleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>SingUp</CardTitle>
          <CardDescription>Enter Your SignUp Details</CardDescription>
          <Error message="Something went Wrong" />
        </CardHeader>
        <CardContent>
          <p>Full Name</p>
          <Input
            name="name"
            type="text"
            placeholder="Full Name"
            onChange={HandleInputChange}
          />
          <Error message="Something went Wrong" />
          <p>Email</p>
          <Input
            name="email"
            type="email"
            placeholder="Email"
            onChange={HandleInputChange}
          />
          <Error message="Something went Wrong" />
          <p>Password</p>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            onChange={HandleInputChange}
          />
          <Error message="Something went Wrong" />
        </CardContent>
        <CardFooter>
          <Button>SignUp</Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default SignUp;
