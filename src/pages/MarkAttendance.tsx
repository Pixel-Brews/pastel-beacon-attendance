import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { MapPin, Calendar, Clock, Play, Square, Users, Wifi } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const MarkAttendance = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionActive, setSessionActive] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState<Date | null>(null);
  const [studentsMarked, setStudentsMarked] = useState([
    { id: 1, name: "Alice Johnson", rollNo: "PHY001", markedAt: "10:15 AM" },
    { id: 2, name: "Bob Smith", rollNo: "PHY002", markedAt: "10:16 AM" },
    { id: 4, name: "Diana Prince", rollNo: "PHY004", markedAt: "10:18 AM" },
  ]);

  const classes = [
    { value: "physics-101", label: "Physics 101 - Section A" },
    { value: "chemistry-202", label: "Chemistry 202 - Section B" },
    { value: "biology-150", label: "Biology 150 - Section C" },
  ];

  const handleStartSession = async () => {
    if (!selectedClass) {
      toast({
        title: "Please Select a Class",
        description: "You must select a class before starting an attendance session.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call to start geofencing session
    setTimeout(() => {
      setIsLoading(false);
      setSessionActive(true);
      setSessionStartTime(new Date());
      
      toast({
        title: "Attendance Session Started",
        description: "Students can now mark their attendance within the classroom area.",
      });
    }, 1000);
  };

  const handleStopSession = async () => {
    setIsLoading(true);
    
    // Simulate API call to stop session
    setTimeout(() => {
      setIsLoading(false);
      setSessionActive(false);
      
      toast({
        title: "Attendance Session Ended",
        description: `Session duration: ${sessionStartTime ? Math.round((Date.now() - sessionStartTime.getTime()) / 60000) : 0} minutes`,
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-6xl mx-auto">
            <div className="mb-12 animate-fade-in">
              <h1 className="text-4xl font-playfair font-bold text-foreground mb-4">
                Attendance Sessions
              </h1>
              <p className="text-xl text-muted-foreground">
                Start a geofenced attendance session for your class
              </p>
            </div>

            {/* Session Control */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <Card className="shadow-floating animate-slide-up border-0 p-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl font-playfair">
                    <Calendar className="h-6 w-6 text-primary" />
                    <span>Class Selection</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <label className="text-lg font-medium text-foreground mb-3 block">
                      Select Class
                    </label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger className="w-full h-12 text-lg rounded-xl border-2">
                        <SelectValue placeholder="Choose a class for attendance session" />
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
                    <div className="space-y-4 pt-4 border-t border-border">
                      <div className="flex items-center space-x-3 text-lg text-muted-foreground">
                        <Clock className="h-5 w-5" />
                        <span>Today, 10:00 AM - 11:30 AM</span>
                      </div>
                      <div className="flex items-center space-x-3 text-lg text-muted-foreground">
                        <MapPin className="h-5 w-5" />
                        <span>Room 205, Science Building</span>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="shadow-floating animate-slide-up border-0 p-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl font-playfair">
                    <Wifi className="h-6 w-6 text-primary" />
                    <span>Session Control</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-xl">
                    <div>
                      <div className="font-medium text-foreground text-lg">Status</div>
                      <div className="text-muted-foreground">
                        {sessionActive ? "Session Active" : "Session Inactive"}
                      </div>
                    </div>
                    <Badge 
                      variant={sessionActive ? "default" : "outline"}
                      className={sessionActive ? "bg-success text-success-foreground text-lg px-4 py-2" : "text-lg px-4 py-2"}
                    >
                      {sessionActive ? "LIVE" : "STOPPED"}
                    </Badge>
                  </div>

                  {sessionActive ? (
                    <Button
                      onClick={handleStopSession}
                      disabled={isLoading}
                      className="w-full h-12 text-lg bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
                    >
                      <Square className="mr-3 h-5 w-5" />
                      {isLoading ? "Stopping..." : "Stop Attendance Session"}
                    </Button>
                  ) : (
                    <Button
                      onClick={handleStartSession}
                      disabled={isLoading}
                      className="w-full h-12 text-lg bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl"
                    >
                      <Play className="mr-3 h-5 w-5" />
                      {isLoading ? "Starting..." : "Start Attendance Session"}
                    </Button>
                  )}

                  {sessionActive && sessionStartTime && (
                    <div className="text-sm text-muted-foreground text-center">
                      Session started at {sessionStartTime.toLocaleTimeString()}
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Live Attendance Feed */}
            {sessionActive && (
              <Card className="shadow-floating animate-slide-up border-0 p-2">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-3 text-2xl font-playfair">
                    <Users className="h-6 w-6 text-primary" />
                    <span>Live Attendance Feed</span>
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Students marking attendance in real-time
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {studentsMarked.length > 0 ? (
                      studentsMarked.map((student) => (
                        <div
                          key={student.id}
                          className="flex items-center justify-between p-4 border border-border rounded-xl bg-success/5 hover:bg-success/10 transition-colors"
                        >
                          <div className="flex items-center space-x-4">
                            <div className="w-3 h-3 bg-success rounded-full animate-pulse"></div>
                            <div>
                              <div className="font-medium text-foreground text-lg">
                                {student.name}
                              </div>
                              <div className="text-muted-foreground">
                                Roll No: {student.rollNo}
                              </div>
                            </div>
                          </div>
                          <div className="text-right">
                            <Badge className="bg-success text-success-foreground text-base px-3 py-1">
                              Present
                            </Badge>
                            <div className="text-sm text-muted-foreground mt-1">
                              {student.markedAt}
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-12 text-muted-foreground">
                        <Wifi className="h-12 w-12 mx-auto mb-4 opacity-50" />
                        <p className="text-lg">Waiting for students to mark attendance...</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-border grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-success">{studentsMarked.length}</div>
                      <div className="text-muted-foreground">Present</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-muted-foreground">25</div>
                      <div className="text-muted-foreground">Total</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-primary">
                        {Math.round((studentsMarked.length / 25) * 100)}%
                      </div>
                      <div className="text-muted-foreground">Rate</div>
                    </div>
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