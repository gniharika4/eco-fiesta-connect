
import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "@/components/ui/button";

const Header: React.FC = () => {
  const { isAuthenticated, logout, userType } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-full bg-eco-primary flex items-center justify-center">
            <span className="text-white text-lg font-bold">EF</span>
          </div>
          <h1 
            className="text-2xl font-bold text-eco-dark cursor-pointer"
            onClick={() => navigate('/')}
          >
            Eco<span className="text-eco-primary">Fiesta</span>
          </h1>
        </div>
        
        <nav className="hidden md:flex items-center gap-6">
          {isAuthenticated && (
            <>
              <a href={`/${userType}/dashboard`} className="text-eco-dark hover:text-eco-primary">Dashboard</a>
              {userType === 'customer' && (
                <>
                  <a href="/customer/vendors" className="text-eco-dark hover:text-eco-primary">Find Vendors</a>
                  <a href="/customer/events" className="text-eco-dark hover:text-eco-primary">My Events</a>
                </>
              )}
              {userType === 'vendor' && (
                <>
                  <a href="/vendor/bookings" className="text-eco-dark hover:text-eco-primary">Bookings</a>
                  <a href="/vendor/profile" className="text-eco-dark hover:text-eco-primary">My Services</a>
                </>
              )}
            </>
          )}
          <a href="/about" className="text-eco-dark hover:text-eco-primary">About</a>
        </nav>
        
        <div className="flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                className="text-eco-primary hover:text-eco-dark hover:bg-eco-light"
                onClick={() => navigate(`/${userType}/profile`)}
              >
                Profile
              </Button>
              <Button 
                variant="outline"
                className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Button 
                variant="ghost"
                className="text-eco-primary hover:text-eco-dark hover:bg-eco-light"
                onClick={() => navigate('/login')}
              >
                Login
              </Button>
              <Button 
                className="bg-eco-primary text-white hover:bg-eco-dark"
                onClick={() => navigate('/register')}
              >
                Register
              </Button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
