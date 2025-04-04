
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { IndianRupee, Calendar } from "lucide-react";

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
  {
    id: "ev3",
    title: "Family Reunion",
    date: "2023-11-20",
    status: "upcoming",
    budget: 800000,
    currentSpend: 350000,
    carbonFootprint: 1.8,
    vendors: 3,
    tasks: 9,
    completedTasks: 4,
  },
  {
    id: "ev4",
    title: "Product Launch",
    date: "2023-09-12",
    status: "past",
    budget: 1800000,
    currentSpend: 1750000,
    carbonFootprint: 3.2,
    vendors: 6,
    tasks: 18,
    completedTasks: 18,
  }
];

const CustomerEvents: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("upcoming");

  if (!isAuthenticated || user?.userType !== 'customer') {
    navigate('/login');
    return null;
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Page Title */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-eco-dark">My Events</h1>
              <p className="text-muted-foreground">
                Manage your sustainable events and track progress
              </p>
            </div>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white mt-4 md:mt-0"
              onClick={() => navigate('/customer/create-event')}
            >
              Create New Event
            </Button>
          </div>

          {/* Events Tab */}
          <Tabs defaultValue="upcoming" onValueChange={setActiveTab} className="mb-8">
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
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CustomerEvents;
