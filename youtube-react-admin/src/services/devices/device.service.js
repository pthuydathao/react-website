import axios from "axios";

const REQUEST_API_URL = `${process.env.REACT_APP_API_URL}/devices`;

export const GetAllDevices = async (token) => {
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

export const GetDeviceById = async (token, id) => {
  try {
    const response = await axios(`${REQUEST_API_URL}/${id}`, {
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

export const UpdateDeviceById = async (token, id, payload) => {
  try {
    const response = await axios.patch(`${REQUEST_API_URL}`, payload, {
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
