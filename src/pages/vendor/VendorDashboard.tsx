import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const mockBookings = [
  {
    id: "book1",
    customerName: "Sarah Johnson",
    eventType: "Wedding",
    date: "2023-12-15",
    status: "confirmed",
    amount: 1200,
    message: "Looking forward to collaborating on our sustainable wedding!",
  },
  {
    id: "book2",
    customerName: "Tech Innovators Inc.",
    eventType: "Corporate Retreat",
    date: "2023-11-05",
    status: "pending",
    amount: 3500,
    message: "We need sustainable catering for 50 people with vegan options.",
  },
  {
    id: "book3",
    customerName: "Mike Roberts",
    eventType: "Birthday Party",
    date: "2023-10-22",
    status: "completed",
    amount: 800,
    message: "Thanks for making our event eco-friendly!",
  },
];

const mockServices = [
  {
    id: "serv1",
    name: "Eco-Friendly Catering",
    type: "Catering",
    basePrice: 25,
    priceUnit: "per person",
    bookings: 12,
    rating: 4.8,
  },
  {
    id: "serv2",
    name: "Reusable Decoration Package",
    type: "Decoration",
    basePrice: 500,
    priceUnit: "per event",
    bookings: 8,
    rating: 4.5,
  },
];

const VendorDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Welcome Section */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-eco-dark">Welcome back, {user?.name}!</h1>
              <p className="text-muted-foreground">
                Manage your services and bookings from your sustainable business dashboard.
              </p>
            </div>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white mt-4 md:mt-0"
              onClick={() => navigate('/vendor/services/new')}
            >
              Add New Service
            </Button>
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
                <div className="text-3xl font-bold text-eco-dark">
                  ${mockBookings.reduce((acc, b) => acc + b.amount, 0).toLocaleString()}
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
                <div className="text-3xl font-bold text-eco-dark">4.7</div>
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
                <div className="text-3xl font-bold text-eco-dark">412kg</div>
                <p className="text-sm text-muted-foreground mt-1">
                  Compared to traditional vendors
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Bookings Tab */}
          <section className="mb-8">
            <h2 className="text-2xl font-bold mb-6 text-eco-dark">Recent Bookings</h2>
            
            <Tabs defaultValue="all" className="mb-6">
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
                              {booking.eventType} · {new Date(booking.date).toLocaleDateString()}
                            </div>
                          </div>
                          
                          <div className="mt-4 md:mt-0 flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-sm text-muted-foreground">Amount</div>
                              <div className="font-semibold">${booking.amount}</div>
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
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                              Decline
                            </Button>
                            <Button className="bg-eco-primary hover:bg-eco-dark text-white">
                              Accept Booking
                            </Button>
                          </div>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </TabsContent>
              
              {/* Other tab contents similar to the "all" tab but filtered by status */}
              <TabsContent value="pending" className="mt-6">
                <div className="grid gap-6">
                  {mockBookings
                    .filter(booking => booking.status === 'pending')
                    .map(booking => (
                      <Card key={booking.id} className="overflow-hidden">
                        {/* Similar content as above, filtered for pending bookings */}
                        <div className="p-6">
                          <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
                            <div>
                              <div className="flex items-center gap-4">
                                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
                                <Badge className="bg-amber-500">Pending</Badge>
                              </div>
                              <div className="text-sm text-muted-foreground mt-1">
                                {booking.eventType} · {new Date(booking.date).toLocaleDateString()}
                              </div>
                            </div>
                            
                            <div className="mt-4 md:mt-0 flex items-center gap-4">
                              <div className="text-right">
                                <div className="text-sm text-muted-foreground">Amount</div>
                                <div className="font-semibold">${booking.amount}</div>
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
                            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white">
                              Decline
                            </Button>
                            <Button className="bg-eco-primary hover:bg-eco-dark text-white">
                              Accept Booking
                            </Button>
                          </div>
                        </div>
                      </Card>
                    ))}
                </div>
              </TabsContent>
              
              {/* More tabs... (similar structure) */}
            </Tabs>
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
                        <p className="text-lg font-semibold text-eco-primary">${service.basePrice}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Bookings</p>
                        <p className="text-lg font-semibold text-eco-primary">{service.bookings}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Rating</p>
                        <div className="flex items-center">
                          <span className="text-lg font-semibold text-eco-primary mr-1">{service.rating}</span>
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-500" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                    <Button 
                      className="w-full bg-eco-secondary hover:bg-eco-primary text-white"
                      onClick={() => navigate(`/vendor/services/${service.id}`)}
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
                    <div className="text-4xl font-bold text-eco-primary mb-2">412kg</div>
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
                    <div className="text-4xl font-bold text-eco-primary mb-2">24</div>
                    <p className="text-sm text-muted-foreground">Eco-Friendly Events</p>
                  </div>
                </div>
                <div className="mt-8 bg-muted/50 rounded-lg p-4">
                  <h4 className="font-semibold mb-2">Eco Certification Status:</h4>
                  <div className="flex items-center">
                    <div className="w-full bg-white rounded-full h-2.5">
                      <div className="bg-eco-primary h-2.5 rounded-full" style={{ width: '70%' }}></div>
                    </div>
                    <span className="text-sm font-medium text-eco-primary ml-4">70%</span>
                  </div>
                  <p className="text-sm mt-2 text-muted-foreground">
                    Complete 2 more sustainability criteria to achieve Gold Certification.
                    <a href="#" className="text-eco-primary font-medium ml-1">View Details</a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default VendorDashboard;
