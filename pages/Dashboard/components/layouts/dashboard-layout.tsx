
import { Sidebar } from "../sidebar/sidebar.tsx"
import { cn } from "../../lib/utils"
import { useIsMobile } from "../../hooks/use-mobile"
import { useState } from "react"
import { Menu } from "lucide-react"
import { Button } from "../ui/button.tsx"

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const isMobile = useIsMobile()
  const [showMobileSidebar, setShowMobileSidebar] = useState(false)

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar for desktop */}
      {!isMobile && <Sidebar />}

      {/* Mobile sidebar with overlay */}
      {isMobile && showMobileSidebar && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setShowMobileSidebar(false)}
          />
          <div className="fixed inset-y-0 left-0 z-50">
            <Sidebar />
          </div>
        </>
      )}

      {/* Main content */}
      <main className="flex-1 overflow-auto">
        {isMobile && (
          <div className="sticky top-0 z-30 flex items-center px-4 py-2 bg-background/95 backdrop-blur">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setShowMobileSidebar(true)}
              className="mr-2"
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center">
              <span className="text-xl font-bold text-primary">Drivona</span>
            </div>
          </div>
        )}
        
        <div className={cn("px-4 md:px-6 py-4 md:py-6")}>
          {children}
        </div>
      </main>
    </div>
  )
}
