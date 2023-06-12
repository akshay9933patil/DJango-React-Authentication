import axios from 'axios';

const logoutUser = async () => {
  try {
    const access_token = localStorage.getItem('access_token');
    const refresh_token = localStorage.getItem('refresh_token');

    // Blacklist the refresh token on the server
    
    await axios.post('/api/token/blacklist/', { refresh_token }, {
      headers: {
        Authorization: `Bearer ${access_token}`,
        'Content-Type': 'application/json'
      }
    });

    // Clear user-related data from local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');

    // Redirect the user to the login page or any desired location
    window.location.href = '/login';
  } catch (error) {
    console.error('Logout failed:', error);
    // Handle any error that occurred during the logout process
  }
};

const Logout = () => {
  logoutUser(); // Call the logoutUser function when the Logout component is invoked
};

export default Logout;