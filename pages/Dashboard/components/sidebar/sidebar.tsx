import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import {
  Car,
  ChevronLeft,
  FileText,
  Home,
  LayoutDashboard,
  PackageOpen,
  ShoppingCart,
  UserPlus,
  Users
} from "lucide-react";
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import ToggleButton from "../../../../Home/components/ToggleButton";
import gsap from "gsap";

interface SidebarProps {
  className?: string;
}

interface SidebarLink {
  icon: JSX.Element;
  label: string;
  href: string;
}

const getInitialTheme = (): string => {
  const storedTheme = localStorage.getItem("theme");
  if (storedTheme) return storedTheme;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
};

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const [theme, setTheme] = useState(getInitialTheme);

  useEffect(() => {
    document.documentElement.classList.remove("dark", "light");
    document.documentElement.classList.add(theme);
    document.documentElement.style.setProperty("--background-color", theme === "dark" ? "#1a202c" : "#ffffff");
    document.documentElement.style.setProperty("--text-color", theme === "dark" ? "#ffffff" : "#000000");
  }, [theme]);

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";

    gsap.to(document.documentElement, {
      backgroundColor: newTheme === "dark" ? "#1a202c" : "#ffffff",
      color: newTheme === "dark" ? "#ffffff" : "#000000",
      duration: 0.3,
      onUpdate: () => {
        document.documentElement.classList.remove(theme);
        document.documentElement.classList.add(newTheme);
        setTheme(newTheme);
        localStorage.setItem("theme", newTheme);
      },
    });
  };

  const links: SidebarLink[] = [
    { icon: <LayoutDashboard size={20} />, label: "Dashboard", href: "/Me" },
    { icon: <FileText size={20} />, label: "Overwrite", href: "/overwrite" },
    { icon: <ShoppingCart size={20} />, label: "Sales", href: "/sales" },
    { icon: <Users size={20} />, label: "Users", href: "/users" },
    { icon: <UserPlus size={20} />, label: "Customers", href: "/customers" },
    { icon: <PackageOpen size={20} />, label: "Orders", href: "/orders" },
    { icon: <Car size={20} />, label: "Cars", href: "/cars" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
      <div
          className={cn(
              "flex flex-col h-screen border-r border-sidebar-border transition-all duration-300",
              collapsed ? "w-[70px]" : "w-[240px]",
              theme === "dark" ? "bg-gray-900 text-white" : "bg-white text-black",
              className
          )}
      >
        <div className="flex items-center py-4 px-4">
          <div className={cn(
              "flex items-center gap-2 p-2 rounded-md transition-all",
              collapsed ? "justify-center w-10 h-10" : "w-full px-3 py-2",
              "hover:bg-sidebar-hover focus:outline-none focus:ring-2 focus:ring-sidebar-focus"
          )}>
            <Link
                to={'/'}
                className="flex items-center gap-2 w-full h-full"
                aria-label={collapsed ? "Home" : "Drivona Home"}
            >
              <Home className={cn(
                  "h-6 w-6 flex-shrink-0",
                  collapsed ? "text-sidebar-primary" : "text-sidebar-primary"
              )} />
              {!collapsed && (
                  <span className="text-xl font-bold text-sidebar-primary whitespace-nowrap">
        Drivona
      </span>
              )}
            </Link>
          </div>
          <Button
              variant="ghost"
              size="icon"
              className="ml-auto rounded-full hover:bg-sidebar-accent"
              onClick={() => setCollapsed(!collapsed)}
          >
            <ChevronLeft className={`h-5 w-5 ${collapsed ? "rotate-180" : ""}`} />
          </Button>
        </div>

        <nav className="flex-1 px-2 py-2">
          {links.map((link, index) => (
              <Link
                  key={index}
                  to={link.href}
                  className={cn(
                      "flex items-center gap-3 px-3 py-2 rounded-md transition-colors",
                      isActive(link.href)
                          ? "bg-sidebar-primary text-sidebar-primary-foreground"
                          : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                  )}
              >
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-sidebar-border flex items-center justify-center">
          <ToggleButton darkMode={theme === "dark"} toggleTheme={toggleTheme} />
        </div>
      </div>
  );
}
