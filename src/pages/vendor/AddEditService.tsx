
import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { IndianRupee, X, ImagePlus, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

// Mock data for a single service (used when editing)
const mockServices = [
  {
    id: "serv1",
    name: "Eco-Friendly Catering",
    type: "Catering",
    basePrice: 2500,
    priceUnit: "per person",
    bookings: 12,
    rating: 4.8,
    description: "Sustainable food service with locally sourced ingredients and zero-waste packaging. We offer vegetarian, vegan, and special dietary options.",
    images: [
      "https://images.unsplash.com/photo-1555244162-803834f70033",
      "https://images.unsplash.com/photo-1565538810643-b5bdb714032a"
    ],
    sustainabilityFeatures: ["Locally-sourced ingredients", "Compostable packaging", "Zero-waste preparation"],
    targetEvents: ["Weddings", "Corporate Events", "Social Gatherings"]
  },
  {
    id: "serv2",
    name: "Reusable Decoration Package",
    type: "Decoration",
    basePrice: 50000,
    priceUnit: "per event",
    bookings: 8,
    rating: 4.5,
    description: "Eco-friendly event decorations using recycled materials, living plants, and reusable elements. Perfect for indoor and outdoor venues.",
    images: [
      "https://images.unsplash.com/photo-1478146059778-26028b07395a",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
    ],
    sustainabilityFeatures: ["Reusable decor elements", "Living plants for decoration", "Recycled material use"],
    targetEvents: ["Weddings", "Corporate Events", "Birthday Parties"]
  },
];

const serviceTypes = ["Catering", "Decoration", "Entertainment", "Photography", "Venue", "Planning", "Transportation", "Other"];
const priceUnits = ["per person", "per event", "per day", "per hour", "fixed rate"];

const AddEditService = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user, isAuthenticated } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find existing service if editing
  const existingService = id ? mockServices.find(service => service.id === id) : null;
  const isEdit = !!existingService;

  // Form state
  const [formData, setFormData] = useState({
    name: existingService?.name || "",
    type: existingService?.type || "",
    description: existingService?.description || "",
    basePrice: existingService?.basePrice || 0,
    priceUnit: existingService?.priceUnit || "per event",
    sustainabilityFeatures: existingService?.sustainabilityFeatures || ["", "", ""],
    targetEvents: existingService?.targetEvents || ["", "", ""],
    images: existingService?.images || []
  });

  // New feature input state
  const [newFeature, setNewFeature] = useState("");
  const [newTarget, setNewTarget] = useState("");
  
  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAddFeature = () => {
    if (newFeature.trim()) {
      setFormData(prev => ({
        ...prev,
        sustainabilityFeatures: [...prev.sustainabilityFeatures, newFeature.trim()]
      }));
      setNewFeature("");
    }
  };

  const handleRemoveFeature = (index: number) => {
    setFormData(prev => ({
      ...prev,
      sustainabilityFeatures: prev.sustainabilityFeatures.filter((_, i) => i !== index)
    }));
  };

  const handleAddTarget = () => {
    if (newTarget.trim()) {
      setFormData(prev => ({
        ...prev,
        targetEvents: [...prev.targetEvents, newTarget.trim()]
      }));
      setNewTarget("");
    }
  };

  const handleRemoveTarget = (index: number) => {
    setFormData(prev => ({
      ...prev,
      targetEvents: prev.targetEvents.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    
    // In a real app, you would upload these files to a server
    // Here we're just creating URL objects for preview
    const newImages = Array.from(files).map(file => URL.createObjectURL(file));
    
    setFormData(prev => ({
      ...prev,
      images: [...prev.images, ...newImages]
    }));
  };

  const handleRemoveImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form
    if (!formData.name || !formData.type || !formData.description || formData.basePrice <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      setIsSubmitting(false);
      return;
    }
    
    // Mock API call
    setTimeout(() => {
      setIsSubmitting(false);
      toast({
        title: isEdit ? "Service Updated" : "Service Created",
        description: isEdit 
          ? "Your service has been updated successfully" 
          : "Your new service has been created successfully"
      });
      navigate('/vendor/services');
    }, 1000);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-eco-dark">
              {isEdit ? "Edit Service" : "Add New Service"}
            </h1>
            <p className="text-muted-foreground mt-2">
              {isEdit 
                ? "Update the details of your eco-friendly service" 
                : "Create a new sustainable service to offer to your customers"}
            </p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide the basic details about your service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Service Name</Label>
                      <Input 
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="e.g., Eco-Friendly Catering Service"
                        required
                      />
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="type">Service Type</Label>
                      <Select 
                        value={formData.type}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger id="type">
                          <SelectValue placeholder="Select service type" />
                        </SelectTrigger>
                        <SelectContent>
                          {serviceTypes.map(type => (
                            <SelectItem key={type} value={type}>
                              {type}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="description">Description</Label>
                      <Textarea 
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        placeholder="Describe your sustainable service..."
                        className="min-h-[120px]"
                        required
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Pricing</CardTitle>
                  <CardDescription>
                    Set your service pricing structure
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="basePrice">Base Price (₹)</Label>
                      <div className="relative">
                        <IndianRupee className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input 
                          id="basePrice"
                          name="basePrice"
                          type="number"
                          min="0"
                          value={formData.basePrice}
                          onChange={handleInputChange}
                          className="pl-9"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid gap-2">
                      <Label htmlFor="priceUnit">Price Unit</Label>
                      <Select 
                        value={formData.priceUnit}
                        onValueChange={(value) => setFormData(prev => ({ ...prev, priceUnit: value }))}
                      >
                        <SelectTrigger id="priceUnit">
                          <SelectValue placeholder="Select price unit" />
                        </SelectTrigger>
                        <SelectContent>
                          {priceUnits.map(unit => (
                            <SelectItem key={unit} value={unit}>
                              {unit}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Sustainability Features</CardTitle>
                  <CardDescription>
                    Highlight the eco-friendly aspects of your service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex gap-2">
                      <Input 
                        value={newFeature}
                        onChange={(e) => setNewFeature(e.target.value)}
                        placeholder="e.g., Zero-waste packaging"
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={handleAddFeature}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.sustainabilityFeatures.filter(f => f.trim()).map((feature, index) => (
                        <Badge 
                          key={index} 
                          className="bg-eco-primary flex items-center gap-1 py-1.5 px-3"
                        >
                          {feature}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveFeature(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Target Events</CardTitle>
                  <CardDescription>
                    What types of events is this service suitable for?
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4">
                    <div className="flex gap-2">
                      <Input 
                        value={newTarget}
                        onChange={(e) => setNewTarget(e.target.value)}
                        placeholder="e.g., Weddings"
                        className="flex-1"
                      />
                      <Button 
                        type="button"
                        onClick={handleAddTarget}
                      >
                        Add
                      </Button>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-2">
                      {formData.targetEvents.filter(t => t.trim()).map((target, index) => (
                        <Badge 
                          key={index} 
                          className="bg-eco-secondary flex items-center gap-1 py-1.5 px-3"
                        >
                          {target}
                          <X 
                            className="h-3 w-3 cursor-pointer" 
                            onClick={() => handleRemoveTarget(index)}
                          />
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Service Images</CardTitle>
                  <CardDescription>
                    Upload high-quality images showcasing your service
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-6">
                    <div className="grid gap-2">
                      <Label htmlFor="images">Upload Images</Label>
                      <div className="flex items-center gap-4">
                        <Button
                          type="button"
                          variant="outline"
                          className="w-full h-32 border-dashed flex flex-col gap-2"
                          onClick={() => document.getElementById('imageInput')?.click()}
                        >
                          <ImagePlus className="h-8 w-8" />
                          <span>Click to upload</span>
                        </Button>
                        <Input 
                          id="imageInput"
                          type="file"
                          accept="image/*"
                          multiple
                          onChange={handleFileChange}
                          className="hidden"
                        />
                      </div>
                    </div>

                    {formData.images.length > 0 && (
                      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {formData.images.map((image, index) => (
                          <div key={index} className="relative group aspect-square">
                            <img 
                              src={image} 
                              alt={`Service preview ${index + 1}`} 
                              className="w-full h-full object-cover rounded-md"
                              onError={(e) => {
                                const target = e.target as HTMLImageElement;
                                target.src = "/placeholder.svg";
                              }}
                            />
                            <button
                              type="button"
                              onClick={() => handleRemoveImage(index)}
                              className="absolute top-2 right-2 rounded-full bg-white p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                            >
                              <X className="h-4 w-4 text-red-500" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              <div className="flex justify-end gap-4">
                <Button 
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/vendor/services')}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit"
                  className="bg-eco-primary hover:bg-eco-dark"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {isEdit ? "Updating..." : "Creating..."}
                    </>
                  ) : (
                    isEdit ? "Update Service" : "Create Service"
                  )}
                </Button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AddEditService;
