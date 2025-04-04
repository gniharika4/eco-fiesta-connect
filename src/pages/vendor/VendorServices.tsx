
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, IndianRupee, Star, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

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
    ]
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
    ]
  },
  {
    id: "serv3",
    name: "Zero-Waste Event Planning",
    type: "Planning",
    basePrice: 75000,
    priceUnit: "per event",
    bookings: 5,
    rating: 4.9,
    description: "Complete event planning with zero-waste principles. We handle everything from venue selection to cleanup with sustainability at the core.",
    images: [
      "https://images.unsplash.com/photo-1540317580384-e5d43616b9aa",
      "https://images.unsplash.com/photo-1511795409834-432f7b1e1212"
    ]
  },
  {
    id: "serv4",
    name: "Sustainable Photography",
    type: "Photography",
    basePrice: 35000,
    priceUnit: "per event",
    bookings: 15,
    rating: 4.7,
    description: "Photography services using energy-efficient equipment. We deliver photos digitally to avoid printing waste and use eco-friendly computers.",
    images: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32",
      "https://images.unsplash.com/photo-1554941829-202a0b2403b8"
    ]
  },
];

const VendorServices = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  const filteredServices = mockServices.filter(service => {
    const matchesSearch = service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === "all" || service.type === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const serviceCategories = ["all", ...Array.from(new Set(mockServices.map(service => service.type)))];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-eco-dark mb-4 md:mb-0">My Services</h1>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white flex items-center gap-2"
              onClick={() => navigate('/vendor/services/new')}
            >
              <Plus size={18} />
              Add New Service
            </Button>
          </div>

          <div className="mb-8 flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-8"
              />
            </div>
            <div className="w-full md:w-64">
              <Select 
                value={categoryFilter} 
                onValueChange={setCategoryFilter}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  {serviceCategories.map((category) => (
                    <SelectItem key={category} value={category}>
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {filteredServices.length === 0 ? (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium">No services found</h3>
              <p className="text-muted-foreground mt-1">Try adjusting your search or filters</p>
              <Button 
                className="mt-4 bg-eco-primary hover:bg-eco-dark"
                onClick={() => {
                  setSearchTerm("");
                  setCategoryFilter("all");
                }}
              >
                Clear filters
              </Button>
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredServices.map(service => (
                <Card key={service.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={service.images[0]} 
                      alt={service.name} 
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/placeholder.svg";
                      }}
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle className="text-lg">{service.name}</CardTitle>
                      <Badge>{service.type}</Badge>
                    </div>
                    <CardDescription>{service.priceUnit}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between mb-4">
                      <div>
                        <p className="text-sm text-muted-foreground">Base Price</p>
                        <p className="text-lg font-semibold text-eco-primary flex items-center">
                          <IndianRupee className="h-4 w-4 mr-0.5" /> {service.basePrice.toLocaleString('en-IN')}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bookings</p>
                        <p className="text-lg font-semibold text-eco-primary">{service.bookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-eco-primary mr-1">{service.rating}</span>
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{service.description}</p>
                    <div className="flex gap-2 justify-between">
                      <Button 
                        variant="outline"
                        className="flex-1 border-eco-secondary text-eco-secondary hover:bg-eco-secondary hover:text-white"
                        onClick={() => navigate(`/vendor/services/${service.id}`)}
                      >
                        View Details
                      </Button>
                      <Button 
                        className="flex-1 bg-eco-primary hover:bg-eco-dark"
                        onClick={() => navigate(`/vendor/services/${service.id}`)}
                      >
                        Edit Service
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorServices;
