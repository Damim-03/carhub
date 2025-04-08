import { DashboardLayout } from "../components/layouts/dashboard-layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar";
import {
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
  UserCog, Camera
} from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "../components/ui/dialog";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { toast } from "../hooks/use-toast.ts";
import { Customer } from "../../../Types/Type.ts";

import {customersData} from "../../../constants/constant.ts";


const Users = () => {
  const [users, setUsers] = useState<Customer[]>(customersData);
  const [editingCustomer, setEditingCustomer] = useState<Customer | null>(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [customerToDelete, setCustomerToDelete] = useState<number | null>(null);
  const [visibleOrders, setVisibleOrders] = useState<Record<string, boolean>>({});

  const toggleOrderVisibility = (customerId: number, orderId: string) => {
    const orderKey = `${customerId}-${orderId}`;
    setVisibleOrders((prev) => ({
      ...prev,
      [orderKey]: !prev[orderKey],
    }));
  };

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
    setUsers(prevCustomers =>
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
    setUsers(prevCustomers =>
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

  const handleEditCustomer = (customer: Customer) => {
    setEditingCustomer({...customer});
  };

  const handleSaveCustomer = () => {
    if (!editingCustomer) return;

    setUsers(prevCustomers =>
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

    setUsers(prevCustomers =>
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

  const [isAddCustomerOpen, setIsAddCustomerOpen] = useState(false);

  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    zipCode: "",
    city: "",
    state: "",
    country: "",
    status: "active",
    avatarUrl: ""
  });

  return (
      <DashboardLayout>
        {isAddCustomerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-lg w-full max-w-lg">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Add New Customer</h2>
                  <button
                      onClick={() => setIsAddCustomerOpen(false)}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>

                {/* Circular Profile Picture Upload */}
                <div className="flex flex-col items-center mb-6">
                  <div className="relative group">
                    <Avatar className="h-24 w-24 border-2 border-primary/20">
                      <AvatarImage src={previewImage || undefined} />
                      <AvatarFallback className="text-2xl">
                        {formData.firstName?.[0] || ''}{formData.lastName?.[0] || ''}
                      </AvatarFallback>
                    </Avatar>
                    <label
                        htmlFor="avatar-upload"
                        className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                    >
                      <Camera className="h-6 w-6 text-white" />
                      <input
                          id="avatar-upload"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                setPreviewImage(event.target?.result as string);
                              };
                              reader.readAsDataURL(file);
                            }
                          }}
                      />
                    </label>
                  </div>
                  <label
                      htmlFor="avatar-upload"
                      className="mt-2 text-sm font-medium text-primary cursor-pointer hover:underline"
                  >
                    Upload Photo
                  </label>
                  {previewImage && (
                      <button
                          type="button"
                          onClick={() => setPreviewImage(null)}
                          className="mt-1 text-xs text-red-500 hover:text-red-700"
                      >
                        Remove
                      </button>
                  )}
                </div>

                <div className="space-y-6">
                  {/* Personal Information Section */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label className="dark:text-gray-300">First Name *</Label>
                        <Input placeholder="John" required />
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">Last Name *</Label>
                        <Input placeholder="Doe" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="dark:text-gray-300">Email *</Label>
                        <Input type="email" placeholder="john@example.com" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="dark:text-gray-300">Phone *</Label>
                        <Input type="tel" placeholder="+1 (555) 123-4567" required />
                      </div>
                      <div className="md:col-span-2">
                        <Label className="dark:text-gray-300">Profile Image URL</Label>
                        <Input placeholder="https://example.com/avatar.jpg" />
                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Leave blank for default avatar</p>
                      </div>
                    </div>
                  </div>

                  {/* Contact Address Section */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Contact Address</h3>
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <Label className="dark:text-gray-300">Street Address *</Label>
                        <Input placeholder="123 Main Street" required />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <Label className="dark:text-gray-300">Zip Code *</Label>
                          <Input placeholder="10001" required />
                        </div>
                        <div className="md:col-span-2">
                          <Label className="dark:text-gray-300">City *</Label>
                          <Input placeholder="New York" required />
                        </div>
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">State/Province</Label>
                        <Input placeholder="New York" />
                      </div>
                      <div>
                        <Label className="dark:text-gray-300">Country *</Label>
                        <Select required>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select country" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="us">United States</SelectItem>
                            <SelectItem value="ca">Canada</SelectItem>
                            <SelectItem value="uk">United Kingdom</SelectItem>
                            {/* Add more countries as needed */}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  </div>

                  {/* Account Status */}
                  <div className="space-y-4">
                    <h3 className="font-medium text-gray-700 dark:text-gray-300">Account Settings</h3>
                    <div>
                      <Label className="dark:text-gray-300">Status *</Label>
                      <Select defaultValue="active" required>
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="mt-8 flex justify-end gap-3">
                  <Button
                      variant="outline"
                      onClick={() => setIsAddCustomerOpen(false)}
                      className="dark:border-gray-600 dark:text-gray-300"
                  >
                    Cancel
                  </Button>
                  <Button>Add Customer</Button>
                </div>
              </div>
            </div>
        )}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Users</h1>
              <p className="text-muted-foreground">Manage Users information.</p>
            </div>
            <Button onClick={() => setIsAddCustomerOpen(true)}>
              <UserCog className="mr-2 h-4 w-4" />
              Add New Customer
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {users.map((customer) => (
                <Card key={customer.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12 border-2 border-primary/20">
                          <AvatarImage src={customer.avatarUrl} alt={customer.name} />
                          <AvatarFallback>
                            {customer.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
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
                        <Button
                            variant="outline"
                            size="sm"
                            className="text-red-500 hover:text-red-700"
                            onClick={() => confirmDeleteCustomer(customer.id)}
                        >
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
                            {customer.pendingOrders.map((order) => {
                              // Create a unique key combining customer ID and order ID
                              const orderKey = `${customer.id}-${order.id}`;
                              return (
                                  <Card key={orderKey} className="border-dashed">
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

                                    {visibleOrders[orderKey] && (
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
                                    )}

                                    <CardFooter className="pt-0 flex justify-between">
                                      <div className="flex gap-2">
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            onClick={() => handleApproveOrder(customer.id, order.id)}
                                        >
                                          <Check className="h-4 w-4 mr-1" /> Approve
                                        </Button>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="text-red-500 hover:text-red-700"
                                            onClick={() => handleRejectOrder(customer.id, order.id)}
                                        >
                                          <X className="h-4 w-4 mr-1" /> Reject
                                        </Button>
                                      </div>
                                      <Button
                                          variant="outline"
                                          size="sm"
                                          onClick={() => toggleOrderVisibility(customer.id, order.id)}
                                      >
                                        {visibleOrders[orderKey] ? "Hide Details" : "View Details"}
                                      </Button>
                                    </CardFooter>
                                  </Card>
                              );
                            })}
                          </div>
                        </div>
                    )}
                  </CardContent>
                </Card>
            ))}
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
                          onValueChange={(value) => setEditingCustomer({...editingCustomer, status: value as "Active" | "Inactive"})}
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
        </div>
      </DashboardLayout>
  );
};

export default Users;