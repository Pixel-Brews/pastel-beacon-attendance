import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Calendar, Users, ClipboardList, TrendingUp, Eye, UserPlus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const TeacherDashboard = () => {
  const navigate = useNavigate();

  const stats = [
    {
      title: "Total Students",
      value: "32",
      icon: Users,
      description: "Active in your classes",
      color: "text-primary",
    },
    {
      title: "Today's Attendance",
      value: "28/32",
      icon: ClipboardList,
      description: "87.5% present",
      color: "text-success",
    },
    {
      title: "This Week",
      value: "89%",
      icon: TrendingUp,
      description: "Average attendance",
      color: "text-warning",
    },
    {
      title: "Classes Today",
      value: "4",
      icon: Calendar,
      description: "2 completed, 2 remaining",
      color: "text-accent-foreground",
    },
  ];

  const quickActions = [
    {
      title: "Mark Attendance",
      description: "Take attendance for your current class",
      icon: ClipboardList,
      action: () => navigate("/teacher/attendance/mark"),
      variant: "default" as const,
    },
    {
      title: "View Reports",
      description: "See attendance reports and analytics",
      icon: Eye,
      action: () => navigate("/teacher/attendance/view"),
      variant: "outline" as const,
    },
    {
      title: "Add Student",
      description: "Register a new student to your class",
      icon: UserPlus,
      action: () => navigate("/teacher/students/add"),
      variant: "outline" as const,
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Welcome back, Professor
              </h1>
              <p className="text-muted-foreground">
                Here's what's happening with your classes today
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium text-muted-foreground">
                      {stat.title}
                    </CardTitle>
                    <stat.icon className={`h-4 w-4 ${stat.color}`} />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-foreground mb-1">
                      {stat.value}
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {stat.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              <Card className="shadow-card animate-slide-up">
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                  <CardDescription>
                    Common tasks to manage your classes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quickActions.map((action, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors">
                      <div className="flex items-center space-x-3">
                        <action.icon className="h-5 w-5 text-primary" />
                        <div>
                          <h4 className="text-sm font-medium text-foreground">
                            {action.title}
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            {action.description}
                          </p>
                        </div>
                      </div>
                      <Button
                        variant={action.variant}
                        size="sm"
                        onClick={action.action}
                        className="ml-4"
                      >
                        Go
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Recent Activity */}
              <Card className="shadow-card animate-slide-up">
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>
                    Latest attendance updates
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-success rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          Physics 101 - Attendance marked
                        </p>
                        <p className="text-xs text-muted-foreground">
                          28/30 students present - 2 hours ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-warning rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          New student added to Chemistry 202
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Sarah Johnson - 1 day ago
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm text-foreground">
                          Weekly report generated
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Average attendance: 89% - 3 days ago
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Overview */}
            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>
                  Weekly attendance trends for your classes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Physics 101</span>
                    <span className="text-sm text-muted-foreground">92%</span>
                  </div>
                  <Progress value={92} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Chemistry 202</span>
                    <span className="text-sm text-muted-foreground">87%</span>
                  </div>
                  <Progress value={87} className="h-2" />
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Biology 150</span>
                    <span className="text-sm text-muted-foreground">95%</span>
                  </div>
                  <Progress value={95} className="h-2" />
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TeacherDashboard;