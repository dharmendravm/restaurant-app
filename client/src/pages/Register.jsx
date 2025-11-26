import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function Register() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100 px-4">
      <Card className="w-full max-w-md shadow-md">
        <CardHeader>
          <CardTitle className="text-2xl text-center">Register</CardTitle>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <Label>Name</Label>
              <Input
                name="name"
                placeholder="Enter name"
                value={form.name}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Email</Label>
              <Input
                name="email"
                type="email"
                placeholder="Enter email"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div>
              <Label>Password</Label>
              <Input
                name="password"
                type="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
              />
            </div>

            <Button type="submit" className="w-full mt-2   bg-orange-500 text-white hover:bg-orange-600">
              Register
            </Button>
          </form>

          <p className="text-center text-sm mt-3">
            Already have an account?{" "}
            <a href="/login" className="text-blue-600 hover:underline">
              Login
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
