import axios from "axios";

const REQUEST_API_URL = `${process.env.REACT_APP_API_URL}/requests`;

const GET_API_DEFAULT_CONFIG = (token) => {
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

export const GetAllRequests = async (token) => {
  try {
    const response = await axios(
      `${REQUEST_API_URL}/all`,
      GET_API_DEFAULT_CONFIG(token)
    );
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Unknown error!",
    };
  }
};

export const CreateNewRequest = async (token, payload) => {
  try {
    const response = await axios.post(
      REQUEST_API_URL,
      payload,
      GET_API_DEFAULT_CONFIG(token)
    );
    return response.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Unknown error!",
    };
  }
};
