/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';

// Create axios instance with proper configuration
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://cultark.com',
    timeout: 10000, // 10 seconds timeout
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'User-Agent': 'cultark-nextjs-app/1.0',
    },
    withCredentials: false, // Don't send cookies for cross-origin requests
  });

  // Interceptor for request logging
  instance.interceptors.request.use(
    (config) => {
      console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor for response logging and error handling
  instance.interceptors.response.use(
    (response) => {
      console.log(`✅ API Response: ${response.status} ${response.config.url}`);
      return response;
    },
    (error: AxiosError) => {
      console.error(`❌ API Error: ${error.config?.url}`, {
        status: error.response?.status,
        message: error.message,
        data: error.response?.data,
      });
      return Promise.reject(error);
    }
  );

  return instance;
};

// Export singleton instance
export const axiosInstance = createAxiosInstance();

// Helper function for WordPress API requests with proper URL construction
export const createWordPressApiUrl = (endpoint: string, params?: Record<string, string | number>) => {
  const baseUrl = `${process.env.NEXT_PUBLIC_WORDPRESS_URL}/wp-json/wp/v2`;
  const url = new URL(`${baseUrl}/${endpoint.replace(/^\//, '')}`);
  
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.append(key, String(value));
    });
  }
  
  return url.toString();
};

// Helper function for error handling
export const handleApiError = (error: unknown, context: string): never | null => {
  if (axios.isAxiosError(error)) {
    console.error(`API Error in ${context}:`, {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
    });
    return null;
  }
  
  console.error(`Unexpected Error in ${context}:`, error);
  return null;
};