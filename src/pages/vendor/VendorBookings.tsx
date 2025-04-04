
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Check, IndianRupee, Calendar, MapPin, X, Clock } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const mockBookings = [
  {
    id: "book1",
    customerName: "Priya Sharma",
    customerImage: "/avatars/customer-avatar.jpg",
    eventType: "Wedding",
    date: "2023-12-15",
    time: "18:00",
    location: "Taj Palace, Delhi",
    serviceName: "Eco-Friendly Catering",
    status: "confirmed",
    amount: 120000,
    message: "Looking forward to collaborating on our sustainable wedding!",
    details: "Catering for 250 guests. Vegetarian and vegan options required. Seeking zero-waste approach with compostable serviceware."
  },
  {
    id: "book2",
    customerName: "Tech Innovators Inc.",
    customerImage: null,
    eventType: "Corporate Retreat",
    date: "2023-11-05",
    time: "09:00",
    location: "Green Valley Resort, Manesar",
    serviceName: "Eco-Friendly Catering",
    status: "pending",
    amount: 350000,
    message: "We need sustainable catering for 50 people with vegan options.",
    details: "Three-day corporate retreat with 75 attendees. Need breakfast, lunch, and dinner for all days. Emphasis on local sourcing and zero plastic."
  },
  {
    id: "book3",
    customerName: "Mahesh Roberts",
    customerImage: "/avatars/customer-avatar.jpg",
    eventType: "Birthday Party",
    date: "2023-10-22",
    time: "20:00",
    location: "Blue Ocean Banquet, Mumbai",
    serviceName: "Reusable Decoration Package",
    status: "completed",
    amount: 80000,
    message: "Thanks for making our event eco-friendly!",
    details: "30th birthday celebration with nature theme. Used recycled materials for all decorations. Client provided excellent feedback on the sustainable approach."
  },
  {
    id: "book4",
    customerName: "Raj Malhotra",
    customerImage: null,
    eventType: "Wedding Anniversary",
    date: "2023-12-30",
    time: "19:30",
    location: "Greenwood Estate, Bangalore",
    serviceName: "Reusable Decoration Package",
    status: "pending",
    amount: 65000,
    message: "Looking for elegant yet sustainable decor for our 25th anniversary.",
    details: "Silver jubilee anniversary celebration with 100 guests. Indoor and outdoor spaces need decoration. Emphasis on reusable elements that can be later donated."
  },
];

const VendorBookings = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("all");
  const [showBookingDetails, setShowBookingDetails] = useState<any>(null);

  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  const handleAcceptBooking = (bookingId: string) => {
    toast({
      title: "Booking Accepted",
      description: "You have accepted the booking request. The customer has been notified.",
    });
    setShowBookingDetails(null);
  };

  const handleDeclineBooking = (bookingId: string) => {
    toast({
      title: "Booking Declined",
      description: "You have declined the booking request. The customer has been notified.",
    });
    setShowBookingDetails(null);
  };

  const handleCompleteBooking = (bookingId: string) => {
    toast({
      title: "Booking Marked as Completed",
      description: "This booking has been marked as completed. The customer can now leave a review.",
    });
    setShowBookingDetails(null);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-eco-dark">Bookings</h1>
            <p className="text-muted-foreground mt-2">
              Manage your service bookings and client requests
            </p>
          </div>

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
                  <BookingCard
                    key={booking.id}
                    booking={booking}
                    onViewDetails={() => setShowBookingDetails(booking)}
                    onAccept={() => handleAcceptBooking(booking.id)}
                    onDecline={() => handleDeclineBooking(booking.id)}
                    onComplete={() => handleCompleteBooking(booking.id)}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="pending" className="mt-6">
              <div className="grid gap-6">
                {mockBookings
                  .filter(booking => booking.status === 'pending')
                  .map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewDetails={() => setShowBookingDetails(booking)}
                      onAccept={() => handleAcceptBooking(booking.id)}
                      onDecline={() => handleDeclineBooking(booking.id)}
                      onComplete={() => handleCompleteBooking(booking.id)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="confirmed" className="mt-6">
              <div className="grid gap-6">
                {mockBookings
                  .filter(booking => booking.status === 'confirmed')
                  .map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewDetails={() => setShowBookingDetails(booking)}
                      onAccept={() => handleAcceptBooking(booking.id)}
                      onDecline={() => handleDeclineBooking(booking.id)}
                      onComplete={() => handleCompleteBooking(booking.id)}
                    />
                  ))}
              </div>
            </TabsContent>
            
            <TabsContent value="completed" className="mt-6">
              <div className="grid gap-6">
                {mockBookings
                  .filter(booking => booking.status === 'completed')
                  .map(booking => (
                    <BookingCard
                      key={booking.id}
                      booking={booking}
                      onViewDetails={() => setShowBookingDetails(booking)}
                      onAccept={() => handleAcceptBooking(booking.id)}
                      onDecline={() => handleDeclineBooking(booking.id)}
                      onComplete={() => handleCompleteBooking(booking.id)}
                    />
                  ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      
      {/* Booking Details Dialog */}
      <Dialog open={!!showBookingDetails} onOpenChange={() => setShowBookingDetails(null)}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
          </DialogHeader>
          {showBookingDetails && (
            <div className="grid gap-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  {showBookingDetails.customerImage ? (
                    <div className="h-12 w-12 rounded-full overflow-hidden">
                      <img 
                        src={showBookingDetails.customerImage}
                        alt={showBookingDetails.customerName} 
                        className="h-full w-full object-cover"
                        onError={(e) => {
                          const target = e.target as HTMLImageElement;
                          target.src = "/avatars/customer-avatar.jpg";
                        }}
                      />
                    </div>
                  ) : (
                    <div className="h-12 w-12 bg-eco-secondary text-white rounded-full flex items-center justify-center">
                      {showBookingDetails.customerName.charAt(0)}
                    </div>
                  )}
                  <div>
                    <h3 className="font-semibold text-lg">{showBookingDetails.customerName}</h3>
                    <p className="text-sm text-muted-foreground">{showBookingDetails.serviceName}</p>
                  </div>
                </div>
                <div>
                  <Badge className={`${
                    showBookingDetails.status === 'confirmed' ? 'bg-green-500' : 
                    showBookingDetails.status === 'pending' ? 'bg-amber-500' :
                    'bg-blue-500'
                  }`}>
                    {showBookingDetails.status.charAt(0).toUpperCase() + showBookingDetails.status.slice(1)}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-eco-primary" />
                  <span>Date: {new Date(showBookingDetails.date).toLocaleDateString('en-IN')}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-eco-primary" />
                  <span>Time: {showBookingDetails.time}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-eco-primary" />
                  <span>Location: {showBookingDetails.location}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <IndianRupee className="h-4 w-4 text-eco-primary" />
                  <span>Amount: ₹{showBookingDetails.amount.toLocaleString('en-IN')}</span>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Event Type</h4>
                <p className="text-sm">{showBookingDetails.eventType}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Message</h4>
                <p className="text-sm bg-muted/50 p-3 rounded-md">{showBookingDetails.message}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-1">Details</h4>
                <p className="text-sm">{showBookingDetails.details}</p>
              </div>
            </div>
          )}
          <DialogFooter>
            {showBookingDetails?.status === 'pending' && (
              <>
                <Button 
                  variant="outline" 
                  className="border-red-500 text-red-500 hover:bg-red-500 hover:text-white"
                  onClick={() => handleDeclineBooking(showBookingDetails.id)}
                >
                  Decline
                </Button>
                <Button 
                  className="bg-eco-primary hover:bg-eco-dark text-white"
                  onClick={() => handleAcceptBooking(showBookingDetails.id)}
                >
                  Accept Booking
                </Button>
              </>
            )}
            
            {showBookingDetails?.status === 'confirmed' && (
              <Button 
                className="bg-eco-primary hover:bg-eco-dark text-white"
                onClick={() => handleCompleteBooking(showBookingDetails.id)}
              >
                Mark as Completed
              </Button>
            )}
            
            {showBookingDetails?.status === 'completed' && (
              <Button 
                variant="outline"
                onClick={() => setShowBookingDetails(null)}
              >
                Close
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

// Booking Card Component
interface BookingCardProps {
  booking: any;
  onViewDetails: () => void;
  onAccept: () => void;
  onDecline: () => void;
  onComplete: () => void;
}

const BookingCard: React.FC<BookingCardProps> = ({ booking, onViewDetails, onAccept, onDecline, onComplete }) => {
  return (
    <Card className="overflow-hidden">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-center mb-4">
          <div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                {booking.customerImage ? (
                  <div className="h-10 w-10 rounded-full overflow-hidden">
                    <img 
                      src={booking.customerImage}
                      alt={booking.customerName} 
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = "/avatars/customer-avatar.jpg";
                      }}
                    />
                  </div>
                ) : (
                  <div className="h-10 w-10 bg-eco-secondary text-white rounded-full flex items-center justify-center">
                    {booking.customerName.charAt(0)}
                  </div>
                )}
                <h3 className="text-xl font-semibold">{booking.customerName}</h3>
              </div>
              <Badge className={`${
                booking.status === 'confirmed' ? 'bg-green-500' : 
                booking.status === 'pending' ? 'bg-amber-500' :
                'bg-blue-500'
              }`}>
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </Badge>
            </div>
            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                {new Date(booking.date).toLocaleDateString('en-IN')}
              </div>
              <div>{booking.eventType}</div>
              <div>{booking.serviceName}</div>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Amount</div>
              <div className="font-semibold flex items-center">
                <IndianRupee className="h-4 w-4" />{booking.amount.toLocaleString('en-IN')}
              </div>
            </div>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark"
              onClick={onViewDetails}
            >
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
              onClick={onDecline}
            >
              <X className="mr-1 h-4 w-4" />
              Decline
            </Button>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white"
              onClick={onAccept}
            >
              <Check className="mr-1 h-4 w-4" />
              Accept
            </Button>
          </div>
        )}
        
        {booking.status === 'confirmed' && (
          <div className="mt-4 flex gap-2 justify-end">
            <Button 
              className="bg-eco-secondary hover:bg-eco-primary text-white"
              onClick={onComplete}
            >
              <Check className="mr-1 h-4 w-4" />
              Mark as Complete
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default VendorBookings;
