
import { createContext, useContext, useState, ReactNode } from "react";

type PaymentContextType = {
  cardNumber: string;
  setCardNumber: (value: string) => void;
  cardHolder: string;
  setCardHolder: (value: string) => void;
  expiryDate: string;
  setExpiryDate: (value: string) => void;
  cvv: string;
  setCvv: (value: string) => void;
  amount: number;
  setAmount: (value: number) => void;
  isProcessing: boolean;
  setIsProcessing: (value: boolean) => void;
  paymentSuccess: boolean;
  setPaymentSuccess: (value: boolean) => void;
  paymentError: string | null;
  setPaymentError: (value: string | null) => void;
  resetPaymentForm: () => void;
};

const PaymentContext = createContext<PaymentContextType | undefined>(undefined);

export const PaymentProvider = ({ children }: { children: ReactNode }) => {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [amount, setAmount] = useState(149.99);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  const resetPaymentForm = () => {
    setCardNumber("");
    setCardHolder("");
    setExpiryDate("");
    setCvv("");
    setIsProcessing(false);
    setPaymentSuccess(false);
    setPaymentError(null);
  };

  return (
    <PaymentContext.Provider
      value={{
        cardNumber,
        setCardNumber,
        cardHolder,
        setCardHolder,
        expiryDate,
        setExpiryDate,
        cvv,
        setCvv,
        amount,
        setAmount,
        isProcessing,
        setIsProcessing,
        paymentSuccess,
        setPaymentSuccess,
        paymentError,
        setPaymentError,
        resetPaymentForm,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const usePayment = () => {
  const context = useContext(PaymentContext);
  if (context === undefined) {
    throw new Error("usePayment must be used within a PaymentProvider");
  }
  return context;
};
