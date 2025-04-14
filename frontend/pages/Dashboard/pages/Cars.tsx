import { DashboardLayout } from "../components/layouts/dashboard-layout"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import {ArrowLeft, ArrowRight, Camera, Car, Check, Plus} from "lucide-react"
import {CustomButton} from "../../Home/utils";
import {useState, useRef, ChangeEvent} from "react";
import '../styles/Global.css'
import {Link} from "react-router-dom";
import {Button} from "../components/ui/button.tsx";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../components/ui/tabs";
import {Checkbox, Textarea} from "@headlessui/react";

const carsData = [
  {
    id: 1,
    model: "Tesla Model S",
    logo: '../assets/images/logo.png',
    year: 2023,
    price: "$79,990",
    color: "Midnight Silver",
    mileage: "0 miles",
    status: "New",
    transmission: "Automatic",
    fuelType: "Electric",
    engine: "Dual Motor",
    features: ["Autopilot", "Panoramic Roof", "Premium Sound"],
    description: "Luxury electric sedan with cutting-edge technology",
    image: "/placeholder.svg"
  },
  // ... other car data objects
];

const Cars = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState("basic");
  const [formData, setFormData] = useState({
    // Basic Information
    model: "",
    year: "",
    price: "",
    color: "",
    mileage: "",
    status: "New",

    // Additional Information
    transmission: "Automatic",
    fuelType: "Electric",
    engine: "",
    features: [] as string[],
    description: "",

    // Images
    images: [] as File[]
  });

  const featureOptions = [
    "Autopilot",
    "Panoramic Roof",
    "Premium Sound",
    "Heated Seats",
    "Wireless Charging",
    "Navigation System",
    "Leather Seats",
    "Sunroof",
    "Backup Camera",
    "Blind Spot Monitoring"
  ];

  const fileInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formDataToSend = new FormData();

    // Append all basic fields
    Object.entries(formData).forEach(([key, value]) => {
      if (key !== "images" && key !== "features") {
        formDataToSend.append(key, value.toString());
      }
    });

    // Append features as comma-separated string
    formDataToSend.append('features', formData.features.join(','));

    // Append images
    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });

    console.log("Form data to send:", Object.fromEntries(formDataToSend));
    setIsOpen(false);
    setFormData({
      model: "",
      year: "",
      price: "",
      color: "",
      mileage: "",
      status: "New",
      transmission: "Automatic",
      fuelType: "Electric",
      engine: "",
      features: [],
      description: "",
      images: []
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFeatureToggle = (feature: string) => {
    setFormData(prev => {
      const newFeatures = prev.features.includes(feature)
          ? prev.features.filter(f => f !== feature)
          : [...prev.features, feature];
      return { ...prev, features: newFeatures };
    });
  };

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, index: number) => {
    if (e.target.files && e.target.files[0]) {
      const newImages = [...formData.images];
      newImages[index] = e.target.files[0];
      setFormData(prev => ({ ...prev, images: newImages }));
    }
  };

  const addImageField = () => {
    if (formData.images.length < 6) {
      setFormData(prev => ({ ...prev, images: [...prev.images, null as any] }));
    }
  };

  const removeImage = (index: number) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData(prev => ({ ...prev, images: newImages }));
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index]!.value = "";
    }
  };

  const imageFields = Array(Math.max(4, formData.images.length)).fill(null);

  return (
      <DashboardLayout>
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Cars</h1>
              <p className="text-muted-foreground">Manage your Cars</p>
            </div>
            <Button onClick={() => setIsOpen(true)}>
              <Car className="mr-2 h-4 w-4" />
              Add Car
            </Button>
          </div>

          <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="dark:bg-slate-900 sm:max-w-[750px] max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold">Add New Car</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit} className="mt-2">
                <Tabs value={activeTab} onValueChange={setActiveTab}>
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="basic">Basic Information</TabsTrigger>
                    <TabsTrigger value="additional">Additional Information</TabsTrigger>
                  </TabsList>

                  {/* Basic Information Tab */}
                  <TabsContent value="basic" className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="model">Model <span className="text-red-500">*</span></Label>
                        <Input
                            id="model"
                            name="model"
                            value={formData.model}
                            onChange={handleInputChange}
                            placeholder="Tesla Model S"
                            required
                            className="dark:bg-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="year">Year <span className="text-red-500">*</span></Label>
                        <Input
                            id="year"
                            name="year"
                            type="number"
                            value={formData.year}
                            onChange={handleInputChange}
                            placeholder="2023"
                            min="1900"
                            max="2099"
                            required
                            className="dark:bg-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="price">Price <span className="text-red-500">*</span></Label>
                        <Input
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleInputChange}
                            placeholder="$79,990"
                            required
                            className="dark:bg-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="color">Color <span className="text-red-500">*</span></Label>
                        <Input
                            id="color"
                            name="color"
                            value={formData.color}
                            onChange={handleInputChange}
                            placeholder="Midnight Silver"
                            required
                            className="dark:bg-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="mileage">Mileage <span className="text-red-500">*</span></Label>
                        <Input
                            id="mileage"
                            name="mileage"
                            value={formData.mileage}
                            onChange={handleInputChange}
                            placeholder="0 miles"
                            required
                            className="dark:bg-slate-800"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="status">Status <span className="text-red-500">*</span></Label>
                        <Select
                            value={formData.status}
                            onValueChange={(value) => handleSelectChange("status", value)}
                        >
                          <SelectTrigger className="dark:bg-slate-800">
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-slate-800">
                            <SelectItem value="New">New</SelectItem>
                            <SelectItem value="Used">Used</SelectItem>
                            <SelectItem value="Certified Pre-Owned">Certified Pre-Owned</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Upload Images (4-6 images) <span className="text-red-500">*</span></Label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                        {imageFields.map((_, index) => (
                            <div key={index} className="relative aspect-square">
                              <Input
                                  type="file"
                                  accept="image/*"
                                  ref={el => fileInputRefs.current[index] = el}
                                  onChange={(e) => handleImageUpload(e, index)}
                                  className="hidden"
                                  id={`image-upload-${index}`}
                              />
                              <Label
                                  htmlFor={`image-upload-${index}`}
                                  className="flex flex-col items-center justify-center w-full h-full border-2 border-dashed rounded-lg cursor-pointer hover:bg-slate-700/30 transition-colors"
                              >
                                {formData.images[index] ? (
                                    <>
                                      <img
                                          src={URL.createObjectURL(formData.images[index])}
                                          alt={`Preview ${index + 1}`}
                                          className="h-full w-full object-cover rounded-md"
                                      />
                                      <Button
                                          type="button"
                                          variant="ghost"
                                          size="sm"
                                          className="absolute top-2 right-2 text-red-500 hover:text-red-600 bg-white/90 dark:bg-slate-800/90 rounded-full p-1 h-6 w-6"
                                          onClick={(e) => {
                                            e.stopPropagation();
                                            removeImage(index);
                                          }}
                                      >
                                        ×
                                      </Button>
                                    </>
                                ) : (
                                    <>
                                      <Camera className="w-6 h-6 mb-2 text-gray-400" />
                                      <p className="text-sm text-center text-gray-400 px-2">
                                        {index < 4 ? `Required Image ${index + 1}` : "Optional Image"}
                                      </p>
                                    </>
                                )}
                              </Label>
                            </div>
                        ))}
                      </div>
                      {formData.images.length < 6 && (
                          <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={addImageField}
                              className="mt-2"
                          >
                            <Plus className="w-4 h-4 mr-2" /> Add Another Image
                          </Button>
                      )}
                    </div>

                    <div className="flex justify-end pt-4">
                      <Button
                          type="button"
                          onClick={() => setActiveTab("additional")}
                          disabled={
                              !formData.model ||
                              !formData.year ||
                              !formData.price ||
                              !formData.color ||
                              !formData.mileage ||
                              formData.images.length < 4
                          }
                          className="gap-2"
                      >
                        Next: Additional Information
                        <ArrowRight className="w-4 h-4" />
                      </Button>
                    </div>
                  </TabsContent>

                  {/* Additional Information Tab */}
                  <TabsContent value="additional" className="space-y-6 pt-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="transmission">Transmission</Label>
                        <Select
                            value={formData.transmission}
                            onValueChange={(value) => handleSelectChange("transmission", value)}
                        >
                          <SelectTrigger className="dark:bg-slate-800">
                            <SelectValue placeholder="Select transmission" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-slate-800">
                            <SelectItem value="Automatic">Automatic</SelectItem>
                            <SelectItem value="Manual">Manual</SelectItem>
                            <SelectItem value="CVT">CVT</SelectItem>
                            <SelectItem value="Dual-Clutch">Dual-Clutch</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="fuelType">Fuel Type</Label>
                        <Select
                            value={formData.fuelType}
                            onValueChange={(value) => handleSelectChange("fuelType", value)}
                        >
                          <SelectTrigger className="dark:bg-slate-800">
                            <SelectValue placeholder="Select fuel type" />
                          </SelectTrigger>
                          <SelectContent className="dark:bg-slate-800">
                            <SelectItem value="Electric">Electric</SelectItem>
                            <SelectItem value="Gasoline">Gasoline</SelectItem>
                            <SelectItem value="Diesel">Diesel</SelectItem>
                            <SelectItem value="Hybrid">Hybrid</SelectItem>
                            <SelectItem value="Plug-in Hybrid">Plug-in Hybrid</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 md:col-span-2">
                        <Label htmlFor="engine">Engine</Label>
                        <Input
                            id="engine"
                            name="engine"
                            value={formData.engine}
                            onChange={handleInputChange}
                            placeholder="Dual Motor, V6, etc."
                            className="dark:bg-slate-800"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label>Features</Label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                        {featureOptions.map((feature) => (
                            <div key={feature} className="flex items-center space-x-3">
                              <Checkbox
                                  id={`feature-${feature}`}
                                  checked={formData.features.includes(feature)}
                                  onCheckedChange={() => handleFeatureToggle(feature)}
                                  className="h-5 w-5 rounded-md border-gray-300 data-[state=checked]:bg-primary"
                              />
                              <Label htmlFor={`feature-${feature}`} className="text-sm font-normal">
                                {feature}
                              </Label>
                            </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                          id="description"
                          name="description"
                          value={formData.description}
                          onChange={handleInputChange}
                          placeholder="Describe the car's condition, special features, etc."
                          className="min-h-[120px] dark:bg-slate-800"
                      />
                    </div>

                    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-4">
                      <Button
                          type="button"
                          variant="outline"
                          onClick={() => setActiveTab("basic")}
                          className="gap-2"
                      >
                        <ArrowLeft className="w-4 h-4" /> Back to Basic Info
                      </Button>
                      <div className="flex gap-3">
                        <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button
                            type="submit"
                            disabled={
                                !formData.model ||
                                !formData.year ||
                                !formData.price ||
                                !formData.color ||
                                !formData.mileage ||
                                formData.images.length < 4
                            }
                            className="gap-2"
                        >
                          <Check className="w-4 h-4" /> Add Car
                        </Button>
                      </div>
                    </div>
                  </TabsContent>
                </Tabs>
              </form>
            </DialogContent>
          </Dialog>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {carsData.map((car) => (
                <Card key={car.id} className="hover:shadow-md transition-shadow">
                  <CardHeader className="pb-2">
                    <CardTitle className="flex items-center gap-2">
                      <Car className="h-5 w-5 text-primary" />
                      {car.model}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video bg-muted rounded-md mb-4 flex items-center justify-center">
                      <img
                          src={car.image}
                          alt={car.model}
                          className="h-full w-full object-cover rounded-md"
                      />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Year</span>
                        <span className="font-medium">{car.year}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Price</span>
                        <span className="font-medium">{car.price}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Color</span>
                        <span className="font-medium">{car.color}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Mileage</span>
                        <span className="font-medium">{car.mileage}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <span className="font-medium">{car.status}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-4">
                    <Link
                        to="/product-details"
                        className="block w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-blue focus-visible:ring-offset-2 rounded-full"
                    >
                      <CustomButton
                          title="View More"
                          containerStyles="w-full py-4 rounded-full bg-primary-blue hover:bg-primary-blue-dark transition-colors duration-200"
                          textStyles="text-white text-sm font-bold tracking-wide"
                          rightIcon="/right-arrow.svg"
                          aria-label="View product details"
                      />
                    </Link>
                  </CardFooter>
                </Card>
            ))}
          </div>
        </div>
      </DashboardLayout>
  )
}

export default Cars