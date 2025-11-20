import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, 
  ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell 
} from 'recharts';
import { 
  FiMenu, FiSearch, FiMail, FiBell, FiSettings, FiUser, FiSun, FiMoon, 
  FiHome, FiUsers, FiTruck, FiShoppingCart, FiPackage, FiLogOut, FiChevronDown,
  FiActivity, FiTrendingUp, FiMapPin, FiShoppingBag
} from 'react-icons/fi';

function HomePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
  
  // Sample data for charts
  const weeklySalesData = [
    { name: 'Mon', rides: 120, orders: 80 },
    { name: 'Tue', rides: 150, orders: 100 },
    { name: 'Wed', rides: 180, orders: 120 },
    { name: 'Thu', rides: 140, orders: 90 },
    { name: 'Fri', rides: 200, orders: 150 },
    { name: 'Sat', rides: 250, orders: 180 },
    { name: 'Sun', rides: 220, orders: 160 },
  ];
  
  const yearlySalesData = [
    { month: 'Jan', rides: 1200, orders: 800 },
    { month: 'Feb', rides: 1500, orders: 1000 },
    { month: 'Mar', rides: 1800, orders: 1200 },
    { month: 'Apr', rides: 1400, orders: 900 },
    { month: 'May', rides: 2000, orders: 1500 },
    { month: 'Jun', rides: 2500, orders: 1800 },
    { month: 'Jul', rides: 2200, orders: 1600 },
    { month: 'Aug', rides: 2800, orders: 2000 },
    { month: 'Sep', rides: 2600, orders: 1900 },
    { month: 'Oct', rides: 3000, orders: 2200 },
    { month: 'Nov', rides: 3200, orders: 2400 },
    { month: 'Dec', rides: 3500, orders: 2600 },
  ];
  
  const pieData = [
    { name: 'Rides', value: 65, color: '#6366f1' },
    { name: 'Grocery', value: 35, color: '#8b5cf6' },
  ];
  
  const statsData = [
    { title: 'Total Users', value: '63,154', change: '+12.5%', icon: <FiUsers />, color: '#6366f1' },
    { title: 'Drivers', value: '1,842', change: '+8.2%', icon: <FiTruck />, color: '#8b5cf6' },
    { title: 'Total Rides', value: '24,563', change: '+15.3%', icon: <FiShoppingCart />, color: '#ec4899' },
    { title: 'Product Sales', value: '$48,254', change: '+22.1%', icon: <FiPackage />, color: '#14b8a6' },
  ];
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };
  
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }, [darkMode]);

  // Check if current path matches for active state
  const isActivePath = (path) => {
    return location.pathname === path;
  };

  // Check if pages dropdown should be active
  const isPagesActive = () => {
    return isActivePath('/products') || 
           isActivePath('/rides') || 
           isActivePath('/live-data') || 
           isActivePath('/sales-data');
  };
  
  return (
    <div className={`admin-dashboard ${darkMode ? 'dark' : ''}`}>
      {/* Sidebar */}
      <div className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
        <div className="sidebar-header">
          <h2 className="logo">EAZYGO</h2>
          <button className="toggle-sidebar" onClick={() => setSidebarOpen(!sidebarOpen)}>
            <FiMenu />
          </button>
        </div>

        <nav className="sidebar-nav">
          <ul>
            <li className={isActivePath('/dashboard') || isActivePath('/home') ? 'active' : ''}>
              <a href="/home">
                <FiHome />
                <span>Dashboard</span>
              </a>
            </li>
            <li className={isActivePath('/users') ? 'active' : ''}>
              <a href="/users">
                <FiUsers />
                <span>Users</span>
              </a>
            </li>
            <li className={isActivePath('/drivers') ? 'active' : ''}>
              <a href="/drivers">
                <FiTruck />
                <span>Drivers</span>
              </a>
            </li>
            <li className={`has-dropdown ${isPagesActive() ? 'active' : ''}`}>
              <a href="#" onClick={(e) => {
                e.preventDefault();
                setPagesDropdownOpen(!pagesDropdownOpen);
              }}>
                <FiPackage />
                <span>Pages</span>
                <FiChevronDown className={`dropdown-icon ${pagesDropdownOpen ? 'open' : ''}`} />
              </a>
              <ul className={`dropdown ${pagesDropdownOpen ? 'open' : ''}`}>
                <li className={isActivePath('/products') ? 'active' : ''}>
                  <a href="/products">
                    <FiShoppingBag />
                    <span>Product</span>
                  </a>
                </li>
                <li className={isActivePath('/rides') ? 'active' : ''}>
                  <a href="/rides">
                    <FiShoppingCart />
                    <span>Ride</span>
                  </a>
                </li>
                <li className={isActivePath('/live-data') ? 'active' : ''}>
                  <a href="/live-data">
                    <FiMapPin />
                    <span>Live</span>
                  </a>
                </li>
                <li className={isActivePath('/sales-data') ? 'active' : ''}>
                  <a href="/sales-data">
                    <FiTrendingUp />
                    <span>Sales</span>
                  </a>
                </li>
              </ul>
            </li>
            <li className={isActivePath('/settings') ? 'active' : ''}>
              <a href="/settings">
                <FiSettings />
                <span>Settings</span>
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div className="main-content">
        {/* Top Bar */}
        <header className="topbar">
          <div className="search-container">
            <FiSearch className="search-icon" />
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="topbar-actions">
            <button className="topbar-btn">
              <FiMail />
              <span className="badge">3</span>
            </button>
            <button className="topbar-btn">
              <FiBell />
              <span className="badge">5</span>
            </button>
            <button className="topbar-btn">
              <FiSettings />
            </button>
            <button className="topbar-btn" onClick={() => setDarkMode(!darkMode)}>
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <div className="profile-dropdown">
              <button className="topbar-btn profile-btn" onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}>
                <FiUser />
                <span>Admin</span>
                <FiChevronDown className={`dropdown-icon ${profileDropdownOpen ? 'open' : ''}`} />
              </button>
              <ul className={`dropdown ${profileDropdownOpen ? 'open' : ''}`}>
                <li><a href="#">Profile</a></li>
                <li><a href="#">Settings</a></li>
                <li><a href="#" onClick={handleLogout}><FiLogOut /> Logout</a></li>
              </ul>
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div className="dashboard-content">
          <h1 className="welcome-title">Dashboard Overview</h1>
          <p className="welcome-subtitle">Welcome to EAZYGO Admin Panel. Manage your platform efficiently.</p>
          
          {/* Stats Cards */}
          <div className="stats-grid">
            {statsData.map((stat, index) => (
              <div className="stat-card" key={index}>
                <div className="stat-icon" style={{ backgroundColor: stat.color + '20', color: stat.color }}>
                  {stat.icon}
                </div>
                <div className="stat-content">
                  <h3>{stat.title}</h3>
                  <div className="stat-value">{stat.value}</div>
                  <div className="stat-change positive">{stat.change}</div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts */}
          <div className="charts-container">
            <div className="chart-card">
              <h3>Weekly Performance</h3>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={weeklySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="rides" fill="#6366f1" name="Rides" />
                  <Bar dataKey="orders" fill="#8b5cf6" name="Orders" />
                </BarChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-card">
              <h3>Yearly Trends</h3>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={yearlySalesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="rides" stroke="#6366f1" activeDot={{ r: 8 }} name="Rides" />
                  <Line type="monotone" dataKey="orders" stroke="#8b5cf6" name="Orders" />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
          
          {/* Bottom Charts Row */}
          <div className="charts-container">
            <div className="chart-card">
              <h3>Service Distribution</h3>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            
            <div className="chart-card">
              <h3>Recent Activities</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon ride">
                    <FiShoppingCart />
                  </div>
                  <div className="activity-content">
                    <h4>New ride booked</h4>
                    <p>John Doe booked a ride from Downtown to Airport</p>
                    <span className="activity-time">2 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon grocery">
                    <FiPackage />
                  </div>
                  <div className="activity-content">
                    <h4>New order placed</h4>
                    <p>Jane Smith placed an order for groceries</p>
                    <span className="activity-time">5 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon user">
                    <FiUsers />
                  </div>
                  <div className="activity-content">
                    <h4>New user registered</h4>
                    <p>Michael Johnson joined EAZYGO</p>
                    <span className="activity-time">10 minutes ago</span>
                  </div>
                </div>
                <div className="activity-item">
                  <div className="activity-icon driver">
                    <FiTruck />
                  </div>
                  <div className="activity-content">
                    <h4>New driver registered</h4>
                    <p>Robert Williams joined as a driver</p>
                    <span className="activity-time">15 minutes ago</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        :root {
          --primary-color: #6366f1;
          --secondary-color: #8b5cf6;
          --accent-color: #ec4899;
          --success-color: #14b8a6;
          --sidebar-bg: #1e293b;
          --sidebar-text: #e2e8f0;
          --sidebar-active: #334155;
          --topbar-bg: #ffffff;
          --card-bg: #ffffff;
          --text-primary: #1e293b;
          --text-secondary: #64748b;
          --border-color: #e2e8f0;
          --shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
          --shadow-lg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .dark {
          --sidebar-bg: #0f172a;
          --sidebar-text: #e2e8f0;
          --sidebar-active: #1e293b;
          --topbar-bg: #1e293b;
          --card-bg: #334155;
          --text-primary: #f1f5f9;
          --text-secondary: #cbd5e1;
          --border-color: #475569;
        }
        
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        
        .admin-dashboard {
          display: flex;
          min-height: 100vh;
          background-color: #f8fafc;
          color: var(--text-primary);
          transition: all 0.3s ease;
        }
        
        .dark .admin-dashboard {
          background-color: #0f172a;
        }
        
        /* Sidebar Styles */
        .sidebar {
          width: 260px;
          background-color: var(--sidebar-bg);
          color: var(--sidebar-text);
          transition: all 0.3s ease;
          position: relative;
          z-index: 100;
        }
        
        .sidebar.closed {
          width: 70px;
        }
        
        .sidebar-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1.5rem;
          border-bottom: 1px solid var(--sidebar-active);
        }
        
        .logo {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--primary-color);
          transition: opacity 0.3s ease;
        }
        
        .sidebar.closed .logo {
          opacity: 0;
          pointer-events: none;
        }
        
        .toggle-sidebar {
          background: none;
          border: none;
          color: var(--sidebar-text);
          font-size: 1.25rem;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 0.375rem;
          transition: background-color 0.2s;
        }
        
        .toggle-sidebar:hover {
          background-color: var(--sidebar-active);
        }
        
        .sidebar-nav ul {
          list-style: none;
          padding: 1rem 0;
        }
        
        .sidebar-nav li {
          margin-bottom: 0.25rem;
        }
        
        .sidebar-nav a {
          display: flex;
          align-items: center;
          padding: 0.75rem 1.5rem;
          color: var(--sidebar-text);
          text-decoration: none;
          transition: all 0.2s;
          position: relative;
        }
        
        .sidebar-nav a:hover {
          background-color: var(--sidebar-active);
        }
        
        .sidebar-nav li.active a {
          background-color: var(--primary-color);
          color: white;
        }
        
        .sidebar-nav li.active a::before {
          content: '';
          position: absolute;
          left: 0;
          top: 0;
          height: 100%;
          width: 4px;
          background-color: var(--accent-color);
        }
        
        .sidebar-nav a svg {
          margin-right: 0.75rem;
          font-size: 1.25rem;
        }
        
        .sidebar.closed a span {
          display: none;
        }
        
        .sidebar.closed a svg {
          margin-right: 0;
        }
        
        .has-dropdown {
          position: relative;
        }
        
        .dropdown-icon {
          margin-left: auto;
          transition: transform 0.3s ease;
        }
        
        .dropdown-icon.open {
          transform: rotate(180deg);
        }
        
        .sidebar.closed .dropdown-icon {
          display: none;
        }
        
        .dropdown {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease;
        }
        
        .dropdown.open {
          max-height: 500px;
        }
        
        .dropdown li a {
          padding-left: 3.5rem;
        }
        
        .sidebar.closed .dropdown {
          display: none;
        }
        
        /* Main Content Styles */
        .main-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          overflow-x: hidden;
        }
        
        /* Topbar Styles */
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 1rem 1.5rem;
          background-color: var(--topbar-bg);
          box-shadow: var(--shadow);
          z-index: 50;
        }
        
        .search-container {
          display: flex;
          align-items: center;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          padding: 0.5rem 1rem;
          width: 300px;
        }
        
        .search-icon {
          color: var(--text-secondary);
          margin-right: 0.5rem;
        }
        
        .search-container input {
          border: none;
          background: none;
          outline: none;
          flex: 1;
          color: var(--text-primary);
        }
        
        .topbar-actions {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .topbar-btn {
          position: relative;
          background: none;
          border: none;
          color: var(--text-primary);
          font-size: 1.25rem;
          padding: 0.5rem;
          border-radius: 0.375rem;
          cursor: pointer;
          transition: background-color 0.2s;
          display: flex;
          align-items: center;
        }
        
        .topbar-btn:hover {
          background-color: var(--border-color);
        }
        
        .badge {
          position: absolute;
          top: 0;
          right: 0;
          background-color: var(--accent-color);
          color: white;
          font-size: 0.75rem;
          font-weight: 600;
          padding: 0.125rem 0.375rem;
          border-radius: 9999px;
        }
        
        .profile-btn {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.5rem 0.75rem;
        }
        
        .profile-dropdown {
          position: relative;
        }
        
        .profile-dropdown .dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 0.5rem;
          box-shadow: var(--shadow-lg);
          width: 200px;
          z-index: 100;
          margin-top: 0.5rem;
        }
        
        .profile-dropdown .dropdown li {
          list-style: none;
        }
        
        .profile-dropdown .dropdown li a {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem 1rem;
          color: var(--text-primary);
          text-decoration: none;
          transition: background-color 0.2s;
        }
        
        .profile-dropdown .dropdown li a:hover {
          background-color: var(--border-color);
        }
        
        /* Dashboard Content Styles */
        .dashboard-content {
          padding: 1.5rem;
          flex: 1;
        }
        
        .welcome-title {
          font-size: 2rem;
          font-weight: 700;
          margin-bottom: 0.5rem;
          color: var(--text-primary);
        }
        
        .welcome-subtitle {
          color: var(--text-secondary);
          font-size: 1rem;
          margin-bottom: 2rem;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .stat-card {
          background-color: var(--card-bg);
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: var(--shadow);
          display: flex;
          align-items: center;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .stat-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-lg);
        }
        
        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: 0.75rem;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          margin-right: 1rem;
        }
        
        .stat-content h3 {
          font-size: 0.875rem;
          font-weight: 500;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }
        
        .stat-value {
          font-size: 1.875rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: 0.25rem;
        }
        
        .stat-change {
          font-size: 0.875rem;
          font-weight: 500;
        }
        
        .stat-change.positive {
          color: var(--success-color);
        }
        
        .charts-container {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(500px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }
        
        .chart-card {
          background-color: var(--card-bg);
          border-radius: 0.75rem;
          padding: 1.5rem;
          box-shadow: var(--shadow);
        }
        
        .chart-card h3 {
          font-size: 1.125rem;
          font-weight: 600;
          margin-bottom: 1rem;
          color: var(--text-primary);
        }
        
        .activity-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }
        
        .activity-item {
          display: flex;
          align-items: flex-start;
          gap: 1rem;
        }
        
        .activity-icon {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }
        
        .activity-icon.ride {
          background-color: var(--primary-color);
        }
        
        .activity-icon.grocery {
          background-color: var(--secondary-color);
        }
        
        .activity-icon.user {
          background-color: var(--accent-color);
        }
        
        .activity-icon.driver {
          background-color: var(--success-color);
        }
        
        .activity-content h4 {
          font-size: 1rem;
          font-weight: 600;
          margin-bottom: 0.25rem;
          color: var(--text-primary);
        }
        
        .activity-content p {
          font-size: 0.875rem;
          color: var(--text-secondary);
          margin-bottom: 0.25rem;
        }
        
        .activity-time {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        
        /* Responsive Styles */
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            height: 100vh;
            z-index: 1000;
            transform: translateX(-100%);
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .charts-container {
            grid-template-columns: 1fr;
          }
          
          .search-container {
            width: 200px;
          }
        }
      `}</style>
    </div>
  );
}

export default HomePage;