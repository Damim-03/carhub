import { useState } from "react";
import { Button } from "../ui/button";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import PersonalInfoStep from "./PersonalInfoStep";
import VehicleDetailsStep from "./VehicleDetailsStep";
import PaymentMethodStep from "./PaymentMethodStep";
import FeesAndTaxesStep from "./FeesAndTaxesStep";
import InsuranceStep from "./InsuranceStep";
import DeliveryOptionsStep from "./DeliveryOptionsStep";
import FinalConfirmationStep from "./FinalConfirmationStep";
import ProgressIndicator from "./ProgressIndicator";
import { useToast } from "../../hooks/use-toast";

type FormData = {
  // Personal Info
  fullName: string;
  email: string;
  phone: string;
  address: string;
  licenseNumber: string;

  // Vehicle Details
  make: string;
  model: string;
  year: string;
  vin: string;
  mileage: string;
  purchasePrice: string;
  tradeIn: {
    has: boolean;
    make: string;
    model: string;
    year: string;
    value: string;
  };

  // Payment Method
  paymentType: "financing" | "full" | "lease";
  financing: {
    downPayment: string;
    loanTerm: string;
    bankName: string;
    coSigner: {
      required: boolean;
      name: string;
      relationship: string;
    };
  };
  fullPayment: {
    method: "creditCard" | "bankTransfer" | "check";
    cardInfo: {
      number: string;
      name: string;
      expiry: string;
      cvv: string;
    };
  };
  lease: {
    monthlyPayment: string;
    leaseTerm: string;
    mileageLimit: string;
    securityDeposit: string;
  };

  // Fees & Taxes
  salesTax: string;
  registrationFee: string;
  dealerFee: string;
  warranty: {
    selected: boolean;
    type: string;
    cost: string;
  };

  // Insurance
  insurance: {
    provider: string;
    policyNumber: string;
    effectiveDate: string;
  };
  gapInsurance: boolean;

  // Delivery
  deliveryOption: "pickup" | "delivery";
  pickupDate: string;
  deliveryAddress: string;
};

const STEPS = [
  "Personal Info",
  "Vehicle Details",
  "Payment Method",
  "Fees & Taxes",
  "Insurance",
  "Delivery Options",
  "Review & Confirm",
];

export default function FormSteps() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    // Personal Info
    fullName: "",
    email: "",
    phone: "",
    address: "",
    licenseNumber: "",

    // Vehicle Details
    make: "Tesla",
    model: "Model 3",
    year: "2023",
    vin: "1HGBH41JXMN109186",
    mileage: "15,000",
    purchasePrice: "35,000",
    tradeIn: {
      has: false,
      make: "",
      model: "",
      year: "",
      value: "",
    },

    // Payment Method
    paymentType: "financing",
    financing: {
      downPayment: "",
      loanTerm: "60",
      bankName: "",
      coSigner: {
        required: false,
        name: "",
        relationship: "",
      },
    },
    fullPayment: {
      method: "creditCard",
      cardInfo: {
        number: "",
        name: "",
        expiry: "",
        cvv: "",
      },
    },
    lease: {
      monthlyPayment: "",
      leaseTerm: "",
      mileageLimit: "",
      securityDeposit: "",
    },

    // Fees & Taxes
    salesTax: "",
    registrationFee: "299",
    dealerFee: "699",
    warranty: {
      selected: false,
      type: "",
      cost: "",
    },

    // Insurance
    insurance: {
      provider: "",
      policyNumber: "",
      effectiveDate: "",
    },
    gapInsurance: false,

    // Delivery
    deliveryOption: "pickup",
    pickupDate: "",
    deliveryAddress: "",
  });
  const { toast } = useToast();

  const updateFormData = (data: Partial<FormData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    // Perform validation here based on current step
    if (currentStep === 0 && !formData.fullName) {
      toast({
        title: "Required Information Missing",
        description: "Please provide your full name before proceeding.",
        variant: "destructive",
      });
      return;
    }

    if (currentStep < STEPS.length - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo(0, 0);
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = () => {
    // In a real application, you would submit the form data to your backend here
    console.log("Form submitted:", formData);
    toast({
      title: "Purchase Initiated",
      description: "Thank you! Your car purchase request has been submitted.",
    });
    // Reset form or redirect to confirmation page
  };



  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <PersonalInfoStep formData={formData} updateFormData={updateFormData} />;
      case 1:
        return <VehicleDetailsStep formData={formData} updateFormData={updateFormData} />;
      case 2:
        return <PaymentMethodStep formData={formData} updateFormData={updateFormData} />;
      case 3:
        return <FeesAndTaxesStep formData={formData} updateFormData={updateFormData} />;
      case 4:
        return <InsuranceStep formData={formData} updateFormData={updateFormData} />;
      case 5:
        return <DeliveryOptionsStep formData={formData} updateFormData={updateFormData} />;
      case 6:
        return <FinalConfirmationStep formData={formData} />;
      default:
        return null;
    }
  };

  const isLastStep = currentStep === STEPS.length - 1;

  return (
    <div className="w-full max-w-4xl mx-auto">
      <ProgressIndicator steps={STEPS} currentStep={currentStep} />

      <div className="bg-slate-00 p-6 rounded-lg shadow-md mb-6">
        <h2 className="text-2xl font-bold mb-6 text-blue-900">{STEPS[currentStep]}</h2>
        {renderStep()}
      </div>

      <div className="flex justify-between mt-8">
        {/* Left side - Back or Cancel buttons */}
        <div className="flex gap-2">
          {currentStep > 0 ? (
              <Button
                  type="button"
                  onClick={handleBack}
                  variant="outline"
                  className="flex items-center gap-2"
              >
                <ArrowLeft size={16} />
                Back
              </Button>
          ) : (
              <Button
                  type="button"
                  onClick={() => window.history.back()} // Or your preferred navigation method
                  variant="outline"
                  className="flex items-center gap-2"
              >
                Cancel Payment
              </Button>
          )}
        </div>

        {/* Right side - Next/Submit button */}
        <Button
            type="button"
            onClick={handleNext}
            className="bg-blue-700 hover:bg-blue-800 flex items-center gap-2"
        >
          {isLastStep ? (
              <>
                Complete Purchase
                <Check size={16} />
              </>
          ) : (
              <>
                Next
                <ArrowRight size={16} />
              </>
          )}
        </Button>
      </div>
    </div>
  );
}
