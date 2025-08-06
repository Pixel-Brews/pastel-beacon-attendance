import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleLogin = async (userType: "teacher" | "student") => {
    setIsLoading(true);
    
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
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome Back
            </h1>
            <p className="text-muted-foreground">
              Sign in to your Beacon account
            </p>
          </div>

          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle>Sign In</CardTitle>
              <CardDescription>
                Choose your account type and enter your credentials
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="teacher" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="teacher">Teacher</TabsTrigger>
                  <TabsTrigger value="student">Student</TabsTrigger>
                </TabsList>
                
                <TabsContent value="teacher" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="teacher-email">Email</Label>
                    <Input
                      id="teacher-email"
                      type="email"
                      placeholder="teacher@school.edu"
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="teacher-password">Password</Label>
                    <Input
                      id="teacher-password"
                      type="password"
                      placeholder="••••••••"
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <Button
                    onClick={() => handleLogin("teacher")}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Teacher"}
                  </Button>
                </TabsContent>
                
                <TabsContent value="student" className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="student-id">Student ID</Label>
                    <Input
                      id="student-id"
                      placeholder="Enter your student ID"
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="student-password">Password</Label>
                    <Input
                      id="student-password"
                      type="password"
                      placeholder="••••••••"
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>
                  <Button
                    onClick={() => handleLogin("student")}
                    className="w-full bg-gradient-primary hover:opacity-90 transition-all duration-200"
                    disabled={isLoading}
                  >
                    {isLoading ? "Signing In..." : "Sign In as Student"}
                  </Button>
                </TabsContent>
              </Tabs>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Button variant="link" className="text-sm text-muted-foreground">
                Forgot your password?
              </Button>
              <Button
                variant="outline"
                onClick={() => navigate("/")}
                className="w-full"
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