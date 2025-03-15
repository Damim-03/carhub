
import { cn } from "../../lib/utils"
import { Button } from "../ui/button.tsx"
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
} from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "../theme-toggle.tsx"
import { Link, useLocation } from "react-router-dom"

interface SidebarProps {
  className?: string
}

interface SidebarLink {
  icon: React.ReactNode
  label: string
  href: string
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false)
  const location = useLocation()

  const links: SidebarLink[] = [
    {
      icon: <LayoutDashboard size={20} />,
      label: "Dashboard",
      href: "/"
    },
    {
      icon: <FileText size={20} />,
      label: "Overwrite",
      href: "/overwrite"
    },
    {
      icon: <ShoppingCart size={20} />,
      label: "Sales",
      href: "/sales"
    },
    {
      icon: <Users size={20} />,
      label: "Users",
      href: "/users"
    },
    {
      icon: <UserPlus size={20} />,
      label: "Customers",
      href: "/customers"
    },
    {
      icon: <PackageOpen size={20} />,
      label: "Orders",
      href: "/orders"
    },
    {
      icon: <Car size={20} />,
      label: "Cars",
      href: "/cars"
    }
  ]

  const isActive = (path: string) => {
    return location.pathname === path
  }

  return (
    <div
      className={cn(
        "flex flex-col h-screen bg-sidebar border-r border-sidebar-border transition-all duration-300",
        collapsed ? "w-[70px]" : "w-[240px]",
        className
      )}
    >
      <div className="flex items-center py-4 px-4">
        <div className={cn("flex items-center gap-2", collapsed ? "justify-center w-full" : "")}>
          <Home className="h-6 w-6 text-sidebar-primary" />
          {!collapsed && <span className="text-xl font-bold text-sidebar-primary">Drivona</span>}
        </div>
        {!collapsed && (
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto rounded-full hover:bg-sidebar-accent"
            onClick={() => setCollapsed(true)}
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
        )}
      </div>

      <div className="px-3 py-2">
        {collapsed ? (
          <Button
            onClick={() => setCollapsed(false)}
            variant="ghost"
            size="icon"
            className="w-full h-8 rounded-md justify-center"
          >
            <ChevronLeft className="h-5 w-5 rotate-180" />
          </Button>
        ) : (
          <div className="text-xs font-semibold text-sidebar-foreground/60 px-2 py-2">
            MENU
          </div>
        )}
      </div>

      <nav className="flex-1">
        <ul className="px-2 flex flex-col gap-1">
          {links.map((link, index) => (
            <li key={index}>
              <Link
                to={link.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-2 rounded-md text-sidebar-foreground transition-colors",
                  isActive(link.href)
                    ? "bg-sidebar-primary text-sidebar-primary-foreground"
                    : "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
                )}
              >
                {link.icon}
                {!collapsed && <span>{link.label}</span>}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-4 border-t border-sidebar-border flex items-center justify-center">
        <ThemeToggle />
      </div>
    </div>
  )
}
