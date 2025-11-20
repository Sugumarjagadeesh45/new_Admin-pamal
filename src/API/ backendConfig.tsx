// src/API/backendConfig.tsx
const backendConfig = {
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:5001/api",
  endpoints: {
    // Auth endpoints
    login: "/admin/login",
    logout: "/admin/logout",
    
    // User management
    users: "/users",
    usersRegistered: "/users/registered",
    
    // Ride management
    rides: "/rides",
    activeRides: "/rides/active",
    rideHistory: "/rides/history",
    
    // Order management
    orders: "/orders",
    pendingOrders: "/orders/pending",
    completedOrders: "/orders/completed",
    
    // Driver management
    drivers: "/drivers",
    driverApplications: "/drivers/applications",
    driverPayouts: "/drivers/payouts",
    
    // Analytics
    analytics: "/analytics",
    revenue: "/analytics/revenue",
    performance: "/analytics/performance",
    
    // Support
    supportTickets: "/support/tickets",
    disputes: "/support/disputes",
    
    // Inventory
    inventory: "/inventory",
    categories: "/inventory/categories"
  },
  
  // Headers configuration
  getHeaders: (token?: string) => {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };
    
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    
    return headers;
  }
};

export default backendConfig;