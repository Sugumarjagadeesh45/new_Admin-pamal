// src/components/Pages/SalesData.jsx
import React, { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { FiTrendingUp, FiDollarSign, FiShoppingCart, FiPackage } from 'react-icons/fi';

function SalesData() {
  const [timeRange, setTimeRange] = useState('week');
  
  const salesData = {
    week: [
      { name: 'Mon', rides: 120, orders: 80, revenue: 1200 },
      { name: 'Tue', rides: 150, orders: 100, revenue: 1500 },
      { name: 'Wed', rides: 180, orders: 120, revenue: 1800 },
      { name: 'Thu', rides: 140, orders: 90, revenue: 1400 },
      { name: 'Fri', rides: 200, orders: 150, revenue: 2000 },
      { name: 'Sat', rides: 250, orders: 180, revenue: 2500 },
      { name: 'Sun', rides: 220, orders: 160, revenue: 2200 },
    ],
    month: [
      { name: 'Week 1', rides: 800, orders: 600, revenue: 8000 },
      { name: 'Week 2', rides: 950, orders: 750, revenue: 9500 },
      { name: 'Week 3', rides: 1100, orders: 900, revenue: 11000 },
      { name: 'Week 4', rides: 1200, orders: 1000, revenue: 12000 },
    ]
  };

  const revenueData = [
    { name: 'Ride Booking', value: 65, color: '#6366f1' },
    { name: 'Grocery Delivery', value: 25, color: '#8b5cf6' },
    { name: 'Food Delivery', value: 10, color: '#ec4899' },
  ];

  const stats = [
    { title: 'Total Revenue', value: '$152,847', change: '+18.7%', icon: <FiDollarSign /> },
    { title: 'Ride Revenue', value: '$98,254', change: '+15.3%', icon: <FiShoppingCart /> },
    { title: 'Product Sales', value: '$48,254', change: '+22.1%', icon: <FiPackage /> },
    { title: 'Avg. Order Value', value: '$25.50', change: '+5.2%', icon: <FiTrendingUp /> },
  ];

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Sales Data Analytics</h1>
        <p style={styles.subtitle}>Comprehensive sales performance and revenue insights</p>
      </div>

      <div style={styles.controls}>
        <div style={styles.timeRange}>
          <button 
            style={{...styles.timeButton, ...(timeRange === 'week' ? styles.activeTimeButton : {})}}
            onClick={() => setTimeRange('week')}
          >
            Weekly
          </button>
          <button 
            style={{...styles.timeButton, ...(timeRange === 'month' ? styles.activeTimeButton : {})}}
            onClick={() => setTimeRange('month')}
          >
            Monthly
          </button>
        </div>
      </div>

      <div style={styles.statsGrid}>
        {stats.map((stat, index) => (
          <div key={index} style={styles.statCard}>
            <div style={styles.statIcon}>
              {stat.icon}
            </div>
            <div style={styles.statContent}>
              <h3 style={styles.statTitle}>{stat.title}</h3>
              <div style={styles.statValue}>{stat.value}</div>
              <div style={styles.statChange}>{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.chartsContainer}>
        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Sales Performance</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={salesData[timeRange]}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="revenue" fill="#6366f1" name="Revenue ($)" />
              <Bar dataKey="rides" fill="#8b5cf6" name="Rides" />
              <Bar dataKey="orders" fill="#ec4899" name="Orders" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div style={styles.chartCard}>
          <h3 style={styles.chartTitle}>Revenue Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={revenueData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({name, percent}) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {revenueData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '2rem',
    backgroundColor: '#f8fafc',
    minHeight: '100vh'
  },
  header: {
    marginBottom: '2rem'
  },
  title: {
    fontSize: '2rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.5rem'
  },
  subtitle: {
    color: '#64748b',
    fontSize: '1rem'
  },
  controls: {
    marginBottom: '2rem'
  },
  timeRange: {
    display: 'flex',
    gap: '0.5rem'
  },
  timeButton: {
    padding: '0.5rem 1rem',
    border: '1px solid #e2e8f0',
    backgroundColor: 'white',
    borderRadius: '0.375rem',
    cursor: 'pointer',
    color: '#64748b'
  },
  activeTimeButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    borderColor: '#6366f1'
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '1.5rem',
    marginBottom: '2rem'
  },
  statCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    display: 'flex',
    alignItems: 'center'
  },
  statIcon: {
    width: '60px',
    height: '60px',
    borderRadius: '0.75rem',
    backgroundColor: '#6366f120',
    color: '#6366f1',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '1.5rem',
    marginRight: '1rem'
  },
  statContent: {
    flex: 1
  },
  statTitle: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#64748b',
    marginBottom: '0.25rem'
  },
  statValue: {
    fontSize: '1.875rem',
    fontWeight: '700',
    color: '#1e293b',
    marginBottom: '0.25rem'
  },
  statChange: {
    fontSize: '0.875rem',
    fontWeight: '500',
    color: '#10b981'
  },
  chartsContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(500px, 1fr))',
    gap: '1.5rem'
  },
  chartCard: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    padding: '1.5rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)'
  },
  chartTitle: {
    fontSize: '1.125rem',
    fontWeight: '600',
    marginBottom: '1rem',
    color: '#1e293b'
  }
};

export default SalesData;