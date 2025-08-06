import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Users, Clock, BarChart3, Smartphone, Shield, ArrowRight, Quote } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";

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
      <section className="relative overflow-hidden py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Badge className="mb-8 bg-primary-soft text-primary-foreground text-base px-6 py-2">
              Smart Attendance Solution
            </Badge>
            <h1 className="text-5xl lg:text-7xl font-playfair font-bold text-foreground mb-8 leading-tight">
              Welcome to{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Beacon
              </span>
            </h1>
            <p className="text-2xl lg:text-3xl text-primary font-medium mb-4">
              Smart attendance tracking, redefined.
            </p>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-2xl mx-auto">
              Empower classrooms with effortless monitoring.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate("/login")}
                className="bg-primary text-primary-foreground hover:bg-primary/90 text-xl px-12 py-4 h-auto rounded-full shadow-floating"
              >
                Get Started
                <ArrowRight className="ml-3 h-6 w-6" />
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                className="text-xl px-12 py-4 h-auto rounded-full border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="text-center mb-20 animate-fade-in">
            <h2 className="text-4xl lg:text-6xl font-playfair font-bold text-foreground mb-8">
              Why Choose Beacon?
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              Our comprehensive attendance management system is designed to simplify your workflow 
              and enhance educational outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
            {features.map((feature, index) => (
              <Card key={index} className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up border-0 p-2">
                <CardHeader className="pb-6">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mb-6">
                    <feature.icon className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl font-playfair">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-lg leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 lg:py-32 bg-gradient-secondary">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-in">
              <h2 className="text-4xl lg:text-5xl font-playfair font-bold text-foreground mb-8">
                Transform Your Classroom Management
              </h2>
              <p className="text-xl text-muted-foreground mb-10 leading-relaxed">
                Join thousands of educators who have revolutionized their attendance tracking 
                with Beacon's powerful yet simple platform.
              </p>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <CheckCircle className="h-6 w-6 text-success flex-shrink-0" />
                    <span className="text-foreground text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="animate-slide-up">
              <Card className="shadow-floating border-0 p-2">
                <CardHeader className="pb-6">
                  <CardTitle className="text-3xl font-playfair">Ready to Get Started?</CardTitle>
                  <CardDescription className="text-lg">
                    Choose your role to begin your Beacon journey
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Button 
                    onClick={() => navigate("/login")}
                    className="w-full bg-primary text-primary-foreground hover:bg-primary/90 text-xl py-4 h-auto rounded-xl"
                  >
                    Sign In as Teacher
                  </Button>
                  <Button 
                    onClick={() => navigate("/login")}
                    variant="outline"
                    className="w-full text-xl py-4 h-auto rounded-xl border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground"
                  >
                    Sign In as Student
                  </Button>
                  <p className="text-base text-muted-foreground text-center leading-relaxed">
                    New to Beacon? Contact your administrator for account setup.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center animate-fade-in">
            <Quote className="h-12 w-12 text-primary mx-auto mb-8" />
            <blockquote className="text-2xl lg:text-3xl font-medium text-foreground mb-8 leading-relaxed italic">
              "Beacon has transformed how we manage attendance in our school. What used to take 15 minutes now takes 2 minutes, and our accuracy has improved dramatically."
            </blockquote>
            <div className="flex items-center justify-center space-x-4">
              <div className="w-12 h-12 bg-gradient-primary rounded-full"></div>
              <div className="text-left">
                <div className="font-semibold text-foreground">Dr. Sarah Mitchell</div>
                <div className="text-muted-foreground">Principal, Riverside High School</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 border-t border-border">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-6 md:mb-0">
              <div className="text-3xl font-playfair font-bold text-primary">Beacon</div>
              <span className="text-muted-foreground text-lg">Smart Attendance Made Easy</span>
            </div>
            <div className="text-muted-foreground">
              © 2024 Beacon. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
