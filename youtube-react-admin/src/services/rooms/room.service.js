import axios from "axios";

const ROOM_API_URL = `${process.env.REACT_APP_API_URL}/rooms`;

export const GetAllRooms = async (token) => {
  try {
    const response = await axios(`${ROOM_API_URL}/all`, {
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
