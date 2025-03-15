
import { DashboardLayout } from "@/components/layouts/dashboard-layout"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Package, 
  Calendar, 
  Check,
  X,
  Clock,
  ShoppingCart,
  CreditCard,
  Edit,
  Trash2,
  UserCog
} from "lucide-react"
import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { toast } from "@/components/ui/use-toast"

// Sample customer data with pending orders - in a real app, this would come from an API
const customersData = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, San Francisco, CA 94105",
    avatarUrl: "https://i.pravatar.cc/150?u=john",
    totalSpent: 79990,
    totalOrders: 1,
    joinDate: "2023-05-15",
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-2023-2001",
        date: "2023-11-15",
        items: [
          { id: 1, name: "Tesla Model Y", quantity: 1, price: 65990 },
        ],
        total: 65990,
        paymentStatus: "Pending Approval"
      }
    ]
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 987-6543",
    address: "456 Oak Ave, Los Angeles, CA 90001",
    avatarUrl: "https://i.pravatar.cc/150?u=sarah",
    totalSpent: 159200,
    totalOrders: 3,
    joinDate: "2023-02-10",
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-2023-2002",
        date: "2023-11-18",
        items: [
          { id: 1, name: "Rivian R1S", quantity: 1, price: 78000 },
          { id: 2, name: "Premium Protection Plan", quantity: 1, price: 3500 },
        ],
        total: 81500,
        paymentStatus: "Pending Approval"
      }
    ]
  },
  {
    id: 3,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 444-5555",
    address: "789 Pine St, Seattle, WA 98101",
    avatarUrl: "https://i.pravatar.cc/150?u=michael",
    totalSpent: 109600,
    totalOrders: 2,
    joinDate: "2023-07-22",
    status: "Active",
    pendingOrders: [
      {
        id: "ORD-2023-2003",
        date: "2023-11-20",
        items: [
          { id: 1, name: "Lucid Air", quantity: 1, price: 87400 },
          { id: 2, name: "Extended Warranty", quantity: 1, price: 4500 },
        ],
        total: 91900,
        paymentStatus: "Pending Approval"
      }
    ]
  },
  {
    id: 4,
    name: "Emily Wilson",
    email: "e.wilson@example.com",
    phone: "+1 (555) 222-3333",
    address: "101 Maple Dr, Chicago, IL 60007",
    avatarUrl: "https://i.pravatar.cc/150?u=emily",
    totalSpent: 43895,
    totalOrders: 1,
    joinDate: "2023-08-05",
    status: "Active",
    pendingOrders: []
  },
  {
    id: 5,
    name: "Robert Brown",
    email: "r.brown@example.com",
    phone: "+1 (555) 777-8888",
    address: "222 Elm St, Austin, TX 78701",
    avatarUrl: "https://i.pravatar.cc/150?u=robert",
    totalSpent: 78500,
    totalOrders: 1,
    joinDate: "2023-04-17",
    status: "Inactive",
    pendingOrders: []
  }
];

const Customers = () => {
  const [customers, setCustomers] = useState(customersData);
  const [editingCustomer, setEditingCustomer] = useState<any>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    }).format(date);
  };

  const handleApproveOrder = (customerId: number, orderId: string) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => {
        if (customer.id === customerId) {
          const updatedPendingOrders = customer.pendingOrders.filter(
            order => order.id !== orderId
          );
          return {
            ...customer,
            totalOrders: customer.totalOrders + 1,
            pendingOrders: updatedPendingOrders
          };
        }
        return customer;
      })
    );
    toast({
      title: "Order Approved",
      description: `Order ${orderId} has been approved successfully.`,
    });
  };

  const handleRejectOrder = (customerId: number, orderId: string) => {
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => {
        if (customer.id === customerId) {
          const updatedPendingOrders = customer.pendingOrders.filter(
            order => order.id !== orderId
          );
          return {
            ...customer,
            pendingOrders: updatedPendingOrders
          };
        }
        return customer;
      })
    );
    toast({
      title: "Order Rejected",
      description: `Order ${orderId} has been rejected.`,
      variant: "destructive",
    });
  };

  const handleEditCustomer = (customer: any) => {
    setEditingCustomer({...customer});
  };

  const handleSaveCustomer = () => {
    if (!editingCustomer) return;
    
    setCustomers(prevCustomers => 
      prevCustomers.map(customer => 
        customer.id === editingCustomer.id ? editingCustomer : customer
      )
    );
    
    setEditingCustomer(null);
    toast({
      title: "Customer Updated",
      description: `${editingCustomer.name}'s information has been updated.`,
    });
  };

  const confirmDeleteCustomer = (customerId: number) => {
    setCustomerToDelete(customerId);
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteCustomer = () => {
    if (customerToDelete === null) return;
    
    setCustomers(prevCustomers => 
      prevCustomers.filter(customer => customer.id !== customerToDelete)
    );
    
    setIsDeleteDialogOpen(false);
    setCustomerToDelete(null);
    
    toast({
      title: "Customer Deleted",
      description: "The customer has been removed from the system.",
      variant: "destructive",
    });
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">Manage customer information and pending orders</p>
          </div>
          <Button>
            <UserCog className="mr-2 h-4 w-4" />
            Add New Customer
          </Button>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          {customers.map((customer) => (
            <Card key={customer.id} className="hover:shadow-md transition-shadow">
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-4">
                    <Avatar className="h-12 w-12 border-2 border-primary/20">
                      <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                      <AvatarFallback>{customer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                      <CardTitle className="text-xl">{customer.name}</CardTitle>
                      <CardDescription className="flex items-center gap-1 mt-1">
                        <Badge className={customer.status === 'Active' ? 'bg-green-500' : 'bg-red-500'}>
                          {customer.status}
                        </Badge>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-muted-foreground">Customer since {formatDate(customer.joinDate)}</span>
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => handleEditCustomer(customer)}>
                      <Edit className="h-4 w-4 mr-1" /> Edit
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700" 
                      onClick={() => confirmDeleteCustomer(customer.id)}>
                      <Trash2 className="h-4 w-4 mr-1" /> Delete
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="pb-3">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="flex items-start gap-2">
                    <Mail className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Email</h4>
                      <p className="text-sm text-muted-foreground">{customer.email}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Phone</h4>
                      <p className="text-sm text-muted-foreground">{customer.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Address</h4>
                      <p className="text-sm text-muted-foreground">{customer.address}</p>
                    </div>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Total Spent</h4>
                    <p className="text-lg font-bold text-primary">{formatCurrency(customer.totalSpent)}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Completed Orders</h4>
                    <p className="text-lg font-bold">{customer.totalOrders}</p>
                  </div>
                  <div className="bg-muted/30 p-3 rounded-md">
                    <h4 className="font-medium text-sm text-muted-foreground mb-1">Pending Orders</h4>
                    <p className="text-lg font-bold">{customer.pendingOrders.length}</p>
                  </div>
                </div>
                
                {customer.pendingOrders.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-semibold text-lg mb-3 flex items-center gap-2">
                      <Clock className="h-5 w-5 text-primary" />
                      Pending Orders
                    </h3>
                    <div className="space-y-4">
                      {customer.pendingOrders.map((order) => (
                        <Card key={order.id} className="border-dashed">
                          <CardHeader className="py-3">
                            <div className="flex items-center justify-between">
                              <CardTitle className="text-base font-medium flex items-center gap-2">
                                <Package className="h-4 w-4 text-primary" />
                                {order.id}
                              </CardTitle>
                              <div className="flex items-center gap-2">
                                <Calendar className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm text-muted-foreground">{formatDate(order.date)}</span>
                              </div>
                            </div>
                          </CardHeader>
                          <CardContent className="py-2">
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1">
                                  <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">Items</span>
                                </span>
                                <span>{order.items.length}</span>
                              </div>
                              <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-1">
                                  <CreditCard className="h-4 w-4 text-muted-foreground" />
                                  <span className="font-medium">Payment Status</span>
                                </span>
                                <Badge variant="outline" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                                  {order.paymentStatus}
                                </Badge>
                              </div>
                              <div className="flex items-center justify-between">
                                <span className="font-medium">Total</span>
                                <span className="text-lg font-bold text-primary">{formatCurrency(order.total)}</span>
                              </div>
                            </div>
                            
                            <div className="mt-4 py-3 border-t">
                              <h4 className="font-medium mb-2">Order Items</h4>
                              <ul className="space-y-2">
                                {order.items.map((item) => (
                                  <li key={item.id} className="flex justify-between text-sm">
                                    <span>{item.name} × {item.quantity}</span>
                                    <span className="font-medium">{formatCurrency(item.price)}</span>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </CardContent>
                          <CardFooter className="flex justify-end gap-2 bg-muted/30 py-2">
                            <Button size="sm" variant="outline" className="text-red-500 hover:text-red-700"
                              onClick={() => handleRejectOrder(customer.id, order.id)}>
                              <X className="h-4 w-4 mr-1" /> Reject Order
                            </Button>
                            <Button size="sm" variant="default"
                              onClick={() => handleApproveOrder(customer.id, order.id)}>
                              <Check className="h-4 w-4 mr-1" /> Approve Order
                            </Button>
                          </CardFooter>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
              
              <CardFooter className="pt-0">
                <Button variant="outline" size="sm" className="ml-auto">View Details</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>

      {/* Edit Customer Dialog */}
      <Dialog open={!!editingCustomer} onOpenChange={(open) => !open && setEditingCustomer(null)}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Customer Information</DialogTitle>
            <DialogDescription>
              Make changes to the customer's profile information here. Click save when you're done.
            </DialogDescription>
          </DialogHeader>
          {editingCustomer && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                  id="name" 
                  className="col-span-3" 
                  value={editingCustomer.name}
                  onChange={(e) => setEditingCustomer({...editingCustomer, name: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                  id="email" 
                  type="email" 
                  className="col-span-3" 
                  value={editingCustomer.email}
                  onChange={(e) => setEditingCustomer({...editingCustomer, email: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="phone" className="text-right">
                  Phone
                </Label>
                <Input 
                  id="phone" 
                  className="col-span-3" 
                  value={editingCustomer.phone}
                  onChange={(e) => setEditingCustomer({...editingCustomer, phone: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="address" className="text-right">
                  Address
                </Label>
                <Input 
                  id="address" 
                  className="col-span-3" 
                  value={editingCustomer.address}
                  onChange={(e) => setEditingCustomer({...editingCustomer, address: e.target.value})}
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="status" className="text-right">
                  Status
                </Label>
                <Select 
                  value={editingCustomer.status}
                  onValueChange={(value) => setEditingCustomer({...editingCustomer, status: value})}
                >
                  <SelectTrigger className="col-span-3">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Active">Active</SelectItem>
                    <SelectItem value="Inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditingCustomer(null)}>Cancel</Button>
            <Button onClick={handleSaveCustomer}>Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Customer Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this customer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
            <Button variant="destructive" onClick={handleDeleteCustomer}>
              Delete Customer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  )
}

export default Customers
