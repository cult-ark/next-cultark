import axios from 'axios';

// Replace with your actual API endpoint
const API_URL = '/api';

export const trackPdfView = async (pdfName: string) => {
  const response = await axios.post(`${API_URL}/reports/view`, { pdfName });
  return response.data;
};

export const trackPdfDownload = async (pdfName: string) => {
  const response = await axios.post(`${API_URL}/reports/download`, { pdfName });
  return response.data;
};

export const getReportStats = async (pdfName: string) => {
  const response = await axios.get(`${API_URL}/reports/stats/${pdfName}`);
  return response.data;
};