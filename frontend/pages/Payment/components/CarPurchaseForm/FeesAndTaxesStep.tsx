
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Switch } from "../ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface FeesAndTaxesStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function FeesAndTaxesStep({ formData, updateFormData }: FeesAndTaxesStepProps) {
  const calculatedSalesTax = formData.purchasePrice 
    ? (parseFloat(formData.purchasePrice.replace(/,/g, '')) * 0.0625).toFixed(2) 
    : '0.00';
    
  // Update sales tax when component mounts
  if (formData.salesTax === '') {
    updateFormData({ salesTax: calculatedSalesTax });
  }
  
  const subtotal = parseFloat(formData.purchasePrice ? formData.purchasePrice.replace(/,/g, '') : '0') || 0;
  const salesTax = parseFloat(formData.salesTax || calculatedSalesTax) || 0;
  const registrationFee = parseFloat(formData.registrationFee.replace(/,/g, '')) || 0;
  const dealerFee = parseFloat(formData.dealerFee.replace(/,/g, '')) || 0;
  const warrantyFee = formData.warranty.selected ? parseFloat(formData.warranty.cost.replace(/,/g, '') || '0') : 0;
  const tradeInValue = formData.tradeIn.has ? parseFloat(formData.tradeIn.value?.replace(/,/g, '') || '0') : 0;
  
  const total = subtotal + salesTax + registrationFee + dealerFee + warrantyFee - tradeInValue;
  
  return (
    <div className="space-y-6">
      <div className="text-gray-200 mb-6">
        <p>Review and adjust the applicable fees and taxes for your purchase.</p>
      </div>

      <div className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="salesTax">
            Sales Tax
          </Label>
          <div className="flex items-center">
            <Input
              id="salesTax"
              value={formData.salesTax || calculatedSalesTax}
              onChange={(e) => updateFormData({ salesTax: e.target.value })}
              className="w-full"
            />
            <span className="ml-3 text-gray-300 min-w-[100px]">
              (6.25% estimated)
            </span>
          </div>
          <p className="text-xs text-gray-500">Sales tax rates vary by state and locality.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="registrationFee">
              Registration & Title Fees
            </Label>
            <Input
              id="registrationFee"
              value={formData.registrationFee}
              onChange={(e) => updateFormData({ registrationFee: e.target.value })}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="dealerFee">
              Dealer Documentation Fees
            </Label>
            <Input
              id="dealerFee"
              value={formData.dealerFee}
              onChange={(e) => updateFormData({ dealerFee: e.target.value })}
            />
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-4 mt-2">
          <div className="flex items-center space-x-2 mb-4">
            <Switch 
              id="hasWarranty" 
              checked={formData.warranty.selected}
              onCheckedChange={(checked) => 
                updateFormData({ 
                  warranty: { 
                    ...formData.warranty, 
                    selected: checked 
                  } 
                })
              }
            />
            <Label htmlFor="hasWarranty">Add Extended Warranty</Label>
          </div>
          
          {formData.warranty.selected && (
            <div className="pl-6 border-l-2 border-gray-200 space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="warrantyType">Warranty Type</Label>
                  <Select
                    value={formData.warranty.type}
                    onValueChange={(value) => updateFormData({
                      warranty: { ...formData.warranty, type: value }
                    })}
                  >
                    <SelectTrigger id="warrantyType">
                      <SelectValue placeholder="Select warranty type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basic">Basic Coverage (3 years / 36,000 miles)</SelectItem>
                      <SelectItem value="powertrain">Powertrain (5 years / 60,000 miles)</SelectItem>
                      <SelectItem value="comprehensive">Comprehensive (7 years / 100,000 miles)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="warrantyCost">Warranty Cost ($)</Label>
                  <Input
                    id="warrantyCost"
                    value={formData.warranty.cost}
                    onChange={(e) => updateFormData({ 
                      warranty: { ...formData.warranty, cost: e.target.value } 
                    })}
                    placeholder="e.g., 1299"
                  />
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="bg-gray-50 p-4 rounded-md mt-6">
          <h3 className="font-medium mb-3 text-black">Cost Summary</h3>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between text-black">
              <span>Vehicle Price:</span>
              <span>${subtotal.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>Sales Tax:</span>
              <span>${salesTax.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>Registration & Title:</span>
              <span>${registrationFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            <div className="flex justify-between text-black">
              <span>Dealer Fees:</span>
              <span>${dealerFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
            {formData.warranty.selected && (
                <div className="flex justify-between text-black">
                  <span>Extended Warranty:</span>
                  <span>${warrantyFee.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            )}
            {formData.tradeIn.has && formData.tradeIn.value && (
                <div className="flex justify-between text-green-600">
                  <span>Trade-In Credit:</span>
                  <span>-${tradeInValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
            )}
            <div className="border-t text-black border-gray-300 pt-2 mt-2 flex justify-between font-bold">
              <span>Total:</span>
              <span>${total.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
