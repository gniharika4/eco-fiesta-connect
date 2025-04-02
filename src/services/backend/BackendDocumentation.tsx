
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Check, Database, Server, Webhook, Shield, ExternalLink } from "lucide-react";
import { useNavigate } from "react-router-dom";

const BackendDocumentation = () => {
  const navigate = useNavigate();
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-eco-dark">Backend & Database Documentation</h1>
          <p className="text-muted-foreground mt-2">Complete technical documentation for EcoFiesta's backend architecture</p>
        </div>
        <Badge variant="outline" className="text-eco-primary border-eco-primary px-3 py-1">Documentation</Badge>
      </div>
      
      <Alert className="mb-6 bg-eco-light border-eco-primary">
        <Server className="h-5 w-5 text-eco-primary" />
        <AlertTitle className="text-eco-dark">Backend Architecture Overview</AlertTitle>
        <AlertDescription className="text-muted-foreground">
          EcoFiesta uses a modern RESTful API architecture with JWT authentication and a PostgreSQL database.
          The backend is optimized for handling event management, vendor bookings, and sustainability metrics.
        </AlertDescription>
      </Alert>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        {/* Database Structure */}
        <Card className="overflow-hidden">
          <div className="bg-eco-dark p-4 flex items-center">
            <Database className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold text-white">Database Structure</h2>
          </div>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              EcoFiesta uses a relational database with the following main tables:
            </p>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Users Table</h3>
                  <Badge className="bg-blue-500">Auth</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Stores user authentication data and profile information
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">id</span>: UUID (PK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">email</span>: VARCHAR (unique)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">name</span>: VARCHAR
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">user_type</span>: ENUM('customer', 'vendor')
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">created_at</span>: TIMESTAMP
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">profile_image</span>: VARCHAR (nullable)
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Events Table</h3>
                  <Badge className="bg-green-500">Core</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Stores event details created by customers
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">id</span>: UUID (PK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">user_id</span>: UUID (FK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">title</span>: VARCHAR
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">date</span>: DATE
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">location</span>: VARCHAR
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">budget</span>: DECIMAL
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">carbon_footprint</span>: DECIMAL
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">status</span>: ENUM('upcoming', 'past', 'cancelled')
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Vendors Table</h3>
                  <Badge className="bg-green-500">Core</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Stores vendor profiles and services
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">id</span>: UUID (PK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">user_id</span>: UUID (FK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">business_name</span>: VARCHAR
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">category</span>: VARCHAR
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">sustainability_score</span>: INTEGER
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">pricing_model</span>: JSON
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold text-lg">Bookings Table</h3>
                  <Badge className="bg-amber-500">Relational</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-2">
                  Manages relationships between customers, events, and vendors
                </p>
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">id</span>: UUID (PK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">event_id</span>: UUID (FK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">vendor_id</span>: UUID (FK)
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">status</span>: ENUM('pending', 'confirmed', 'completed', 'cancelled')
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">amount</span>: DECIMAL
                  </div>
                  <div className="bg-muted/50 rounded p-2">
                    <span className="font-medium">created_at</span>: TIMESTAMP
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* API Endpoints */}
        <Card className="overflow-hidden">
          <div className="bg-eco-dark p-4 flex items-center">
            <Webhook className="h-6 w-6 text-white mr-2" />
            <h2 className="text-xl font-bold text-white">API Endpoints</h2>
          </div>
          <CardContent className="pt-6">
            <p className="text-muted-foreground mb-4">
              The application uses a RESTful API architecture with the following key endpoints:
            </p>
            <div className="space-y-4">
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">/api/auth</h3>
                <p className="text-sm text-muted-foreground mb-2">Handles user authentication</p>
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-blue-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/register</span>
                    <span className="text-xs text-muted-foreground ml-auto">Create a new user account</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-amber-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/login</span>
                    <span className="text-xs text-muted-foreground ml-auto">Authenticate a user and get JWT token</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/auth/me</span>
                    <span className="text-xs text-muted-foreground ml-auto">Get current authenticated user data</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-red-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/logout</span>
                    <span className="text-xs text-muted-foreground ml-auto">Invalidate current user session</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">/api/events</h3>
                <p className="text-sm text-muted-foreground mb-2">CRUD operations for event management</p>
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/events</span>
                    <span className="text-xs text-muted-foreground ml-auto">List all events for current user</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/events/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Get details for a specific event</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-blue-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/events</span>
                    <span className="text-xs text-muted-foreground ml-auto">Create a new event</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-amber-500 mr-2">PUT</Badge>
                    <span className="text-xs">/api/events/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Update an existing event</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-red-500 mr-2">DELETE</Badge>
                    <span className="text-xs">/api/events/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Delete an event</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">/api/vendors</h3>
                <p className="text-sm text-muted-foreground mb-2">Vendor listing, searching, and profile management</p>
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/vendors</span>
                    <span className="text-xs text-muted-foreground ml-auto">List all vendors with filtering options</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/vendors/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Get details for a specific vendor</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-amber-500 mr-2">PUT</Badge>
                    <span className="text-xs">/api/vendors/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Update vendor profile (vendor only)</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/vendors/:id/services</span>
                    <span className="text-xs text-muted-foreground ml-auto">List services offered by a vendor</span>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2">/api/bookings</h3>
                <p className="text-sm text-muted-foreground mb-2">Booking workflow between customers and vendors</p>
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-blue-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/bookings</span>
                    <span className="text-xs text-muted-foreground ml-auto">Create a new booking request</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-amber-500 mr-2">PUT</Badge>
                    <span className="text-xs">/api/bookings/:id/status</span>
                    <span className="text-xs text-muted-foreground ml-auto">Update booking status</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/bookings</span>
                    <span className="text-xs text-muted-foreground ml-auto">List all bookings for current user</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-green-500 mr-2">GET</Badge>
                    <span className="text-xs">/api/bookings/:id</span>
                    <span className="text-xs text-muted-foreground ml-auto">Get details for a specific booking</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      {/* Authentication Flow */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-eco-dark p-4 flex items-center">
          <Shield className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">Authentication Flow</h2>
        </div>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">JWT Authentication</h3>
              <p className="text-muted-foreground mb-4">
                The application uses JWT (JSON Web Tokens) for authentication. When users log in, they receive an access token that is stored in localStorage and included in the Authorization header for subsequent API requests. This token contains the user's ID and role (customer or vendor) which determines their access privileges.
              </p>
              <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <h4 className="font-medium mb-2">JWT Token Structure</h4>
                <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto">
{`{
  "header": {
    "alg": "HS256",
    "typ": "JWT"
  },
  "payload": {
    "userId": "user-uuid",
    "userType": "customer|vendor",
    "email": "user@example.com",
    "iat": 1625097600,
    "exp": 1625184000
  },
  "signature": "..."
}`}
                </pre>
              </div>
              <div className="space-y-3 mb-4">
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Tokens expire after 24 hours for security</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Protected routes verify the token before processing requests</span>
                </div>
                <div className="flex items-center">
                  <Check className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Role-based access control using the userType claim</span>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">Authentication Flow Diagram</h3>
              <div className="bg-muted/30 p-4 rounded-lg h-64 flex items-center justify-center">
                <p className="text-muted-foreground text-center">Authentication flow diagram would be displayed here</p>
              </div>
              <div className="mt-4 space-y-4">
                <h4 className="font-medium">Authentication Endpoints</h4>
                <div className="space-y-2">
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-blue-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/login</span>
                    <span className="text-xs text-muted-foreground ml-auto">Returns JWT token</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-red-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/logout</span>
                    <span className="text-xs text-muted-foreground ml-auto">Invalidates token</span>
                  </div>
                  <div className="flex items-center px-3 py-2 bg-muted/50 rounded">
                    <Badge className="bg-amber-500 mr-2">POST</Badge>
                    <span className="text-xs">/api/auth/refresh</span>
                    <span className="text-xs text-muted-foreground ml-auto">Refreshes expired token</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      {/* Database Connection */}
      <Card className="mb-8 overflow-hidden">
        <div className="bg-eco-dark p-4 flex items-center">
          <Database className="h-6 w-6 text-white mr-2" />
          <h2 className="text-xl font-bold text-white">Connecting to a Production Database</h2>
        </div>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">Database Connection Steps</h3>
              <p className="text-muted-foreground mb-4">
                To connect this application to a production database like PostgreSQL, follow these steps:
              </p>
              <div className="space-y-4">
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">1</div>
                    <div>
                      <h4 className="font-medium">Create a database instance</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Set up a PostgreSQL database on a cloud provider like AWS RDS, Digital Ocean, or Supabase.
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">2</div>
                    <div>
                      <h4 className="font-medium">Configure environment variables</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Set up environment variables for database connection in your server environment.
                      </p>
                      <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto mt-2">
{`DATABASE_URL=postgresql://username:password@host:port/database
DATABASE_SSL=true
JWT_SECRET=your-secure-jwt-secret`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">3</div>
                    <div>
                      <h4 className="font-medium">Run database migrations</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Execute migration scripts to create the database schema and seed initial data if needed.
                      </p>
                      <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto mt-2">
{`# Example using a migration tool
npx knex migrate:latest
npx knex seed:run`}
                      </pre>
                    </div>
                  </div>
                </div>
                
                <div className="bg-muted/30 p-4 rounded-lg">
                  <div className="flex items-start">
                    <div className="bg-eco-primary text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-medium mr-3 mt-0.5">4</div>
                    <div>
                      <h4 className="font-medium">Update API endpoints</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Configure your API server to use the production database connection.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex-1">
              <h3 className="font-semibold text-lg mb-4">Recommended: Supabase Integration</h3>
              <div className="bg-muted/30 p-4 rounded-lg mb-4">
                <p className="text-sm text-muted-foreground mb-4">
                  For a complete production setup, we recommend connecting to Supabase, which provides:
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">PostgreSQL database with automatic backups</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Built-in authentication system with JWT support</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Storage for images and files</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Edge functions for serverless API endpoints</span>
                  </div>
                  <div className="flex items-center">
                    <Check className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-sm">Realtime subscriptions for live updates</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-eco-primary/10 border border-eco-primary p-4 rounded-lg">
                <h4 className="font-medium mb-2 text-eco-primary">Supabase Connection Example</h4>
                <pre className="bg-muted/50 p-3 rounded text-xs overflow-x-auto mb-3">
{`import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.SUPABASE_URL
const supabaseKey = process.env.SUPABASE_KEY

export const supabase = createClient(supabaseUrl, supabaseKey)`}
                </pre>
                <Button className="bg-eco-primary hover:bg-eco-dark text-white w-full flex items-center justify-center">
                  Learn more about Supabase Integration
                  <ExternalLink className="ml-2 h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="flex justify-center">
        <Button 
          variant="outline"
          className="border-eco-primary text-eco-primary hover:bg-eco-primary hover:text-white"
          onClick={() => navigate(-1)}
        >
          Back to Dashboard
        </Button>
      </div>
    </div>
  );
};

export default BackendDocumentation;
