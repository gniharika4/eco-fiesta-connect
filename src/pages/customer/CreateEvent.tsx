
import React from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useAuth } from "@/contexts/AuthContext";

const formSchema = z.object({
  eventName: z.string().min(3, { message: "Event name must be at least 3 characters." }),
  eventType: z.string().min(1, { message: "Please select an event type." }),
  eventDate: z.string().min(1, { message: "Please select a date." }),
  guestCount: z.coerce.number().min(1, { message: "Guest count must be at least 1." }),
  budget: z.coerce.number().min(100, { message: "Budget must be at least $100." }),
  location: z.string().min(3, { message: "Location must be at least 3 characters." }),
  description: z.string().min(10, { message: "Please provide more details about your event." }),
  sustainabilityPreferences: z.array(z.string()).optional(),
});

const eventTypes = [
  { value: "wedding", label: "Wedding" },
  { value: "corporate", label: "Corporate Event" },
  { value: "birthday", label: "Birthday Party" },
  { value: "anniversary", label: "Anniversary" },
  { value: "fundraiser", label: "Fundraiser" },
  { value: "other", label: "Other" },
];

const CreateEvent = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check if user is authenticated as a customer
  if (!isAuthenticated || user?.userType !== 'customer') {
    navigate('/login');
    return null;
  }

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventName: "",
      eventType: "",
      eventDate: "",
      guestCount: 50,
      budget: 5000,
      location: "",
      description: "",
      sustainabilityPreferences: [],
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    console.log("Form values:", values);
    
    // In a real app, this would send the data to an API
    toast({
      title: "Event Created!",
      description: "Your event has been created successfully.",
    });
    
    setTimeout(() => {
      navigate('/customer/dashboard');
    }, 1500);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4 max-w-4xl">
          <Card className="shadow-lg mb-8">
            <CardHeader className="text-center border-b border-border pb-6">
              <CardTitle className="text-3xl font-bold text-eco-dark">Create Your Event</CardTitle>
              <CardDescription>
                Fill in the details below to start planning your sustainable event
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="eventName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Name</FormLabel>
                          <FormControl>
                            <Input placeholder="e.g. Sarah's Wedding" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="eventType"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Type</FormLabel>
                          <Select 
                            onValueChange={field.onChange}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select event type" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {eventTypes.map((type) => (
                                <SelectItem key={type.value} value={type.value}>
                                  {type.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="eventDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Event Date</FormLabel>
                          <FormControl>
                            <Input type="date" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="guestCount"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Number of Guests</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="budget"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Budget ($)</FormLabel>
                          <FormControl>
                            <Input type="number" {...field} />
                          </FormControl>
                          <FormDescription>
                            Your total budget for the event
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="location"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Location</FormLabel>
                          <FormControl>
                            <Input placeholder="City, State" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Event Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Please provide details about your event..."
                            className="min-h-[120px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription>
                          Include details that will help vendors understand your needs
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  {/* Sustainability Preferences Section */}
                  <div className="border border-muted rounded-lg p-4 bg-muted/30">
                    <h3 className="text-lg font-medium mb-4">Sustainability Preferences</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="local-sourcing" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="local-sourcing" className="text-sm">Local Ingredient Sourcing</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="zero-waste" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="zero-waste" className="text-sm">Zero-Waste Packaging</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="renewable-energy" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="renewable-energy" className="text-sm">Renewable Energy</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="carbon-offset" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="carbon-offset" className="text-sm">Carbon Offset Options</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="composting" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="composting" className="text-sm">Composting Available</label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <input type="checkbox" id="digital-invites" className="rounded text-eco-primary focus:ring-eco-primary" />
                        <label htmlFor="digital-invites" className="text-sm">Digital Invitations</label>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex justify-between pt-4 border-t border-border">
                    <Button type="button" variant="outline" onClick={() => navigate('/customer/dashboard')}>
                      Cancel
                    </Button>
                    <Button type="submit" className="bg-eco-primary hover:bg-eco-dark">
                      Create Event
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card className="bg-eco-primary/10">
            <CardContent className="pt-6">
              <div className="flex items-start space-x-4">
                <div className="rounded-full bg-eco-primary/20 p-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-eco-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-semibold text-lg mb-2 text-eco-dark">What happens next?</h3>
                  <p className="text-muted-foreground">
                    After creating your event, we'll recommend eco-friendly vendors that match your preferences. 
                    You'll be able to view their profiles, services, and sustainability practices before making 
                    your booking decisions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CreateEvent;
