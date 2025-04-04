
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Leaf } from "lucide-react";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
  password: z.string().min(1, { message: "Password is required." }),
});

const Login = () => {
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState<'customer' | 'vendor'>('customer');
  const navigate = useNavigate();
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await login(values.email, values.password, activeTab);
      toast({
        title: "Login successful",
        description: `Welcome back! You're now logged in as a ${activeTab === 'customer' ? 'event planner' : 'vendor'}.`,
      });
      navigate(`/${activeTab}/dashboard`);
    } catch (error) {
      console.error("Login error:", error);
      toast({
        variant: "destructive",
        title: "Login failed",
        description: "Invalid email or password. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-12 bg-eco-light">
        <div className="container mx-auto px-4 max-w-md">
          <Card className="shadow-lg border-eco-tertiary/30">
            <CardHeader className="space-y-1 text-center">
              <div className="mx-auto w-12 h-12 rounded-full bg-gradient-to-br from-eco-tertiary to-eco-primary flex items-center justify-center">
                <Leaf className="text-white h-6 w-6" />
              </div>
              <CardTitle className="text-2xl font-bold text-eco-dark pt-2">Welcome to EcoFiesta</CardTitle>
              <CardDescription>
                Sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="customer" className="mb-6" onValueChange={(value) => setActiveTab(value as 'customer' | 'vendor')}>
                <TabsList className="grid grid-cols-2 w-full">
                  <TabsTrigger value="customer">Event Planner</TabsTrigger>
                  <TabsTrigger value="vendor">Vendor</TabsTrigger>
                </TabsList>
                
                <TabsContent value="customer">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-right">
                        <a href="#" className="text-sm text-eco-primary hover:text-eco-dark">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button type="submit" className="w-full bg-eco-primary hover:bg-eco-dark transition-colors" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Login as Event Planner"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
                
                <TabsContent value="vendor">
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your email" type="email" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your password" type="password" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="text-right">
                        <a href="#" className="text-sm text-eco-primary hover:text-eco-dark">
                          Forgot password?
                        </a>
                      </div>
                      
                      <Button type="submit" className="w-full bg-eco-primary hover:bg-eco-dark transition-colors" disabled={isLoading}>
                        {isLoading ? "Processing..." : "Login as Vendor"}
                      </Button>
                    </form>
                  </Form>
                </TabsContent>
              </Tabs>
              
              <div className="text-center mt-6">
                <p className="text-sm text-muted-foreground">
                  Don't have an account?{" "}
                  <a href="/register" className="text-eco-primary hover:text-eco-dark font-medium">
                    Sign Up
                  </a>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Login;
