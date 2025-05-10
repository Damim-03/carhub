
import { Input } from "../ui/input.tsx";
import { Label } from "../ui/label.tsx";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group.tsx";

interface PaymentMethodStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function PaymentMethodStep({ formData, updateFormData }: PaymentMethodStepProps) {
  return (
      <div className="space-y-6">
        <div className="text-gray-200 mb-6">
          <p>Select your preferred payment method and provide the required details.</p>
        </div>

        <RadioGroup
            value={formData.paymentType}
            onValueChange={(value) => updateFormData({ paymentType: value })}
            className="space-y-6"
        >
          {/* Full Payment Option */}
          <div className={`border rounded-lg p-4 ${formData.paymentType === "full" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
            <div className="flex items-start space-x-3">
              <RadioGroupItem value="full" id="full" className="mt-1" />
              <div className="flex-1">
                <Label htmlFor="full" className="text-lg font-medium cursor-pointer">Full Payment</Label>

                {formData.paymentType === "full" && (
                    <div className="mt-4 space-y-4">
                      <div className="space-y-2">
                        <Label>Payment Method</Label>
                        <RadioGroup
                            value={formData.fullPayment.method}
                            onValueChange={(value) => updateFormData({
                              fullPayment: { ...formData.fullPayment, method: value }
                            })}
                            className="flex flex-col space-y-3"
                        >
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="creditCard" id="creditCard" />
                            <Label htmlFor="creditCard" className="cursor-pointer">Credit/Debit Card</Label>
                          </div>
                        </RadioGroup>
                      </div>

                      {formData.fullPayment.method === "creditCard" && (
                          <div className="bg-white p-4 border border-gray-200 rounded-md space-y-4">
                            <h4 className="font-medium text-black">Credit Card Information</h4>
                            <div className="space-y-2 text-black">
                              <Label htmlFor="cardNumber">Card Number</Label>
                              <Input
                                  id="cardNumber"
                                  value={formData.fullPayment.cardInfo.number}
                                  onChange={(e) => updateFormData({
                                    fullPayment: {
                                      ...formData.fullPayment,
                                      cardInfo: {
                                        ...formData.fullPayment.cardInfo,
                                        number: e.target.value
                                      }
                                    }
                                  })}
                                  placeholder="•••• •••• •••• ••••"
                              />
                            </div>

                            <div className="space-y-2 text-black">
                              <Label htmlFor="cardName">Name on Card</Label>
                              <Input
                                  id="cardName"
                                  value={formData.fullPayment.cardInfo.name}
                                  onChange={(e) => updateFormData({
                                    fullPayment: {
                                      ...formData.fullPayment,
                                      cardInfo: {
                                        ...formData.fullPayment.cardInfo,
                                        name: e.target.value
                                      }
                                    }
                                  })}
                              />
                            </div>

                            <div className="grid gap-4 md:grid-cols-2">
                              <div className="space-y-2 text-black">
                                <Label htmlFor="cardExpiry">Expiration Date</Label>
                                <Input
                                    id="cardExpiry"
                                    value={formData.fullPayment.cardInfo.expiry}
                                    onChange={(e) => updateFormData({
                                      fullPayment: {
                                        ...formData.fullPayment,
                                        cardInfo: {
                                          ...formData.fullPayment.cardInfo,
                                          expiry: e.target.value
                                        }
                                      }
                                    })}
                                    placeholder="MM/YY"
                                />
                              </div>
                              <div className="space-y-2 text-black">
                                <Label htmlFor="cardCVV">CVV</Label>
                                <Input
                                    id="cardCVV"
                                    value={formData.fullPayment.cardInfo.cvv}
                                    onChange={(e) => updateFormData({
                                      fullPayment: {
                                        ...formData.fullPayment,
                                        cardInfo: {
                                          ...formData.fullPayment.cardInfo,
                                          cvv: e.target.value
                                        }
                                      }
                                    })}
                                    placeholder="•••"
                                />
                              </div>
                            </div>
                            <p className="text-xs text-gray-500">This form is secure and your payment information is encrypted.</p>
                          </div>
                      )}
                    </div>
                )}
              </div>
            </div>
          </div>
        </RadioGroup>
      </div>
  );
}
