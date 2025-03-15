
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { ActivityChart } from "@/components/dashboard/activity-chart"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { StatCard } from "@/components/dashboard/stat-card"
import { Car, DollarSign, ShoppingCart, UserPlus, Users } from "lucide-react"

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">Welcome to Drivona Dashboard</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Sales"
            value="$45,231.89"
            description="Monthly revenue"
            icon={<DollarSign className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatCard
            title="New Customers"
            value="24"
            description="This month"
            icon={<UserPlus className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatCard
            title="Active Users"
            value="573"
            description="Total registered users"
            icon={<Users className="h-4 w-4" />}
            trend={{ value: 2.5, isPositive: true }}
          />
          <StatCard
            title="Cars Sold"
            value="45"
            description="This month"
            icon={<Car className="h-4 w-4" />}
            trend={{ value: 5, isPositive: false }}
          />
        </div>

        <div className="grid gap-4 md:grid-cols-7">
          <ActivityChart className="md:col-span-5" />
          <RecentActivity className="md:col-span-2" />
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Dashboard
