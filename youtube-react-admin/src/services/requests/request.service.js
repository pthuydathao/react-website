import axios from "axios";

const REQUEST_API_URL = `${process.env.REACT_APP_API_URL}/requests`;

export const GetAllRequests = async (token) => {
  try {
    const response = await axios(`${REQUEST_API_URL}/all`, {
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
