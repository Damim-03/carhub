
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";

interface InsuranceStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function InsuranceStep({ formData, updateFormData }: InsuranceStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-gray-600 mb-6">
        <p>Provide your insurance information or select insurance options for your new vehicle.</p>
      </div>

      <div className="space-y-5">
        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md mb-4">
          <div className="flex items-start">
            <div className="mr-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-yellow-600"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            </div>
            <div>
              <h3 className="font-medium text-yellow-800 mb-1">Insurance Required</h3>
              <p className="text-sm text-yellow-700">Proof of insurance is required before taking possession of the vehicle. Please provide your current insurance information or contact an insurance provider.</p>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="insuranceProvider">
            Location
          </Label>
          <Input
          id="insuranceProvider"
          name="insuranceProvider"
          />
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="policyNumber">
              Policy Number
            </Label>
            <Input
              id="policyNumber"
              value={formData.insurance.policyNumber}
              onChange={(e) => updateFormData({ 
                insurance: { ...formData.insurance, policyNumber: e.target.value } 
              })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="effectiveDate">
              Effective Date
            </Label>
            <Input
              id="effectiveDate"
              type="date"
              value={formData.insurance.effectiveDate}
              onChange={(e) => updateFormData({ 
                insurance: { ...formData.insurance, effectiveDate: e.target.value } 
              })}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-4">
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="gapInsurance" 
              checked={formData.gapInsurance}
              onCheckedChange={(checked) => updateFormData({ gapInsurance: checked })}
            />
            <Label htmlFor="gapInsurance">Add GAP Insurance</Label>
          </div>
          
          {formData.gapInsurance && (
            <div className="pl-6 border-l-2 border-gray-200 space-y-4">
              <p className="text-sm text-gray-600">
                GAP (Guaranteed Asset Protection) insurance covers the difference between what your car is worth and what you owe on your loan if your vehicle is totaled or stolen. This is especially valuable for new cars that depreciate quickly.
              </p>
              <p className="text-sm font-medium">
                Estimated Cost: $399 - $799 (one-time fee)
              </p>
            </div>
          )}
        </div>
        
        <div className="bg-blue-50 border border-blue-200 p-4 rounded-md mt-4">
          <h3 className="font-medium text-blue-800 mb-2">Insurance Documentation Requirements</h3>
          <ul className="list-disc pl-5 text-sm text-blue-700 space-y-1">
            <li>Proof of insurance must be provided before vehicle delivery</li>
            <li>Insurance must meet minimum state requirements</li>
            <li>Vehicle information will be provided to your insurance company</li>
            <li>For financed/leased vehicles, full coverage insurance is typically required</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
