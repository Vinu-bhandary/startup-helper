
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { register } from '../services/api'; // Adjust the import path as necessary

const Signup = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    
    // This is a mock signup - in a real app, you would register with a backend
    if (username && email && password) {
      try {
      const data = {
        "name": username,
        "email": email,
        "password": password,
      }
      register(data)
      console.log('Signing up with', username, email, password);
      toast.success("Account created successfully!");
      navigate("/login");
    }
    catch (error) {
      console.error('Error signing up:', error);
      toast.error("Error creating account");
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
            <h2 className="text-2xl font-semibold text-center">Sign-up</h2>
            
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="block text-sm">Username</label>
                <Input
                  id="username"
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-transparent border-white/20 text-white placeholder:text-white/50"
                />
              </div>
              
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
                Register
              </Button>
            </form>
            
            <p className="text-center text-xs text-white/70">
              Already have an account? <Link to="/login" className="text-udbhava-purple hover:underline">Login now</Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Signup;
