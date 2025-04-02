
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

// Sample vendor data
const mockVendors = [
  {
    id: "v1",
    name: "Green Gatherings Co.",
    category: "Catering",
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 120,
    description: "Sustainable catering using locally-sourced organic ingredients with zero-waste packaging.",
    coverImage: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    sustainabilityBadges: ["Carbon Neutral", "Zero Waste", "Local Sourcing"],
    location: "New York, NY",
  },
  {
    id: "v2",
    name: "EcoDecor Events",
    category: "Decoration",
    rating: 4.9,
    reviewCount: 87,
    pricePerHour: 95,
    description: "Reusable, sustainable event decorations made from recycled and biodegradable materials.",
    coverImage: "https://images.unsplash.com/photo-1501854140801-50d01698950b",
    sustainabilityBadges: ["Recycled Materials", "Plant-Based"],
    location: "Brooklyn, NY",
  },
  {
    id: "v3",
    name: "Zero Impact Sounds",
    category: "Entertainment",
    rating: 4.7,
    reviewCount: 56,
    pricePerHour: 150,
    description: "Solar-powered sound systems and energy-efficient lighting for sustainable events.",
    coverImage: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
    sustainabilityBadges: ["Renewable Energy", "Carbon Offset"],
    location: "Queens, NY",
  },
  {
    id: "v4",
    name: "Clean Stream Waste Management",
    category: "Waste Management",
    rating: 4.6,
    reviewCount: 42,
    pricePerHour: 80,
    description: "Comprehensive recycling, composting, and waste reduction services for events of all sizes.",
    coverImage: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
    sustainabilityBadges: ["Composting", "Recycling", "Zero Landfill"],
    location: "Manhattan, NY",
  },
];

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Catering", value: "catering" },
  { label: "Decoration", value: "decoration" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Waste Management", value: "waste" },
  { label: "Venues", value: "venues" },
  { label: "Photography", value: "photography" },
];

const FindVendors = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");

  // Check if user is authenticated as a customer
  if (!isAuthenticated || user?.userType !== 'customer') {
    navigate('/login');
    return null;
  }

  // Filter vendors based on search and category
  const filteredVendors = mockVendors.filter((vendor) => {
    const matchesSearch = 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === "all" || 
      vendor.category.toLowerCase() === selectedCategory.toLowerCase();
    
    return matchesSearch && matchesCategory;
  });

  // Sort vendors based on selected sort option
  const sortedVendors = [...filteredVendors].sort((a, b) => {
    if (sortBy === "rating") {
      return b.rating - a.rating;
    } else if (sortBy === "price_low") {
      return a.pricePerHour - b.pricePerHour;
    } else if (sortBy === "price_high") {
      return b.pricePerHour - a.pricePerHour;
    }
    // Default (recommended) sorting
    return b.rating * b.reviewCount - a.rating * a.reviewCount;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2 text-eco-dark">Find Eco-Friendly Vendors</h1>
          <p className="text-muted-foreground mb-8">
            Browse through our curated list of sustainable vendors for your next event
          </p>

          {/* Search and Filter Section */}
          <div className="bg-white rounded-xl shadow-md p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="flex-grow">
                <Input
                  placeholder="Search by name, keywords..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                />
              </div>

              <Select
                value={selectedCategory}
                onValueChange={(value) => setSelectedCategory(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select
                value={sortBy}
                onValueChange={(value) => setSortBy(value)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="recommended">Recommended</SelectItem>
                  <SelectItem value="rating">Highest Rating</SelectItem>
                  <SelectItem value="price_low">Price: Low to High</SelectItem>
                  <SelectItem value="price_high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Vendor Categories */}
          <Tabs defaultValue="all" className="mb-8">
            <TabsList className="bg-white">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="catering">Catering</TabsTrigger>
              <TabsTrigger value="decoration">Decoration</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="waste">Waste Management</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVendors.map((vendor) => (
                  <VendorCard key={vendor.id} vendor={vendor} />
                ))}
              </div>
              {sortedVendors.length === 0 && (
                <div className="text-center py-12 bg-white rounded-lg shadow-md">
                  <h3 className="text-lg font-medium mb-2">No vendors found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters
                  </p>
                </div>
              )}
            </TabsContent>

            {/* Additional tabs for each category with filtered content */}
            {categories.slice(1).map((category) => (
              <TabsContent key={category.value} value={category.value} className="mt-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {mockVendors
                    .filter((v) => v.category.toLowerCase() === category.value)
                    .map((vendor) => (
                      <VendorCard key={vendor.id} vendor={vendor} />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

// Vendor Card Component
const VendorCard = ({ vendor }: { vendor: any }) => {
  const navigate = useNavigate();

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="relative h-48 overflow-hidden">
        <img
          src={vendor.coverImage}
          alt={vendor.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <Badge className="bg-eco-accent text-white">{vendor.category}</Badge>
        </div>
      </div>
      <CardHeader className="pb-2">
        <div className="flex justify-between">
          <h3 className="text-xl font-semibold">{vendor.name}</h3>
          <div className="flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
            </svg>
            <span className="ml-1 font-semibold">{vendor.rating}</span>
            <span className="text-muted-foreground text-sm ml-1">({vendor.reviewCount})</span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{vendor.location}</p>
      </CardHeader>
      <CardContent>
        <p className="text-sm mb-4 line-clamp-2">{vendor.description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-xs text-muted-foreground">Starting at</p>
            <p className="text-lg font-semibold text-eco-primary">${vendor.pricePerHour}/hour</p>
          </div>
          <div className="flex flex-wrap gap-1">
            {vendor.sustainabilityBadges.map((badge: string, index: number) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 bg-eco-primary/10 text-eco-primary text-xs rounded-full"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1 border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
            onClick={() => navigate(`/customer/vendors/${vendor.id}`)}
          >
            View Profile
          </Button>
          <Button 
            className="flex-1 bg-eco-primary hover:bg-eco-dark"
            onClick={() => navigate(`/customer/vendors/${vendor.id}/book`)}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FindVendors;
