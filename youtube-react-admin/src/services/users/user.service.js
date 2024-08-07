import axios from "axios";

const USER_PROFILE_URL = `${process.env.REACT_APP_API_URL}/employees/my`;
const UPDATE_PROFILE_URL = `${process.env.REACT_APP_API_URL}/employees`;

export const GetUserFromToken = async (token) => {
  try {
    const response = await axios(USER_PROFILE_URL, {
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

export const UpdateUser = async (id, payload, token) => {
  console.log("debug - token:", token);
  console.log("debug - payload:", payload);
  console.log("debug - id:", id);
  try {
    const response = await axios.patch(`${UPDATE_PROFILE_URL}/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response:", response);
  } catch (error) {
    console.log("error:", error);
  }
};
