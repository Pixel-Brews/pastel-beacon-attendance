import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { UserPlus, Save, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";

const AddStudent = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    rollNumber: "",
    email: "",
    phone: "",
    class: "",
    section: "",
    address: "",
    emergencyContact: "",
    emergencyPhone: "",
  });

  const classes = [
    { value: "physics-101", label: "Physics 101" },
    { value: "chemistry-202", label: "Chemistry 202" },
    { value: "biology-150", label: "Biology 150" },
    { value: "math-300", label: "Mathematics 300" },
  ];

  const sections = [
    { value: "a", label: "Section A" },
    { value: "b", label: "Section B" },
    { value: "c", label: "Section C" },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.rollNumber || !formData.email || !formData.class) {
      toast({
        title: "Missing Required Fields",
        description: "Please fill in all required fields marked with *",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Student Added Successfully",
        description: `${formData.firstName} ${formData.lastName} has been enrolled in your class.`,
      });
      
      // Reset form
      setFormData({
        firstName: "",
        lastName: "",
        rollNumber: "",
        email: "",
        phone: "",
        class: "",
        section: "",
        address: "",
        emergencyContact: "",
        emergencyPhone: "",
      });
    }, 1500);
  };

  const handleReset = () => {
    setFormData({
      firstName: "",
      lastName: "",
      rollNumber: "",
      email: "",
      phone: "",
      class: "",
      section: "",
      address: "",
      emergencyContact: "",
      emergencyPhone: "",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-soft">
      <Header showProfile userType="teacher" />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-6">
          <div className="max-w-4xl mx-auto">
            <div className="mb-8 animate-fade-in">
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Add New Student
              </h1>
              <p className="text-muted-foreground">
                Register a new student to your class
              </p>
            </div>

            <Card className="shadow-card animate-slide-up">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <UserPlus className="h-5 w-5 text-primary" />
                  <span>Student Information</span>
                </CardTitle>
                <CardDescription>
                  Fill in the student details below. Fields marked with * are required.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Personal Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                      Personal Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name *</Label>
                        <Input
                          id="firstName"
                          placeholder="Enter first name"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name *</Label>
                        <Input
                          id="lastName"
                          placeholder="Enter last name"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="rollNumber">Roll Number *</Label>
                        <Input
                          id="rollNumber"
                          placeholder="e.g., PHY001"
                          value={formData.rollNumber}
                          onChange={(e) => handleInputChange("rollNumber", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="email">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="student@email.com"
                          value={formData.email}
                          onChange={(e) => handleInputChange("email", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange("phone", e.target.value)}
                        className="transition-all duration-200 focus:shadow-soft"
                      />
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                      Academic Information
                    </h3>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="class">Class *</Label>
                        <Select value={formData.class} onValueChange={(value) => handleInputChange("class", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a class" />
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
                        <Label htmlFor="section">Section</Label>
                        <Select value={formData.section} onValueChange={(value) => handleInputChange("section", value)}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a section" />
                          </SelectTrigger>
                          <SelectContent>
                            {sections.map((section) => (
                              <SelectItem key={section.value} value={section.value}>
                                {section.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-foreground border-b border-border pb-2">
                      Additional Information
                    </h3>
                    
                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Textarea
                        id="address"
                        placeholder="Enter complete address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        rows={3}
                        className="transition-all duration-200 focus:shadow-soft"
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="emergencyContact">Emergency Contact Name</Label>
                        <Input
                          id="emergencyContact"
                          placeholder="Parent/Guardian name"
                          value={formData.emergencyContact}
                          onChange={(e) => handleInputChange("emergencyContact", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="emergencyPhone">Emergency Contact Phone</Label>
                        <Input
                          id="emergencyPhone"
                          placeholder="+1 (555) 987-6543"
                          value={formData.emergencyPhone}
                          onChange={(e) => handleInputChange("emergencyPhone", e.target.value)}
                          className="transition-all duration-200 focus:shadow-soft"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Form Actions */}
                  <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t border-border">
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="flex-1 bg-gradient-primary hover:opacity-90"
                    >
                      <Save className="mr-2 h-4 w-4" />
                      {isLoading ? "Adding Student..." : "Add Student"}
                    </Button>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleReset}
                      className="flex-1"
                    >
                      <X className="mr-2 h-4 w-4" />
                      Reset Form
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AddStudent;