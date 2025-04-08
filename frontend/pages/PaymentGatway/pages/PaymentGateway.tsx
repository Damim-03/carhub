import { FC } from "react";
import { usePayment } from "../contexts/PaymentContext";
import {
  PaymentForm,
  OrderSummary,
  BillingInfo,
  PaymentSuccess,
  ThemeToggle,
  Separator,
} from "../components/index";
import { CreditCard, Lock } from "lucide-react";

const PaymentGateway: FC = () => {
  const { paymentSuccess } = usePayment();

  return (
      <div className="min-h-screen bg-background text-foreground">
        <div className="container max-w-6xl py-8 px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <header className="mb-10 flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold">Complete Your Purchase</h1>
              <p className="text-muted-foreground">
                Please review your order and enter your payment details.
              </p>
            </div>
            <ThemeToggle />
          </header>

          {/* Main Content */}
          {paymentSuccess ? (
              <div className="bg-card rounded-lg shadow-md p-8">
                <PaymentSuccess />
              </div>
          ) : (
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Payment + Billing */}
                <div className="lg:col-span-2 space-y-8">
                  {/* Payment Details */}
                  <section className="bg-card rounded-lg shadow-md p-6">
                    <h2 className="text-xl font-semibold mb-6 flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Details
                    </h2>
                    <PaymentForm />
                  </section>

                  {/* Billing Info */}
                  <section className="bg-card rounded-lg shadow-md p-6">
                    <BillingInfo />
                  </section>
                </div>

                {/* Right Column - Order Summary */}
                <aside className="lg:col-span-1">
                  <OrderSummary />
                </aside>
              </div>
          )}

          {/* Footer */}
          <footer className="mt-16">
            <Separator />
            <div className="py-6 flex flex-col sm:flex-row justify-between items-center gap-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-green-600" />
                <span className="text-sm text-muted-foreground">
                Secured by industry-standard encryption
              </span>
              </div>
              <div className="flex items-center gap-4">
                <img
                    src="https://cdn.cdnlogo.com/logos/v/69/visa.svg"
                    alt="Visa logo"
                    className="h-8"
                />
                <img
                    src="https://cdn.cdnlogo.com/logos/m/33/mastercard.svg"
                    alt="MasterCard logo"
                    className="h-8"
                />
                <img
                    src="https://cdn.cdnlogo.com/logos/a/28/american-express.svg"
                    alt="American Express logo"
                    className="h-8"
                />
                <img
                    src="https://cdn.cdnlogo.com/logos/p/55/paypal.svg"
                    alt="PayPal logo"
                    className="h-8"
                />
              </div>
            </div>
          </footer>
        </div>
      </div>
  );
};

export default PaymentGateway;
