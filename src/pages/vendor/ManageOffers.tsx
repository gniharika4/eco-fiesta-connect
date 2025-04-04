
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useAuth } from "@/contexts/AuthContext";
import { Gift, Plus, Trash, Edit, Calendar, CircleDollarSign } from "lucide-react";
import { toast } from "@/hooks/use-toast";

// Sample seasonal offers (in a real app, this would come from an API)
const mockOffers = [
  {
    id: "offer1",
    title: "Diwali Special",
    description: "20% off on eco-friendly lighting packages for events during the Diwali season",
    validUntil: "2023-11-15",
    discount: 20,
    code: "ECODIWALI",
    image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81",
    active: true
  },
  {
    id: "offer2",
    title: "Christmas Green",
    description: "15% discount on sustainable decor packages using natural materials",
    validUntil: "2023-12-31",
    discount: 15,
    code: "XMASGREEN",
    image: "https://images.unsplash.com/photo-1512149074996-e923ac45be6d",
    active: true
  },
  {
    id: "offer3",
    title: "Summer Wedding Special",
    description: "Free carbon offset with any wedding package booked for summer months",
    validUntil: "2023-08-31",
    discount: 0,
    isSpecial: true,
    code: "GREENSUM23",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    active: false
  },
  {
    id: "offer4",
    title: "Holi Celebration Package",
    description: "Natural colors and eco-friendly decorations for Holi events",
    validUntil: "2024-03-10",
    discount: 10,
    code: "ECOHOLI24",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f",
    active: false
  }
];

const ManageOffers = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [showOfferModal, setShowOfferModal] = useState<any>(null);
  const [showDeleteModal, setShowDeleteModal] = useState<string | null>(null);

  if (!isAuthenticated || user?.userType !== 'vendor') {
    navigate('/login');
    return null;
  }

  const handleCreateOffer = () => {
    setShowOfferModal({
      title: "",
      description: "",
      validUntil: new Date().toISOString().split('T')[0],
      discount: 10,
      code: "",
      image: "",
      active: true,
      isNew: true
    });
  };

  const handleEditOffer = (offer: any) => {
    setShowOfferModal({...offer, isNew: false});
  };

  const handleDeleteOffer = (offerId: string) => {
    setShowDeleteModal(offerId);
  };

  const confirmDelete = () => {
    if (showDeleteModal) {
      toast({
        title: "Offer Deleted",
        description: "The seasonal offer has been successfully deleted.",
      });
      setShowDeleteModal(null);
    }
  };

  const saveOffer = () => {
    toast({
      title: showOfferModal?.isNew ? "Offer Created" : "Offer Updated",
      description: `Your seasonal offer has been successfully ${showOfferModal?.isNew ? "created" : "updated"}.`,
    });
    setShowOfferModal(null);
  };

  const toggleOfferStatus = (offerId: string, currentStatus: boolean) => {
    toast({
      title: currentStatus ? "Offer Deactivated" : "Offer Activated",
      description: `The offer has been ${currentStatus ? "deactivated" : "activated"} successfully.`,
    });
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow py-8 bg-eco-light">
        <div className="container mx-auto px-4">
          {/* Page header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-eco-dark">Seasonal Offers</h1>
              <p className="text-muted-foreground">
                Create and manage promotional offers for your sustainable services
              </p>
            </div>
            <Button 
              className="bg-eco-primary hover:bg-eco-dark text-white mt-4 md:mt-0 flex items-center gap-2"
              onClick={handleCreateOffer}
            >
              <Plus className="h-4 w-4" />
              Create New Offer
            </Button>
          </div>

          {/* Active Offers */}
          <section className="mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Badge className="bg-green-500">Active</Badge>
              <span>Current Offers</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOffers.filter(offer => offer.active).map(offer => (
                <Card key={offer.id} className="overflow-hidden">
                  <div className="h-40 overflow-hidden relative">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    {offer.discount > 0 && (
                      <div className="absolute top-0 right-0 bg-eco-primary text-white px-3 py-1 rounded-bl-lg">
                        {offer.discount}% OFF
                      </div>
                    )}
                    {offer.isSpecial && (
                      <div className="absolute top-0 right-0 bg-eco-secondary text-white px-3 py-1 rounded-bl-lg">
                        SPECIAL OFFER
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Valid until: {new Date(offer.validUntil).toLocaleDateString('en-IN')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded w-fit">
                      <CircleDollarSign className="h-4 w-4 text-eco-primary" />
                      <span className="font-mono text-sm font-medium">{offer.code}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-red-500 border-red-500 hover:bg-red-500 hover:text-white"
                      onClick={() => toggleOfferStatus(offer.id, true)}
                    >
                      Deactivate
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteOffer(offer.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="default" 
                        size="sm" 
                        className="bg-eco-primary hover:bg-eco-dark"
                        onClick={() => handleEditOffer(offer)}
                      >
                        <Edit className="h-4 w-4 mr-1" /> Edit
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}

              {mockOffers.filter(offer => offer.active).length === 0 && (
                <div className="col-span-full py-12 text-center">
                  <Gift className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium mb-2">No active offers</h3>
                  <p className="text-muted-foreground mb-6">Create your first seasonal offer to attract more customers</p>
                  <Button 
                    className="bg-eco-primary hover:bg-eco-dark text-white"
                    onClick={handleCreateOffer}
                  >
                    Create New Offer
                  </Button>
                </div>
              )}
            </div>
          </section>

          {/* Inactive Offers */}
          <section>
            <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
              <Badge variant="outline" className="text-muted-foreground">Inactive</Badge>
              <span>Past & Scheduled Offers</span>
            </h2>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {mockOffers.filter(offer => !offer.active).map(offer => (
                <Card key={offer.id} className="overflow-hidden opacity-75 hover:opacity-100 transition-opacity">
                  <div className="h-40 overflow-hidden relative grayscale hover:grayscale-0 transition-all">
                    <img
                      src={offer.image}
                      alt={offer.title}
                      className="w-full h-full object-cover"
                    />
                    {offer.discount > 0 && (
                      <div className="absolute top-0 right-0 bg-muted text-foreground px-3 py-1 rounded-bl-lg">
                        {offer.discount}% OFF
                      </div>
                    )}
                    {offer.isSpecial && (
                      <div className="absolute top-0 right-0 bg-muted text-foreground px-3 py-1 rounded-bl-lg">
                        SPECIAL OFFER
                      </div>
                    )}
                  </div>
                  
                  <CardHeader>
                    <CardTitle>{offer.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Valid until: {new Date(offer.validUntil).toLocaleDateString('en-IN')}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">{offer.description}</p>
                    <div className="flex items-center gap-2 bg-muted/50 px-3 py-1 rounded w-fit">
                      <CircleDollarSign className="h-4 w-4" />
                      <span className="font-mono text-sm font-medium">{offer.code}</span>
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex justify-between">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="text-green-500 border-green-500 hover:bg-green-500 hover:text-white"
                      onClick={() => toggleOfferStatus(offer.id, false)}
                    >
                      Activate
                    </Button>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleDeleteOffer(offer.id)}
                      >
                        <Trash className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditOffer(offer)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </section>
        </div>
      </main>
      
      {/* Offer Edit/Create Dialog */}
      <Dialog open={!!showOfferModal} onOpenChange={() => setShowOfferModal(null)}>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{showOfferModal?.isNew ? 'Create New Offer' : 'Edit Offer'}</DialogTitle>
            <DialogDescription>
              {showOfferModal?.isNew 
                ? 'Create a new seasonal offer for your eco-friendly services'
                : 'Update your seasonal offer details'}
            </DialogDescription>
          </DialogHeader>
          
          {showOfferModal && (
            <div className="py-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Offer Title</label>
                      <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                        defaultValue={showOfferModal.title}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Description</label>
                      <textarea 
                        className="w-full min-h-[100px] border rounded-md p-2 text-sm" 
                        defaultValue={showOfferModal.description}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Valid Until</label>
                      <input
                        type="date"
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                        defaultValue={showOfferModal.validUntil}
                      />
                    </div>
                  </div>
                </div>
                
                <div>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-1 block">Discount (%)</label>
                      <input
                        type="number"
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                        defaultValue={showOfferModal.discount.toString()}
                        min="0"
                        max="100"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Promo Code</label>
                      <input
                        className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                        defaultValue={showOfferModal.code}
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Status</label>
                      <div className="flex items-center gap-3">
                        <input
                          type="checkbox"
                          id="offerStatus"
                          defaultChecked={showOfferModal.active}
                          className="h-4 w-4"
                        />
                        <label htmlFor="offerStatus" className="text-sm cursor-pointer">
                          Active
                        </label>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium mb-1 block">Offer Image</label>
                      <div className="h-40 border-2 border-dashed rounded flex items-center justify-center bg-muted/50 cursor-pointer relative overflow-hidden">
                        {showOfferModal.image && (
                          <img 
                            src={showOfferModal.image} 
                            alt="Offer" 
                            className="absolute inset-0 w-full h-full object-cover"
                          />
                        )}
                        <div className="absolute inset-0 flex items-center justify-center bg-black/30 text-white hover:bg-black/40 transition-colors">
                          {showOfferModal.image ? 'Change Image' : 'Upload Image'}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-2">
                <Button variant="outline" onClick={() => setShowOfferModal(null)}>Cancel</Button>
                <Button 
                  className="bg-eco-primary hover:bg-eco-dark text-white"
                  onClick={saveOffer}
                >
                  {showOfferModal.isNew ? 'Create Offer' : 'Update Offer'}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={!!showDeleteModal} onOpenChange={() => setShowDeleteModal(null)}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Delete Offer</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this offer? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowDeleteModal(null)}>Cancel</Button>
            <Button 
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={confirmDelete}
            >
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <Footer />
    </div>
  );
};

export default ManageOffers;
