
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Check, IndianRupee, Star, X, Award, Download, Leaf, CircleDollarSign, Gift, BadgeCheck } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const mockBookings = [
  {
    id: "book1",
    customerName: "Priya Sharma",
    eventType: "Wedding",
    date: "2023-12-15",
    status: "confirmed",
    amount: 120000,
    message: "Looking forward to collaborating on our sustainable wedding!",
  },
  {
    id: "book2",
    customerName: "Tech Innovators Inc.",
    eventType: "Corporate Retreat",
    date: "2023-11-05",
    status: "pending",
    amount: 350000,
    message: "We need sustainable catering for 50 people with vegan options.",
  },
  {
    id: "book3",
    customerName: "Mahesh Roberts",
    eventType: "Birthday Party",
    date: "2023-10-22",
    status: "completed",
    amount: 80000,
    message: "Thanks for making our event eco-friendly!",
  },
];

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
];

const mockPastEvents = [
  {
    id: "evt1",
    title: "Gupta-Sharma Wedding",
    type: "Wedding",
    date: "2023-08-20",
    location: "Taj Palace, Delhi",
    clientName: "Ananya Gupta",
    budget: 500000,
    carbonSaved: 1.2,
    rating: 4.8,
    reviews: [
      { id: "r1", user: "Ananya Gupta", text: "Amazing service, our guests loved the eco-friendly arrangements!", rating: 5 }
    ],
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07"
    ],
    description: "Provided full catering service for 250 guests with zero-waste approach. Used local, organic ingredients and compostable serviceware."
  },
  {
    id: "evt2",
    title: "TechFirm Annual Retreat",
    type: "Corporate",
    date: "2023-09-15",
    location: "Leela Eco Resort, Bangalore",
    clientName: "Vikram Reddy",
    budget: 350000,
    carbonSaved: 0.8,
    rating: 4.5,
    reviews: [
      { id: "r2", user: "Vikram Reddy", text: "Professional service with excellent sustainability practices.", rating: 4.5 }
    ],
    images: [
      "https://images.unsplash.com/photo-1511795409834-432f7b1e1212",
      "https://images.unsplash.com/photo-1515169067868-5387ec356754"
    ],
    description: "Provided eco-friendly decor and sustainable catering for a 3-day corporate retreat with 75 attendees. Used solar-powered lighting and digital-only materials."
  },
  {
    id: "evt3",
    title: "Mehta Family Reunion",
    type: "Social",
    date: "2023-10-10",
    location: "Green Gardens, Mumbai",
    clientName: "Ravi Mehta",
    budget: 200000,
    carbonSaved: 0.7,
    rating: 5.0,
    reviews: [
      { id: "r3", user: "Ravi Mehta", text: "The decorations were beautiful and we loved knowing they were all sustainable!", rating: 5 }
    ],
    images: [
      "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
      "https://images.unsplash.com/photo-1531058020387-3be344556be6"
    ],
    description: "Created eco-friendly decorations for a family reunion with 100 guests. Used recycled materials, potted plants, and reusable signage."
  }
];

// Add seasonal offers and discounts
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

const VendorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [showServiceModal, setShowServiceModal] = useState<any>(null);
  const [showEventModal, setShowEventModal] = useState<any>(null);
  const [showCertificationModal, setShowCertificationModal] = useState(false);
  const [showOfferModal, setShowOfferModal] = useState<any>(null);

  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  const totalCarbonSaved = mockPastEvents.reduce((acc, event) => acc + event.carbonSaved, 0);
  const certificationLevel = totalCarbonSaved > 2 ? "Gold" : totalCarbonSaved > 1 ? "Silver" : "Bronze";

  const handleAcceptBooking = (bookingId: string) => {
    toast({
      title: "Booking Accepted",
      description: "You have accepted the booking request. The customer has been notified.",
    });
  };

  const handleDeclineBooking = (bookingId: string) => {
    toast({
      title: "Booking Declined",
      description: "You have declined the booking request. The customer has been notified.",
    });
  };

  const handleEditService = (service: any) => {
    setShowServiceModal(service);
  };

  const handleAddService = () => {
    navigate('/vendor/services/new');
  };

  const downloadCertificate = () => {
    toast({
      title: "Certificate Downloaded",
      description: "Your sustainability certificate has been downloaded successfully.",
    });
  };

  const handleCreateOffer = () => {
    toast({
      title: "Offer Created",
      description: "Your seasonal offer has been published and is now visible to customers.",
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
                  {user?.name?.charAt(0) || "V"}
                </div>
              )}
              <div>
                <h1 className="text-3xl font-bold text-eco-dark">Welcome back, {user?.name || "Vendor"}!</h1>
                <p className="text-muted-foreground">
                  Manage your services and bookings from your sustainable business dashboard.
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
                onClick={handleAddService}
              >
                Add New Service
              </Button>
            </div>
          </div>

          {/* Dashboard Overview */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Total Bookings</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark">{mockBookings.length}</div>
                <p className="text-sm text-muted-foreground mt-1">
                  {mockBookings.filter(b => b.status === 'confirmed').length} confirmed
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Revenue</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark flex items-center">
                  <IndianRupee className="h-6 w-6 mr-1" />
                  {mockBookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString('en-IN')}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  This month
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Average Rating</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark flex items-center">
                  4.7
                  <Star className="h-5 w-5 text-yellow-500 fill-yellow-500 ml-1" />
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  From 24 reviews
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium">Carbon Saved</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-eco-dark flex items-center">
                  <span>{totalCarbonSaved.toFixed(1)}kg</span>
                  <Badge className="ml-2 bg-eco-secondary">{certificationLevel}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Compared to traditional vendors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Seasonal Offers Section */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-eco-dark">Seasonal Offers</h2>
              <Button 
                variant="outline" 
                className="border-eco-secondary text-eco-secondary hover:bg-eco-secondary hover:text-white"
                onClick={() => navigate('/vendor/offers')}
              >
                <Gift className="mr-2 h-4 w-4" />
                Create New Offer
              </Button>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6">
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
                        variant="outline" 
                        size="sm" 
                        className="text-eco-primary border-eco-primary hover:bg-eco-primary hover:text-white"
                        onClick={() => setShowOfferModal(offer)}
                      >
                        Edit Offer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Bookings Tab */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Recent Bookings</h2>
            
            <Tabs defaultValue="all" className="mb-6" onValueChange={setActiveTab}>
              <TabsList>
                <TabsTrigger value="all">All Bookings</TabsTrigger>
                <TabsTrigger value="pending">Pending</TabsTrigger>
                <TabsTrigger value="confirmed">Confirmed</TabsTrigger>
                <TabsTrigger value="completed">Completed</TabsTrigger>
              </TabsList>
              
              <TabsContent value="all" className="mt-6">
                <div className="grid gap-6">
                  {mockBookings.map(booking => (
                    <Card key={booking.id} className="overflow-hidden">
                      <div className="p-6">
                        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                          <div>
                            <div className="flex items-center gap-4">
                              <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                              <Badge className={`${
                                booking.status === 'confirmed' ? 'bg-green-500' : 
                                booking.status === 'pending' ? 'bg-amber-500' :
                                'bg-blue-500'
                              }`}>
                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                              </Badge>
                            </div>
                            <div className="text-sm text-muted-foreground mt-1">
                              {booking.eventType} · {new Date(booking.date).toLocaleDateString('en-IN')}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Amount</div>
                              <div className="font-semibold flex items-center">
                                <IndianRupee className="h-4 w-4" />{booking.amount.toLocaleString('en-IN')}
                              </div>
                            </div>
                            <Button className="bg-eco-primary hover:bg-eco-dark">
                              View Details
                            </Button>
                          </div>
                        </div>
                        
                        <div className="bg-muted/50 rounded-lg p-4">
                          <p className="text-muted-foreground">
                            <span className="font-medium text-foreground">Message:</span> {booking.message}
                          </p>
                        </div>
                        
                        {booking.status === 'pending' && (
                          <div className="mt-4 flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => handleDeclineBooking(booking.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              className="bg-eco-primary hover:bg-eco-dark text-white"
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              Accept Booking
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              <TabsContent value="pending" className="mt-6">
                <div className="grid gap-6">
                  {mockBookings
                    .filter(booking => booking.status === 'pending')
                    .map(booking => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                                <Badge className="bg-amber-500">Pending</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {booking.eventType} · {new Date(booking.date).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Amount</div>
                                <div className="font-semibold flex items-center">
                                  <IndianRupee className="h-4 w-4" />{booking.amount.toLocaleString('en-IN')}
                                </div>
                              </div>
                              <Button className="bg-eco-primary hover:bg-eco-dark">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Message:</span> {booking.message}
                            </p>
                          </div>
                          
                          <div className="mt-4 flex gap-2 justify-end">
                            <Button 
                              variant="outline" 
                              className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                              onClick={() => handleDeclineBooking(booking.id)}
                            >
                              Decline
                            </Button>
                            <Button 
                              className="bg-eco-primary hover:bg-eco-dark text-white"
                              onClick={() => handleAcceptBooking(booking.id)}
                            >
                              Accept Booking
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="confirmed" className="mt-6">
                <div className="grid gap-6">
                  {mockBookings
                    .filter(booking => booking.status === 'confirmed')
                    .map(booking => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                                <Badge className="bg-green-500">Confirmed</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {booking.eventType} · {new Date(booking.date).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Amount</div>
                                <div className="font-semibold flex items-center">
                                  <IndianRupee className="h-4 w-4" />{booking.amount.toLocaleString('en-IN')}
                                </div>
                              </div>
                              <Button className="bg-eco-primary hover:bg-eco-dark">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Message:</span> {booking.message}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              <TabsContent value="completed" className="mt-6">
                <div className="grid gap-6">
                  {mockBookings
                    .filter(booking => booking.status === 'completed')
                    .map(booking => (
                      <Card key={booking.id} className="overflow-hidden">
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                                <Badge className="bg-blue-500">Completed</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {booking.eventType} · {new Date(booking.date).toLocaleDateString('en-IN')}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Amount</div>
                                <div className="font-semibold flex items-center">
                                  <IndianRupee className="h-4 w-4" />{booking.amount.toLocaleString('en-IN')}
                                </div>
                              </div>
                              <Button className="bg-eco-primary hover:bg-eco-dark">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="bg-muted/50 rounded-lg p-4">
                            <p className="text-muted-foreground">
                              <span className="font-medium text-foreground">Message:</span> {booking.message}
                            </p>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
            </Tabs>
          </section>

          {/* Past Events Section */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Serviced Events</h2>
            <div className="grid md:grid-cols-3 gap-6">
              {mockPastEvents.map(event => (
                <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setShowEventModal(event)}>
                  <div className="relative h-48 overflow-hidden">
                    <img 
                      src={event.images[0]} 
                      alt={event.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-eco-secondary">{event.type}</Badge>
                    </div>
                  </div>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">{event.title}</CardTitle>
                    <CardDescription>
                      {new Date(event.date).toLocaleDateString('en-IN')} • {event.location}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center">
                        <div className="mr-2">
                          <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                        </div>
                        <div>
                          <span className="font-semibold">{event.rating}</span>
                          <span className="text-xs text-muted-foreground"> ({event.reviews.length} reviews)</span>
                        </div>
                      </div>
                      <div className="flex items-center">
                        <span className="text-muted-foreground text-sm mr-1">Budget:</span>
                        <span className="font-semibold flex items-center">
                          <IndianRupee className="h-3.5 w-3.5" />
                          {event.budget.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div>
                        <span className="text-muted-foreground">Carbon saved:</span>
                        <span className="font-semibold text-eco-primary ml-1">{event.carbonSaved} tons</span>
                      </div>
                      <Button variant="ghost" size="sm" className="text-eco-primary">View Details</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Your Services */}
          <section className="mb-8">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-bold text-eco-dark">Your Services</h2>
              <Button 
                variant="outline" 
                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                onClick={() => navigate('/vendor/services')}
              >
                Manage All Services
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {mockServices.map(service => (
                <Card key={service.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>{service.name}</CardTitle>
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
                    <Button 
                      className="w-full bg-eco-secondary hover:bg-eco-primary text-white"
                      onClick={() => handleEditService(service)}
                    >
                      Edit Service
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>

          {/* Sustainability Impact */}
          <section>
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Your Sustainability Impact</h2>
            <Card>
              <CardContent className="pt-6">
                <div className="grid md:grid-cols-4 gap-6 text-center">
                  <div>
                    <div className="text-4xl font-bold text-eco-primary mb-2">{(totalCarbonSaved * 100).toFixed(0)}kg</div>
                    <p className="text-sm text-muted-foreground">CO2 Emissions Saved</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-eco-primary mb-2">85%</div>
                    <p className="text-sm text-muted-foreground">Waste Reduction</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-eco-primary mb-2">215</div>
                    <p className="text-sm text-muted-foreground">Local Material Sources</p>
                  </div>
                  <div>
                    <div className="text-4xl font-bold text-eco-primary mb-2">{mockPastEvents.length}</div>
                    <p className="text-sm text-muted-foreground">Eco-Friendly Events</p>
                  </div>
                </div>
                <div className="mt-8 bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Eco Certification Status:</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-white rounded-full h-2.5">
                      <div 
                        className="bg-eco-primary h-2.5 rounded-full" 
                        style={{ width: certificationLevel === 'Gold' ? '100%' : certificationLevel === 'Silver' ? '70%' : '40%' }}
                      ></div>
                    </div>
                    <span 
                      className="text-sm font-medium text-eco-primary ml-4"
                    >
                      {certificationLevel === 'Gold' ? '100%' : certificationLevel === 'Silver' ? '70%' : '40%'}
                    </span>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground">
                    {certificationLevel !== 'Gold' ? (
                      <>Complete more sustainable events to achieve {certificationLevel === 'Bronze' ? 'Silver' : 'Gold'} Certification.</>
                    ) : (
                      <>You have achieved Gold Certification! Keep up the great work.</>
                    )}
                    <Button 
                      variant="link" 
                      className="text-eco-primary font-medium ml-1 p-0 h-auto"
                      onClick={() => setShowCertificationModal(true)}
                    >
                      View Details
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      
      {/* Service Edit Dialog */}
      <Dialog open={!!showServiceModal} onOpenChange={() => setShowServiceModal(null)}>
        <DialogContent className="max-w-xl">
          <DialogHeader>
            <DialogTitle>Edit Service</DialogTitle>
            <DialogDescription>
              Update the details of your service.
            </DialogDescription>
          </DialogHeader>
          {showServiceModal && (
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <div className="col-span-4">
                  <h3 className="font-medium">{showServiceModal.name}</h3>
                  <p className="text-sm text-muted-foreground">{showServiceModal.type}</p>
                </div>
                <div className="col-span-4">
                  <p className="text-sm">{showServiceModal.description}</p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowServiceModal(null)}>Cancel</Button>
            <Button>Save Changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Event Details Dialog */}
      <Dialog open={!!showEventModal} onOpenChange={() => setShowEventModal(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Event Details</DialogTitle>
          </DialogHeader>
          {showEventModal && (
            <div className="grid gap-4">
              <div className="aspect-video relative overflow-hidden rounded-lg">
                <img 
                  src={showEventModal.images[0]} 
                  alt={showEventModal.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="text-xl font-bold">{showEventModal.title}</h2>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-eco-secondary">{showEventModal.type}</Badge>
                  <p className="text-sm text-muted-foreground">
                    {new Date(showEventModal.date).toLocaleDateString('en-IN')} • {showEventModal.location}
                  </p>
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h3 className="font-medium">Client</h3>
                  <p className="text-sm">{showEventModal.clientName}</p>
                </div>
                <div>
                  <h3 className="font-medium">Budget</h3>
                  <p className="flex items-center text-sm"><IndianRupee className="h-3.5 w-3.5 mr-1" />{showEventModal.budget.toLocaleString('en-IN')}</p>
                </div>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-sm">{showEventModal.description}</p>
              </div>
              <div>
                <h3 className="font-medium">Reviews</h3>
                {showEventModal.reviews.map((review: any) => (
                  <div key={review.id} className="mt-2 p-3 bg-muted/50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <p className="font-medium">{review.user}</p>
                      <div className="flex items-center">
                        <span className="font-medium mr-1">{review.rating}</span>
                        <Star className="h-4 w-4 text-yellow-500 fill-yellow-500" />
                      </div>
                    </div>
                    <p className="text-sm mt-1">{review.text}</p>
                  </div>
                ))}
              </div>
              <div>
                <h3 className="font-medium">Environmental Impact</h3>
                <div className="flex items-center mt-1">
                  <Leaf className="h-4 w-4 mr-1 text-eco-primary" />
                  <p className="text-sm">
                    <span className="font-medium">{showEventModal.carbonSaved} tons</span> of carbon emissions saved compared to traditional methods
                  </p>
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEventModal(null)}>Close</Button>
            <Button className="bg-eco-primary">Download Report</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Certification Modal */}
      <Dialog open={showCertificationModal} onOpenChange={setShowCertificationModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl">Sustainability Certificate</DialogTitle>
          </DialogHeader>
          
          <div className="border-8 border-double border-eco-secondary p-8 bg-white">
            <div className="text-center">
              <h1 className="text-3xl font-serif mb-6">Certificate of Excellence in</h1>
              <h1 className="text-4xl font-bold text-eco-primary mb-8">Sustainable Event Planning</h1>
              
              <p className="mb-8 text-lg">This certifies that</p>
              <p className="text-2xl font-bold mb-8">{user?.name || "Vendor Name"}</p>
              
              <p className="mb-8 text-lg">has achieved</p>
              <div className="flex items-center justify-center mb-8">
                <Badge className="text-xl py-2 px-4 bg-eco-secondary">{certificationLevel} Level</Badge>
              </div>
              
              <p className="mb-8 text-lg">
                for demonstrating exceptional commitment to sustainability practices,
                <br />saving approximately <span className="font-bold">{(totalCarbonSaved * 100).toFixed(0)} kg</span> of carbon emissions,
                <br />and promoting eco-friendly event solutions.
              </p>
              
              <div className="flex justify-between items-center mb-8">
                <div className="text-left">
                  <p className="font-medium">Issue Date:</p>
                  <p>{new Date().toLocaleDateString('en-IN')}</p>
                </div>
                <div>
                  <BadgeCheck className="w-16 h-16 text-eco-primary" />
                </div>
                <div className="text-right">
                  <p className="font-medium">Valid Until:</p>
                  <p>{new Date(Date.now() + 365*24*60*60*1000).toLocaleDateString('en-IN')}</p>
                </div>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Certificate ID: ECO-{Math.floor(Math.random() * 10000).toString().padStart(4, '0')}
              </p>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCertificationModal(false)}>Close</Button>
            <Button 
              className="bg-eco-primary flex items-center gap-2"
              onClick={downloadCertificate}
            >
              <Download className="h-4 w-4" />
              Download Certificate
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Offer Modal */}
      <Dialog open={!!showOfferModal} onOpenChange={() => setShowOfferModal(null)}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Edit Offer</DialogTitle>
          </DialogHeader>
          {showOfferModal && (
            <div className="grid gap-4">
              <div className="h-36 overflow-hidden rounded-lg">
                <img
                  src={showOfferModal.image}
                  alt={showOfferModal.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <h2 className="font-bold">{showOfferModal.title}</h2>
                <p className="text-sm text-muted-foreground">
                  Valid until: {new Date(showOfferModal.validUntil).toLocaleDateString('en-IN')}
                </p>
              </div>
              <div>
                <h3 className="font-medium">Discount Code</h3>
                <div className="bg-muted px-3 py-1 rounded text-sm font-mono mt-1">{showOfferModal.code}</div>
              </div>
              <div>
                <h3 className="font-medium">Description</h3>
                <p className="text-sm mt-1">{showOfferModal.description}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowOfferModal(null)}>Cancel</Button>
            <Button className="bg-eco-primary" onClick={handleCreateOffer}>Update Offer</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
};

export default VendorDashboard;
