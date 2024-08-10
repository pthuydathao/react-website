import axios from "axios";

const MAINTENANCE_LOG_API_URL = `${process.env.REACT_APP_API_URL}/maintenance-logs`;

export const CreateMaintenanceLog = async (token, payload) => {
  try {
    const response = await axios.post(`${MAINTENANCE_LOG_API_URL}`, payload, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Unknown error!",
    };
  }
};
