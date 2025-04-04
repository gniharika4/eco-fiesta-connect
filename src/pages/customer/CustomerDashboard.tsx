
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { IndianRupee, Calendar, Users, ArrowRight, Award, Download, Leaf, BadgeCheck, Gift } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockEvents = [
  {
    id: "ev1",
    title: "Rohit's Wedding",
    date: "2023-12-15",
    status: "upcoming",
    budget: 1500000, // in INR
    currentSpend: 850000,
    carbonFootprint: 2.4,
    vendors: 5,
    tasks: 12,
    completedTasks: 8,
  },
  {
    id: "ev2",
    title: "Corporate Retreat",
    date: "2023-10-05",
    status: "past",
    budget: 2500000,
    currentSpend: 2480000,
    carbonFootprint: 4.2,
    vendors: 8,
    tasks: 15,
    completedTasks: 15,
  },
];

const mockRecommendations = [
  {
    id: "rec1",
    title: "Bamboo Plates and Cutlery",
    description: "Biodegradable tableware for your event",
    savingsPercent: 60,
    carbonReduction: "1.2kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1617119815789-b0ffd5a90834",
  },
  {
    id: "rec2",
    title: "Solar-Powered Lighting",
    description: "Eco-friendly lighting solutions",
    savingsPercent: 45,
    carbonReduction: "0.8kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1512149074996-e923ac45be6d",
  },
  {
    id: "rec3",
    title: "Digital Invitations",
    description: "Paperless invites with tracking",
    savingsPercent: 90,
    carbonReduction: "0.5kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f",
  },
];

// Seasonal offers and discounts
const seasonalOffers = [
  {
    id: "offer1",
    title: "Diwali Special",
    description: "20% off on eco-friendly lighting packages for events during the Diwali season",
    validUntil: "2023-11-15",
    discount: 20,
    code: "ECODIWALI",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81"
  },
  {
    id: "offer2",
    title: "Christmas Green",
    description: "15% discount on sustainable decor packages using natural materials",
    validUntil: "2023-12-31",
    discount: 15,
    code: "XMASGREEN",
    image: "https://images.unsplash.com/photo-1512149074996-e923ac45be6d"
  },
  {
    id: "offer3",
    title: "Summer Wedding Special",
    description: "Free carbon offset with any wedding package booked for summer months",
    validUntil: "2023-08-31",
    discount: 0,
    isSpecial: true,
    code: "GREENSUM23",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3"
  },
];

const CustomerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showCertificationModal, setShowCertificationModal] = useState(false);

  if (!isAuthenticated || user?.userType !== 'customer') {
    navigate('/login');
    return null;
  }

  // Calculate total carbon savings
  const totalCarbonSaved = mockEvents.reduce((acc, ev) => acc + ev.carbonFootprint, 0);
  const certificationLevel = totalCarbonSaved > 5 ? "Gold" : totalCarbonSaved > 3 ? "Silver" : "Bronze";

  const downloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your sustainability certificate has been downloaded successfully.",
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div className="flex items-center">
              {user?.profileImage ? (
                <div className="h-16 w-16 rounded-full overflow-hidden mr-4">
                  <img 
                    src={user.profileImage}
                    alt={user.name} 
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-16 w-16 bg-eco-secondary text-white rounded-full flex items-center justify-center mr-4">
                  {user?.name?.charAt(0) || "C"}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-eco-dark">Welcome back, {user?.name || "Guest"}!</h1>
                <p className="text-muted-foreground">
                  Manage your sustainable events and track your environmental impact.
                </p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-2 mt-4 md:mt-0">
              <Button 
                className="bg-eco-secondary hover:bg-eco-primary text-white flex items-center gap-2"
                onClick={() => setShowCertificationModal(true)}
              >
                <Award size={18} />
                View Certificate
              </Button>
              <Button 
                className="bg-eco-primary hover:bg-eco-dark text-white"
                onClick={() => navigate('/customer/create-event')}
              >
                Create New Event
              </Button>
            </div>
          </div>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Events</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark">{mockEvents.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockEvents.filter(e => e.status === 'upcoming').length} upcoming
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Carbon Footprint</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark flex items-center">
                  {totalCarbonSaved.toFixed(1)}kg CO2
                  <Badge className="ml-2 bg-eco-secondary">{certificationLevel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  28% less than average
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Saved Vendors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark">12</div>
                <p className="text-sm text-muted-foreground mt-1">
                  5 recently added
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Seasonal Offers Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Seasonal Offers & Discounts</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {seasonalOffers.map(offer => (
                <Card key={offer.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-36 overflow-hidden">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <CardTitle>{offer.title}</CardTitle>
                      {offer.discount > 0 && (
                        <Badge className="bg-eco-primary">{offer.discount}% OFF</Badge>
                      )}
                      {offer.isSpecial && (
                        <Badge className="bg-eco-secondary">SPECIAL</Badge>
                      )}
                    </div>
                    <CardDescription>Valid until: {new Date(offer.validUntil).toLocaleDateString('en-IN')}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">{offer.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="bg-muted px-3 py-1 rounded text-sm font-mono">{offer.code}</div>
                      <Button 
                        size="sm" 
                        className="bg-eco-primary hover:bg-eco-dark text-white"
                        onClick={() => {
                          toast({
                            title: "Offer Applied",
                            description: `${offer.title} discount code has been copied to clipboard.`,
                          });
                          navigator.clipboard.writeText(offer.code);
                        }}
                      >
                        <Gift className="mr-2 h-4 w-4" />
                        Apply Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Events Tab */}
          <Tabs defaultValue="upcoming" className="mb-8">
            <TabsList>
              <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
              <TabsTrigger value="past">Past Events</TabsTrigger>
              <TabsTrigger value="all">All Events</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upcoming" className="mt-6">
              <div className="grid gap-6">
                {mockEvents
                  .filter(event => event.status === 'upcoming')
                  .map(event => (
                    <Card key={event.id} className="overflow-hidden">
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString('en-IN')}</span>
                                <span className="px-2 py-1 rounded-full bg-eco-light text-eco-primary text-xs font-medium">
                                  Upcoming
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                                onClick={() => navigate(`/customer/events/${event.id}/edit`)}
                              >
                                Edit
                              </Button>
                              <Button 
                                size="sm" 
                                className="bg-eco-primary hover:bg-eco-dark text-white"
                                onClick={() => navigate(`/customer/events/${event.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.budget.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.currentSpend.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                              <p className="font-medium">{event.carbonFootprint}kg CO2</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Tasks</p>
                              <p className="font-medium">{event.completedTasks}/{event.tasks} Completed</p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Progress Bar */}
                        <div className="w-full md:w-24 bg-eco-light md:h-auto py-2 md:py-0 px-6 md:px-0 flex flex-row md:flex-col justify-between items-center">
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Budget</p>
                            <p className="font-medium text-sm">{Math.round((event.currentSpend / event.budget) * 100)}%</p>
                          </div>
                          <div className="h-1 md:h-full w-2/3 md:w-1 bg-muted mx-4 md:mx-auto relative">
                            <div 
                              className="absolute left-0 top-0 md:bottom-0 h-full md:h-auto md:w-full bg-eco-primary" 
                              style={{ 
                                width: `${Math.round((event.currentSpend / event.budget) * 100)}%`,
                                height: '100%',
                                bottom: 0
                              }}
                            ></div>
                          </div>
                          <div className="text-center">
                            <p className="text-xs text-muted-foreground">Tasks</p>
                            <p className="font-medium text-sm">{Math.round((event.completedTasks / event.tasks) * 100)}%</p>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}

                {mockEvents.filter(event => event.status === 'upcoming').length === 0 && (
                  <div className="text-center py-12">
                    <h3 className="text-lg font-medium mb-2">No upcoming events</h3>
                    <p className="text-muted-foreground mb-6">Create your first sustainable event to get started</p>
                    <Button 
                      className="bg-eco-primary hover:bg-eco-dark text-white"
                      onClick={() => navigate('/customer/create-event')}
                    >
                      Create New Event
                    </Button>
                  </div>
                )}
              </div>
            </TabsContent>
            
            <TabsContent value="past" className="mt-6">
              <div className="grid gap-6">
                {mockEvents
                  .filter(event => event.status === 'past')
                  .map(event => (
                    <Card key={event.id} className="overflow-hidden">
                      {/* Similar content as above, but for past events */}
                      <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString('en-IN')}</span>
                                <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                                  Complete
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                className="bg-eco-primary hover:bg-eco-dark text-white"
                                onClick={() => navigate(`/customer/events/${event.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.budget.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.currentSpend.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                              <p className="font-medium">{event.carbonFootprint}kg CO2</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Vendors</p>
                              <p className="font-medium">{event.vendors} Used</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="all" className="mt-6">
              <div className="grid gap-6">
                {mockEvents.map(event => (
                  <Card key={event.id} className="overflow-hidden">
                    {/* Similar content, for all events */}
                    <div className="flex flex-col md:flex-row">
                        <div className="p-6 flex-grow">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="text-xl font-semibold mb-2">{event.title}</h3>
                              <div className="flex items-center text-sm text-muted-foreground mb-4">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString('en-IN')}</span>
                                <span className={`px-2 py-1 rounded-full ${
                                  event.status === 'upcoming' 
                                    ? 'bg-eco-light text-eco-primary' 
                                    : 'bg-muted text-muted-foreground'
                                } text-xs font-medium`}>
                                  {event.status === 'upcoming' ? 'Upcoming' : 'Complete'}
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              {event.status === 'upcoming' && (
                                <Button 
                                  variant="outline" 
                                  size="sm"
                                  className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                                  onClick={() => navigate(`/customer/events/${event.id}/edit`)}
                                >
                                  Edit
                                </Button>
                              )}
                              <Button 
                                size="sm" 
                                className="bg-eco-primary hover:bg-eco-dark text-white"
                                onClick={() => navigate(`/customer/events/${event.id}`)}
                              >
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.budget.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium flex items-center">
                                <IndianRupee className="h-4 w-4" />
                                {event.currentSpend.toLocaleString('en-IN')}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Carbon Footprint</p>
                              <p className="font-medium">{event.carbonFootprint}kg CO2</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Tasks</p>
                              <p className="font-medium">{event.completedTasks}/{event.tasks} Completed</p>
                            </div>
                          </div>
                        </div>
                      </div>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Eco-Friendly Recommendations */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Eco-Friendly Recommendations</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockRecommendations.map(rec => (
                <Card key={rec.id} className="overflow-hidden">
                  <div className="h-48 overflow-hidden">
                    <img
                      src={rec.imageUrl}
                      alt={rec.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardHeader>
                    <CardTitle>{rec.title}</CardTitle>
                    <CardDescription>{rec.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm text-muted-foreground">Saves up to</p>
                        <p className="text-lg font-semibold text-eco-primary">{rec.savingsPercent}%</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Carbon Reduction</p>
                        <p className="text-lg font-semibold text-eco-primary">{rec.carbonReduction}</p>
                      </div>
                    </div>
                    <Button 
                      className="w-full mt-4 bg-eco-secondary hover:bg-eco-primary text-white flex items-center justify-center"
                      onClick={() => navigate(`/customer/recommendations/${rec.id}`)}
                    >
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />

      {/* Carbon Certification Modal */}
      <Dialog open={showCertificationModal} onOpenChange={setShowCertificationModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="flex items-center text-2xl">
              <Award className="h-6 w-6 mr-2 text-eco-primary" /> 
              Your Eco-Fiesta Certification
            </DialogTitle>
            <DialogDescription>
              In recognition of your commitment to sustainable event planning
            </DialogDescription>
          </DialogHeader>
          <div className="p-6 border-2 border-eco-secondary/50 rounded-lg bg-muted/20 flex flex-col items-center">
            <div className="w-24 h-24 rounded-full bg-eco-light border-4 border-eco-secondary flex items-center justify-center mb-4">
              <BadgeCheck className="h-12 w-12 text-eco-primary" />
            </div>
            
            <h3 className="text-xl font-bold text-center mb-1">{certificationLevel} Level Sustainability Certificate</h3>
            <p className="text-center text-muted-foreground mb-4">Awarded to</p>
            <h2 className="text-2xl font-bold text-center mb-4">{user?.name || "Customer"}</h2>
            
            <div className="w-full h-0.5 bg-muted my-4"></div>
            
            <div className="text-center mb-6">
              <p>For saving <span className="font-bold text-eco-primary">{totalCarbonSaved.toFixed(1)}kg of CO2</span> emissions</p>
              <p>through sustainable event planning practices</p>
            </div>
            
            <div className="flex items-center justify-between w-full">
              <div className="text-center">
                <Leaf className="h-10 w-10 text-eco-primary mx-auto mb-2" />
                <p className="text-xs text-muted-foreground">EcoFiesta Verified</p>
              </div>
              
              <div className="text-center">
                <p className="font-semibold">Date Issued</p>
                <p className="text-sm">{new Date().toLocaleDateString('en-IN')}</p>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-4">
            <Button 
              variant="outline" 
              onClick={() => setShowCertificationModal(false)}
            >
              Close
            </Button>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white"
              onClick={downloadCertificate}
            >
              <Download className="mr-2 h-4 w-4" />
              Download Certificate
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default CustomerDashboard;
