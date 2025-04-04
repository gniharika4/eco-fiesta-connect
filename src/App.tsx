
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider } from "./contexts/AuthContext";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import Register from "./pages/Register";
import About from "./pages/About";

// Customer Routes
import CustomerDashboard from "./pages/customer/CustomerDashboard";
import CreateEvent from "./pages/customer/CreateEvent";
import FindVendors from "./pages/customer/FindVendors";
import EventDetails from "./pages/customer/EventDetails";
import RecommendationDetails from "./pages/customer/RecommendationDetails";
import CustomerEvents from "./pages/customer/CustomerEvents";

// Vendor Routes
import VendorDashboard from "./pages/vendor/VendorDashboard";
import ManageOffers from "./pages/vendor/ManageOffers";
import VendorServices from "./pages/vendor/VendorServices";
import AddEditService from "./pages/vendor/AddEditService";
import VendorBookings from "./pages/vendor/VendorBookings";

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      refetchOnWindowFocus: false,
    },
  },
});

const App: React.FC = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            
            {/* Customer Routes */}
            <Route path="/customer/dashboard" element={<CustomerDashboard />} />
            <Route path="/customer/create-event" element={<CreateEvent />} />
            <Route path="/customer/vendors" element={<FindVendors />} />
            <Route path="/customer/events" element={<CustomerEvents />} />
            <Route path="/customer/events/:id" element={<EventDetails />} />
            <Route path="/customer/events/:id/edit" element={<EventDetails />} />
            <Route path="/customer/recommendations/:id" element={<RecommendationDetails />} />
            
            {/* Vendor Routes */}
            <Route path="/vendor/dashboard" element={<VendorDashboard />} />
            <Route path="/vendor/offers" element={<ManageOffers />} />
            <Route path="/vendor/services" element={<VendorServices />} />
            <Route path="/vendor/services/new" element={<AddEditService />} />
            <Route path="/vendor/services/:id" element={<AddEditService />} />
            <Route path="/vendor/bookings" element={<VendorBookings />} />
            
            {/* Catch-all Route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
