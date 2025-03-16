
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Package, Calendar, User, DollarSign, Clock, CheckCircle, XCircle } from "lucide-react"
import { Badge } from "@/components/ui/badge"

// Sample orders data - in a real app, this would come from an API or database
const ordersData = [
  {
    id: "ORD-2023-1001",
    customerName: "John Doe",
    customerEmail: "john.doe@example.com",
    date: "2023-10-15",
    items: [
      { id: 1, name: "Tesla Model S", quantity: 1, price: 79990 },
    ],
    total: 79990,
    status: "Completed",
    paymentStatus: "Paid",
    deliveryAddress: "123 Main St, San Francisco, CA 94105",
    trackingNumber: "TRK7891234567",
    deliveryDate: "2023-10-25"
  },
  {
    id: "ORD-2023-1002",
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    date: "2023-10-18",
    items: [
      { id: 1, name: "BMW i4", quantity: 1, price: 52200 },
      { id: 2, name: "Premium Protection Plan", quantity: 1, price: 2500 },
    ],
    total: 54700,
    status: "Processing",
    paymentStatus: "Paid",
    deliveryAddress: "456 Oak Ave, Los Angeles, CA 90001",
    trackingNumber: "TRK3456789012",
    deliveryDate: "2023-11-05"
  },
  {
    id: "ORD-2023-1003",
    customerName: "Michael Chen",
    customerEmail: "m.chen@example.com",
    date: "2023-10-20",
    items: [
      { id: 1, name: "Audi e-tron GT", quantity: 1, price: 104900 },
      { id: 2, name: "Extended Warranty", quantity: 1, price: 3500 },
      { id: 3, name: "Charging Station", quantity: 1, price: 1200 },
    ],
    total: 109600,
    status: "Pending",
    paymentStatus: "Awaiting Payment",
    deliveryAddress: "789 Pine St, Seattle, WA 98101",
    trackingNumber: "N/A",
    deliveryDate: "Pending Payment"
  },
  {
    id: "ORD-2023-1004",
    customerName: "Emily Wilson",
    customerEmail: "e.wilson@example.com",
    date: "2023-10-22",
    items: [
      { id: 1, name: "Ford Mustang Mach-E", quantity: 1, price: 43895 },
    ],
    total: 43895,
    status: "Shipped",
    paymentStatus: "Paid",
    deliveryAddress: "101 Maple Dr, Chicago, IL 60007",
    trackingNumber: "TRK5678901234",
    deliveryDate: "2023-10-30"
  },
  {
    id: "ORD-2023-1005",
    customerName: "Robert Brown",
    customerEmail: "r.brown@example.com",
    date: "2023-10-25",
    items: [
      { id: 1, name: "Rivian R1T", quantity: 1, price: 73000 },
      { id: 2, name: "Off-road Package", quantity: 1, price: 5500 },
    ],
    total: 78500,
    status: "Cancelled",
    paymentStatus: "Refunded",
    deliveryAddress: "222 Elm St, Austin, TX 78701",
    trackingNumber: "N/A",
    deliveryDate: "N/A"
  }
];

const Orders = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-green-500";
      case "Processing": return "bg-blue-500";
      case "Pending": return "bg-yellow-500";
      case "Shipped": return "bg-purple-500";
      case "Cancelled": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const getPaymentStatusColor = (status: string) => {
    switch (status) {
      case "Paid": return "bg-green-500";
      case "Awaiting Payment": return "bg-yellow-500";
      case "Refunded": return "bg-red-500";
      default: return "bg-gray-500";
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    if (dateString === "N/A" || dateString === "Pending Payment") return dateString;
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('en-US', { 
        year: 'numeric', 
        month: 'short', 
        day: 'numeric' 
      }).format(date);
    } catch (e) {
      return dateString;
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">Manage customer orders</p>
        </div>
        
        <div className="space-y-6">
          {ordersData.map((order) => (
            <Card key={order.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-2">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-primary" />
                    {order.id}
                  </CardTitle>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                    <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                      {order.paymentStatus}
                    </Badge>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                  <div className="space-y-2">
                    <div className="flex items-start gap-2">
                      <User className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">{order.customerName}</h4>
                        <p className="text-sm text-muted-foreground">{order.customerEmail}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">Order Date</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(order.date)}</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-2">
                      <Clock className="h-5 w-5 text-muted-foreground mt-0.5" />
                      <div>
                        <h4 className="font-medium">Delivery Date</h4>
                        <p className="text-sm text-muted-foreground">{formatDate(order.deliveryDate)}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <h4 className="font-medium">Delivery Address</h4>
                      <p className="text-sm text-muted-foreground">{order.deliveryAddress}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Tracking Number</h4>
                      <p className="text-sm text-muted-foreground">{order.trackingNumber}</p>
                    </div>
                    <div>
                      <h4 className="font-medium">Total</h4>
                      <p className="text-lg font-bold text-primary">{formatCurrency(order.total)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h4 className="font-medium mb-2">Order Items</h4>
                  <div className="bg-muted rounded-md p-3">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2 font-medium">Item</th>
                          <th className="text-center py-2 font-medium">Quantity</th>
                          <th className="text-right py-2 font-medium">Price</th>
                        </tr>
                      </thead>
                      <tbody>
                        {order.items.map((item) => (
                          <tr key={item.id} className="border-b border-border/50 last:border-0">
                            <td className="py-2">{item.name}</td>
                            <td className="text-center py-2">{item.quantity}</td>
                            <td className="text-right py-2">{formatCurrency(item.price)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
                
                <div className="flex justify-end gap-2 mt-4">
                  <Button size="sm" variant="outline">View Details</Button>
                  {order.status !== "Completed" && order.status !== "Cancelled" && (
                    <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700">
                      <XCircle className="h-4 w-4 mr-1" /> Cancel
                    </Button>
                  )}
                  {order.status === "Processing" && (
                    <Button size="sm">
                      <CheckCircle className="h-4 w-4 mr-1" /> Mark as Shipped
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default Orders
