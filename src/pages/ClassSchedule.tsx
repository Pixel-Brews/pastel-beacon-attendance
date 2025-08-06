import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar, Clock, Plus, Edit, Trash2, MapPin } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

interface ClassSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  subject: string;
  room: string;
  class: string;
}

const ClassSchedule = () => {
  const { toast } = useToast();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingSlot, setEditingSlot] = useState<ClassSlot | null>(null);
  const [scheduleData, setScheduleData] = useState<ClassSlot[]>([
    { id: 1, day: "Monday", startTime: "09:00", endTime: "10:30", subject: "Physics 101", room: "Room 205", class: "Section A" },
    { id: 2, day: "Monday", startTime: "11:00", endTime: "12:30", subject: "Chemistry 202", room: "Lab 1", class: "Section B" },
    { id: 3, day: "Tuesday", startTime: "10:00", endTime: "11:30", subject: "Biology 150", room: "Room 301", class: "Section C" },
    { id: 4, day: "Wednesday", startTime: "09:00", endTime: "10:30", subject: "Physics 101", room: "Room 205", class: "Section A" },
    { id: 5, day: "Wednesday", startTime: "14:00", endTime: "15:30", subject: "Chemistry 202", room: "Lab 1", class: "Section B" },
    { id: 6, day: "Friday", startTime: "10:00", endTime: "11:30", subject: "Biology 150", room: "Room 301", class: "Section C" },
  ]);

  const [newSlot, setNewSlot] = useState({
    day: "",
    startTime: "",
    endTime: "",
    subject: "",
    room: "",
    class: "",
  });

  const daysOfWeek = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  const subjects = ["Physics 101", "Chemistry 202", "Biology 150", "Mathematics 300"];
  const rooms = ["Room 205", "Room 301", "Lab 1", "Lab 2", "Auditorium"];
  const classes = ["Section A", "Section B", "Section C"];

  const handleAddSlot = () => {
    if (!newSlot.day || !newSlot.startTime || !newSlot.endTime || !newSlot.subject) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    const slot: ClassSlot = {
      id: Date.now(),
      ...newSlot,
    };

    setScheduleData(prev => [...prev, slot]);
    setNewSlot({ day: "", startTime: "", endTime: "", subject: "", room: "", class: "" });
    setIsAddDialogOpen(false);
    
    toast({
      title: "Class Added",
      description: "New class slot has been added to your schedule.",
    });
  };

  const handleEditSlot = (slot: ClassSlot) => {
    setEditingSlot(slot);
    setNewSlot({
      day: slot.day,
      startTime: slot.startTime,
      endTime: slot.endTime,
      subject: slot.subject,
      room: slot.room,
      class: slot.class,
    });
  };

  const handleUpdateSlot = () => {
    if (!editingSlot) return;

    setScheduleData(prev => 
      prev.map(slot => 
        slot.id === editingSlot.id 
          ? { ...editingSlot, ...newSlot }
          : slot
      )
    );

    setEditingSlot(null);
    setNewSlot({ day: "", startTime: "", endTime: "", subject: "", room: "", class: "" });
    
    toast({
      title: "Class Updated",
      description: "Class slot has been updated successfully.",
    });
  };

  const handleDeleteSlot = (id: number) => {
    setScheduleData(prev => prev.filter(slot => slot.id !== id));
    toast({
      title: "Class Deleted",
      description: "Class slot has been removed from your schedule.",
    });
  };

  const getScheduleByDay = (day: string) => {
    return scheduleData
      .filter(slot => slot.day === day)
      .sort((a, b) => a.startTime.localeCompare(b.startTime));
  };

  const getTimeColor = (startTime: string) => {
    const hour = parseInt(startTime.split(':')[0]);
    if (hour < 10) return "text-blue-600";
    if (hour < 14) return "text-green-600";
    return "text-purple-600";
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-7xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between space-y-4 sm:space-y-0">
                <div>
                  <h1 className="text-3xl font-bold text-foreground mb-2">
                    Class Schedule
                  </h1>
                  <p className="text-muted-foreground">
                    Manage your weekly class schedule and timings
                  </p>
                </div>
                
                <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                  <DialogTrigger asChild>
                    <Button className="bg-gradient-primary hover:opacity-90">
                      <Plus className="mr-2 h-4 w-4" />
                      Add Class
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-md">
                    <DialogHeader>
                      <DialogTitle>Add New Class</DialogTitle>
                      <DialogDescription>
                        Create a new class slot in your schedule
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label>Day</Label>
                        <Select value={newSlot.day} onValueChange={(value) => setNewSlot(prev => ({ ...prev, day: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select day" />
                          </SelectTrigger>
                          <SelectContent>
                            {daysOfWeek.map((day) => (
                              <SelectItem key={day} value={day}>{day}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Time</Label>
                          <Input
                            type="time"
                            value={newSlot.startTime}
                            onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Time</Label>
                          <Input
                            type="time"
                            value={newSlot.endTime}
                            onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                          />
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Subject</Label>
                        <Select value={newSlot.subject} onValueChange={(value) => setNewSlot(prev => ({ ...prev, subject: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select subject" />
                          </SelectTrigger>
                          <SelectContent>
                            {subjects.map((subject) => (
                              <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Room</Label>
                        <Select value={newSlot.room} onValueChange={(value) => setNewSlot(prev => ({ ...prev, room: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select room" />
                          </SelectTrigger>
                          <SelectContent>
                            {rooms.map((room) => (
                              <SelectItem key={room} value={room}>{room}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Class/Section</Label>
                        <Select value={newSlot.class} onValueChange={(value) => setNewSlot(prev => ({ ...prev, class: value }))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select class" />
                          </SelectTrigger>
                          <SelectContent>
                            {classes.map((cls) => (
                              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                        Cancel
                      </Button>
                      <Button onClick={handleAddSlot} className="bg-gradient-primary hover:opacity-90">
                        Add Class
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>

            {/* Weekly Schedule Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {daysOfWeek.map((day) => (
                <Card key={day} className="shadow-card animate-slide-up">
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Calendar className="h-5 w-5 text-primary" />
                      <span>{day}</span>
                    </CardTitle>
                    <CardDescription>
                      {getScheduleByDay(day).length} classes scheduled
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {getScheduleByDay(day).length > 0 ? (
                        getScheduleByDay(day).map((slot) => (
                          <div
                            key={slot.id}
                            className="p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <div className="font-medium text-foreground mb-1">
                                  {slot.subject}
                                </div>
                                <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                                  <div className="flex items-center space-x-1">
                                    <Clock className="h-3 w-3" />
                                    <span className={getTimeColor(slot.startTime)}>
                                      {slot.startTime} - {slot.endTime}
                                    </span>
                                  </div>
                                  <div className="flex items-center space-x-1">
                                    <MapPin className="h-3 w-3" />
                                    <span>{slot.room}</span>
                                  </div>
                                </div>
                                <Badge variant="outline" className="mt-2">
                                  {slot.class}
                                </Badge>
                              </div>
                              <div className="flex space-x-1">
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleEditSlot(slot)}
                                  className="h-8 w-8 p-0"
                                >
                                  <Edit className="h-3 w-3" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  onClick={() => handleDeleteSlot(slot.id)}
                                  className="h-8 w-8 p-0 hover:text-destructive"
                                >
                                  <Trash2 className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="text-center py-8 text-muted-foreground">
                          <Calendar className="mx-auto h-8 w-8 mb-2 opacity-50" />
                          <p className="text-sm">No classes scheduled</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Edit Dialog */}
            <Dialog open={!!editingSlot} onOpenChange={() => setEditingSlot(null)}>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Class</DialogTitle>
                  <DialogDescription>
                    Update the class slot details
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Day</Label>
                    <Select value={newSlot.day} onValueChange={(value) => setNewSlot(prev => ({ ...prev, day: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {daysOfWeek.map((day) => (
                          <SelectItem key={day} value={day}>{day}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Start Time</Label>
                      <Input
                        type="time"
                        value={newSlot.startTime}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, startTime: e.target.value }))}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>End Time</Label>
                      <Input
                        type="time"
                        value={newSlot.endTime}
                        onChange={(e) => setNewSlot(prev => ({ ...prev, endTime: e.target.value }))}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Subject</Label>
                    <Select value={newSlot.subject} onValueChange={(value) => setNewSlot(prev => ({ ...prev, subject: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>{subject}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Room</Label>
                    <Select value={newSlot.room} onValueChange={(value) => setNewSlot(prev => ({ ...prev, room: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {rooms.map((room) => (
                          <SelectItem key={room} value={room}>{room}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Class/Section</Label>
                    <Select value={newSlot.class} onValueChange={(value) => setNewSlot(prev => ({ ...prev, class: value }))}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((cls) => (
                          <SelectItem key={cls} value={cls}>{cls}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setEditingSlot(null)}>
                    Cancel
                  </Button>
                  <Button onClick={handleUpdateSlot} className="bg-gradient-primary hover:opacity-90">
                    Update Class
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ClassSchedule;