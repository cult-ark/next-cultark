/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosInstance, AxiosError, AxiosRequestConfig } from 'axios';
import { cleanApiResponse } from './functions';

// Extend AxiosRequestConfig to include metadata for performance monitoring
declare module 'axios' {
  export interface InternalAxiosRequestConfig {
    metadata?: { startTime: number };
  }
}

// Create axios instance with proper configuration
const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: process.env.NEXT_PUBLIC_WORDPRESS_URL || 'https://backup.cultark.net',
    timeout: 5000, // Reduced to 5 seconds to ensure fast failure
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json, text/plain, */*',
      'Accept-Encoding': 'gzip, deflate, br', // Enable compression
      'User-Agent': 'cultark-nextjs-app/1.0',
    },
    withCredentials: false, // Don't send cookies for cross-origin requests
    transformResponse: [
      (data) => {
        // Automatically clean malformed API responses from WordPress
        if (typeof data === 'string') {
            return cleanApiResponse(data);
        }
        return data;
      }
    ],
  });

  // Interceptor for request logging and performance tracking
  instance.interceptors.request.use(
    (config) => {
      config.metadata = { startTime: new Date().getTime() };
      // console.log(`🚀 API Request: ${config.method?.toUpperCase()} ${config.url}`);
      return config;
    },
    (error) => Promise.reject(error)
  );

  // Interceptor for response logging, performance monitoring and error handling
  instance.interceptors.response.use(
    (response) => {
      const endTime = new Date().getTime();
      const startTime = response.config.metadata?.startTime || endTime;
      const duration = endTime - startTime;
      
      // Performance logging
      console.log(`⏱️ API Perf [${duration}ms]: ${response.config.url}`);
      if (duration > 2000) {
        console.warn(`⚠️ Slow API Warning [${duration}ms]: ${response.config.url}`);
      }
      
      return response;
    },
    (error: AxiosError) => {
      const endTime = new Date().getTime();
      const startTime = error.config?.metadata?.startTime || endTime;
      const duration = endTime - startTime;
      
      console.error(`❌ API Error [${duration}ms]: ${error.config?.url}`, {
        status: error.response?.status,
        message: error.message,
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