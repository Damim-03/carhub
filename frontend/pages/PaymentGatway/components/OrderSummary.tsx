
import { Separator } from "./ui/separator.tsx";
import { usePayment } from "../contexts/PaymentContext";
import { ShoppingCart, CreditCard, Check } from "lucide-react";

const OrderSummary = () => {
  const { amount } = usePayment();
  
  // For a real app, these would come from your cart/order state
  const itemPrice = typeof amount === 'number' ? amount * 0.85 : 0;
  const tax = typeof amount === 'number' ? amount * 0.15 : 0;
  const shipping = 0; // Free shipping
  
  return (
    <div className="rounded-lg border bg-card p-6 shadow-sm">
      <h3 className="text-lg font-semibold flex items-center gap-2 mb-4">
        <ShoppingCart className="h-5 w-5" />
        Order Summary
      </h3>
      
      <div className="space-y-4">
        <div className="flex justify-between">
          <span>Premium Car Package</span>
          <span>${itemPrice.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Tax</span>
          <span>${tax.toFixed(2)}</span>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Shipping</span>
          <span>{shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}</span>
        </div>
        
        <Separator />
        
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${typeof amount === 'number' ? amount.toFixed(2) : "0.00"}</span>
        </div>
      </div>
      
      <div className="mt-6 space-y-2">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Secure payment</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>24/7 customer support</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-green-500" />
          <span>Money-back guarantee</span>
        </div>
      </div>
      
      <div className="mt-6 flex items-center justify-center gap-2 text-sm text-muted-foreground">
        <CreditCard className="h-4 w-4" />
        <span>We accept all major credit cards</span>
      </div>
    </div>
  );
};

export default OrderSummary;
