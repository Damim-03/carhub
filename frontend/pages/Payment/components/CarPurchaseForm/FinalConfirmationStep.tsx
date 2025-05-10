
import { Card, CardContent } from "../ui/card";
import { Separator } from "../ui/separator";

interface FinalConfirmationStepProps {
  formData: any;
}

export default function FinalConfirmationStep({ formData }: FinalConfirmationStepProps) {
  // Calculate total price
  const subtotal = parseFloat(formData.purchasePrice.replace(/,/g, '')) || 0;
  const salesTax = parseFloat(formData.salesTax) || 0;
  const registrationFee = parseFloat(formData.registrationFee.replace(/,/g, '')) || 0;
  const dealerFee = parseFloat(formData.dealerFee.replace(/,/g, '')) || 0;
  const warrantyFee = formData.warranty.selected ? parseFloat(formData.warranty.cost.replace(/,/g, '') || '0') : 0;
  const tradeInValue = formData.tradeIn.has ? parseFloat(formData.tradeIn.value?.replace(/,/g, '') || '0') : 0;
  
  const total = subtotal + salesTax + registrationFee + dealerFee + warrantyFee - tradeInValue;

  return (
    <div className="space-y-6">
      <div className="text-gray-600 mb-6">
        <p>Please review your information before submitting your purchase request.</p>
      </div>

      {/* Personal Information */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-blue-900 text-lg mb-3">Personal Information</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Full Name:</span>
              <span className="col-span-2">{formData.fullName || "Not provided"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Email:</span>
              <span className="col-span-2">{formData.email || "Not provided"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Phone:</span>
              <span className="col-span-2">{formData.phone || "Not provided"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Address:</span>
              <span className="col-span-2">{formData.address || "Not provided"}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">License Number:</span>
              <span className="col-span-2">{formData.licenseNumber || "Not provided"}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Vehicle Details */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-blue-900 text-lg mb-3">Vehicle Details</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Make & Model:</span>
              <span className="col-span-2">{formData.make} {formData.model}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Year:</span>
              <span className="col-span-2">{formData.year}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">VIN:</span>
              <span className="col-span-2">{formData.vin}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Mileage:</span>
              <span className="col-span-2">{formData.mileage}</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Price:</span>
              <span className="col-span-2">${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {formData.tradeIn.has && (
              <>
                <Separator className="my-3" />
                <div>
                  <h4 className="text-sm font-medium mb-2">Trade-In Vehicle</h4>
                  <div className="pl-3">
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-100 font-medium">Make & Model:</span>
                      <span className="col-span-2">{formData.tradeIn.make} {formData.tradeIn.model}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-100 font-medium">Year:</span>
                      <span className="col-span-2">{formData.tradeIn.year}</span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      <span className="text-gray-100 font-medium">Value:</span>
                      <span className="col-span-2 text-green-600">-${tradeInValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Payment Method */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-blue-900 text-lg mb-3">Payment Method</h3>
          <div className="space-y-2">
            <div className="grid grid-cols-3 gap-2">
              <span className="text-gray-100 font-medium">Payment Type:</span>
              <span className="col-span-2">
                {formData.paymentType === "financing" ? "Financing (Loan)" : 
                 formData.paymentType === "full" ? "Full Payment" : "Lease"}
              </span>
            </div>

            {formData.paymentType === "financing" && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Down Payment:</span>
                  <span className="col-span-2">${formData.financing.downPayment || "Not specified"}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Loan Term:</span>
                  <span className="col-span-2">{formData.financing.loanTerm} months</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Financial Institution:</span>
                  <span className="col-span-2">{formData.financing.bankName || "Not specified"}</span>
                </div>
                {formData.financing.coSigner.required && (
                  <div className="grid grid-cols-3 gap-2">
                    <span className="text-gray-100 font-medium">Co-Signer:</span>
                    <span className="col-span-2">{formData.financing.coSigner.name} ({formData.financing.coSigner.relationship})</span>
                  </div>
                )}
              </>
            )}

            {formData.paymentType === "full" && (
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Payment Method:</span>
                <span className="col-span-2">
                  {formData.fullPayment.method === "creditCard" ? "Credit/Debit Card" : 
                   formData.fullPayment.method === "bankTransfer" ? "Bank Transfer" : "Certified Check"}
                </span>
              </div>
            )}

            {formData.paymentType === "lease" && (
              <>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Monthly Payment:</span>
                  <span className="col-span-2">${formData.lease.monthlyPayment || "Not specified"}</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Lease Term:</span>
                  <span className="col-span-2">{formData.lease.leaseTerm || "Not specified"} months</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Mileage Limit:</span>
                  <span className="col-span-2">{formData.lease.mileageLimit || "Not specified"} miles per year</span>
                </div>
              </>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Additional Details */}
      <Card className="mb-6">
        <CardContent className="p-5">
          <h3 className="font-semibold text-blue-900 text-lg mb-3">Additional Details</h3>
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Fees & Taxes</h4>
            <div className="space-y-1 pl-3">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Sales Tax:</span>
                <span className="col-span-2">${salesTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Registration Fee:</span>
                <span className="col-span-2">${registrationFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Dealer Fee:</span>
                <span className="col-span-2">${dealerFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
              </div>
              {formData.warranty.selected && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Extended Warranty:</span>
                  <span className="col-span-2">${warrantyFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
              )}
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div className="mb-4">
            <h4 className="text-sm font-medium mb-2">Insurance</h4>
            <div className="space-y-1 pl-3">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Insurance Provider:</span>
                <span className="col-span-2">{formData.insurance.provider || "Not specified"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Policy Number:</span>
                <span className="col-span-2">{formData.insurance.policyNumber || "Not specified"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">GAP Insurance:</span>
                <span className="col-span-2">{formData.gapInsurance ? "Yes" : "No"}</span>
              </div>
            </div>
          </div>
          
          <Separator className="my-3" />
          
          <div>
            <h4 className="text-sm font-medium mb-2">Delivery</h4>
            <div className="space-y-1 pl-3">
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">Delivery Method:</span>
                <span className="col-span-2">{formData.deliveryOption === "pickup" ? "Dealership Pickup" : "Home Delivery"}</span>
              </div>
              <div className="grid grid-cols-3 gap-2">
                <span className="text-gray-100 font-medium">{formData.deliveryOption === "pickup" ? "Pickup" : "Delivery"} Date:</span>
                <span className="col-span-2">{formData.pickupDate || "Not specified"}</span>
              </div>
              {formData.deliveryOption === "delivery" && (
                <div className="grid grid-cols-3 gap-2">
                  <span className="text-gray-100 font-medium">Delivery Address:</span>
                  <span className="col-span-2">{formData.deliveryAddress || formData.address}</span>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Price Summary */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-5">
          <h3 className="font-semibold text-blue-900 text-lg mb-3">Price Summary</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="font-medium">Total Purchase Price:</span>
              <span className="font-bold text-lg">${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            
            {formData.paymentType === "financing" && (
              <p className="text-sm text-blue-700 mt-3">
                Estimated monthly payment will be calculated based on your credit approval and terms.
              </p>
            )}
            
            {formData.paymentType === "lease" && formData.lease.monthlyPayment && (
              <div className="flex justify-between mt-3">
                <span className="font-medium">Monthly Lease Payment:</span>
                <span className="font-bold">${formData.lease.monthlyPayment}/month</span>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md text-center mt-6">
        <p className="text-sm text-yellow-800">
          By clicking "Complete Purchase", you agree to the terms and conditions of this purchase agreement.
          This will initiate the purchase process, but does not constitute the final contract.
          You will receive a copy of all documentation for your records.
        </p>
      </div>
    </div>
  );
}
