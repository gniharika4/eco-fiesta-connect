
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
import { IndianRupee, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample vendor data
const mockVendors = [
  {
    id: "v1",
    name: "Green Gatherings Co.",
    category: "Catering",
    rating: 4.8,
    reviewCount: 124,
    pricePerHour: 15000,
    description: "Sustainable catering using locally-sourced organic ingredients with zero-waste packaging.",
    coverImage: "https://images.unsplash.com/photo-1555244162-803834f70033",
    sustainabilityBadges: ["Carbon Neutral", "Zero Waste", "Local Sourcing"],
    location: "Delhi, India",
    reviews: [
      { id: "r1", user: "Priya Sharma", rating: 5, comment: "Amazing food and zero waste packaging. Guests loved it!" },
      { id: "r2", user: "Rajiv Kumar", rating: 4.5, comment: "Great service and eco-friendly approach." }
    ]
  },
  {
    id: "v2",
    name: "EcoDecor Events",
    category: "Decoration",
    rating: 4.9,
    reviewCount: 87,
    pricePerHour: 12000,
    description: "Reusable, sustainable event decorations made from recycled and biodegradable materials.",
    coverImage: "https://images.unsplash.com/photo-1478146059778-26028b07395a",
    sustainabilityBadges: ["Recycled Materials", "Plant-Based"],
    location: "Mumbai, India",
    reviews: [
      { id: "r3", user: "Anjali Patel", rating: 5, comment: "Beautiful decorations using recycled materials. Creative and sustainable!" },
      { id: "r4", user: "Vikram Singh", rating: 4.5, comment: "Very unique approach to event decoration with minimal waste." }
    ]
  },
  {
    id: "v3",
    name: "Zero Impact Sounds",
    category: "Entertainment",
    rating: 4.7,
    reviewCount: 56,
    pricePerHour: 18000,
    description: "Solar-powered sound systems and energy-efficient lighting for sustainable events.",
    coverImage: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7",
    sustainabilityBadges: ["Renewable Energy", "Carbon Offset"],
    location: "Bangalore, India",
    reviews: [
      { id: "r5", user: "Arjun Nair", rating: 5, comment: "Solar powered DJ setup was amazing and the sound quality was top-notch." },
      { id: "r6", user: "Meera Reddy", rating: 4, comment: "Good energy-efficient lighting solutions." }
    ]
  },
  {
    id: "v4",
    name: "Clean Stream Waste Management",
    category: "Waste Management",
    rating: 4.6,
    reviewCount: 42,
    pricePerHour: 8000,
    description: "Comprehensive recycling, composting, and waste reduction services for events of all sizes.",
    coverImage: "https://images.unsplash.com/photo-1532996122724-e3c354a0b15b",
    sustainabilityBadges: ["Composting", "Recycling", "Zero Landfill"],
    location: "Hyderabad, India",
    reviews: [
      { id: "r7", user: "Kiran Desai", rating: 5, comment: "Perfect waste management with detailed post-event report." },
      { id: "r8", user: "Tara Joshi", rating: 4, comment: "Very professional segregation and minimal waste to landfill." }
    ]
  },
  {
    id: "v5",
    name: "Eco Photo Studios",
    category: "Photography",
    rating: 4.7,
    reviewCount: 78,
    pricePerHour: 12000,
    description: "Sustainable photography services using energy-efficient equipment and digital delivery options.",
    coverImage: "https://images.unsplash.com/photo-1554048612-b6a482bc67e5",
    sustainabilityBadges: ["Digital Only", "Low Energy"],
    location: "Chennai, India",
    reviews: [
      { id: "r9", user: "Aditya Menon", rating: 5, comment: "Brilliant photographer with eco-conscious approach." },
      { id: "r10", user: "Kavita Iyer", rating: 4.5, comment: "Loved their digital delivery system and beautiful photos!" }
    ]
  },
  {
    id: "v6",
    name: "Green Venue Solutions",
    category: "Venues",
    rating: 4.8,
    reviewCount: 103,
    pricePerHour: 50000,
    description: "Eco-friendly venues featuring natural lighting, water conservation systems, and native landscaping.",
    coverImage: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    sustainabilityBadges: ["Energy Efficient", "Water Conservation", "Green Building"],
    location: "Pune, India",
    reviews: [
      { id: "r11", user: "Rohan Kapoor", rating: 5, comment: "Beautiful sustainable venue with amazing natural lighting." },
      { id: "r12", user: "Sonia Mehta", rating: 5, comment: "The rainwater harvesting and solar power made us feel good about our choice." }
    ]
  },
  {
    id: "v7",
    name: "Green Gift Hampers",
    category: "Gifts & Favors",
    rating: 4.9,
    reviewCount: 65,
    pricePerHour: 5000, // Base price
    description: "Eco-friendly gift hampers and party favors made from sustainable materials and locally sourced products.",
    coverImage: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48",
    sustainabilityBadges: ["Plastic-Free", "Local Artisans", "Biodegradable"],
    location: "Jaipur, India",
    reviews: [
      { id: "r13", user: "Neha Singhania", rating: 5, comment: "Our guests loved the sustainable gift hampers with local products." },
      { id: "r14", user: "Rahul Verma", rating: 4.5, comment: "Beautiful packaging and great eco-friendly options." }
    ]
  },
  {
    id: "v8",
    name: "EcoTransport Services",
    category: "Transportation",
    rating: 4.5,
    reviewCount: 34,
    pricePerHour: 10000,
    description: "Electric and hybrid vehicle fleet for guest transportation with carbon offset programs.",
    coverImage: "https://images.unsplash.com/photo-1550355291-bbee04a92027",
    sustainabilityBadges: ["Electric Vehicles", "Carbon Offset", "Shared Rides"],
    location: "Kolkata, India",
    reviews: [
      { id: "r15", user: "Dev Chatterjee", rating: 5, comment: "Professional service with all-electric vehicles." },
      { id: "r16", user: "Ritu Sen", rating: 4, comment: "Good service and they provide carbon offset certificates." }
    ]
  },
  {
    id: "v9",
    name: "Organic Blooms",
    category: "Flowers & Decor",
    rating: 4.8,
    reviewCount: 91,
    pricePerHour: 7000,
    description: "Organic and locally grown flower arrangements with plastic-free packaging and setup.",
    coverImage: "https://images.unsplash.com/photo-1453747063559-36695c8771bd",
    sustainabilityBadges: ["Organic", "Seasonal", "Compostable"],
    location: "Ahmedabad, India",
    reviews: [
      { id: "r17", user: "Prisha Gupta", rating: 5, comment: "Beautiful local and seasonal flowers with amazing arrangements." },
      { id: "r18", user: "Samir Desai", rating: 4.5, comment: "Loved their plastic-free approach and the flowers were fresh!" }
    ]
  },
  {
    id: "v10",
    name: "Sustainable Sounds DJ",
    category: "Entertainment",
    rating: 4.6,
    reviewCount: 48,
    pricePerHour: 15000,
    description: "Energy-efficient DJ setup with solar-powered options for outdoor events.",
    coverImage: "https://images.unsplash.com/photo-1429962714451-bb934ecdc4ec",
    sustainabilityBadges: ["Low Energy", "Solar Option"],
    location: "Goa, India",
    reviews: [
      { id: "r19", user: "Karan Malhotra", rating: 4, comment: "Great music selection and energy-efficient setup." },
      { id: "r20", user: "Leela Prasad", rating: 5, comment: "Amazing DJ who used solar power for our beach wedding!" }
    ]
  },
  {
    id: "v11",
    name: "Eco Print Solutions",
    category: "Stationery",
    rating: 4.7,
    reviewCount: 52,
    pricePerHour: 6000, // Base price
    description: "Sustainable invitation cards, signage, and event materials using recycled paper and vegetable-based inks.",
    coverImage: "https://images.unsplash.com/photo-1572781148940-58809aff32c3",
    sustainabilityBadges: ["Recycled Paper", "Vegetable Inks", "Digital Options"],
    location: "Lucknow, India",
    reviews: [
      { id: "r21", user: "Ananya Sharma", rating: 5, comment: "Beautiful invitations on seed paper that guests could plant!" },
      { id: "r22", user: "Mohit Agarwal", rating: 4.5, comment: "Great eco-friendly options and the quality was exceptional." }
    ]
  },
  {
    id: "v12",
    name: "Green Plate Catering",
    category: "Catering",
    rating: 4.8,
    reviewCount: 110,
    pricePerHour: 20000,
    description: "Farm-to-table catering with organic ingredients, vegetarian options, and zero plastic packaging.",
    coverImage: "https://images.unsplash.com/photo-1565538810643-b5bdb714032a",
    sustainabilityBadges: ["Organic", "Farm-to-Table", "Vegetarian Options"],
    location: "Chandigarh, India",
    reviews: [
      { id: "r23", user: "Vivek Malhotra", rating: 5, comment: "The organic food was delicious and presentation was beautiful." },
      { id: "r24", user: "Mira Kapoor", rating: 4, comment: "Great vegetarian options and everyone loved the food." }
    ]
  }
];

const categories = [
  { label: "All Categories", value: "all" },
  { label: "Catering", value: "catering" },
  { label: "Decoration", value: "decoration" },
  { label: "Entertainment", value: "entertainment" },
  { label: "Waste Management", value: "waste" },
  { label: "Venues", value: "venues" },
  { label: "Photography", value: "photography" },
  { label: "Gifts & Favors", value: "gifts" },
  { label: "Transportation", value: "transportation" },
  { label: "Flowers & Decor", value: "flowers" },
  { label: "Stationery", value: "stationery" }
];

const FindVendors = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("recommended");
  const [showVendorModal, setShowVendorModal] = useState<any>(null);

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

  // Handle booking a vendor
  const handleBookVendor = (vendor: any) => {
    // In a real app, this would navigate to a booking page or open a booking modal
    toast({
      title: "Booking Request Sent",
      description: `Your booking request for ${vendor.name} has been sent. They will contact you shortly.`,
    });
  };

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
            <TabsList className="bg-white mb-6 overflow-x-auto flex-nowrap">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="catering">Catering</TabsTrigger>
              <TabsTrigger value="decoration">Decoration</TabsTrigger>
              <TabsTrigger value="entertainment">Entertainment</TabsTrigger>
              <TabsTrigger value="waste">Waste Management</TabsTrigger>
              <TabsTrigger value="venues">Venues</TabsTrigger>
              <TabsTrigger value="photography">Photography</TabsTrigger>
            </TabsList>

            <TabsContent value="all" className="mt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {sortedVendors.map((vendor) => (
                  <VendorCard 
                    key={vendor.id} 
                    vendor={vendor} 
                    onViewProfile={() => setShowVendorModal(vendor)} 
                    onBookNow={() => handleBookVendor(vendor)} 
                  />
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
                      <VendorCard 
                        key={vendor.id} 
                        vendor={vendor} 
                        onViewProfile={() => setShowVendorModal(vendor)} 
                        onBookNow={() => handleBookVendor(vendor)} 
                      />
                    ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </main>

      {/* Vendor Details Modal */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="relative">
              <img
                src={showVendorModal.coverImage}
                alt={showVendorModal.name}
                className="w-full h-64 object-cover"
              />
              <button 
                className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full"
                onClick={() => setShowVendorModal(null)}
              >
                ✕
              </button>
              <div className="absolute top-4 left-4">
                <Badge className="bg-eco-accent text-white">{showVendorModal.category}</Badge>
              </div>
            </div>
            <div className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-2xl font-bold">{showVendorModal.name}</h2>
                  <p className="text-muted-foreground">{showVendorModal.location}</p>
                </div>
                <div className="flex items-center bg-eco-light px-3 py-1 rounded-full">
                  <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                  <span className="font-semibold">{showVendorModal.rating}</span>
                  <span className="text-muted-foreground text-sm ml-1">({showVendorModal.reviewCount})</span>
                </div>
              </div>
              
              <div className="mt-4">
                <h3 className="text-lg font-medium mb-2">About</h3>
                <p className="text-muted-foreground">{showVendorModal.description}</p>
              </div>
              
              <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">Sustainability Features</h3>
                <div className="flex flex-wrap gap-2">
                  {showVendorModal.sustainabilityBadges.map((badge: string, i: number) => (
                    <Badge key={i} variant="outline" className="bg-eco-primary/10 text-eco-primary border-eco-primary/20">
                      {badge}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="mt-6 flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Starting at</p>
                  <p className="text-xl font-semibold text-eco-primary flex items-center">
                    <IndianRupee className="h-4 w-4" /> {showVendorModal.pricePerHour.toLocaleString('en-IN')}/hour
                  </p>
                </div>
                <Button 
                  className="bg-eco-primary hover:bg-eco-dark"
                  onClick={() => {
                    handleBookVendor(showVendorModal);
                    setShowVendorModal(null);
                  }}
                >
                  Book Now
                </Button>
              </div>
              
              {/* Reviews Section */}
              <div className="mt-8 pt-6 border-t">
                <h3 className="text-lg font-medium mb-4">Customer Reviews</h3>
                {showVendorModal.reviews?.map((review: any) => (
                  <div key={review.id} className="mb-4 pb-4 border-b last:border-0 last:pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="font-medium">{review.user}</h4>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500 mr-1" />
                        <span>{review.rating}</span>
                      </div>
                    </div>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
      
      <Footer />
    </div>
  );
};

// Vendor Card Component
const VendorCard = ({ vendor, onViewProfile, onBookNow }: { vendor: any, onViewProfile: () => void, onBookNow: () => void }) => {
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
            <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 mr-1" />
            <span className="ml-0.5 font-semibold">{vendor.rating}</span>
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
            <p className="text-lg font-semibold text-eco-primary flex items-center">
              <IndianRupee className="h-4 w-4" /> {vendor.pricePerHour.toLocaleString('en-IN')}/hour
            </p>
          </div>
          <div className="flex flex-wrap gap-1">
            {vendor.sustainabilityBadges.slice(0, 2).map((badge: string, index: number) => (
              <span 
                key={index} 
                className="inline-block px-2 py-1 bg-eco-primary/10 text-eco-primary text-xs rounded-full"
              >
                {badge}
              </span>
            ))}
            {vendor.sustainabilityBadges.length > 2 && (
              <span className="inline-block px-2 py-1 bg-eco-primary/10 text-eco-primary text-xs rounded-full">
                +{vendor.sustainabilityBadges.length - 2}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant="outline"
            className="flex-1 border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
            onClick={onViewProfile}
          >
            View Profile
          </Button>
          <Button 
            className="flex-1 bg-eco-primary hover:bg-eco-dark"
            onClick={onBookNow}
          >
            Book Now
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default FindVendors;
