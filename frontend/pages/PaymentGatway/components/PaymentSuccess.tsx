
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "./ui/button.tsx";
import { useNavigate } from "react-router-dom";

const PaymentSuccess = () => {
  const navigate = useNavigate();
  const orderNumber = `ORD-${Math.floor(100000 + Math.random() * 900000)}`;
  
  return (
    <div className="text-center py-8 space-y-6">
      <div className="mx-auto w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
        <CheckCircle className="h-10 w-10 text-green-600" />
      </div>
      
      <h2 className="text-2xl font-bold">Payment Successful!</h2>
      
      <p className="text-muted-foreground">
        Thank you for your purchase. We've sent a confirmation email with details.
      </p>
      
      <div className="bg-muted p-4 rounded-md inline-block">
        <p className="font-medium">Order Reference</p>
        <p className="text-xl font-bold">{orderNumber}</p>
      </div>
      
      <div className="pt-4">
        <Button 
          onClick={() => navigate("/")}
          className="flex items-center gap-2"
        >
          Back to Home
          <ArrowRight className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
