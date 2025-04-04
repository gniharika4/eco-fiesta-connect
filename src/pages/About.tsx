
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Leaf, Check, Globe, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { DEFAULT_IMAGES } from "@/utils/imageUtils";

const AboutPage: React.FC = () => {
  const navigate = useNavigate();

  const features = [
    { 
      title: "Sustainable Vendors", 
      description: "Connect with pre-vetted eco-friendly vendors for all your event needs", 
      icon: <Check className="h-6 w-6 text-eco-primary" />
    },
    { 
      title: "Carbon Footprint Tracking", 
      description: "Measure and reduce the environmental impact of your events", 
      icon: <Globe className="h-6 w-6 text-eco-primary" /> 
    },
    { 
      title: "Eco Certification", 
      description: "Earn recognition for your commitment to sustainable event planning", 
      icon: <Shield className="h-6 w-6 text-eco-primary" /> 
    },
    { 
      title: "Streamlined Planning", 
      description: "Manage all aspects of your eco-friendly events in one place", 
      icon: <Clock className="h-6 w-6 text-eco-primary" /> 
    }
  ];

  const testimonials = [
    {
      name: "Priya Sharma",
      role: "Bride",
      text: "EcoFiesta made planning our sustainable wedding so easy. We found amazing vendors who shared our values and our guests were impressed by how elegant yet eco-friendly everything was.",
      image: DEFAULT_IMAGES.customerProfile
    },
    {
      name: "Vikram Reddy",
      role: "Corporate Event Manager",
      text: "As a company committed to sustainability, we wanted our annual retreat to reflect those values. EcoFiesta connected us with the perfect vendors and helped us track our carbon savings.",
      image: DEFAULT_IMAGES.customerProfile
    },
    {
      name: "Green Gatherings Co.",
      role: "Catering Service",
      text: "Since joining EcoFiesta as a vendor, we've connected with clients who truly appreciate our sustainable practices. Our bookings have increased significantly!",
      image: DEFAULT_IMAGES.vendorProfile
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-b from-eco-light to-white py-20">
          <div className="container mx-auto px-4 text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-eco-tertiary to-eco-primary flex items-center justify-center">
                <Leaf className="text-white h-8 w-8" />
              </div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-eco-dark mb-4">
              About <span className="text-eco-primary">EcoFiesta</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Empowering sustainable event planning in India. We connect eco-conscious customers with 
              environmentally responsible vendors to create beautiful, meaningful events with a minimal 
              carbon footprint.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-eco-primary hover:bg-eco-dark text-white"
                onClick={() => navigate('/register')}
              >
                Join Our Community
              </Button>
              <Button
                variant="outline"
                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                onClick={() => navigate('/customer/vendors')}
              >
                Browse Vendors
              </Button>
            </div>
          </div>
        </section>

        {/* Mission Statement */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-3xl font-bold text-eco-dark mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                At EcoFiesta, we're committed to transforming the event planning industry in India by 
                making sustainability accessible, affordable, and beautiful. We believe that 
                celebrations and gatherings can honor both cultural traditions and environmental 
                responsibility.
              </p>
              <p className="text-lg text-muted-foreground">
                Our platform connects event planners and individuals with eco-conscious vendors who 
                prioritize sustainable practices, from zero-waste catering to energy-efficient lighting, 
                plastic-free decorations to carbon-offset transportation options.
              </p>
            </div>
          </div>
        </section>

        {/* Features */}
        <section className="py-16 bg-eco-light">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-eco-dark text-center mb-12">What We Offer</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-eco-dark text-center mb-12">What Our Users Say</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {testimonials.map((testimonial, index) => (
                <Card key={index} className="border-none shadow-md">
                  <CardContent className="pt-6">
                    <div className="flex items-center mb-4">
                      <Avatar className="h-12 w-12 mr-4">
                        <AvatarImage src={testimonial.image} alt={testimonial.name} />
                        <AvatarFallback className="bg-eco-secondary text-white">
                          {testimonial.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <h4 className="font-semibold">{testimonial.name}</h4>
                        <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-muted-foreground italic">{testimonial.text}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Impact Stats */}
        <section className="py-16 bg-eco-primary text-white">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Impact</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <p>Sustainable Events</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">100+</div>
                <p>Eco-Friendly Vendors</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">15,000+</div>
                <p>kg of CO2 Saved</p>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">90%</div>
                <p>Waste Reduction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Join Us CTA */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold text-eco-dark mb-6">Join the Sustainable Event Movement</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
              Whether you're planning a wedding, corporate event, or family celebration, EcoFiesta helps you 
              create beautiful memories while protecting our planet.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button
                className="bg-eco-primary hover:bg-eco-dark text-white"
                onClick={() => navigate('/register')}
              >
                Sign Up Now
              </Button>
              <Button
                variant="outline"
                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AboutPage;
