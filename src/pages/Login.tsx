import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isTeacher, setIsTeacher] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async () => {
    setIsLoading(true);
    const userType = isTeacher ? "teacher" : "student";
    
    // Simulate login
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Login Successful",
        description: `Welcome back, ${userType}!`,
      });
      
      if (userType === "teacher") {
        navigate("/teacher/dashboard");
      } else {
        navigate("/student/dashboard");
      }
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
              Welcome Back
            </h1>
            <p className="text-lg text-muted-foreground">
              Sign in to your Beacon account
            </p>
          </div>

          <Card className="shadow-floating animate-slide-up border-0 p-2">
            <CardHeader className="pb-8">
              <CardTitle className="text-2xl font-playfair text-center">Sign In</CardTitle>
              <CardDescription className="text-center text-lg">
                Enter your credentials to access your dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* User Type Toggle */}
              <div className="flex items-center justify-center space-x-4 p-4 bg-secondary rounded-xl">
                <Label htmlFor="user-type" className={`text-lg transition-colors ${!isTeacher ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                  Teacher
                </Label>
                <Switch
                  id="user-type"
                  checked={!isTeacher}
                  onCheckedChange={(checked) => setIsTeacher(!checked)}
                  className="scale-125"
                />
                <Label htmlFor="user-type" className={`text-lg transition-colors ${isTeacher ? 'text-muted-foreground' : 'text-foreground font-medium'}`}>
                  Student
                </Label>
              </div>

              {/* Login Form */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Label htmlFor="email" className="text-base">
                    {isTeacher ? "Email" : "Student ID"}
                  </Label>
                  <Input
                    id="email"
                    type={isTeacher ? "email" : "text"}
                    placeholder={isTeacher ? "teacher@school.edu" : "Enter your student ID"}
                    className="h-12 text-lg rounded-xl border-2 transition-all duration-200 focus:shadow-soft"
                  />
                </div>
                <div className="space-y-3">
                  <Label htmlFor="password" className="text-base">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="h-12 text-lg rounded-xl border-2 transition-all duration-200 focus:shadow-soft"
                  />
                </div>
                <Button
                  onClick={handleLogin}
                  className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl transition-all duration-200"
                  disabled={isLoading}
                >
                  {isLoading ? "Signing In..." : `Sign In as ${isTeacher ? 'Teacher' : 'Student'}`}
                </Button>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 pt-4">
              <Button variant="link" className="text-muted-foreground">
                Forgot your password?
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full h-12 text-lg rounded-xl border-2"
              >
                Back to Home
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Login;