// src/utils/logout.js

export const logout = async (navigate) => {
  try {
    // Retrieve and parse the authData from localStorage
    const storedAuthData = localStorage.getItem('authData');
    if (!storedAuthData) {
      throw new Error("No authentication data found. Please log in.");
    }

    const authData = JSON.parse(storedAuthData);
    const token = authData.access_token;

    // Call the logout API with the token
    const response = await fetch('https://proximahr.onrender.com/api/v2/company/logout', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`, // Pass the valid token in the request
      },
    });

    // Handle the response from the API
    if (response.ok) {
      // Clear the token from localStorage
      localStorage.removeItem('authData');
      
      // Redirect to login page
      navigate('/login');
    } else {
      console.error('Logout failed', await response.json());
    }
  } catch (error) {
    console.error('Error logging out:', error);
  }
};
