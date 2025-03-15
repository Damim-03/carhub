
import { DashboardLayout } from "@/components/layouts/dashboard-layout"

const Users = () => {
  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Users</h1>
          <p className="text-muted-foreground">Manage user accounts</p>
        </div>
        
        <div className="rounded-lg border border-dashed p-10 text-center">
          <h3 className="text-lg font-semibold">Coming Soon</h3>
          <p className="text-sm text-muted-foreground">This feature is under development</p>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Users
