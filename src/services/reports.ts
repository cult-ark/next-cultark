import axios from 'axios';

// Replace with your actual API endpoint
const API_URL = '/api';

export const trackPdfView = async (pdfName: string) => {
    try {
        const response = await axios.post(`${API_URL}/reports/view`, { pdfName });
        return response.data;
    } catch (error) {
        console.error('Error tracking PDF view:', error);
        return { success: false, error: 'Failed to track PDF view' };
    }
};

export const trackPdfDownload = async (pdfName: string) => {
    try {
        const response = await axios.post(`${API_URL}/reports/download`, { pdfName });
        return response.data;
    } catch (error) {
        console.error('Error tracking PDF download:', error);
        return { success: false, error: 'Failed to track PDF download' };
    }
};

export const getReportStats = async (pdfName: string) => {
    try {
        const response = await axios.get(`${API_URL}/reports/stats/${pdfName}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching report stats:', error);
        return { views: 0, downloads: 0, error: 'Failed to fetch stats' };
    }
};