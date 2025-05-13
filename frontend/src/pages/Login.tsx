
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { login } from '../services/api';

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock login - in a real app, you would validate with a backend
    if (email && password) {
      try {
      // Call the login API endpoint
      const userData = await login(email, password);
      // Save user data and token (if applicable) in localStorage
      localStorage.setItem('user', JSON.stringify(userData));
      localStorage.setItem('token', 'dummy-token'); // Replace with actual token if provided by your backend
      // Redirect to home page or a protected route
      toast.success("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error('Login error:', err);
      toast.error('Login failed, please check your credentials and try again.');
    }
    } else {
      toast.error("Please fill in all fields");
    }
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-udbhava-dark-purple to-udbhava-darker-purple font-orbitron">
      <div className="w-full max-w-md animate-fade-in">
        <Card className="border-white/10 bg-sidebar/90 text-white backdrop-blur-xl">
          <CardHeader className="flex items-center justify-center pb-2">
            <div className="text-center">
              <h1 className="text-3xl font-bold tracking-wider">UDBHAVA</h1>
              <p className="text-xs text-white/70 tracking-widest">START UP VALIDATOR</p>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-4">
            <h2 className="text-2xl font-semibold text-center">Login</h2>
            
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm">Email</label>
                <Input
                  id="email"
                  type="email"
                  placeholder="username@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-transparent border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="password" className="block text-sm">Password</label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-transparent border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
              <Button type="submit" className="w-full bg-udbhava-purple hover:bg-udbhava-purple/90">
                Login
              </Button>
            </form>
            
            <p className="text-center text-xs text-white/70">
              Don't have an account yet? <Link to="/signup" className="text-udbhava-purple hover:underline">Register for free</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;
