
// Default image URLs
export const DEFAULT_IMAGES = {
  // Profile images
  customerProfile: "/avatars/customer-avatar.jpg",
  vendorProfile: "/avatars/vendor-avatar.jpg",
  
  // Event images by category
  events: {
    wedding: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3",
    corporate: "https://images.unsplash.com/photo-1515169067868-5387ec356754",
    social: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3",
    default: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a"
  },
  
  // Vendor service images by category
  services: {
    catering: "/vendors/catering.jpg",
    decoration: "/vendors/decoration.jpg",
    venue: "/vendors/venue.jpg",
    entertainment: "/vendors/entertainment.jpg",
    photography: "/vendors/photography.jpg",
    wasteManagement: "/vendors/waste-management.jpg",
    default: "/vendors/venue.jpg"
  }
};

/**
 * Helper to get an event image based on event type
 */
export const getEventImage = (eventType?: string, fallbackImage?: string): string => {
  if (!eventType) {
    return fallbackImage || DEFAULT_IMAGES.events.default;
  }
  
  const type = eventType.toLowerCase();
  
  if (type.includes('wedding')) {
    return DEFAULT_IMAGES.events.wedding;
  } else if (type.includes('corporate') || type.includes('retreat') || type.includes('conference')) {
    return DEFAULT_IMAGES.events.corporate;
  } else if (type.includes('social') || type.includes('party') || type.includes('reunion')) {
    return DEFAULT_IMAGES.events.social;
  }
  
  return fallbackImage || DEFAULT_IMAGES.events.default;
};

/**
 * Helper to get a service image based on service type
 */
export const getServiceImage = (serviceType?: string, fallbackImage?: string): string => {
  if (!serviceType) {
    return fallbackImage || DEFAULT_IMAGES.services.default;
  }
  
  const type = serviceType.toLowerCase();
  
  if (type.includes('catering') || type.includes('food')) {
    return DEFAULT_IMAGES.services.catering;
  } else if (type.includes('decor') || type.includes('decoration')) {
    return DEFAULT_IMAGES.services.decoration;
  } else if (type.includes('venue') || type.includes('location')) {
    return DEFAULT_IMAGES.services.venue;
  } else if (type.includes('entertainment') || type.includes('music')) {
    return DEFAULT_IMAGES.services.entertainment;
  } else if (type.includes('photo') || type.includes('video')) {
    return DEFAULT_IMAGES.services.photography;
  } else if (type.includes('waste') || type.includes('recycl')) {
    return DEFAULT_IMAGES.services.wasteManagement;
  }
  
  return fallbackImage || DEFAULT_IMAGES.services.default;
};

/**
 * Helper to get a profile image
 */
export const getProfileImage = (userType: 'customer' | 'vendor' | string, profileImage?: string): string => {
  if (profileImage) {
    return profileImage;
  }
  
  return userType === 'vendor' ? DEFAULT_IMAGES.vendorProfile : DEFAULT_IMAGES.customerProfile;
};
