
import React from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf } from "lucide-react";

const Header: React.FC = () => {
  const { isAuthenticated, logout, userType, user } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div 
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate('/')}
        >
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-eco-tertiary to-eco-primary flex items-center justify-center">
            <Leaf className="text-white h-5 w-5" />
          </div>
          <h1 className="text-2xl font-bold text-eco-dark">
            Eco<span className="text-eco-primary">Fiesta</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <Link to={`/${userType}/dashboard`} className="text-eco-dark hover:text-eco-primary transition-colors">Dashboard</Link>
              {userType === 'customer' && (
                <>
                  <Link to="/customer/vendors" className="text-eco-dark hover:text-eco-primary transition-colors">Find Vendors</Link>
                  <Link to="/customer/events" className="text-eco-dark hover:text-eco-primary transition-colors">My Events</Link>
                </>
              )}
              {userType === 'vendor' && (
                <>
                  <Link to="/vendor/bookings" className="text-eco-dark hover:text-eco-primary transition-colors">Bookings</Link>
                  <Link to="/vendor/services" className="text-eco-dark hover:text-eco-primary transition-colors">My Services</Link>
                </>
              )}
            </>
          )}
          <Link to="/about" className="text-eco-dark hover:text-eco-primary transition-colors">About</Link>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center">
                {user?.profileImage ? (
                  <div className="h-8 w-8 rounded-full overflow-hidden mr-2">
                    <img 
                      src={user.profileImage}
                      alt={user.name} 
                      className="h-full w-full object-cover"
                    />
                  </div>
                ) : (
                  <div className="h-8 w-8 bg-eco-secondary text-white rounded-full flex items-center justify-center mr-2">
                    {user?.name?.charAt(0) || "U"}
                  </div>
                )}
                <span className="text-sm font-medium hidden lg:inline">{user?.name}</span>
              </div>
              <Button 
                variant="outline"
                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white transition-colors"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                className="text-eco-primary hover:text-eco-dark hover:bg-eco-light transition-colors"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="bg-eco-primary text-white hover:bg-eco-dark transition-colors"
                onClick={() => navigate('/register')}
              >
                Sign Up
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
