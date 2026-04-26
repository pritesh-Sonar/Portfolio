import axios from "axios"

const apiService = axios.create({
  baseURL : import.meta.env.VITE_BACKEND_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const getProjects = () => apiService.get("/api/projects");
export const getComments = () => apiService.get("/api/comment");
export const getMilestones = () => apiService.get("/api/milestones");
export const getGoals = () => apiService.get("/api/goals");


export default apiService;  