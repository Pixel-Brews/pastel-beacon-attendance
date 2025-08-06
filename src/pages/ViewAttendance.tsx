import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Calendar, Download, Filter, Search, FileText } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const ViewAttendance = () => {
  const { toast } = useToast();
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // Mock attendance data
  const attendanceRecords = [
    {
      id: 1,
      date: "2024-08-06",
      class: "Physics 101",
      student: "Alice Johnson",
      rollNo: "PHY001",
      status: "Present",
      time: "10:15 AM"
    },
    {
      id: 2,
      date: "2024-08-06",
      class: "Physics 101",
      student: "Bob Smith",
      rollNo: "PHY002",
      status: "Present",
      time: "10:12 AM"
    },
    {
      id: 3,
      date: "2024-08-06",
      class: "Physics 101",
      student: "Charlie Brown",
      rollNo: "PHY003",
      status: "Absent",
      time: "-"
    },
    {
      id: 4,
      date: "2024-08-05",
      class: "Chemistry 202",
      student: "Diana Prince",
      rollNo: "CHE001",
      status: "Present",
      time: "2:30 PM"
    },
    {
      id: 5,
      date: "2024-08-05",
      class: "Chemistry 202",
      student: "Ethan Hunt",
      rollNo: "CHE002",
      status: "Late",
      time: "2:45 PM"
    },
    {
      id: 6,
      date: "2024-08-05",
      class: "Biology 150",
      student: "Fiona Clark",
      rollNo: "BIO001",
      status: "Present",
      time: "9:05 AM"
    },
  ];

  const classes = [
    { value: "all", label: "All Classes" },
    { value: "physics-101", label: "Physics 101" },
    { value: "chemistry-202", label: "Chemistry 202" },
    { value: "biology-150", label: "Biology 150" },
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "present", label: "Present" },
    { value: "absent", label: "Absent" },
    { value: "late", label: "Late" },
  ];

  const filteredRecords = attendanceRecords.filter(record => {
    const matchesClass = !selectedClass || selectedClass === "all" || 
      record.class.toLowerCase().includes(selectedClass.toLowerCase());
    const matchesDate = !selectedDate || record.date === selectedDate;
    const matchesSearch = !searchTerm || 
      record.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      record.rollNo.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesClass && matchesDate && matchesSearch;
  });

  const handleDownloadCSV = () => {
    toast({
      title: "Download Started",
      description: "Attendance report is being prepared for download.",
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

  const stats = {
    total: filteredRecords.length,
    present: filteredRecords.filter(r => r.status === "Present").length,
    absent: filteredRecords.filter(r => r.status === "Absent").length,
    late: filteredRecords.filter(r => r.status === "Late").length,
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                View Attendance
              </h1>
              <p className="text-muted-foreground">
                View and analyze attendance records with filters and export options
              </p>
            </div>

            {/* Filters */}
            <Card className="shadow-card mb-6 animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5 text-primary" />
                  <span>Filters</span>
                </CardTitle>
                <CardDescription>
                  Filter attendance records by class, date, or student
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="class-filter">Class</Label>
                    <Select value={selectedClass} onValueChange={setSelectedClass}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select class" />
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

                  <div className="space-y-2">
                    <Label htmlFor="date-filter">Date</Label>
                    <Input
                      id="date-filter"
                      type="date"
                      value={selectedDate}
                      onChange={(e) => setSelectedDate(e.target.value)}
                      className="transition-all duration-200 focus:shadow-soft"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="search">Search Student</Label>
                    <div className="relative">
                      <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                      <Input
                        id="search"
                        placeholder="Name or roll number"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 transition-all duration-200 focus:shadow-soft"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Actions</Label>
                    <Button
                      onClick={handleDownloadCSV}
                      className="w-full bg-gradient-secondary text-secondary-foreground hover:opacity-90"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download CSV
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="shadow-card animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Total Records</p>
                      <p className="text-2xl font-bold text-foreground">{stats.total}</p>
                    </div>
                    <FileText className="h-8 w-8 text-primary" />
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Present</p>
                      <p className="text-2xl font-bold text-success">{stats.present}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-success"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Absent</p>
                      <p className="text-2xl font-bold text-destructive">{stats.absent}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-destructive"></div>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-card animate-slide-up">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-muted-foreground">Late</p>
                      <p className="text-2xl font-bold text-warning">{stats.late}</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-warning"></div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Attendance Table */}
            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle>Attendance Records</CardTitle>
                <CardDescription>
                  {filteredRecords.length} records found
                </CardDescription>
              </CardHeader>
              <CardContent>
                {filteredRecords.length > 0 ? (
                  <div className="overflow-x-auto">
                    <div className="space-y-2">
                      {filteredRecords.map((record) => (
                        <div
                          key={record.id}
                          className="flex flex-col sm:flex-row sm:items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors space-y-2 sm:space-y-0"
                        >
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center space-x-4">
                              <div className="font-medium text-foreground">
                                {record.student}
                              </div>
                              <Badge variant="outline" className="text-xs">
                                {record.rollNo}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground">
                              {record.class} • {record.date} • {record.time}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            {getStatusBadge(record.status)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">
                      No records found
                    </h3>
                    <p className="text-muted-foreground">
                      Try adjusting your filters to see attendance records.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ViewAttendance;