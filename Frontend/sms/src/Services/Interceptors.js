import axios from 'axios';
import React from 'react';


const setupAxiosInterceptors = () => {
  // Flag to track if a token refresh is in progress
  let isRefreshing = false;

  // Array to hold the pending request subscribers
  let refreshSubscribers = [];

  // Create a new instance of Axios
  const axiosInstance = axios.create();

  // Request interceptor to add the access token to the Authorization header
  axiosInstance.interceptors.request.use(
        (config) => {
        // Get the access token from local storage
        const accessToken = localStorage.getItem('access_token');

        if (accessToken) {
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }

        return config;
        },
        (error) => {
        return Promise.reject(error);
        }
  );

  // Response interceptor to handle token expiration and refreshing
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      const originalRequest = error.config;

      // Check if the response is Unauthorized (status code 401) and it's not a retry request
      if (error.response.status === 401 && !originalRequest._retry) {
        if (isRefreshing) {
          // If a token refresh is already in progress, wait for the new access token
          return new Promise((resolve) => {
            refreshSubscribers.push((accessToken) => {
              originalRequest.headers['Authorization'] = `Bearer ${accessToken}`;
              resolve(axiosInstance(originalRequest));
            });
          });
        }

        // Mark the request as a retry to prevent infinite loop
        originalRequest._retry = true;

        // Get the refresh token from local storage
        const refreshToken = localStorage.getItem('refresh_token');

        // Make a request to refresh the access token
        return new Promise((resolve, reject) => {
          axios
            .post('/api/token/refresh/', { refresh: refreshToken })
            .then((response) => {
              const { access } = response.data;

              // Store the new access token in local storage
              localStorage.setItem('access_token', access);

              // Update the Authorization header with the new access token
              originalRequest.headers['Authorization'] = `Bearer ${access}`;

              // Process the pending request subscribers
              processQueue(null, access);

              // Retry the original request with the new access token
              resolve(axiosInstance(originalRequest));
            })
            .catch((error) => {
              // Process the pending request subscribers with an error
              processQueue(error, null);
              reject(error);
            })
            .finally(() => {
              // Reset the refreshing flag and clear the subscribers array
              isRefreshing = false;
              refreshSubscribers = [];
            });
        });
      }

      // Reject the request with the original error for other status codes
      return Promise.reject(error);
    }
  );

  // Function to process the pending request subscribers
  const processQueue = (error, token = null) => {
    refreshSubscribers.forEach((subscriber) => subscriber(token));
    refreshSubscribers = [];
  };

  // Cleanup the interceptor on component unmount
  const ejectInterceptor = () => {
    axiosInstance.interceptors.request.eject();
    axiosInstance.interceptors.response.eject();
  };

  return { axiosInstance, ejectInterceptor };
};

export default setupAxiosInterceptors;