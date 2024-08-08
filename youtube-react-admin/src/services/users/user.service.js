import axios from "axios";

const EMPLOYEE_BASE_URL = `${process.env.REACT_APP_API_URL}/employees`;
const USER_PROFILE_URL = `${EMPLOYEE_BASE_URL}/my`;
const ALL_USER_URL = `${EMPLOYEE_BASE_URL}/all`;
const UPDATE_PROFILE_URL = `${EMPLOYEE_BASE_URL}`;

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
  try {
    const response = await axios.patch(`${UPDATE_PROFILE_URL}/${id}`, payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("response:", response);
  } catch (error) {
    return {
      error: error.response?.data?.message || "Unknown error!",
    };
  }
};

export const GetAllUsers = async (token) => {
  try {
    const response = await axios(`${ALL_USER_URL}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data?.data;
  } catch (error) {
    return {
      error: error.response?.data?.message || "Unknown error!",
    };
  }
};
