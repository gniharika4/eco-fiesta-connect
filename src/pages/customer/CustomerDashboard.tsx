
import React from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";

const mockEvents = [
  {
    id: "ev1",
    title: "Sarah's Wedding",
    date: "2023-12-15",
    status: "upcoming",
    budget: 15000,
    currentSpend: 8500,
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
    budget: 25000,
    currentSpend: 24800,
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
    imageUrl: "https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9",
  },
  {
    id: "rec2",
    title: "Solar-Powered Lighting",
    description: "Eco-friendly lighting solutions",
    savingsPercent: 45,
    carbonReduction: "0.8kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1472396961693-142e6e269027",
  },
  {
    id: "rec3",
    title: "Digital Invitations",
    description: "Paperless invites with tracking",
    savingsPercent: 90,
    carbonReduction: "0.5kg CO2",
    imageUrl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
  },
];

const CustomerDashboard = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  if (!isAuthenticated || user?.userType !== 'customer') {
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
                Manage your sustainable events and track your environmental impact.
              </p>
            </div>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white mt-4 md:mt-0"
              onClick={() => navigate('/customer/create-event')}
            >
              Create New Event
            </Button>
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
                <div className="text-3xl font-bold text-eco-dark">
                  {mockEvents.reduce((acc, ev) => acc + ev.carbonFootprint, 0).toFixed(1)}kg CO2
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
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString()}</span>
                                <span className="px-2 py-1 rounded-full bg-eco-light text-eco-primary text-xs font-medium">
                                  Upcoming
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button variant="outline" size="sm"
                                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                              >
                                Edit
                              </Button>
                              <Button size="sm" className="bg-eco-primary hover:bg-eco-dark text-white">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium">${event.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium">${event.currentSpend.toLocaleString()}</p>
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
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString()}</span>
                                <span className="px-2 py-1 rounded-full bg-muted text-muted-foreground text-xs font-medium">
                                  Complete
                                </span>
                              </div>
                            </div>
                            
                            <div className="flex gap-2">
                              <Button size="sm" className="bg-eco-primary hover:bg-eco-dark text-white">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium">${event.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium">${event.currentSpend.toLocaleString()}</p>
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
                                <span className="inline-block mr-3">{new Date(event.date).toLocaleDateString()}</span>
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
                                <Button variant="outline" size="sm"
                                  className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                                >
                                  Edit
                                </Button>
                              )}
                              <Button size="sm" className="bg-eco-primary hover:bg-eco-dark text-white">
                                View Details
                              </Button>
                            </div>
                          </div>
                          
                          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
                            <div>
                              <p className="text-sm text-muted-foreground">Budget</p>
                              <p className="font-medium">${event.budget.toLocaleString()}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">Spent</p>
                              <p className="font-medium">${event.currentSpend.toLocaleString()}</p>
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
                    <Button className="w-full mt-4 bg-eco-secondary hover:bg-eco-primary text-white">
                      Learn More
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerDashboard;
