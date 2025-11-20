import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { 
  FiMenu, FiSearch, FiMail, FiBell, FiSettings, FiUser, FiSun, FiMoon, 
  FiHome, FiUsers, FiTruck, FiShoppingCart, FiPackage, FiLogOut, FiChevronDown,
  FiActivity, FiTrendingUp, FiMapPin, FiShoppingBag
} from 'react-icons/fi';

function Dashboard() {
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
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
      color: darkMode ? '#f1f5f9' : '#1e293b',
      transition: 'all 0.3s ease',
      fontFamily: "'Inter', sans-serif"
    }}>
      {/* Sidebar */}
      <div style={{
        width: sidebarOpen ? '260px' : '70px',
        backgroundColor: darkMode ? '#0f172a' : '#1e293b',
        color: '#e2e8f0',
        transition: 'all 0.3s ease',
        position: 'relative',
        zIndex: 100,
        height: '100vh',
        overflowY: 'auto'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1.5rem',
          borderBottom: '1px solid #334155'
        }}>
          <h2 style={{
            fontSize: '1.5rem',
            fontWeight: 700,
            color: '#6366f1',
            transition: 'opacity 0.3s ease',
            opacity: sidebarOpen ? 1 : 0,
            pointerEvents: sidebarOpen ? 'auto' : 'none'
          }}>EAZYGO</h2>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: '#e2e8f0',
              fontSize: '1.25rem',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              transition: 'background-color 0.2s'
            }}
          >
            <FiMenu />
          </button>
        </div>
        
        <nav style={{ padding: '1rem 0' }}>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {/* Dashboard Link */}
            <li style={{ 
              marginBottom: '0.25rem', 
              backgroundColor: isActivePath('/dashboard') || isActivePath('/home') ? '#6366f1' : 'transparent',
              borderLeft: isActivePath('/dashboard') || isActivePath('/home') ? '4px solid #ec4899' : 'none'
            }}>
              <a 
                href="/home" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isActivePath('/dashboard') || isActivePath('/home') ? 'white' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FiHome style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                {sidebarOpen && <span>Dashboard</span>}
              </a>
            </li>

            {/* Users Link */}
            <li style={{ 
              marginBottom: '0.25rem',
              backgroundColor: isActivePath('/users') ? '#6366f1' : 'transparent',
              borderLeft: isActivePath('/users') ? '4px solid #ec4899' : 'none'
            }}>
              <a 
                href="/users" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isActivePath('/users') ? 'white' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FiUsers style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                {sidebarOpen && <span>Users</span>}
              </a>
            </li>

            {/* Drivers Link */}
            <li style={{ 
              marginBottom: '0.25rem',
              backgroundColor: isActivePath('/drivers') ? '#6366f1' : 'transparent',
              borderLeft: isActivePath('/drivers') ? '4px solid #ec4899' : 'none'
            }}>
              <a 
                href="/drivers" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isActivePath('/drivers') ? 'white' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FiTruck style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                {sidebarOpen && <span>Drivers</span>}
              </a>
            </li>

            {/* Pages Dropdown */}
            <li style={{ 
              marginBottom: '0.25rem', 
              backgroundColor: isPagesActive() ? '#6366f1' : 'transparent',
              borderLeft: isPagesActive() ? '4px solid #ec4899' : 'none'
            }}>
              <a 
                href="#" 
                onClick={(e) => {
                  e.preventDefault();
                  setPagesDropdownOpen(!pagesDropdownOpen);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isPagesActive() ? 'white' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FiPackage style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                {sidebarOpen && <span>Pages</span>}
                {sidebarOpen && (
                  <FiChevronDown 
                    style={{ 
                      marginLeft: 'auto', 
                      transition: 'transform 0.3s ease',
                      transform: pagesDropdownOpen ? 'rotate(180deg)' : 'none'
                    }} 
                  />
                )}
              </a>
              
              {sidebarOpen && (
                <ul style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: 0,
                  maxHeight: pagesDropdownOpen ? '500px' : '0',
                  overflow: 'hidden',
                  transition: 'max-height 0.3s ease'
                }}>
                  {/* Product Data */}
                  <li style={{ 
                    backgroundColor: isActivePath('/products') ? '#6366f1' : 'transparent',
                    borderLeft: isActivePath('/products') ? '4px solid #ec4899' : 'none'
                  }}>
                    <a 
                      href="/products" 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1.5rem 0.75rem 3rem',
                        color: isActivePath('/products') ? 'white' : '#e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FiShoppingBag style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                      <span>Product</span>
                    </a>
                  </li>
                  
                  {/* Ride Data */}
                  <li style={{ 
                    backgroundColor: isActivePath('/rides') ? '#6366f1' : 'transparent',
                    borderLeft: isActivePath('/rides') ? '4px solid #ec4899' : 'none'
                  }}>
                    <a 
                      href="/rides" 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1.5rem 0.75rem 3rem',
                        color: isActivePath('/rides') ? 'white' : '#e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FiShoppingCart style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                      <span>Ride</span>
                    </a>
                  </li>
                  
                  {/* Live Data */}
                  <li style={{ 
                    backgroundColor: isActivePath('/live-data') ? '#6366f1' : 'transparent',
                    borderLeft: isActivePath('/live-data') ? '4px solid #ec4899' : 'none'
                  }}>
                    <a 
                      href="/live-data" 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1.5rem 0.75rem 3rem',
                        color: isActivePath('/live-data') ? 'white' : '#e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FiMapPin style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                      <span>Live</span>
                    </a>
                  </li>
                  
                  {/* Sales Data */}
                  <li style={{ 
                    backgroundColor: isActivePath('/sales-data') ? '#6366f1' : 'transparent',
                    borderLeft: isActivePath('/sales-data') ? '4px solid #ec4899' : 'none'
                  }}>
                    <a 
                      href="/sales-data" 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        padding: '0.75rem 1.5rem 0.75rem 3rem',
                        color: isActivePath('/sales-data') ? 'white' : '#e2e8f0',
                        textDecoration: 'none',
                        transition: 'all 0.2s'
                      }}
                    >
                      <FiTrendingUp style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                      <span>Sales</span>
                    </a>
                  </li>
                </ul>
              )}
            </li>

            {/* Settings Link */}
            <li style={{ 
              marginBottom: '0.25rem',
              backgroundColor: isActivePath('/settings') ? '#6366f1' : 'transparent',
              borderLeft: isActivePath('/settings') ? '4px solid #ec4899' : 'none'
            }}>
              <a 
                href="/settings" 
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '0.75rem 1.5rem',
                  color: isActivePath('/settings') ? 'white' : '#e2e8f0',
                  textDecoration: 'none',
                  transition: 'all 0.2s'
                }}
              >
                <FiSettings style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
                {sidebarOpen && <span>Settings</span>}
              </a>
            </li>
          </ul>
        </nav>
      </div>
      
      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        overflowX: 'hidden'
      }}>
        {/* Top Bar */}
        <header style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '1rem 1.5rem',
          backgroundColor: darkMode ? '#1e293b' : '#ffffff',
          boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
          zIndex: 50
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            backgroundColor: darkMode ? '#334155' : '#ffffff',
            border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
            borderRadius: '0.5rem',
            padding: '0.5rem 1rem',
            width: '300px'
          }}>
            <FiSearch style={{ color: darkMode ? '#cbd5e1' : '#64748b', marginRight: '0.5rem' }} />
            <input 
              type="text" 
              placeholder="Search..." 
              style={{
                border: 'none',
                background: 'none',
                outline: 'none',
                flex: 1,
                color: darkMode ? '#f1f5f9' : '#1e293b',
                fontSize: '0.875rem'
              }} 
            />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <button style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: darkMode ? '#f1f5f9' : '#1e293b',
              fontSize: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FiMail />
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#ec4899',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: '9999px'
              }}>3</span>
            </button>
            <button style={{
              position: 'relative',
              background: 'none',
              border: 'none',
              color: darkMode ? '#f1f5f9' : '#1e293b',
              fontSize: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FiBell />
              <span style={{
                position: 'absolute',
                top: '0',
                right: '0',
                backgroundColor: '#ec4899',
                color: 'white',
                fontSize: '0.75rem',
                fontWeight: 600,
                padding: '0.125rem 0.375rem',
                borderRadius: '9999px'
              }}>5</span>
            </button>
            <button style={{
              background: 'none',
              border: 'none',
              color: darkMode ? '#f1f5f9' : '#1e293b',
              fontSize: '1.25rem',
              padding: '0.5rem',
              borderRadius: '0.375rem',
              cursor: 'pointer',
              transition: 'background-color 0.2s',
              display: 'flex',
              alignItems: 'center'
            }}>
              <FiSettings />
            </button>
            <button 
              onClick={() => setDarkMode(!darkMode)}
              style={{
                background: 'none',
                border: 'none',
                color: darkMode ? '#f1f5f9' : '#1e293b',
                fontSize: '1.25rem',
                padding: '0.5rem',
                borderRadius: '0.375rem',
                cursor: 'pointer',
                transition: 'background-color 0.2s',
                display: 'flex',
                alignItems: 'center'
              }}
            >
              {darkMode ? <FiSun /> : <FiMoon />}
            </button>
            <div style={{ position: 'relative' }}>
              <button 
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  background: 'none',
                  border: 'none',
                  color: darkMode ? '#f1f5f9' : '#1e293b',
                  fontSize: '1.25rem',
                  borderRadius: '0.375rem',
                  cursor: 'pointer',
                  transition: 'background-color 0.2s'
                }}
              >
                <FiUser />
                <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin</span>
                <FiChevronDown 
                  style={{ 
                    transition: 'transform 0.3s ease',
                    transform: profileDropdownOpen ? 'rotate(180deg)' : 'none'
                  }} 
                />
              </button>
              {profileDropdownOpen && (
                <ul style={{
                  position: 'absolute',
                  top: '100%',
                  right: '0',
                  backgroundColor: darkMode ? '#334155' : '#ffffff',
                  border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
                  borderRadius: '0.5rem',
                  boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
                  width: '200px',
                  zIndex: 100,
                  marginTop: '0.5rem',
                  listStyle: 'none',
                  padding: 0,
                  margin: 0
                }}>
                  <li>
                    <a href="#" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
                      borderBottom: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`
                    }}>
                      <FiUser style={{ fontSize: '1rem' }} />
                      <span style={{ fontSize: '0.875rem' }}>Profile</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s',
                      borderBottom: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`
                    }}>
                      <FiSettings style={{ fontSize: '1rem' }} />
                      <span style={{ fontSize: '0.875rem' }}>Settings</span>
                    </a>
                  </li>
                  <li>
                    <a href="#" onClick={handleLogout} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.75rem 1rem',
                      color: darkMode ? '#f1f5f9' : '#1e293b',
                      textDecoration: 'none',
                      transition: 'background-color 0.2s'
                    }}>
                      <FiLogOut style={{ fontSize: '1rem' }} />
                      <span style={{ fontSize: '0.875rem' }}>Logout</span>
                    </a>
                  </li>
                </ul>
              )}
            </div>
          </div>
        </header>
        
        {/* Dashboard Content */}
        <div style={{ padding: '1.5rem', flex: 1 }}>
          <div style={{ marginBottom: '2rem' }}>
            <h1 style={{ 
              fontSize: '2rem', 
              fontWeight: 700, 
              marginBottom: '0.5rem', 
              color: darkMode ? '#f1f5f9' : '#1e293b' 
            }}>
              Dashboard Overview
            </h1>
            <p style={{ 
              color: darkMode ? '#cbd5e1' : '#64748b',
              fontSize: '1rem'
            }}>
              Welcome to EAZYGO Admin Panel. Manage your platform efficiently.
            </p>
          </div>
          
          {/* Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            {statsData.map((stat, index) => (
              <div key={index} style={{
                backgroundColor: darkMode ? '#334155' : '#ffffff',
                borderRadius: '0.75rem',
                padding: '1.5rem',
                boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
                display: 'flex',
                alignItems: 'center',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  borderRadius: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '1.5rem',
                  marginRight: '1rem',
                  backgroundColor: stat.color + '20',
                  color: stat.color
                }}>
                  {stat.icon}
                </div>
                <div>
                  <h3 style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 500, 
                    color: darkMode ? '#cbd5e1' : '#64748b', 
                    marginBottom: '0.25rem' 
                  }}>
                    {stat.title}
                  </h3>
                  <div style={{ 
                    fontSize: '1.875rem', 
                    fontWeight: 700, 
                    color: darkMode ? '#f1f5f9' : '#1e293b', 
                    marginBottom: '0.25rem' 
                  }}>
                    {stat.value}
                  </div>
                  <div style={{ 
                    fontSize: '0.875rem', 
                    fontWeight: 500, 
                    color: '#14b8a6' 
                  }}>
                    {stat.change}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          {/* Charts Section */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem'
          }}>
            <div style={{
              backgroundColor: darkMode ? '#334155' : '#ffffff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: '1rem', 
                color: darkMode ? '#f1f5f9' : '#1e293b' 
              }}>
                Weekly Performance
              </h3>
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
            
            <div style={{
              backgroundColor: darkMode ? '#334155' : '#ffffff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: '1rem', 
                color: darkMode ? '#f1f5f9' : '#1e293b' 
              }}>
                Yearly Trends
              </h3>
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
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
            gap: '1.5rem'
          }}>
            <div style={{
              backgroundColor: darkMode ? '#334155' : '#ffffff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: '1rem', 
                color: darkMode ? '#f1f5f9' : '#1e293b' 
              }}>
                Service Distribution
              </h3>
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
            
            <div style={{
              backgroundColor: darkMode ? '#334155' : '#ffffff',
              borderRadius: '0.75rem',
              padding: '1.5rem',
              boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
            }}>
              <h3 style={{ 
                fontSize: '1.125rem', 
                fontWeight: 600, 
                marginBottom: '1rem', 
                color: darkMode ? '#f1f5f9' : '#1e293b' 
              }}>
                Recent Activities
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundColor: '#6366f1'
                  }}>
                    <FiShoppingCart />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      marginBottom: '0.25rem', 
                      color: darkMode ? '#f1f5f9' : '#1e293b' 
                    }}>
                      New ride booked
                    </h4>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b', 
                      marginBottom: '0.25rem' 
                    }}>
                      John Doe booked a ride from Downtown to Airport
                    </p>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b' 
                    }}>
                      2 minutes ago
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundColor: '#8b5cf6'
                  }}>
                    <FiPackage />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      marginBottom: '0.25rem', 
                      color: darkMode ? '#f1f5f9' : '#1e293b' 
                    }}>
                      New order placed
                    </h4>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b', 
                      marginBottom: '0.25rem' 
                    }}>
                      Jane Smith placed an order for groceries
                    </p>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b' 
                    }}>
                      5 minutes ago
                    </span>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                  <div style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    backgroundColor: '#ec4899'
                  }}>
                    <FiUsers />
                  </div>
                  <div>
                    <h4 style={{ 
                      fontSize: '1rem', 
                      fontWeight: 600, 
                      marginBottom: '0.25rem', 
                      color: darkMode ? '#f1f5f9' : '#1e293b' 
                    }}>
                      New user registered
                    </h4>
                    <p style={{ 
                      fontSize: '0.875rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b', 
                      marginBottom: '0.25rem' 
                    }}>
                      Michael Johnson joined EAZYGO
                    </p>
                    <span style={{ 
                      fontSize: '0.75rem', 
                      color: darkMode ? '#cbd5e1' : '#64748b' 
                    }}>
                      10 minutes ago
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;


// import React, { useState, useEffect } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
// import { FiMenu, FiSearch, FiMail, FiBell, FiSettings, FiUser, FiSun, FiMoon, FiHome, FiUsers, FiTruck, FiShoppingCart, FiPackage, FiLogOut, FiChevronDown, FiActivity, FiTrendingUp, FiMapPin, FiShoppingBag, FiUserCheck, FiDatabase } from 'react-icons/fi';

// function Dashboard() {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [darkMode, setDarkMode] = useState(false);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
//   const [pagesDropdownOpen, setPagesDropdownOpen] = useState(false);
//   const [userDataDropdownOpen, setUserDataDropdownOpen] = useState(false);
//   const [dataDropdownOpen, setDataDropdownOpen] = useState(false);
  
//   // Sample data for charts
//   const weeklySalesData = [
//     { name: 'Mon', rides: 120, orders: 80 },
//     { name: 'Tue', rides: 150, orders: 100 },
//     { name: 'Wed', rides: 180, orders: 120 },
//     { name: 'Thu', rides: 140, orders: 90 },
//     { name: 'Fri', rides: 200, orders: 150 },
//     { name: 'Sat', rides: 250, orders: 180 },
//     { name: 'Sun', rides: 220, orders: 160 },
//   ];
  
//   const yearlySalesData = [
//     { month: 'Jan', rides: 1200, orders: 800 },
//     { month: 'Feb', rides: 1500, orders: 1000 },
//     { month: 'Mar', rides: 1800, orders: 1200 },
//     { month: 'Apr', rides: 1400, orders: 900 },
//     { month: 'May', rides: 2000, orders: 1500 },
//     { month: 'Jun', rides: 2500, orders: 1800 },
//     { month: 'Jul', rides: 2200, orders: 1600 },
//     { month: 'Aug', rides: 2800, orders: 2000 },
//     { month: 'Sep', rides: 2600, orders: 1900 },
//     { month: 'Oct', rides: 3000, orders: 2200 },
//     { month: 'Nov', rides: 3200, orders: 2400 },
//     { month: 'Dec', rides: 3500, orders: 2600 },
//   ];
  
//   const pieData = [
//     { name: 'Rides', value: 65, color: '#6366f1' },
//     { name: 'Grocery', value: 35, color: '#8b5cf6' },
//   ];
  
//   const statsData = [
//     { title: 'Total Users', value: '63,154', change: '+12.5%', icon: <FiUsers />, color: '#6366f1' },
//     { title: 'Drivers', value: '1,842', change: '+8.2%', icon: <FiTruck />, color: '#8b5cf6' },
//     { title: 'Total Rides', value: '24,563', change: '+15.3%', icon: <FiShoppingCart />, color: '#ec4899' },
//     { title: 'Product Sales', value: '$48,254', change: '+22.1%', icon: <FiPackage />, color: '#14b8a6' },
//   ];
  
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("role");
//     navigate("/");
//   };
  
//   useEffect(() => {
//     // Apply dark mode class to body
//     if (darkMode) {
//       document.body.classList.add('dark-mode');
//     } else {
//       document.body.classList.remove('dark-mode');
//     }
//   }, [darkMode]);

//   // Check if current path matches for active state
//   const isActivePath = (path) => {
//     return location.pathname === path;
//   };

//   // Check if any child path is active for dropdown
//   const isDropdownActive = () => {
//     return isActivePath('/users') || 
//            isActivePath('/drivers') ||
//            isActivePath('/products') || 
//            isActivePath('/rides') || 
//            isActivePath('/live-data') || 
//            isActivePath('/sales-data') || 
//            isActivePath('/settings');
//   };
  
//   const isUserDataActive = () => {
//     return isActivePath('/users') || isActivePath('/drivers');
//   };
  
//   const isDataActive = () => {
//     return isActivePath('/products') || 
//            isActivePath('/rides') || 
//            isActivePath('/live-data') || 
//            isActivePath('/sales-data');
//   };
  
//   return (
//     <div style={{
//       display: 'flex',
//       minHeight: '100vh',
//       backgroundColor: darkMode ? '#0f172a' : '#f8fafc',
//       color: darkMode ? '#f1f5f9' : '#1e293b',
//       transition: 'all 0.3s ease'
//     }}>
//       {/* Sidebar */}
//       <div style={{
//         width: sidebarOpen ? '260px' : '70px',
//         backgroundColor: darkMode ? '#0f172a' : '#1e293b',
//         color: darkMode ? '#e2e8f0' : '#e2e8f0',
//         transition: 'all 0.3s ease',
//         position: 'relative',
//         zIndex: 100,
//         height: '100vh',
//         overflowY: 'auto'
//       }}>
//         <div style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '1.5rem',
//           borderBottom: `1px solid ${darkMode ? '#334155' : '#334155'}`
//         }}>
//           <h2 style={{
//             fontSize: '1.5rem',
//             fontWeight: 700,
//             color: '#6366f1',
//             transition: 'opacity 0.3s ease',
//             opacity: sidebarOpen ? 1 : 0,
//             pointerEvents: sidebarOpen ? 'auto' : 'none'
//           }}>EAZYGO</h2>
//           <button 
//             onClick={() => setSidebarOpen(!sidebarOpen)}
//             style={{
//               background: 'none',
//               border: 'none',
//               color: darkMode ? '#e2e8f0' : '#e2e8f0',
//               fontSize: '1.25rem',
//               cursor: 'pointer',
//               padding: '0.5rem',
//               borderRadius: '0.375rem',
//               transition: 'background-color 0.2s'
//             }}
//           >
//             <FiMenu />
//           </button>
//         </div>
        
//         <nav style={{ padding: '1rem 0' }}>
//           <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
//             {/* Dashboard Link */}
//             <li style={{ marginBottom: '0.25rem', backgroundColor: isActivePath('/dashboard') ? '#6366f1' : 'transparent' }}>
//               <a 
//                 href="/home" 
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '0.75rem 1.5rem',
//                   color: isActivePath('/dashboard') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                   textDecoration: 'none',
//                   transition: 'all 0.2s',
//                   position: 'relative'
//                 }}
//               >
//                 <FiHome style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                 {sidebarOpen && <span>Dashboard</span>}
//               </a>
//             </li>

//             {/* Pages Dropdown */}
//             <li style={{ marginBottom: '0.25rem', backgroundColor: isDropdownActive() ? '#6366f1' : 'transparent' }}>
//               <a 
//                 href="#" 
//                 onClick={(e) => {
//                   e.preventDefault();
//                   setPagesDropdownOpen(!pagesDropdownOpen);
//                 }}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   padding: '0.75rem 1.5rem',
//                   color: isDropdownActive() ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                   textDecoration: 'none',
//                   transition: 'all 0.2s',
//                   position: 'relative'
//                 }}
//               >
//                 <FiPackage style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                 {sidebarOpen && <span>Pages</span>}
//                 {sidebarOpen && (
//                   <FiChevronDown 
//                     style={{ 
//                       marginLeft: 'auto', 
//                       transition: 'transform 0.3s ease',
//                       transform: pagesDropdownOpen ? 'rotate(180deg)' : 'none'
//                     }} 
//                   />
//                 )}
//               </a>
              
//               {sidebarOpen && (
//                 <ul style={{
//                   listStyle: 'none',
//                   padding: 0,
//                   margin: 0,
//                   maxHeight: pagesDropdownOpen ? '500px' : '0',
//                   overflow: 'hidden',
//                   transition: 'max-height 0.3s ease'
//                 }}>
//                   {/* User Data Submenu */}
//                   <li style={{ backgroundColor: isUserDataActive() ? '#6366f1' : 'transparent' }}>
//                     <a 
//                       href="#" 
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setUserDataDropdownOpen(!userDataDropdownOpen);
//                       }}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '0.75rem 1.5rem',
//                         color: isUserDataActive() ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                         textDecoration: 'none',
//                         transition: 'all 0.2s',
//                         position: 'relative'
//                       }}
//                     >
//                       <FiUserCheck style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                       <span>User Data</span>
//                       <FiChevronDown 
//                         style={{ 
//                           marginLeft: 'auto', 
//                           transition: 'transform 0.3s ease',
//                           transform: userDataDropdownOpen ? 'rotate(180deg)' : 'none'
//                         }} 
//                       />
//                     </a>
                    
//                     <ul style={{
//                       listStyle: 'none',
//                       padding: 0,
//                       margin: 0,
//                       maxHeight: userDataDropdownOpen ? '500px' : '0',
//                       overflow: 'hidden',
//                       transition: 'max-height 0.3s ease'
//                     }}>
//                       <li style={{ backgroundColor: isActivePath('/users') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/users" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/users') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiUsers style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Users</span>
//                         </a>
//                       </li>
//                       <li style={{ backgroundColor: isActivePath('/drivers') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/drivers" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/drivers') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiTruck style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Drivers</span>
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
                  
//                   {/* Data Submenu */}
//                   <li style={{ backgroundColor: isDataActive() ? '#6366f1' : 'transparent' }}>
//                     <a 
//                       href="#" 
//                       onClick={(e) => {
//                         e.preventDefault();
//                         setDataDropdownOpen(!dataDropdownOpen);
//                       }}
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '0.75rem 1.5rem',
//                         color: isDataActive() ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                         textDecoration: 'none',
//                         transition: 'all 0.2s',
//                         position: 'relative'
//                       }}
//                     >
//                       <FiDatabase style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                       <span>Data</span>
//                       <FiChevronDown 
//                         style={{ 
//                           marginLeft: 'auto', 
//                           transition: 'transform 0.3s ease',
//                           transform: dataDropdownOpen ? 'rotate(180deg)' : 'none'
//                         }} 
//                       />
//                     </a>
                    
//                     <ul style={{
//                       listStyle: 'none',
//                       padding: 0,
//                       margin: 0,
//                       maxHeight: dataDropdownOpen ? '500px' : '0',
//                       overflow: 'hidden',
//                       transition: 'max-height 0.3s ease'
//                     }}>
//                       <li style={{ backgroundColor: isActivePath('/products') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/products" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/products') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiShoppingBag style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Product Data</span>
//                         </a>
//                       </li>
//                       <li style={{ backgroundColor: isActivePath('/rides') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/rides" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/rides') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiShoppingCart style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Ride Data</span>
//                         </a>
//                       </li>
//                       <li style={{ backgroundColor: isActivePath('/live-data') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/live-data" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/live-data') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiMapPin style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Live Data</span>
//                         </a>
//                       </li>
//                       <li style={{ backgroundColor: isActivePath('/sales-data') ? '#6366f1' : 'transparent' }}>
//                         <a 
//                           href="/sales-data" 
//                           style={{
//                             display: 'flex',
//                             alignItems: 'center',
//                             padding: '0.75rem 1.5rem',
//                             color: isActivePath('/sales-data') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                             textDecoration: 'none',
//                             transition: 'all 0.2s',
//                             position: 'relative'
//                           }}
//                         >
//                           <FiTrendingUp style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                           <span>Sales Data</span>
//                         </a>
//                       </li>
//                     </ul>
//                   </li>
                  
//                   {/* Settings Link */}
//                   <li style={{ backgroundColor: isActivePath('/settings') ? '#6366f1' : 'transparent' }}>
//                     <a 
//                       href="/settings" 
//                       style={{
//                         display: 'flex',
//                         alignItems: 'center',
//                         padding: '0.75rem 1.5rem',
//                         color: isActivePath('/settings') ? 'white' : darkMode ? '#e2e8f0' : '#e2e8f0',
//                         textDecoration: 'none',
//                         transition: 'all 0.2s',
//                         position: 'relative'
//                       }}
//                     >
//                       <FiSettings style={{ marginRight: '0.75rem', fontSize: '1.25rem' }} />
//                       <span>Setting</span>
//                     </a>
//                   </li>
//                 </ul>
//               )}
//             </li>
//           </ul>
//         </nav>
//       </div>
      
//       {/* Main Content */}
//       <div style={{
//         flex: 1,
//         display: 'flex',
//         flexDirection: 'column',
//         overflowX: 'hidden'
//       }}>
//         {/* Top Bar */}
//         <header style={{
//           display: 'flex',
//           alignItems: 'center',
//           justifyContent: 'space-between',
//           padding: '1rem 1.5rem',
//           backgroundColor: darkMode ? '#1e293b' : '#ffffff',
//           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//           zIndex: 50
//         }}>
//           <div style={{
//             display: 'flex',
//             alignItems: 'center',
//             backgroundColor: darkMode ? '#334155' : '#ffffff',
//             border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
//             borderRadius: '0.5rem',
//             padding: '0.5rem 1rem',
//             width: '300px'
//           }}>
//             <FiSearch style={{ color: darkMode ? '#cbd5e1' : '#64748b', marginRight: '0.5rem' }} />
//             <input 
//               type="text" 
//               placeholder="Search..." 
//               style={{
//                 border: 'none',
//                 background: 'none',
//                 outline: 'none',
//                 flex: 1,
//                 color: darkMode ? '#f1f5f9' : '#1e293b'
//               }} 
//             />
//           </div>
          
//           <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
//             <button style={{
//               position: 'relative',
//               background: 'none',
//               border: 'none',
//               color: darkMode ? '#f1f5f9' : '#1e293b',
//               fontSize: '1.25rem',
//               padding: '0.5rem',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <FiMail />
//               <span style={{
//                 position: 'absolute',
//                 top: '0',
//                 right: '0',
//                 backgroundColor: '#ec4899',
//                 color: 'white',
//                 fontSize: '0.75rem',
//                 fontWeight: 600,
//                 padding: '0.125rem 0.375rem',
//                 borderRadius: '9999px'
//               }}>3</span>
//             </button>
//             <button style={{
//               position: 'relative',
//               background: 'none',
//               border: 'none',
//               color: darkMode ? '#f1f5f9' : '#1e293b',
//               fontSize: '1.25rem',
//               padding: '0.5rem',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <FiBell />
//               <span style={{
//                 position: 'absolute',
//                 top: '0',
//                 right: '0',
//                 backgroundColor: '#ec4899',
//                 color: 'white',
//                 fontSize: '0.75rem',
//                 fontWeight: 600,
//                 padding: '0.125rem 0.375rem',
//                 borderRadius: '9999px'
//               }}>5</span>
//             </button>
//             <button style={{
//               background: 'none',
//               border: 'none',
//               color: darkMode ? '#f1f5f9' : '#1e293b',
//               fontSize: '1.25rem',
//               padding: '0.5rem',
//               borderRadius: '0.375rem',
//               cursor: 'pointer',
//               transition: 'background-color 0.2s',
//               display: 'flex',
//               alignItems: 'center'
//             }}>
//               <FiSettings />
//             </button>
//             <button 
//               onClick={() => setDarkMode(!darkMode)}
//               style={{
//                 background: 'none',
//                 border: 'none',
//                 color: darkMode ? '#f1f5f9' : '#1e293b',
//                 fontSize: '1.25rem',
//                 padding: '0.5rem',
//                 borderRadius: '0.375rem',
//                 cursor: 'pointer',
//                 transition: 'background-color 0.2s',
//                 display: 'flex',
//                 alignItems: 'center'
//               }}
//             >
//               {darkMode ? <FiSun /> : <FiMoon />}
//             </button>
//             <div style={{ position: 'relative' }}>
//               <button 
//                 onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
//                 style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                   padding: '0.5rem 0.75rem',
//                   background: 'none',
//                   border: 'none',
//                   color: darkMode ? '#f1f5f9' : '#1e293b',
//                   fontSize: '1.25rem',
//                   borderRadius: '0.375rem',
//                   cursor: 'pointer',
//                   transition: 'background-color 0.2s'
//                 }}
//               >
//                 <FiUser />
//                 <span>Admin</span>
//                 <FiChevronDown 
//                   style={{ 
//                     transition: 'transform 0.3s ease',
//                     transform: profileDropdownOpen ? 'rotate(180deg)' : 'none'
//                   }} 
//                 />
//               </button>
//               <ul style={{
//                 position: 'absolute',
//                 top: '100%',
//                 right: '0',
//                 backgroundColor: darkMode ? '#334155' : '#ffffff',
//                 border: `1px solid ${darkMode ? '#475569' : '#e2e8f0'}`,
//                 borderRadius: '0.5rem',
//                 boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
//                 width: '200px',
//                 zIndex: 100,
//                 marginTop: '0.5rem',
//                 listStyle: 'none',
//                 padding: 0,
//                 margin: 0,
//                 display: profileDropdownOpen ? 'block' : 'none'
//               }}>
//                 <li><a href="#" style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                   padding: '0.75rem 1rem',
//                   color: darkMode ? '#f1f5f9' : '#1e293b',
//                   textDecoration: 'none',
//                   transition: 'background-color 0.2s'
//                 }}>Profile</a></li>
//                 <li><a href="#" style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                   padding: '0.75rem 1rem',
//                   color: darkMode ? '#f1f5f9' : '#1e293b',
//                   textDecoration: 'none',
//                   transition: 'background-color 0.2s'
//                 }}>Settings</a></li>
//                 <li><a href="#" onClick={handleLogout} style={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: '0.5rem',
//                   padding: '0.75rem 1rem',
//                   color: darkMode ? '#f1f5f9' : '#1e293b',
//                   textDecoration: 'none',
//                   transition: 'background-color 0.2s'
//                 }}><FiLogOut /> Logout</a></li>
//               </ul>
//             </div>
//           </div>
//         </header>
        
//         {/* Dashboard Content */}
//         <div style={{ padding: '1.5rem', flex: 1 }}>
//           <h1 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '1.5rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Dashboard</h1>
          
//           {/* Stats Cards */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
//             gap: '1.5rem',
//             marginBottom: '2rem'
//           }}>
//             {statsData.map((stat, index) => (
//               <div key={index} style={{
//                 backgroundColor: darkMode ? '#334155' : '#ffffff',
//                 borderRadius: '0.75rem',
//                 padding: '1.5rem',
//                 boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)',
//                 display: 'flex',
//                 alignItems: 'center',
//                 transition: 'transform 0.3s ease, box-shadow 0.3s ease'
//               }}>
//                 <div style={{
//                   width: '60px',
//                   height: '60px',
//                   borderRadius: '0.75rem',
//                   display: 'flex',
//                   alignItems: 'center',
//                   justifyContent: 'center',
//                   fontSize: '1.5rem',
//                   marginRight: '1rem',
//                   backgroundColor: stat.color + '20',
//                   color: stat.color
//                 }}>
//                   {stat.icon}
//                 </div>
//                 <div>
//                   <h3 style={{ fontSize: '0.875rem', fontWeight: 500, color: darkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.25rem' }}>{stat.title}</h3>
//                   <div style={{ fontSize: '1.875rem', fontWeight: 700, color: darkMode ? '#f1f5f9' : '#1e293b', marginBottom: '0.25rem' }}>{stat.value}</div>
//                   <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#14b8a6' }}>{stat.change}</div>
//                 </div>
//               </div>
//             ))}
//           </div>
          
//           {/* Charts */}
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
//             gap: '1.5rem',
//             marginBottom: '2rem'
//           }}>
//             <div style={{
//               backgroundColor: darkMode ? '#334155' : '#ffffff',
//               borderRadius: '0.75rem',
//               padding: '1.5rem',
//               boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
//             }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Weekly Sales Report</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <BarChart data={weeklySalesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="name" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Bar dataKey="rides" fill="#6366f1" />
//                   <Bar dataKey="orders" fill="#8b5cf6" />
//                 </BarChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div style={{
//               backgroundColor: darkMode ? '#334155' : '#ffffff',
//               borderRadius: '0.75rem',
//               padding: '1.5rem',
//               boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
//             }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Yearly Sales Report</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <LineChart data={yearlySalesData}>
//                   <CartesianGrid strokeDasharray="3 3" />
//                   <XAxis dataKey="month" />
//                   <YAxis />
//                   <Tooltip />
//                   <Legend />
//                   <Line type="monotone" dataKey="rides" stroke="#6366f1" activeDot={{ r: 8 }} />
//                   <Line type="monotone" dataKey="orders" stroke="#8b5cf6" />
//                 </LineChart>
//               </ResponsiveContainer>
//             </div>
//           </div>
          
//           <div style={{
//             display: 'grid',
//             gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
//             gap: '1.5rem',
//             marginBottom: '2rem'
//           }}>
//             <div style={{
//               backgroundColor: darkMode ? '#334155' : '#ffffff',
//               borderRadius: '0.75rem',
//               padding: '1.5rem',
//               boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
//             }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Service Distribution</h3>
//               <ResponsiveContainer width="100%" height={300}>
//                 <PieChart>
//                   <Pie
//                     data={pieData}
//                     cx="50%"
//                     cy="50%"
//                     labelLine={false}
//                     label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
//                     outerRadius={80}
//                     fill="#8884d8"
//                     dataKey="value"
//                   >
//                     {pieData.map((entry, index) => (
//                       <Cell key={`cell-${index}`} fill={entry.color} />
//                     ))}
//                   </Pie>
//                   <Tooltip />
//                 </PieChart>
//               </ResponsiveContainer>
//             </div>
            
//             <div style={{
//               backgroundColor: darkMode ? '#334155' : '#ffffff',
//               borderRadius: '0.75rem',
//               padding: '1.5rem',
//               boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
//             }}>
//               <h3 style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '1rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>Recent Activities</h3>
//               <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
//                 <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     backgroundColor: '#6366f1'
//                   }}>
//                     <FiShoppingCart />
//                   </div>
//                   <div>
//                     <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>New ride booked</h4>
//                     <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.25rem' }}>John Doe booked a ride from Downtown to Airport</p>
//                     <span style={{ fontSize: '0.75rem', color: darkMode ? '#cbd5e1' : '#64748b' }}>2 minutes ago</span>
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     backgroundColor: '#8b5cf6'
//                   }}>
//                     <FiPackage />
//                   </div>
//                   <div>
//                     <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>New order placed</h4>
//                     <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.25rem' }}>Jane Smith placed an order for groceries</p>
//                     <span style={{ fontSize: '0.75rem', color: darkMode ? '#cbd5e1' : '#64748b' }}>5 minutes ago</span>
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     backgroundColor: '#ec4899'
//                   }}>
//                     <FiUsers />
//                   </div>
//                   <div>
//                     <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>New user registered</h4>
//                     <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.25rem' }}>Michael Johnson joined EAZYGO</p>
//                     <span style={{ fontSize: '0.75rem', color: darkMode ? '#cbd5e1' : '#64748b' }}>10 minutes ago</span>
//                   </div>
//                 </div>
//                 <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
//                   <div style={{
//                     width: '40px',
//                     height: '40px',
//                     borderRadius: '50%',
//                     display: 'flex',
//                     alignItems: 'center',
//                     justifyContent: 'center',
//                     color: 'white',
//                     backgroundColor: '#14b8a6'
//                   }}>
//                     <FiTruck />
//                   </div>
//                   <div>
//                     <h4 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '0.25rem', color: darkMode ? '#f1f5f9' : '#1e293b' }}>New driver registered</h4>
//                     <p style={{ fontSize: '0.875rem', color: darkMode ? '#cbd5e1' : '#64748b', marginBottom: '0.25rem' }}>Robert Williams joined as a driver</p>
//                     <span style={{ fontSize: '0.75rem', color: darkMode ? '#cbd5e1' : '#64748b' }}>15 minutes ago</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Dashboard;