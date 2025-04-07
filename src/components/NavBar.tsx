
import React from "react";
import { Link } from "react-router-dom";
import { Cloud, CloudLightning, LayoutDashboard, History, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import DarkModeToggle from "./DarkModeToggle";

const NavBar = () => {
  return (
    <header className="w-full sticky top-0 z-40 backdrop-blur-md bg-background/60 border-b border-border">
      <div className="container flex h-16 items-center px-6 sm:px-10">
        <Link 
          to="/" 
          className="flex items-center space-x-2 transition-transform duration-300 hover:scale-[1.02]"
        >
          <CloudLightning className="h-7 w-7 text-primary" />
          <span className="text-xl font-medium">Customer Onboarding & Damage Report</span>
        </Link>
        
        <nav className="ml-auto flex items-center space-x-1">
          <NavLink to="/" icon={<LayoutDashboard className="w-4 h-4" />}>
            Dashboard
          </NavLink>
          <NavLink to="/reports" icon={<Cloud className="w-4 h-4" />}>
            Reports
          </NavLink>
          <NavLink to="/history" icon={<History className="w-4 h-4" />}>
            History
          </NavLink>
          <NavLink to="/settings" icon={<Settings className="w-4 h-4" />}>
            Settings
          </NavLink>
          <DarkModeToggle />
        </nav>
      </div>
    </header>
  );
};

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
}

const NavLink = ({ to, children, icon }: NavLinkProps) => {
  const isActive = window.location.pathname === to;
  
  return (
    <Link
      to={to}
      className={cn(
        "group flex items-center justify-center px-4 py-2 text-sm rounded-full transition-all duration-200",
        "hover:bg-primary/10",
        isActive 
          ? "text-primary font-medium" 
          : "text-muted-foreground"
      )}
    >
      {icon && (
        <span className={cn(
          "mr-2 transition-transform duration-300 group-hover:scale-110",
          isActive ? "text-primary" : "text-muted-foreground"
        )}>
          {icon}
        </span>
      )}
      <span>{children}</span>
    </Link>
  );
};

export default NavBar;
