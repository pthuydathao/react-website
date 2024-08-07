import {
  CalendarToday,
  LocationSearching,
  MailOutline,
  PermIdentity,
  PhoneAndroid,
  Publish,
} from "@material-ui/icons";

import "./user.css";
import {
  GetUserFromToken,
  UpdateUser,
} from "../../services/users/user.service";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

function SplitName(fullName) {
  let nameParts = fullName.split(" ");
  let firstName = nameParts[0];
  let lastName = nameParts.slice(1).join(" ");
  return {
    firstName: firstName,
    lastName: lastName,
  };
}

function formatDateString(dateString) {
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0"); // Months are zero-based
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

export default function User() {
  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  const [profile, setProfile] = useState({
    fullName: "",
    dateOfBirth: "",
    gender: "MALE",
    phone: "",
    address: "",
  });

  const handleGenderChange = (event) => {
    setProfile({
      ...profile,
      gender: event.target.value,
    });
  };

  const handleProfileUpdate = (event) => {
    setProfile({
      ...profile,
      [event.target.name]: event.target.value,
    });
  };

  const handleUpdateProfile = async (event) => {
    event.preventDefault();
    const splitName = SplitName(profile.fullName);
    const payload = {
      ...splitName,
      address: profile.address,
      phone: profile.phone,
      dateOfBirth: profile.dateOfBirth,
      gender: profile.gender,
    };
    const response = await UpdateUser(user.id, payload, token);
    // Handle the response as needed
  };

  useEffect(() => {
    async function fetchData() {
      const token = sessionStorage.getItem("token");
      const response = await GetUserFromToken(token);
      if ("error" in response) {
        logout();
        history.push("/login");
      } else {
        const userData = response.data;
        setToken(token);
        setUser(userData);
        setProfile({
          fullName: `${userData.firstName} ${userData.lastName}`,
          dateOfBirth: formatDateString(userData.dateOfBirth),
          gender: userData.gender,
          phone: userData.phone,
          address: userData.address,
        });
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="user">
      <div className="userTitleContainer">
        <h1 className="userTitle">Profile</h1>
      </div>
      <div className="userContainer">
        <div className="userShow">
          <div className="userShowTop">
            <img
              src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
              alt=""
              className="userShowImg"
            />
            <div className="userShowTopTitle">
              <span className="userShowUsername">
                {user.firstName + " " + user.lastName}
              </span>
              <span className="userShowUserTitle">{user.gender}</span>
            </div>
          </div>
          <div className="userShowBottom">
            <span className="userShowTitle">Account Details</span>
            <div className="userShowInfo">
              <PermIdentity className="userShowIcon" />
              <span className="userShowInfoTitle">{profile.fullName}</span>
            </div>
            <div className="userShowInfo">
              <CalendarToday className="userShowIcon" />
              <span className="userShowInfoTitle">{profile.dateOfBirth}</span>
            </div>
            <span className="userShowTitle">Contact Details</span>
            <div className="userShowInfo">
              <PhoneAndroid className="userShowIcon" />
              <span className="userShowInfoTitle">{profile.phone}</span>
            </div>
            <div className="userShowInfo">
              <MailOutline className="userShowIcon" />
              <span className="userShowInfoTitle">{user.email}</span>
            </div>
            <div className="userShowInfo">
              <LocationSearching className="userShowIcon" />
              <span className="userShowInfoTitle">{profile.address}</span>
            </div>
          </div>
        </div>
        <div className="userUpdate">
          <span className="userUpdateTitle">Edit</span>
          <form className="userUpdateForm" onSubmit={handleUpdateProfile}>
            <div className="userUpdateLeft">
              <div className="userUpdateItem">
                <label>Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  placeholder={profile.fullName}
                  className="userUpdateInput"
                  onChange={handleProfileUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Citizen ID</label>
                <input
                  type="text"
                  placeholder={user.citizenId}
                  className="userUpdateInput"
                  readOnly={true}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Email</label>
                <input
                  type="text"
                  placeholder={user.email}
                  className="userUpdateInput"
                  readOnly={true}
                  style={{
                    cursor: "pointer",
                    outline: "none",
                  }}
                />
              </div>
              <div className="userUpdateItem">
                <label>Phone</label>
                <input
                  type="number"
                  placeholder={profile.phone}
                  className="userUpdateInput"
                  name="phone"
                  onChange={handleProfileUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Address</label>
                <input
                  type="text"
                  placeholder={profile.address}
                  className="userUpdateInput"
                  name="address"
                  onChange={handleProfileUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Date of birth</label>
                <input
                  type="date"
                  className="userUpdateInput"
                  value={profile.dateOfBirth}
                  name="dateOfBirth"
                  onChange={handleProfileUpdate}
                />
              </div>
              <div className="userUpdateItem">
                <label>Gender</label>
                <select
                  id="gender"
                  name="gender"
                  required
                  value={profile.gender}
                  onChange={handleGenderChange}
                >
                  <option key="male" value="MALE">
                    MALE
                  </option>
                  <option key="female" value="FEMALE">
                    FEMALE
                  </option>
                  <option key="other" value="OTHER">
                    OTHER
                  </option>
                </select>
              </div>
            </div>
            <div className="userUpdateRight">
              <div className="userUpdateUpload">
                <img
                  className="userUpdateImg"
                  src="https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500"
                  alt=""
                />
                {/* <label htmlFor="file">
                  <Publish className="userUpdateIcon" />
                </label>
                <input type="file" id="file" style={{ display: "none" }} /> */}
              </div>
              <button className="userUpdateButton" type="submit">
                Update
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
