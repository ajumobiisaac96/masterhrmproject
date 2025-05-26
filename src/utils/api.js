// utils/api.js

import axios from 'axios';

// Define the base URL for your API
const API_URL = 'https://proximahr.onrender.com/analytics';

// Function to retrieve the token from localStorage and parse it
const getTokenFromLocalStorage = () => {
  const authData = JSON.parse(localStorage.getItem('authData'));  // Parse the stored object
  return authData?.access_token;  // Extract and return the token
};

// Function to get Overtime by Department
export const getOvertimeByDepartment = async (year) => {
  const token = getTokenFromLocalStorage();  // Get the token from localStorage

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/overtime-by-department-by-month`, {
      headers: {
        Authorization: `Bearer ${token}`,  // Add the token in the Authorization header
      },
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching overtime data:', error.response || error.message);
    throw error;
  }
};

// Function to get Top Attendance Records
export const getTopAttendanceAchievers = async (year) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/top-attendance`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance achievers:', error.response || error.message);
    throw error;
  }
};

// Function to get Yearly Attendance Trend
export const getYearlyAttendanceTrend = async (year) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/attendance/yearly-trend`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance trend:', error.response || error.message);
    throw error;
  }
};


// Function to get Department Attendance Percentage
export const getDepartmentAttendancePercentage = async () => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/attendance/current-month`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching department attendance:', error.response || error.message);
    throw error;
  }
};

// Function to get Workforce Growth and Trend
export const getWorkforceGrowth = async (year) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/workforce`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching workforce growth:', error.response || error.message);
    throw error;
  }
};

// Function to get Attendance Rate
export const getAttendanceRate = async () => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/attendance-rate`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching attendance rate:', error.response || error.message);
    throw error;
  }
};

// Function to get Leave Utilization
export const getLeaveUtilization = async () => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/leave-utilization`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching leave utilization:', error.response || error.message);
    throw error;
  }
};

// Function to get Payroll Cost and Trend
export const getPayrollCost = async (year) => {
  const token = getTokenFromLocalStorage();

  if (!token) {
    throw new Error('Token is required to make the request.');
  }

  try {
    const response = await axios.get(`${API_URL}/payroll`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: { year },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching payroll cost:', error.response || error.message);
    throw error;
  }
};

export const getCurrentMonthAttendanceByDepartment = async (token) => {
  try {
    const response = await fetch(
      'https://proximahr.onrender.com/api/v2/analytics/attendance/current-month',
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      }
    );
    const data = await response.json();
    console.log('Current Month Attendance By Department:', data);
    return data;
  } catch (error) {
    console.error('Error fetching current month attendance by department:', error);
    return [];
  }
};

