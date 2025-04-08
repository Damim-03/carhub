
import React from "react";
import { usePayment } from "../contexts/PaymentContext";
import { formatCardNumber, formatExpiryDate, processPayment } from "../utils/paymentUtils";
import { Button } from "./ui/button.tsx";
import { Input } from "./ui/input.tsx";
import { Label } from "./ui/label.tsx";
import { toast } from "sonner";
import { CreditCard, User, Calendar, Lock } from "lucide-react";

const PaymentForm = () => {
  const {
    cardNumber,
    setCardNumber,
    cardHolder,
    setCardHolder,
    expiryDate,
    setExpiryDate,
    cvv,
    setCvv,
    amount,
    isProcessing,
    setIsProcessing,
    setPaymentSuccess,
    setPaymentError,
  } = usePayment();

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatCardNumber(e.target.value);
    setCardNumber(formatted);
  };

  const handleExpiryDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formatted = formatExpiryDate(e.target.value);
    setExpiryDate(formatted);
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/\D/g, "").slice(0, 3);
    setCvv(value);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!cardNumber || !cardHolder || !expiryDate || !cvv) {
      toast.error("Please fill in all payment details");
      return;
    }
    
    // Check card number length (simplified validation)
    if (cardNumber.replace(/\s/g, "").length < 16) {
      toast.error("Please enter a valid card number");
      return;
    }
    
    setIsProcessing(true);
    
    try {
      const result = await processPayment(cardNumber, cardHolder, expiryDate, cvv, amount);
      
      if (result.success) {
        setPaymentSuccess(true);
        toast.success("Payment processed successfully!");
      } else {
        setPaymentError(result.message || "Payment failed");
        toast.error(result.message || "Payment failed");
      }
    } catch (error: any) {
      setPaymentError(error.message || "Payment processing failed");
      toast.error(error.message || "Payment processing failed");
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="cardNumber" className="flex items-center gap-2">
          <CreditCard className="h-4 w-4" />
          Card Number
        </Label>
        <div className="relative">
          <Input
            id="cardNumber"
            placeholder="1234 5678 9012 3456"
            value={cardNumber}
            onChange={handleCardNumberChange}
            maxLength={19}
            className="pl-10"
            autoComplete="cc-number"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground text-sm">
            {cardNumber.startsWith("4") && "Visa"}
            {cardNumber.startsWith("5") && "MasterCard"}
            {cardNumber.startsWith("3") && "Amex"}
            {cardNumber.startsWith("6") && "Discover"}
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="cardHolder" className="flex items-center gap-2">
          <User className="h-4 w-4" />
          Card Holder Name
        </Label>
        <Input
          id="cardHolder"
          placeholder="John Doe"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
          autoComplete="cc-name"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="expiryDate" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Expiry Date
          </Label>
          <Input
            id="expiryDate"
            placeholder="MM/YY"
            value={expiryDate}
            onChange={handleExpiryDateChange}
            maxLength={5}
            autoComplete="cc-exp"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="cvv" className="flex items-center gap-2">
            <Lock className="h-4 w-4" />
            CVV
          </Label>
          <Input
            id="cvv"
            placeholder="123"
            value={cvv}
            onChange={handleCvvChange}
            maxLength={3}
            type="password"
            autoComplete="cc-csc"
          />
        </div>
      </div>

      <Button 
        type="submit" 
        className="w-full bg-blue-600 hover:bg-blue-700 text-white" 
        disabled={isProcessing}
      >
        {isProcessing ? "Processing..." : `Pay $${amount.toFixed(2)}`}
      </Button>
      
      <div className="text-center text-sm text-muted-foreground">
        <p>This is a demo payment form. Use 4242 4242 4242 4242 for success.</p>
        <p>Your payment is secure and encrypted.</p>
      </div>
    </form>
  );
};

export default PaymentForm;
