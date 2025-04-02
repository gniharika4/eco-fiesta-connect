
/**
 * ApiService.ts
 * This file provides a centralized service for making API requests to the backend.
 * It handles authentication, API endpoints, and request/response processing.
 */

import { User, Event, Vendor, Booking, Review } from './DatabaseService';

// API configuration
interface ApiConfig {
  baseUrl: string;
  timeout: number;
  headers: Record<string, string>;
}

/**
 * Service for handling API requests to the backend
 */
class ApiService {
  private static instance: ApiService;
  private config: ApiConfig;
  
  private constructor() {
    const token = localStorage.getItem('auth_token');
    
    // Default configuration
    this.config = {
      baseUrl: process.env.API_URL || '/api',
      timeout: 30000,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { 'Authorization': `Bearer ${token}` } : {})
      }
    };
  }
  
  /**
   * Get API service singleton instance
   */
  public static getInstance(): ApiService {
    if (!ApiService.instance) {
      ApiService.instance = new ApiService();
    }
    return ApiService.instance;
  }
  
  /**
   * Set authentication token for API requests
   * @param token - JWT authentication token
   */
  public setAuthToken(token: string): void {
    this.config.headers['Authorization'] = `Bearer ${token}`;
    localStorage.setItem('auth_token', token);
  }
  
  /**
   * Clear authentication token
   */
  public clearAuthToken(): void {
    delete this.config.headers['Authorization'];
    localStorage.removeItem('auth_token');
  }
  
  /**
   * Make API request
   * @param method - HTTP method (GET, POST, PUT, DELETE)
   * @param endpoint - API endpoint (without base URL)
   * @param data - Request payload for POST and PUT requests
   */
  private async request<T>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    endpoint: string,
    data?: any
  ): Promise<T> {
    const url = `${this.config.baseUrl}${endpoint}`;
    
    try {
      const response = await fetch(url, {
        method,
        headers: this.config.headers,
        body: data ? JSON.stringify(data) : undefined,
      });
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.message || `API request failed with status ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`API ${method} request to ${endpoint} failed:`, error);
      throw error;
    }
  }
  
  // Auth API endpoints
  
  /**
   * Register a new user
   */
  public async register(email: string, password: string, name: string, userType: 'customer' | 'vendor'): Promise<{ user: User; token: string }> {
    return this.request('POST', '/auth/register', { email, password, name, userType });
  }
  
  /**
   * Login with email and password
   */
  public async login(email: string, password: string): Promise<{ user: User; token: string }> {
    const response = await this.request<{ user: User; token: string }>('POST', '/auth/login', { email, password });
    this.setAuthToken(response.token);
    return response;
  }
  
  /**
   * Get current authenticated user
   */
  public async getCurrentUser(): Promise<User> {
    return this.request('GET', '/auth/me');
  }
  
  /**
   * Logout current user
   */
  public async logout(): Promise<void> {
    await this.request('POST', '/auth/logout');
    this.clearAuthToken();
  }
  
  // Events API endpoints
  
  /**
   * Get all events for current user
   */
  public async getEvents(): Promise<Event[]> {
    return this.request('GET', '/events');
  }
  
  /**
   * Get event by ID
   */
  public async getEvent(eventId: string): Promise<Event> {
    return this.request('GET', `/events/${eventId}`);
  }
  
  /**
   * Create a new event
   */
  public async createEvent(eventData: Partial<Event>): Promise<Event> {
    return this.request('POST', '/events', eventData);
  }
  
  /**
   * Update an existing event
   */
  public async updateEvent(eventId: string, eventData: Partial<Event>): Promise<Event> {
    return this.request('PUT', `/events/${eventId}`, eventData);
  }
  
  /**
   * Delete an event
   */
  public async deleteEvent(eventId: string): Promise<void> {
    return this.request('DELETE', `/events/${eventId}`);
  }
  
  // Vendors API endpoints
  
  /**
   * Get all vendors with optional filtering
   */
  public async getVendors(filters?: Record<string, any>): Promise<Vendor[]> {
    const queryString = filters ? `?${new URLSearchParams(filters as any).toString()}` : '';
    return this.request('GET', `/vendors${queryString}`);
  }
  
  /**
   * Get vendor by ID
   */
  public async getVendor(vendorId: string): Promise<Vendor> {
    return this.request('GET', `/vendors/${vendorId}`);
  }
  
  /**
   * Update vendor profile (for vendor users)
   */
  public async updateVendorProfile(vendorData: Partial<Vendor>): Promise<Vendor> {
    return this.request('PUT', `/vendors/${vendorData.id}`, vendorData);
  }
  
  /**
   * Get vendor services
   */
  public async getVendorServices(vendorId: string): Promise<any[]> {
    return this.request('GET', `/vendors/${vendorId}/services`);
  }
  
  // Bookings API endpoints
  
  /**
   * Create a new booking
   */
  public async createBooking(bookingData: Partial<Booking>): Promise<Booking> {
    return this.request('POST', '/bookings', bookingData);
  }
  
  /**
   * Update booking status
   */
  public async updateBookingStatus(bookingId: string, status: Booking['status']): Promise<Booking> {
    return this.request('PUT', `/bookings/${bookingId}/status`, { status });
  }
  
  /**
   * Get all bookings for current user
   */
  public async getBookings(): Promise<Booking[]> {
    return this.request('GET', '/bookings');
  }
  
  /**
   * Get booking by ID
   */
  public async getBooking(bookingId: string): Promise<Booking> {
    return this.request('GET', `/bookings/${bookingId}`);
  }
  
  // Reviews API endpoints
  
  /**
   * Create a review for a vendor/event
   */
  public async createReview(reviewData: Partial<Review>): Promise<Review> {
    return this.request('POST', '/reviews', reviewData);
  }
  
  /**
   * Get reviews for a vendor
   */
  public async getVendorReviews(vendorId: string): Promise<Review[]> {
    return this.request('GET', `/vendors/${vendorId}/reviews`);
  }
}

export default ApiService;
