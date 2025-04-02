
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const slides = [
  {
    image: "https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07",
    title: "Eco-Friendly Weddings",
    description: "Create memorable wedding celebrations that respect our planet."
  },
  {
    image: "https://images.unsplash.com/photo-1511795409834-432f7b1e1212",
    title: "Sustainable Corporate Events",
    description: "Impress clients while reducing your company's environmental footprint."
  },
  {
    image: "https://images.unsplash.com/photo-1530023367847-a683933f4172",
    title: "Green Gatherings",
    description: "From birthdays to reunions, make every celebration eco-conscious."
  },
  {
    image: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a",
    title: "Carbon-Neutral Conferences",
    description: "Host professional events with minimal environmental impact."
  }
];

const Index = () => {
  const navigate = useNavigate();
  const { setUserType, isAuthenticated, user } = useAuth();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // If already logged in, redirect to dashboard
    if (isAuthenticated) {
      if (user?.userType === 'customer') {
        navigate('/customer/dashboard');
      } else if (user?.userType === 'vendor') {
        navigate('/vendor/dashboard');
      }
    }

    // Auto-slide effect
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 5000);
    
    return () => clearInterval(interval);
  }, [isAuthenticated, navigate, user]);

  const handleUserTypeSelect = (type: 'customer' | 'vendor') => {
    setUserType(type);
    navigate('/register');
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow">
        {/* Hero Section with Slider */}
        <section className="relative h-[80vh] overflow-hidden">
          <div className="absolute inset-0 z-10 bg-black/40"></div>
          
          {/* Slider */}
          <div className="relative h-full w-full">
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? "opacity-100" : "opacity-0"
                }`}
              >
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
          
          {/* Slider Navigation */}
          <div className="absolute z-20 bottom-8 left-0 right-0 flex justify-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full ${
                  index === currentSlide ? "bg-eco-accent" : "bg-white/50"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
          
          <button 
            className="absolute z-20 left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
            onClick={prevSlide}
            aria-label="Previous slide"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            className="absolute z-20 right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 rounded-full p-2 text-white"
            onClick={nextSlide}
            aria-label="Next slide"
          >
            <ChevronRight size={24} />
          </button>
          
          {/* Hero Content */}
          <div className="absolute z-20 inset-0 flex items-center justify-center">
            <div className="text-center max-w-4xl mx-auto px-6">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                <span className="text-eco-accent-light">EcoFiesta</span> - The Sustainable Event Planning Platform
              </h1>
              <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
                Connect with eco-conscious vendors and create memorable events that are kind to our planet and your budget.
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button 
                  size="lg"
                  className="bg-eco-accent hover:bg-eco-accent/80 text-white px-8 py-6 text-lg rounded-full"
                  onClick={() => navigate('/register')}
                >
                  Get Started <ArrowRight className="ml-2" size={18} />
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-white text-white hover:bg-white hover:text-eco-primary px-8 py-6 text-lg rounded-full"
                  onClick={() => navigate('/login')}
                >
                  Log In
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section className="py-16 bg-eco-light">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-eco-dark">What is EcoFiesta?</h2>
              <div className="w-24 h-1 bg-eco-accent mx-auto my-4"></div>
              <p className="mt-4 text-eco-secondary text-lg max-w-3xl mx-auto">
                We are India's first eco-friendly event planning platform, connecting environmentally conscious event planners with sustainable vendors to create memorable, responsible celebrations.
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-eco-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-eco-dark">Verified Eco-Vendors</h3>
                <p className="text-muted-foreground">
                  All our vendors are verified for their sustainable practices and eco-friendly credentials, ensuring your event truly makes a difference.
                </p>
              </div>
              
              {/* Feature 2 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-eco-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-eco-dark">Carbon Footprint Calculator</h3>
                <p className="text-muted-foreground">
                  Track and minimize the environmental impact of your events with our built-in carbon calculator designed for Indian events.
                </p>
              </div>
              
              {/* Feature 3 */}
              <div className="bg-white rounded-xl p-6 shadow-md border border-border hover:shadow-lg transition-all text-center">
                <div className="w-16 h-16 bg-eco-primary/10 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 11.5V14m0-2.5v-6a1.5 1.5 0 113 0m-3 6a1.5 1.5 0 00-3 0v2a7.5 7.5 0 0015 0v-5a1.5 1.5 0 00-3 0m-6-3V11m0-5.5v-1a1.5 1.5 0 013 0v1m0 0V11m0-5.5a1.5 1.5 0 013 0v3m0 0V11" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-eco-dark">Personalized Recommendations</h3>
                <p className="text-muted-foreground">
                  Get AI-powered sustainable decoration ideas and budget suggestions tailored to your event and local Indian resources.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Vendor Categories */}
        <section className="py-16">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-eco-dark">Explore Our Vendor Categories</h2>
              <div className="w-24 h-1 bg-eco-accent mx-auto my-4"></div>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
              {/* Category 1 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
                  </svg>
                </div>
                <h3 className="font-medium">Catering</h3>
              </div>
              
              {/* Category 2 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="font-medium">Venues</h3>
              </div>
              
              {/* Category 3 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                </div>
                <h3 className="font-medium">Decoration</h3>
              </div>
              
              {/* Category 4 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19V6l12-3v13M9 19c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zm12-3c0 1.105-1.343 2-3 2s-3-.895-3-2 1.343-2 3-2 3 .895 3 2zM9 10l12-3" />
                  </svg>
                </div>
                <h3 className="font-medium">Entertainment</h3>
              </div>
              
              {/* Category 5 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                </div>
                <h3 className="font-medium">Waste Management</h3>
              </div>
              
              {/* Category 6 */}
              <div className="bg-white rounded-xl shadow-md border border-border hover:shadow-lg transition-all text-center p-4 cursor-pointer">
                <div className="w-16 h-16 bg-eco-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-eco-secondary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h3 className="font-medium">Photography</h3>
              </div>
            </div>
          </div>
        </section>
        
        {/* Testimonials */}
        <section className="py-16 bg-eco-primary text-white">
          <div className="container mx-auto px-4 md:px-6">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">What Our Users Say</h2>
              <div className="w-24 h-1 bg-eco-accent-light mx-auto my-4"></div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-eco-accent rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-white">PR</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Priya Rao</h4>
                    <p className="text-sm opacity-80">Wedding Planner</p>
                  </div>
                </div>
                <p className="italic">
                  "EcoFiesta helped me find sustainable vendors for my client's destination wedding in Udaipur. The carbon calculator was an amazing selling point!"
                </p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-eco-accent-light" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 2 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-eco-accent rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-white">VK</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Vikram Kumar</h4>
                    <p className="text-sm opacity-80">Eco-Friendly Caterer</p>
                  </div>
                </div>
                <p className="italic">
                  "As a vendor, EcoFiesta has connected me with clients who truly value sustainable practices. My business has grown 30% since joining!"
                </p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-eco-accent-light" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              
              {/* Testimonial 3 */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-eco-accent rounded-full flex items-center justify-center mr-4">
                    <span className="font-bold text-white">AM</span>
                  </div>
                  <div>
                    <h4 className="font-semibold">Anjali Mehta</h4>
                    <p className="text-sm opacity-80">Corporate Event Manager</p>
                  </div>
                </div>
                <p className="italic">
                  "The decoration suggestions feature saved me so much time. Our clients at Tech Bangalore are impressed with how we've reduced the carbon footprint of their events."
                </p>
                <div className="mt-4 flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <svg key={star} xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${star === 5 ? 'text-white/50' : 'text-eco-accent-light'}`} viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 bg-eco-light">
          <div className="container mx-auto px-4 md:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-eco-dark">Ready to Plan Your Eco-Friendly Event?</h2>
            <p className="text-lg text-eco-secondary max-w-3xl mx-auto mb-8">
              Join EcoFiesta today and connect with vendors who share your values for sustainable, memorable events.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                className="bg-eco-primary hover:bg-eco-dark text-white px-8 py-6 text-lg"
                onClick={() => handleUserTypeSelect('customer')}
              >
                Sign Up as Event Planner
              </Button>
              <Button 
                className="bg-eco-accent hover:bg-eco-accent/80 text-white px-8 py-6 text-lg"
                onClick={() => handleUserTypeSelect('vendor')}
              >
                Sign Up as Vendor
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
