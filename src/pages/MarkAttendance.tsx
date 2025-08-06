import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { MapPin, Calendar, Clock, Save, Users } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const MarkAttendance = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [attendanceData, setAttendanceData] = useState([
    { id: 1, name: "Alice Johnson", rollNo: "PHY001", present: true },
    { id: 2, name: "Bob Smith", rollNo: "PHY002", present: true },
    { id: 3, name: "Charlie Brown", rollNo: "PHY003", present: false },
    { id: 4, name: "Diana Prince", rollNo: "PHY004", present: true },
    { id: 5, name: "Ethan Hunt", rollNo: "PHY005", present: true },
    { id: 6, name: "Fiona Clark", rollNo: "PHY006", present: false },
    { id: 7, name: "George Miller", rollNo: "PHY007", present: true },
    { id: 8, name: "Hannah Davis", rollNo: "PHY008", present: true },
  ]);

  const classes = [
    { value: "physics-101", label: "Physics 101 - Section A" },
    { value: "chemistry-202", label: "Chemistry 202 - Section B" },
    { value: "biology-150", label: "Biology 150 - Section C" },
  ];

  const handleAttendanceChange = (studentId: number, present: boolean) => {
    setAttendanceData(prev => 
      prev.map(student => 
        student.id === studentId ? { ...student, present } : student
      )
    );
  };

  const markAllPresent = () => {
    setAttendanceData(prev => prev.map(student => ({ ...student, present: true })));
  };

  const markAllAbsent = () => {
    setAttendanceData(prev => prev.map(student => ({ ...student, present: false })));
  };

  const handleSaveAttendance = async () => {
    if (!selectedClass) {
      toast({
        title: "Please Select a Class",
        description: "You must select a class before marking attendance.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      const presentCount = attendanceData.filter(s => s.present).length;
      const totalCount = attendanceData.length;
      
      toast({
        title: "Attendance Saved Successfully",
        description: `${presentCount}/${totalCount} students marked present`,
      });
    }, 1000);
  };

  const presentCount = attendanceData.filter(s => s.present).length;
  const absentCount = attendanceData.length - presentCount;

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Mark Attendance
              </h1>
              <p className="text-muted-foreground">
                Take attendance for your current class session
              </p>
            </div>

            {/* Class Selection & Info */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
              <Card className="lg:col-span-2 shadow-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    <span>Class Information</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Select Class
                    </label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Choose a class to mark attendance" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls.value} value={cls.value}>
                            {cls.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {selectedClass && (
                    <div className="flex flex-wrap gap-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <Clock className="h-4 w-4" />
                        <span>Today, 10:00 AM - 11:30 AM</span>
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>Room 205, Science Building</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Users className="h-5 w-5 text-primary" />
                    <span>Summary</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Present</span>
                    <Badge variant="default" className="bg-success text-success-foreground">
                      {presentCount}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Absent</span>
                    <Badge variant="outline" className="border-destructive text-destructive">
                      {absentCount}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Total</span>
                    <Badge variant="secondary">
                      {attendanceData.length}
                    </Badge>
                  </div>
                  <div className="pt-2 border-t border-border">
                    <div className="text-sm text-muted-foreground mb-1">Attendance Rate</div>
                    <div className="text-lg font-semibold text-primary">
                      {Math.round((presentCount / attendanceData.length) * 100)}%
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance List */}
            {selectedClass && (
              <Card className="shadow-card animate-slide-up">
                <CardHeader>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-2 sm:space-y-0">
                    <div>
                      <CardTitle>Student Attendance</CardTitle>
                      <CardDescription>
                        Mark students as present or absent
                      </CardDescription>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm" onClick={markAllPresent}>
                        Mark All Present
                      </Button>
                      <Button variant="outline" size="sm" onClick={markAllAbsent}>
                        Mark All Absent
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {attendanceData.map((student) => (
                      <div
                        key={student.id}
                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                      >
                        <div className="flex items-center space-x-4">
                          <Checkbox
                            id={`student-${student.id}`}
                            checked={student.present}
                            onCheckedChange={(checked) => 
                              handleAttendanceChange(student.id, !!checked)
                            }
                            className="scale-110"
                          />
                          <div>
                            <div className="font-medium text-foreground">
                              {student.name}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Roll No: {student.rollNo}
                            </div>
                          </div>
                        </div>
                        <Badge
                          variant={student.present ? "default" : "outline"}
                          className={
                            student.present
                              ? "bg-success text-success-foreground"
                              : "border-destructive text-destructive"
                          }
                        >
                          {student.present ? "Present" : "Absent"}
                        </Badge>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-6 pt-6 border-t border-border">
                    <Button
                      onClick={handleSaveAttendance}
                      disabled={isLoading}
                      className="w-full sm:w-auto bg-gradient-primary hover:opacity-90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Saving..." : "Save Attendance"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default MarkAttendance;