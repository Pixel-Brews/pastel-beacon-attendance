import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { 
  LayoutDashboard, 
  Users, 
  UserPlus, 
  Calendar, 
  ClipboardList,
  Eye,
  LogOut 
} from "lucide-react";
import { NavLink, useNavigate } from "react-router-dom";

const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/teacher/dashboard",
  },
  {
    title: "View Attendance",
    icon: Eye,
    href: "/teacher/attendance/view",
  },
  {
    title: "Mark Attendance",
    icon: ClipboardList,
    href: "/teacher/attendance/mark",
  },
  {
    title: "Add Student",
    icon: UserPlus,
    href: "/teacher/students/add",
  },
  {
    title: "Class Schedule",
    icon: Calendar,
    href: "/teacher/schedule",
  },
];

const Sidebar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };

  return (
    <div className="pb-12 min-h-screen w-64 bg-card border-r border-border">
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <h2 className="mb-2 px-4 text-lg font-semibold text-foreground">
            Teacher Portal
          </h2>
          <ScrollArea className="h-[300px] px-1">
            <div className="space-y-1">
              {sidebarItems.map((item, index) => (
                <NavLink
                  key={index}
                  to={item.href}
                  className={({ isActive }) =>
                    cn(
                      "flex items-center rounded-lg px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground transition-colors",
                      isActive
                        ? "bg-secondary text-secondary-foreground"
                        : "text-muted-foreground"
                    )
                  }
                >
                  <item.icon className="mr-2 h-4 w-4" />
                  {item.title}
                </NavLink>
              ))}
            </div>
          </ScrollArea>
        </div>
        <div className="px-3 py-2">
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;