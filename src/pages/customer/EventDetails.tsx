
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowLeft, CalendarIcon, IndianRupee, User, MapPin, Clock, Edit } from "lucide-react";

// Mock event data (this would come from a database in production)
const mockEvents = [
  {
    id: "ev1",
    title: "Rohit's Wedding",
    date: "2023-12-15",
    time: "6:00 PM - 10:00 PM",
    location: "Taj Bangalore, MG Road, Bangalore",
    status: "upcoming",
    budget: 1500000, // in INR
    currentSpend: 850000,
    carbonFootprint: 2.4,
    vendors: [
      {
        id: "v1",
        name: "Green Gatherings Co.",
        category: "Catering",
        price: 200000,
        status: "confirmed"
      },
      {
        id: "v2",
        name: "EcoDecor Events",
        category: "Decoration",
        price: 150000,
        status: "confirmed"
      },
      {
        id: "v3",
        name: "Clean Stream Waste Management",
        category: "Waste Management",
        price: 50000,
        status: "pending"
      }
    ],
    tasks: [
      { id: "t1", name: "Book venue", status: "completed", dueDate: "2023-09-15" },
      { id: "t2", name: "Finalize menu", status: "completed", dueDate: "2023-10-20" },
      { id: "t3", name: "Send invitations", status: "completed", dueDate: "2023-11-01" },
      { id: "t4", name: "Confirm guest count", status: "in-progress", dueDate: "2023-12-01" },
      { id: "t5", name: "Final walkthrough", status: "pending", dueDate: "2023-12-10" }
    ],
    guestCount: 250,
    description: "An eco-friendly wedding celebration with sustainable practices including zero plastic waste, locally sourced food, and digital invitations to reduce paper waste.",
    sustainabilityMeasures: [
      "Zero single-use plastics",
      "Plant-based menu options",
      "Carbon offset for guest travel",
      "Digital invitations",
      "Reusable decorations"
    ],
    images: [
      "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
      "https://images.unsplash.com/photo-1511795409834-432f7b1e1212",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
    ]
  },
  {
    id: "ev2",
    title: "Corporate Retreat",
    date: "2023-10-05",
    time: "9:00 AM - 5:00 PM",
    location: "Leela Palace, Delhi",
    status: "past",
    budget: 2500000,
    currentSpend: 2480000,
    carbonFootprint: 4.2,
    vendors: [
      {
        id: "v4",
        name: "Zero Impact Sounds",
        category: "Entertainment",
        price: 300000,
        status: "completed"
      },
      {
        id: "v5",
        name: "Green Eats Catering",
        category: "Catering",
        price: 500000,
        status: "completed"
      }
    ],
    tasks: [
      { id: "t6", name: "Book venue", status: "completed", dueDate: "2023-07-15" },
      { id: "t7", name: "Arrange transport", status: "completed", dueDate: "2023-08-10" },
      { id: "t8", name: "Plan activities", status: "completed", dueDate: "2023-09-01" },
      { id: "t9", name: "Finalize attendees", status: "completed", dueDate: "2023-09-20" }
    ],
    guestCount: 75,
    description: "A team-building retreat focusing on sustainability and corporate responsibility. All materials used are biodegradable, and activities centered around environmental conservation.",
    sustainabilityMeasures: [
      "Carbon-neutral transportation",
      "Waste segregation stations",
      "Paperless presentations",
      "Sustainability workshops"
    ],
    images: [
      "https://images.unsplash.com/photo-1530023367847-a683933f4172",
      "https://images.unsplash.com/photo-1511795409834-432f7b1e1212"
    ]
  }
];

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();
  const [event, setEvent] = useState<any>(null);

  // Check if user is authenticated as a customer
  useEffect(() => {
    if (!isAuthenticated || user?.userType !== 'customer') {
      navigate('/login');
      return;
    }

    // Find event by ID from mock data
    const foundEvent = mockEvents.find(e => e.id === id);
    if (foundEvent) {
      setEvent(foundEvent);
    } else {
      navigate('/customer/dashboard');
    }
  }, [id, navigate, isAuthenticated, user]);

  if (!event) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <p>Loading event details...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Back button and title */}
          <div className="mb-6">
            <Button 
              variant="ghost" 
              className="mb-2 pl-0 flex items-center text-muted-foreground hover:text-foreground"
              onClick={() => navigate('/customer/dashboard')}
            >
              <ArrowLeft className="mr-1 h-4 w-4" />
              Back to Dashboard
            </Button>
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-eco-dark">{event.title}</h1>
                <div className="flex items-center text-muted-foreground mt-1">
                  <CalendarIcon className="mr-1 h-4 w-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-IN', { 
                      day: 'numeric', 
                      month: 'long', 
                      year: 'numeric' 
                    })}
                  </span>
                  <span className="mx-2">•</span>
                  <Clock className="mr-1 h-4 w-4" />
                  <span>{event.time}</span>
                </div>
              </div>
              
              {event.status === 'upcoming' && (
                <Button 
                  className="bg-eco-primary hover:bg-eco-dark flex items-center"
                  onClick={() => navigate(`/customer/events/${event.id}/edit`)}
                >
                  <Edit className="mr-2 h-4 w-4" />
                  Edit Event
                </Button>
              )}
            </div>
          </div>

          {/* Event Status Card */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Event Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-medium mb-2">Details</h3>
                    <div className="space-y-3">
                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Location</p>
                          <p className="text-muted-foreground">{event.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <User className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Guest Count</p>
                          <p className="text-muted-foreground">{event.guestCount} attendees</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start">
                        <IndianRupee className="h-5 w-5 mr-2 text-muted-foreground mt-0.5" />
                        <div>
                          <p className="font-medium">Budget</p>
                          <p className="text-muted-foreground">
                            ₹{event.currentSpend.toLocaleString('en-IN')} of ₹{event.budget.toLocaleString('en-IN')} 
                            ({Math.round((event.currentSpend / event.budget) * 100)}%)
                          </p>
                          <div className="w-full h-2 bg-gray-200 rounded-full mt-1">
                            <div 
                              className="h-full bg-eco-primary rounded-full" 
                              style={{ width: `${Math.round((event.currentSpend / event.budget) * 100)}%` }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <div className="mb-4">
                      <h3 className="font-medium mb-2">Description</h3>
                      <p className="text-muted-foreground">{event.description}</p>
                    </div>
                    
                    <div>
                      <h3 className="font-medium mb-2">Sustainability Measures</h3>
                      <div className="flex flex-wrap gap-2">
                        {event.sustainabilityMeasures.map((measure: string, index: number) => (
                          <Badge key={index} variant="secondary" className="bg-eco-primary/10 text-eco-primary">
                            {measure}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Carbon Footprint */}
                <div className="mt-6 border-t pt-4">
                  <h3 className="font-medium mb-2">Carbon Footprint Estimate</h3>
                  <div className="flex items-center">
                    <div className="w-full max-w-md">
                      <div className="flex justify-between mb-1 text-sm">
                        <span>Very Low Impact</span>
                        <span>High Impact</span>
                      </div>
                      <div className="w-full h-3 bg-gray-200 rounded-full relative">
                        <div className="absolute w-3 h-6 bg-eco-primary rounded-full -top-1.5" style={{ left: `${(event.carbonFootprint / 10) * 100}%` }}></div>
                        <div className="absolute text-xs -top-6" style={{ left: `${(event.carbonFootprint / 10) * 100}%`, transform: 'translateX(-50%)' }}>
                          {event.carbonFootprint} tons
                        </div>
                      </div>
                    </div>
                    
                    <div className="ml-8">
                      <p className="text-muted-foreground">
                        This event has {event.carbonFootprint < 3 ? 'lower' : 'higher'} carbon impact than average events of this type.
                      </p>
                      <p className="text-eco-primary text-sm font-medium mt-1">
                        {event.carbonFootprint < 3 ? 'Great job! Your event is eco-friendly!' : 'Consider additional sustainability measures'}
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Event Gallery */}
            <Card>
              <CardHeader>
                <CardTitle>Event Gallery</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                {event.images.map((img: string, idx: number) => (
                  <div key={idx} className="rounded-md overflow-hidden h-40">
                    <img
                      src={img}
                      alt={`Event image ${idx + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform"
                    />
                  </div>
                ))}
                {event.status === 'upcoming' && (
                  <Button className="w-full mt-2" variant="outline">Add Photos</Button>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Event Tabs */}
          <Tabs defaultValue="vendors" className="mt-8">
            <TabsList className="mb-4">
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="tasks">Tasks</TabsTrigger>
              <TabsTrigger value="budget">Budget</TabsTrigger>
            </TabsList>
            
            {/* Vendors Tab */}
            <TabsContent value="vendors">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Event Vendors</CardTitle>
                    {event.status === 'upcoming' && (
                      <Button className="bg-eco-primary hover:bg-eco-dark">Add Vendor</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {event.vendors.map((vendor: any) => (
                      <div key={vendor.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div>
                            <h4 className="font-medium">{vendor.name}</h4>
                            <div className="flex items-center mt-1">
                              <Badge variant="outline">{vendor.category}</Badge>
                              <span className="mx-2 text-muted-foreground">•</span>
                              <span className="text-muted-foreground">
                                ₹{vendor.price.toLocaleString('en-IN')}
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center">
                            <Badge className={`mr-4 ${
                              vendor.status === 'confirmed' ? 'bg-green-500' : 
                              vendor.status === 'pending' ? 'bg-amber-500' :
                              'bg-blue-500'
                            }`}>
                              {vendor.status.charAt(0).toUpperCase() + vendor.status.slice(1)}
                            </Badge>
                            <Button variant="ghost" size="sm">View</Button>
                          </div>
                        </div>
                      </div>
                    ))}
                    
                    {event.vendors.length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">No vendors added to this event yet</p>
                        <Button className="bg-eco-primary hover:bg-eco-dark">Find Vendors</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Tasks Tab */}
            <TabsContent value="tasks">
              <Card>
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle>Event Tasks</CardTitle>
                    {event.status === 'upcoming' && (
                      <Button className="bg-eco-primary hover:bg-eco-dark">Add Task</Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="divide-y">
                    {event.tasks.map((task: any) => (
                      <div key={task.id} className="py-4 first:pt-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center">
                            <div className={`w-4 h-4 rounded-full mr-3 ${
                              task.status === 'completed' ? 'bg-green-500' :
                              task.status === 'in-progress' ? 'bg-amber-500' :
                              'bg-gray-300'
                            }`}></div>
                            <div>
                              <p className={`${task.status === 'completed' ? 'line-through text-muted-foreground' : 'font-medium'}`}>
                                {task.name}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                Due: {new Date(task.dueDate).toLocaleDateString('en-IN')}
                              </p>
                            </div>
                          </div>
                          
                          {event.status === 'upcoming' && task.status !== 'completed' && (
                            <Button variant="outline" size="sm">Mark Complete</Button>
                          )}
                        </div>
                      </div>
                    ))}
                    
                    {event.tasks.length === 0 && (
                      <div className="py-8 text-center">
                        <p className="text-muted-foreground mb-4">No tasks for this event yet</p>
                        <Button className="bg-eco-primary hover:bg-eco-dark">Add First Task</Button>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Budget Tab */}
            <TabsContent value="budget">
              <Card>
                <CardHeader>
                  <CardTitle>Budget Breakdown</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Total Budget:</span>
                      <span className="font-medium">₹{event.budget.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="font-medium">Total Spent:</span>
                      <span className="font-medium">₹{event.currentSpend.toLocaleString('en-IN')}</span>
                    </div>
                    <div className="flex justify-between text-eco-primary">
                      <span className="font-medium">Remaining:</span>
                      <span className="font-medium">₹{(event.budget - event.currentSpend).toLocaleString('en-IN')}</span>
                    </div>
                    
                    <div className="w-full h-3 bg-gray-200 rounded-full mt-4">
                      <div 
                        className="h-full bg-eco-primary rounded-full" 
                        style={{ width: `${Math.round((event.currentSpend / event.budget) * 100)}%` }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs mt-1">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-4">Vendor Expenses</h3>
                  <div className="space-y-4">
                    {event.vendors.map((vendor: any) => (
                      <div key={vendor.id} className="flex justify-between">
                        <div>
                          <p className="font-medium">{vendor.name}</p>
                          <p className="text-sm text-muted-foreground">{vendor.category}</p>
                        </div>
                        <span className="font-medium">₹{vendor.price.toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    
                    {event.status === 'upcoming' && (
                      <Button variant="outline" className="w-full mt-4">Add Expense</Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default EventDetails;
