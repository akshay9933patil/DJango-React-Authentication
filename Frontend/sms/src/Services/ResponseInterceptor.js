import axios from "axios";

const URL = 'http://localhost:8000/'
let refresh = false;

axios.interceptors.response.use(
  (resp) => resp, // Handle successful responses
  async (error) => {
    if (error.response.status === 401 && !refresh) {
      // If response status is 401 (Unauthorized) and refresh flag is not set
      refresh = true; // Set refresh flag to prevent concurrent token refresh attempts
      console.log(localStorage.getItem('refresh_token')); // Log the refresh token from local storage

      const response = await axios.post(
        `${URL}auth/refresh/`, // Refresh token endpoint URL
        {
          refresh: localStorage.getItem('refresh_token') // Pass refresh token in request payload
        },
        {
          headers: {
            'Content-Type': 'application/json' // Set request headers
          },
          withCredentials: true // Send cookies with the request
        }
      );

      if (response.status === 200) {
        // If token refresh request is successful
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data['access']}`; // Update default Authorization header
        localStorage.setItem('access_token', response.data.access); // Store the new access token in local storage
        localStorage.setItem('refresh_token', response.data.refresh); // Store the new refresh token in local storage
        return axios(error.config); // Retry the original failed request with the updated access token
      }
    }

    refresh = false; // Reset refresh flag
    return error; // Return the error response as is
  }
);