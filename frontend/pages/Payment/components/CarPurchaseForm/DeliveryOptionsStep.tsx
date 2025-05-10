
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

interface DeliveryOptionsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function DeliveryOptionsStep({ formData, updateFormData }: DeliveryOptionsStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-gray-300 mb-6">
        <p>Choose how you'd like to receive your new vehicle.</p>
      </div>
      
      <RadioGroup
        value={formData.deliveryOption}
        onValueChange={(value) => updateFormData({ deliveryOption: value })}
        className="space-y-6"
      >
        {/* Dealership Pickup Option */}
        <div className={`border rounded-lg p-4 ${formData.deliveryOption === "pickup" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="pickup" id="pickup" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="pickup" className="text-lg font-medium cursor-pointer">Dealership Pickup</Label>
              <p className="text-sm text-gray-300 mt-1 mb-3">Pick up your vehicle at our dealership location.</p>
              
              {formData.deliveryOption === "pickup" && (
                <div className="mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="pickupDate">
                      Preferred Pickup Date
                    </Label>
                    <Input
                      id="pickupDate"
                      type="date"
                      value={formData.pickupDate}
                      onChange={(e) => updateFormData({ pickupDate: e.target.value })}
                    />
                    <p className="text-xs text-gray-300">Please select a date at least 2 business days in the future.</p>
                  </div>

                  <div className="bg-gray-50 p-4 rounded-md mt-4">
                    <h4 className="font-medium mb-2 text-black">Dealership Location</h4>
                    <address className="not-italic text-gray-600">
                      <p>Sunset Auto Group</p>
                      <p>1234 Highway Drive</p>
                      <p>Anytown, CA 90210</p>
                      <p className="mt-2">Hours: Mon-Sat 9AM - 7PM, Sun 11AM - 5PM</p>
                    </address>
                  </div>

                  <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-4">
                    <h4 className="font-medium text-blue-800 mb-2">Pickup Instructions</h4>
                    <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
                      <li>Please bring your driver's license</li>
                      <li>Proof of insurance must be provided</li>
                      <li>All buyers on the contract must be present</li>
                      <li>Allow approximately 1-2 hours for paperwork and vehicle orientation</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Home Delivery Option */}
        <div className={`border rounded-lg p-4 ${formData.deliveryOption === "delivery" ? "border-blue-500 bg-blue-50" : "border-gray-200"}`}>
          <div className="flex items-start space-x-3">
            <RadioGroupItem value="delivery" id="delivery" className="mt-1" />
            <div className="flex-1">
              <Label htmlFor="delivery" className="text-lg font-medium cursor-pointer">Home Delivery</Label>
              <p className="text-sm text-gray-600 mt-1 mb-3">Have your vehicle delivered directly to your home or office.</p>
              
              {formData.deliveryOption === "delivery" && (
                <div className="mt-4 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="deliveryAddress">
                      Delivery Address
                    </Label>
                    <Input
                      id="deliveryAddress"
                      value={formData.deliveryAddress || formData.address}
                      onChange={(e) => updateFormData({ deliveryAddress: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">Default is your billing address. Update if delivery address is different.</p>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="deliveryDate">
                      Preferred Delivery Date
                    </Label>
                    <Input
                      id="deliveryDate"
                      type="date"
                      value={formData.pickupDate} // Reusing the same field
                      onChange={(e) => updateFormData({ pickupDate: e.target.value })}
                    />
                    <p className="text-xs text-gray-500">Please select a date at least 3-5 business days in the future.</p>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 p-4 rounded-md">
                    <h4 className="font-medium text-amber-800 mb-2">Delivery Information</h4>
                    <ul className="list-disc pl-5 text-sm text-amber-700 space-y-1">
                      <li>Delivery is available within 100 miles of our dealership</li>
                      <li>A delivery fee of $99 may apply depending on your location</li>
                      <li>Someone over 18 must be present to accept delivery</li>
                      <li>All paperwork will be completed electronically prior to delivery</li>
                      <li>Our delivery specialist will contact you 24 hours before delivery to confirm details</li>
                    </ul>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </RadioGroup>
    </div>
  );
}
