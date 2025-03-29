
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card.tsx"
import { cn } from "../../lib/utils"

interface StatCardProps {
  title: string
  value: string | number
  description?: string
  icon?: React.ReactNode
  className?: string
  trend?: {
    value: number
    isPositive: boolean
  }
}

export function StatCard({ 
  title, 
  value, 
  description, 
  icon, 
  className,
  trend
}: StatCardProps) {
  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
        {icon && <div className="text-muted-foreground/60">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <CardDescription className="mt-1 text-xs">{description}</CardDescription>
        )}
        {trend && (
          <div className="mt-2 flex items-center text-xs">
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-green-500" : "text-red-500"
            )}>
              {trend.isPositive ? "↑" : "↓"} {Math.abs(trend.value)}%
            </span>
            <span className="ml-1 text-muted-foreground">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
