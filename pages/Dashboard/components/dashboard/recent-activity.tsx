
import { Avatar, AvatarFallback, AvatarImage } from "../../components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { cn } from "../../lib/utils"

interface Activity {
  id: number
  user: {
    name: string
    avatar?: string
    initials: string
  }
  action: string
  timestamp: string
}

const activities: Activity[] = [
  {
    id: 1,
    user: {
      name: "John Doe",
      initials: "JD"
    },
    action: "Added a new car to inventory",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    user: {
      name: "Alice Smith",
      initials: "AS"
    },
    action: "Completed a sale transaction",
    timestamp: "3 hours ago"
  },
  {
    id: 3,
    user: {
      name: "Bob Johnson",
      initials: "BJ"
    },
    action: "Updated customer information",
    timestamp: "5 hours ago"
  },
  {
    id: 4,
    user: {
      name: "Emma Wilson",
      initials: "EW"
    },
    action: "Scheduled a test drive",
    timestamp: "Yesterday"
  }
]

interface RecentActivityProps {
  className?: string
}

export function RecentActivity({ className }: RecentActivityProps) {
  return (
    <Card className={cn(className)}>
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
        <CardDescription>Latest actions performed by users</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {activities.map((activity) => (
            <div key={activity.id} className="flex items-start gap-4">
              <Avatar className="h-9 w-9">
                <AvatarImage src={activity.user.avatar} />
                <AvatarFallback className="bg-primary/10 text-primary">
                  {activity.user.initials}
                </AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <p className="text-sm font-medium leading-none">{activity.user.name}</p>
                <p className="text-sm text-muted-foreground">{activity.action}</p>
                <p className="text-xs text-muted-foreground/60">{activity.timestamp}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
