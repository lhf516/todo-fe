import axios from "axios";

const apiService = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL || "", // Replace with your backend API URL
});

export const create = (endpoint: string, data: object) => {
  return apiService.post(endpoint, data);
};

export const read = (endpoint: string) => {
  return apiService.get(endpoint);
};

export const update = (endpoint: string, data: object) => {
  return apiService.put(endpoint, data);
};

export const deleteData = (endpoint: string) => {
  return apiService.delete(endpoint);
};
