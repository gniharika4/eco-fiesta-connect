
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, Check, IndianRupee } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const mockRecommendations = [
  {
    id: "rec1",
    title: "Bamboo Plates and Cutlery",
    description: "Biodegradable tableware for your event",
    fullDescription: "Replace plastic tableware with biodegradable bamboo plates and cutlery. These eco-friendly alternatives are stylish, sturdy, and completely compostable after use. By choosing bamboo, you're reducing plastic waste and supporting sustainable material harvesting practices.",
    savingsPercent: 60,
    carbonReduction: "1.2kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1617119815789-b0ffd5a90834",
    costRangeInr: "₹5,000 - ₹15,000",
    benefits: [
      "100% biodegradable and compostable",
      "Stylish natural aesthetic",
      "Sturdy and leakproof",
      "No chemical treatments or dyes",
      "Supports sustainable bamboo farming"
    ],
    providers: [
      { name: "Green Gatherings Co.", rating: 4.8, price: 8000 },
      { name: "EcoPlate India", rating: 4.6, price: 7500 },
      { name: "Bamboo Basics", rating: 4.7, price: 9000 }
    ],
    suggestedEvents: ["Weddings", "Corporate Events", "Birthday Parties", "Festivals"]
  },
  {
    id: "rec2",
    title: "Solar-Powered Lighting",
    description: "Eco-friendly lighting solutions",
    fullDescription: "Illuminate your event with solar-powered lighting solutions that charge during the day and create beautiful ambiance at night. These energy-efficient lights reduce electricity consumption and can be reused for future events or personal use. Perfect for outdoor venues and gardens.",
    savingsPercent: 45,
    carbonReduction: "0.8kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1512149074996-e923ac45be6d",
    costRangeInr: "₹10,000 - ₹30,000",
    benefits: [
      "Zero electricity consumption",
      "Wireless installation with no cables",
      "Weather-resistant for outdoor use",
      "Multiple color options and patterns",
      "Reusable for multiple events"
    ],
    providers: [
      { name: "Solar Light India", rating: 4.9, price: 25000 },
      { name: "Eco Illuminations", rating: 4.5, price: 18000 },
      { name: "Green Glow Events", rating: 4.8, price: 22000 }
    ],
    suggestedEvents: ["Garden Weddings", "Outdoor Receptions", "Corporate Retreats", "Festival Grounds"]
  },
  {
    id: "rec3",
    title: "Digital Invitations",
    description: "Paperless invites with tracking",
    fullDescription: "Replace traditional paper invitations with beautifully designed digital alternatives. Digital invitations not only save paper but also provide convenient RSVP tracking, guest messaging, and updates. Choose from hundreds of eco-themed designs that reflect your event's sustainable values.",
    savingsPercent: 90,
    carbonReduction: "0.5kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
    costRangeInr: "₹2,000 - ₹8,000",
    benefits: [
      "Zero paper waste",
      "Real-time RSVP tracking",
      "Easy updates and changes",
      "Interactive maps and event information",
      "Animated and video options available"
    ],
    providers: [
      { name: "Digital Invite Co", rating: 4.7, price: 5000 },
      { name: "InviteWala", rating: 4.8, price: 4500 },
      { name: "Green Greetings", rating: 4.6, price: 3800 }
    ],
    suggestedEvents: ["Weddings", "Corporate Events", "Birthdays", "Reunions", "Product Launches"]
  }
];

const RecommendationDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();
  const recommendation = mockRecommendations.find(rec => rec.id === id);

  if (!isAuthenticated || user?.userType !== 'customer') {
    navigate('/login');
    return null;
  }

  if (!recommendation) {
    navigate('/customer/dashboard');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Back button */}
          <Button 
            variant="ghost" 
            className="mb-6 pl-0 flex items-center text-muted-foreground hover:text-foreground"
            onClick={() => navigate('/customer/dashboard')}
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Dashboard
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-xl overflow-hidden shadow-md">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={recommendation.imageUrl} 
                    alt={recommendation.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h1 className="text-3xl font-bold mb-2 text-eco-dark">{recommendation.title}</h1>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {recommendation.suggestedEvents.map((event, index) => (
                      <Badge key={index} variant="outline" className="bg-eco-primary/10 text-eco-primary">
                        {event}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-lg text-muted-foreground mb-6">
                    {recommendation.fullDescription}
                  </p>

                  <div className="grid grid-cols-2 gap-4 mb-8">
                    <div className="bg-eco-light/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Environmental Savings</p>
                      <p className="text-2xl font-semibold text-eco-primary">{recommendation.savingsPercent}%</p>
                      <p className="text-sm text-muted-foreground">compared to traditional options</p>
                    </div>
                    <div className="bg-eco-light/50 rounded-lg p-4">
                      <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                      <p className="text-2xl font-semibold text-eco-primary">{recommendation.carbonReduction}</p>
                      <p className="text-sm text-muted-foreground">per event on average</p>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-eco-dark">Benefits</h2>
                    <ul className="space-y-2">
                      {recommendation.benefits.map((benefit, index) => (
                        <li key={index} className="flex items-start">
                          <Check className="h-5 w-5 text-eco-primary mr-2 mt-0.5 flex-shrink-0" />
                          <span>{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h2 className="text-xl font-semibold mb-4 text-eco-dark">Recommended Providers</h2>
                    <div className="space-y-4">
                      {recommendation.providers.map((provider, index) => (
                        <div 
                          key={index} 
                          className="border rounded-lg p-4 hover:border-eco-primary hover:bg-eco-primary/5 transition-colors cursor-pointer"
                        >
                          <div className="flex justify-between">
                            <h3 className="font-medium">{provider.name}</h3>
                            <div className="flex items-center">
                              <span className="text-yellow-500 mr-1">★</span>
                              <span>{provider.rating}</span>
                            </div>
                          </div>
                          <div className="flex justify-between mt-2">
                            <p className="text-muted-foreground">Estimated cost</p>
                            <p className="font-medium flex items-center">
                              <IndianRupee className="h-3.5 w-3.5" />
                              {provider.price.toLocaleString('en-IN')}
                            </p>
                          </div>
                          <Button className="w-full mt-2 bg-eco-primary hover:bg-eco-dark">
                            Contact Provider
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Cost Estimate</CardTitle>
                  <CardDescription>Approximate price range in India</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold text-eco-primary">{recommendation.costRangeInr}</p>
                  <p className="text-sm text-muted-foreground mt-1">Depending on event size and requirements</p>
                  
                  <div className="mt-4 pt-4 border-t">
                    <h4 className="font-medium mb-2">Add to your event</h4>
                    <Button className="w-full bg-eco-primary hover:bg-eco-dark">
                      Apply to Event
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Related Recommendations</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {mockRecommendations.filter(rec => rec.id !== id).map(rec => (
                    <div 
                      key={rec.id} 
                      className="flex items-center gap-3 cursor-pointer hover:bg-muted/50 p-2 rounded-lg transition-colors"
                      onClick={() => navigate(`/customer/recommendations/${rec.id}`)}
                    >
                      <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0">
                        <img 
                          src={rec.imageUrl} 
                          alt={rec.title} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-grow">
                        <h4 className="font-medium text-sm">{rec.title}</h4>
                        <p className="text-xs text-muted-foreground">Saves up to {rec.savingsPercent}%</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Implementation Tips</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start">
                      <span className="inline-block bg-eco-primary text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2">1</span>
                      <span>Plan at least 3-4 weeks ahead to ensure availability</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-eco-primary text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2">2</span>
                      <span>Consider your event size when estimating quantities</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-eco-primary text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2">3</span>
                      <span>Ask vendors about any special setup requirements</span>
                    </li>
                    <li className="flex items-start">
                      <span className="inline-block bg-eco-primary text-white rounded-full w-5 h-5 flex-shrink-0 flex items-center justify-center mr-2">4</span>
                      <span>Request samples before confirming large orders</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RecommendationDetails;
