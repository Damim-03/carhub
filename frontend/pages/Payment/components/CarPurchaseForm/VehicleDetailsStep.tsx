import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface VehicleDetailsStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function VehicleDetailsStep({ formData, updateFormData }: VehicleDetailsStepProps) {
  return (
      <div className="space-y-6">
        <div className="text-gray-200 mb-6">
          <p>Review and confirm the details of the vehicle you're purchasing.</p>
        </div>

        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mb-6">
          <h3 className="text-blue-800 font-medium mb-3">Vehicle Information</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label htmlFor="make" className="text-gray-200">
                Make
              </Label>
              <Input
                  id="make"
                  value={formData.make}
                  onChange={(e) => updateFormData({ make: e.target.value })}
                  className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="model" className="text-gray-200">
                Model
              </Label>
              <Input
                  id="model"
                  value={formData.model}
                  onChange={(e) => updateFormData({ model: e.target.value })}
                  className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-gray-200">
                Year
              </Label>
              <Input
                  id="year"
                  value={formData.year}
                  onChange={(e) => updateFormData({ year: e.target.value })}
                  className="bg-white"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="vin" className="text-gray-200">
              Vehicle Identification Number (VIN)
            </Label>
            <Input
                id="vin"
                value={formData.vin}
                onChange={(e) => updateFormData({ vin: e.target.value })}
                className="bg-white"
            />
            <p className="text-xs text-gray-600">
              The VIN is a 17-character identifier unique to your vehicle.
            </p>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="mileage" className="text-gray-200">
                Mileage
              </Label>
              <Input
                  id="mileage"
                  value={formData.mileage}
                  onChange={(e) => updateFormData({ mileage: e.target.value })}
                  className="bg-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="purchasePrice" className="text-gray-200">
                Purchase Price ($) <span className="text-red-500">*</span>
              </Label>
              <Input
                  id="purchasePrice"
                  value={formData.purchasePrice}
                  onChange={(e) => updateFormData({ purchasePrice: e.target.value })}
                  required
                  className="bg-white"
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-4 mt-4">
            <div className="flex items-center space-x-3 mb-4">
              <Switch
                  id="hasTradeIn"
                  checked={formData.tradeIn.has}
                  onCheckedChange={(checked) =>
                      updateFormData({
                        tradeIn: {
                          ...formData.tradeIn,
                          has: checked
                        }
                      })
                  }
              />
              <Label htmlFor="hasTradeIn" className="text-gray-200">
                I have a vehicle to trade in
              </Label>
            </div>

            {formData.tradeIn.has && (
                <div className="bg-gray-800 p-4 rounded-md space-y-4 border border-gray-200">
                  <h4 className="font-medium text-gray-200">Trade-In Vehicle Details</h4>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="tradeMake" className="text-gray-200">
                        Make
                      </Label>
                      <Input
                          id="tradeMake"
                          value={formData.tradeIn.make}
                          onChange={(e) => updateFormData({
                            tradeIn: { ...formData.tradeIn, make: e.target.value }
                          })}
                          className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeModel" className="text-gray-200">
                        Model
                      </Label>
                      <Input
                          id="tradeModel"
                          value={formData.tradeIn.model}
                          onChange={(e) => updateFormData({
                            tradeIn: { ...formData.tradeIn, model: e.target.value }
                          })}
                          className="bg-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="tradeYear" className="text-gray-200">
                        Year
                      </Label>
                      <Input
                          id="tradeYear"
                          value={formData.tradeIn.year}
                          onChange={(e) => updateFormData({
                            tradeIn: { ...formData.tradeIn, year: e.target.value }
                          })}
                          className="bg-white"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="tradeValue" className="text-gray-200">
                      Estimated Trade-In Value ($)
                    </Label>
                    <Input
                        id="tradeValue"
                        value={formData.tradeIn.value}
                        onChange={(e) => updateFormData({
                          tradeIn: { ...formData.tradeIn, value: e.target.value }
                        })}
                        className="bg-white"
                    />
                  </div>
                </div>
            )}
          </div>
        </div>
      </div>
  );
}