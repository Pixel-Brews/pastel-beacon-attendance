import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Clock, TrendingUp, BookOpen, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";

const StudentDashboard = () => {
  const { toast } = useToast();

  // Mock student data
  const studentData = {
    name: "Alex Johnson",
    rollNumber: "PHY001",
    class: "Physics 101 - Section A",
    totalClasses: 45,
    attendedClasses: 40,
    attendancePercentage: 89,
  };

  const recentAttendance = [
    { date: "2024-08-06", subject: "Physics 101", status: "Present", time: "10:15 AM" },
    { date: "2024-08-05", subject: "Chemistry 202", status: "Present", time: "2:30 PM" },
    { date: "2024-08-05", subject: "Biology 150", status: "Absent", time: "-" },
    { date: "2024-08-04", subject: "Physics 101", status: "Present", time: "10:12 AM" },
    { date: "2024-08-03", subject: "Mathematics 300", status: "Late", time: "9:45 AM" },
  ];

  const upcomingClasses = [
    { subject: "Physics 101", time: "10:00 AM - 11:30 AM", room: "Room 205", day: "Today" },
    { subject: "Chemistry 202", time: "2:00 PM - 3:30 PM", room: "Lab 1", day: "Today" },
    { subject: "Biology 150", time: "9:00 AM - 10:30 AM", room: "Room 301", day: "Tomorrow" },
    { subject: "Mathematics 300", time: "11:00 AM - 12:30 PM", room: "Room 102", day: "Tomorrow" },
  ];

  const monthlyStats = [
    { month: "January", percentage: 92 },
    { month: "February", percentage: 88 },
    { month: "March", percentage: 95 },
    { month: "April", percentage: 87 },
    { month: "May", percentage: 91 },
    { month: "June", percentage: 89 },
  ];

  const handleDownloadReport = () => {
    toast({
      title: "Download Started",
      description: "Your attendance report is being prepared for download.",
    });
  };

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "present":
        return <Badge className="bg-success text-success-foreground">Present</Badge>;
      case "absent":
        return <Badge variant="destructive">Absent</Badge>;
      case "late":
        return <Badge className="bg-warning text-warning-foreground">Late</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  const getAttendanceColor = () => {
    if (studentData.attendancePercentage >= 90) return "text-success";
    if (studentData.attendancePercentage >= 75) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="student" />
      <main className="container mx-auto px-4 py-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Welcome back, {studentData.name}
            </h1>
            <p className="text-muted-foreground">
              Track your attendance and academic progress
            </p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Overall Attendance
                </CardTitle>
                <TrendingUp className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold mb-1 ${getAttendanceColor()}`}>
                  {studentData.attendancePercentage}%
                </div>
                <p className="text-xs text-muted-foreground">
                  {studentData.attendedClasses} of {studentData.totalClasses} classes
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Classes Attended
                </CardTitle>
                <BookOpen className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {studentData.attendedClasses}
                </div>
                <p className="text-xs text-muted-foreground">
                  Total classes attended
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Student ID
                </CardTitle>
                <User className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  {studentData.rollNumber}
                </div>
                <p className="text-xs text-muted-foreground">
                  {studentData.class}
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-card hover:shadow-floating transition-all duration-300 animate-slide-up">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  This Week
                </CardTitle>
                <Calendar className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground mb-1">
                  4/5
                </div>
                <p className="text-xs text-muted-foreground">
                  Classes attended this week
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Attendance Progress */}
            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle>Attendance Overview</CardTitle>
                <CardDescription>
                  Your monthly attendance progress
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyStats.slice(-3).map((month, index) => (
                    <div key={month.month} className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-muted-foreground">{month.month}</span>
                        <span className="font-medium text-foreground">{month.percentage}%</span>
                      </div>
                      <Progress value={month.percentage} className="h-2" />
                    </div>
                  ))}
                </div>
                <div className="mt-6">
                  <Button
                    onClick={handleDownloadReport}
                    variant="outline"
                    className="w-full"
                  >
                    <Download className="mr-2 h-4 w-4" />
                    Download Full Report
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Upcoming Classes */}
            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle>Upcoming Classes</CardTitle>
                <CardDescription>
                  Your schedule for today and tomorrow
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingClasses.map((cls, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium text-foreground mb-1">
                          {cls.subject}
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Clock className="h-3 w-3" />
                            <span>{cls.time}</span>
                          </div>
                          <span>{cls.room}</span>
                        </div>
                      </div>
                      <Badge variant={cls.day === "Today" ? "default" : "outline"}>
                        {cls.day}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Recent Attendance */}
          <Card className="shadow-card animate-slide-up">
            <CardHeader>
              <CardTitle>Recent Attendance</CardTitle>
              <CardDescription>
                Your attendance history for the past week
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentAttendance.map((record, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors space-y-2 sm:space-y-0"
                  >
                    <div className="flex-1">
                      <div className="flex items-center space-x-4">
                        <div className="font-medium text-foreground">
                          {record.subject}
                        </div>
                        <Badge variant="outline" className="text-xs">
                          {record.date}
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1">
                        {record.time !== "-" ? `Marked at ${record.time}` : "Not attended"}
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      {getStatusBadge(record.status)}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;