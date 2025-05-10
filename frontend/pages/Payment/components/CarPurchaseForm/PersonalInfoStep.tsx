
import { Input } from "../ui/input";
import { Label } from "../ui/label";

interface PersonalInfoStepProps {
  formData: any;
  updateFormData: (data: any) => void;
}

export default function PersonalInfoStep({ formData, updateFormData }: PersonalInfoStepProps) {
  return (
    <div className="space-y-6">
      <div className="text-gray-200 mb-6">
        <p>Please enter your personal information as it appears on your identification documents.</p>
      </div>
      
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-1">
          <div className="space-y-2">
            <Label htmlFor="fullName">
              Full Name <span className="text-red-500">*</span>
            </Label>
            <Input
              id="fullName"
              placeholder="As it appears on your ID/license"
              value={formData.fullName}
              onChange={(e) => updateFormData({ fullName: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="email">
              Email Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder="For confirmations and updates"
              value={formData.email}
              onChange={(e) => updateFormData({ email: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              Phone Number <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              placeholder="For contact purposes"
              value={formData.phone}
              onChange={(e) => updateFormData({ phone: e.target.value })}
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">
            Current Address <span className="text-red-500">*</span>
          </Label>
          <Input
            id="address"
            placeholder="For billing and registration"
            value={formData.address}
            onChange={(e) => updateFormData({ address: e.target.value })}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="licenseNumber">
            Driver's License Number <span className="text-red-500">*</span>
          </Label>
          <Input
            id="licenseNumber"
            placeholder="For verification purposes"
            value={formData.licenseNumber}
            onChange={(e) => updateFormData({ licenseNumber: e.target.value })}
            required
          />
          <p className="text-xs text-gray-500">This information is required for vehicle registration and verification purposes.</p>
        </div>
      </div>
    </div>
  );
}
