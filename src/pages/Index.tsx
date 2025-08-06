import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Clock, BarChart3, Smartphone, Shield, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Users,
      title: "Easy Student Management",
      description: "Add, manage, and organize your students with intuitive class management tools.",
    },
    {
      icon: Clock,
      title: "Quick Attendance Marking",
      description: "Mark attendance in seconds with our streamlined interface and smart defaults.",
    },
    {
      icon: BarChart3,
      title: "Detailed Analytics",
      description: "Get insights into attendance patterns with comprehensive reports and visualizations.",
    },
    {
      icon: Smartphone,
      title: "Mobile Responsive",
      description: "Access Beacon from any device - desktop, tablet, or smartphone with ease.",
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Your data is protected with enterprise-grade security and reliable cloud storage.",
    },
  ];

  const benefits = [
    "Reduce administrative workload by 70%",
    "Improve attendance tracking accuracy",
    "Generate instant reports and analytics",
    "Streamline parent-teacher communication",
    "Access attendance data from anywhere",
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <Badge className="mb-6 bg-primary-soft text-primary-foreground">
                Smart Attendance Solution
              </Badge>
              <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
                Welcome to{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Beacon
                </span>
              </h1>
              <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
                Smart Attendance Made Easy. Streamline your classroom management with our intuitive, 
                professional attendance tracking system designed for modern educators.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  onClick={() => navigate("/login")}
                  className="bg-gradient-primary hover:opacity-90 text-lg px-8 py-3"
                >
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="text-lg px-8 py-3"
                >
                  Learn More
                </Button>
              </div>
            </div>
            
            <div className="animate-slide-up">
              <div className="relative">
                <img 
                  src={heroImage} 
                  alt="Beacon Attendance Management" 
                  className="rounded-2xl shadow-floating w-full"
                />
                <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-2xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
              Why Choose Beacon?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Our comprehensive attendance management system is designed to simplify your workflow 
              and enhance educational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up border-0">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 lg:py-24 bg-gradient-secondary">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-6">
                Transform Your Classroom Management
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Join thousands of educators who have revolutionized their attendance tracking 
                with Beacon's powerful yet simple platform.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="h-5 w-5 text-success flex-shrink-0" />
                    <span className="text-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-slide-up">
              <Card className="shadow-floating border-0">
                <CardHeader>
                  <CardTitle className="text-2xl">Ready to Get Started?</CardTitle>
                  <CardDescription className="text-base">
                    Choose your role to begin your Beacon journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Button 
                    onClick={() => navigate("/login")}
                    className="w-full bg-gradient-primary hover:opacity-90 text-lg py-3"
                  >
                    Sign In as Teacher
                  </Button>
                  <Button 
                    onClick={() => navigate("/login")}
                    variant="outline"
                    className="w-full text-lg py-3"
                  >
                    Sign In as Student
                  </Button>
                  <p className="text-sm text-muted-foreground text-center">
                    New to Beacon? Contact your administrator for account setup.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-4 mb-4 md:mb-0">
              <div className="text-2xl font-bold text-primary">Beacon</div>
              <span className="text-muted-foreground">Smart Attendance Made Easy</span>
            </div>
            <div className="text-sm text-muted-foreground">
              © 2024 Beacon. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
