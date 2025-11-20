// src/components/Pages/Drivers.jsx
import React, { useState } from "react";
import { FiTruck, FiSearch, FiEdit, FiTrash2, FiUserPlus, FiStar } from 'react-icons/fi';

function Drivers() {
  const [drivers] = useState([
    { id: 1, name: "Mike Johnson", vehicle: "Toyota Camry", license: "DL123456", rating: 4.8, trips: 245, status: "Online" },
    { id: 2, name: "Sarah Wilson", vehicle: "Honda Civic", license: "DL123457", rating: 4.9, trips: 189, status: "Offline" },
    { id: 3, name: "Alex Chen", vehicle: "Ford Fusion", license: "DL123458", rating: 4.7, trips: 312, status: "Online" }
  ]);

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Driver Management</h1>
        <p style={styles.subtitle}>Manage driver accounts and vehicle information</p>
      </div>

      <div style={styles.actions}>
        <div style={styles.searchContainer}>
          <FiSearch style={styles.searchIcon} />
          <input type="text" placeholder="Search drivers..." style={styles.searchInput} />
        </div>
        <button style={styles.addButton}>
          <FiUserPlus /> Add Driver
        </button>
      </div>

      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Driver ID</th>
              <th style={styles.th}>Name</th>
              <th style={styles.th}>Vehicle</th>
              <th style={styles.th}>License</th>
              <th style={styles.th}>Rating</th>
              <th style={styles.th}>Trips</th>
              <th style={styles.th}>Status</th>
              <th style={styles.th}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {drivers.map(driver => (
              <tr key={driver.id} style={styles.tr}>
                <td style={styles.td}>#{driver.id}</td>
                <td style={styles.td}>
                  <div style={styles.driverInfo}>
                    <FiTruck style={styles.driverIcon} />
                    {driver.name}
                  </div>
                </td>
                <td style={styles.td}>{driver.vehicle}</td>
                <td style={styles.td}>{driver.license}</td>
                <td style={styles.td}>
                  <div style={styles.rating}>
                    <FiStar style={styles.starIcon} />
                    {driver.rating}
                  </div>
                </td>
                <td style={styles.td}>{driver.trips}</td>
                <td style={styles.td}>
                  <span style={{
                    ...styles.status,
                    backgroundColor: driver.status === "Online" ? '#10b98120' : '#64748b20',
                    color: driver.status === "Online" ? '#10b981' : '#64748b'
                  }}>
                    {driver.status}
                  </span>
                </td>
                <td style={styles.td}>
                  <div style={styles.actionButtons}>
                    <button style={styles.editButton}><FiEdit /></button>
                    <button style={styles.deleteButton}><FiTrash2 /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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
  actions: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '2rem'
  },
  searchContainer: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: 'white',
    border: '1px solid #e2e8f0',
    borderRadius: '0.5rem',
    padding: '0.5rem 1rem',
    width: '300px'
  },
  searchIcon: {
    color: '#64748b',
    marginRight: '0.5rem'
  },
  searchInput: {
    border: 'none',
    background: 'none',
    outline: 'none',
    flex: 1,
    color: '#1e293b'
  },
  addButton: {
    backgroundColor: '#6366f1',
    color: 'white',
    border: 'none',
    padding: '0.75rem 1.5rem',
    borderRadius: '0.5rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem',
    fontWeight: '500'
  },
  tableContainer: {
    backgroundColor: 'white',
    borderRadius: '0.75rem',
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse'
  },
  th: {
    backgroundColor: '#f8fafc',
    padding: '1rem',
    textAlign: 'left',
    fontWeight: '600',
    color: '#374151',
    borderBottom: '1px solid #e5e7eb'
  },
  tr: {
    borderBottom: '1px solid #e5e7eb'
  },
  td: {
    padding: '1rem',
    color: '#6b7280'
  },
  driverInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.5rem'
  },
  driverIcon: {
    color: '#6366f1'
  },
  rating: {
    display: 'flex',
    alignItems: 'center',
    gap: '0.25rem'
  },
  starIcon: {
    color: '#f59e0b'
  },
  status: {
    padding: '0.25rem 0.75rem',
    borderRadius: '9999px',
    fontSize: '0.875rem',
    fontWeight: '500'
  },
  actionButtons: {
    display: 'flex',
    gap: '0.5rem'
  },
  editButton: {
    backgroundColor: '#dbeafe',
    color: '#3b82f6',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    cursor: 'pointer'
  },
  deleteButton: {
    backgroundColor: '#fee2e2',
    color: '#ef4444',
    border: 'none',
    padding: '0.5rem',
    borderRadius: '0.375rem',
    cursor: 'pointer'
  }
};

export default Drivers;