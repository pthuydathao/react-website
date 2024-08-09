import "./product.css";
import { useParams, useHistory } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  GetUserFromToken,
  GetAllUsers,
} from "../../services/users/user.service";
import { useAuth } from "../auth/AuthContext";
import {
  GetDeviceById,
  UpdateDeviceById,
} from "../../services/devices/device.service";

import { GetAllRooms } from "../../services/rooms/room.service";

export default function Product() {
  const { deviceId } = useParams();
  const [device, setDevice] = useState({});
  const [updatingDevice, setUpdatingDevice] = useState({});
  const [updatingAssignedEmployee, setUpdatingAssignedEmployee] = useState({
    fullName: "",
    id: "",
    selectionValue: "",
  });
  const [updatingAssignedDateNStatus, setUpdatingAssignedDateNStatus] =
    useState({
      assignedDate: "",
      deviceStatus: "",
    });
  const [employeeList, setEmployeeList] = useState([]);
  const [updatingRoom, setUpdatingRoom] = useState({
    name: "",
    id: "",
    selectValue: "",
  });
  const [roomList, setRoomList] = useState([]);
  const [token, setToken] = useState("");
  const [user, setUser] = useState({});
  const history = useHistory();
  const { logout } = useAuth();

  const formatDate = (date) => {
    if (!date) return "";
    const d = new Date(date);
    const month = `${d.getMonth() + 1}`.padStart(2, "0");
    const day = `${d.getDate()}`.padStart(2, "0");
    return `${d.getFullYear()}-${month}-${day}`;
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setUpdatingDevice({
      ...updatingDevice,
      [name]: value,
    });
  };

  const handleUpdatingAssignedDateNStatusChange = (event) => {
    const { name, value } = event.target;
    setUpdatingAssignedDateNStatus({
      ...updatingAssignedDateNStatus,
      [name]: value,
    });
  };

  const handleUpdatingRoomChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "null") {
      setUpdatingRoom({
        name: "",
        id: "",
        selectValue: "",
      });
      return;
    }

    const [name, id] = selectedValue.split(" - ");
    setUpdatingRoom({
      name: name,
      id: id,
      selectValue: selectedValue,
    });
  };

  const handleAssignedEmployeeChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "null") {
      setUpdatingAssignedEmployee({
        fullName: "",
        id: "",
        selectionValue: "",
      });
      return;
    }

    const [fullName, id] = selectedValue.split(" - ");
    setUpdatingAssignedEmployee({
      fullName: fullName,
      id: id,
      selectionValue: selectedValue,
    });
  };

  const handleFormUpdate = async (event) => {
    event.preventDefault();
    if (updatingRoom.id != "" && updatingAssignedEmployee.id != "") {
      alert("Cannot assign device to both employee and a room");
      return;
    }

    let payload = {
      id: deviceId,
      deviceName: updatingDevice.deviceName,
      serialNumber: updatingDevice.serialNumber,
      description: updatingDevice.description,
      purchaseDate: updatingDevice.purchaseDate,
      warrantyExpiryDate: updatingDevice.warrantyExpiryDate,
      employeeId: null,
      roomId: null,
    };
    let assigned = false;
    if (updatingAssignedEmployee.id != "") {
      assigned = true;
      payload = {
        ...payload,
        employeeId: updatingAssignedEmployee.id,
      };
    }
    if (updatingRoom.id != "") {
      assigned = true;
      payload = {
        ...payload,
        roomId: `${updatingRoom.id}`,
      };
    }
    if (assigned) {
      payload = {
        ...payload,
        assigneeId: `${user.id}`,
        assignedDate: updatingAssignedDateNStatus.assignedDate,
        deviceStatus: updatingAssignedDateNStatus.deviceStatus,
      };

      if (
        payload.assignedDate == null ||
        payload.assignedDate == "" ||
        payload.deviceStatus == null ||
        payload.deviceStatus == ""
      ) {
        alert("Device status and assigned date must not be null");
        return;
      }
    } else {
      payload = {
        ...payload,
        assignedDate: null,
        deviceStatus: null,
      };
      setUpdatingAssignedDateNStatus({
        assignedDate: null,
        deviceStatus: "",
      });
    }
    console.log("payload:", payload);
    const response = await UpdateDeviceById(token, deviceId, payload);
    if ("data" in response) {
      alert("Update Success");
      setDevice(response.data);
    } else {
      alert(response.error);
    }
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

        const employees = await GetAllUsers(token);
        setEmployeeList(employees);

        const rooms = await GetAllRooms(token);
        setRoomList(rooms.data);

        const device = await GetDeviceById(token, deviceId);
        setDevice(device.data);
        setUpdatingDevice(device.data);
        if (device.data.employee != null) {
          setUpdatingAssignedEmployee({
            fullName: `${device.data.employee.firstName} ${device.data.employee.lastName}`,
            id: device.data.employee.id,
            selectionValue: `${device.data.employee.firstName} ${device.data.employee.lastName} - ${device.data.employee.id}`,
          });
          setUpdatingAssignedDateNStatus({
            assignedDate: formatDate(device.data.assignedDate),
            deviceStatus: device.data.deviceStatus,
          });
        }
        if (device.data.room != null) {
          setUpdatingRoom({
            name: `${device.data.room.name}`,
            id: `${device.data.room.id}`,
            selectValue: `${device.data.room.name} - ${device.data.room.id}`,
          });
          setUpdatingAssignedDateNStatus({
            assignedDate: formatDate(device.data.assignedDate),
            deviceStatus: device.data.deviceStatus,
          });
        }
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="product">
      <div className="productTitleContainer">
        <h1 className="productTitle">Device Detail</h1>
      </div>
      <div className="productTop">
        <div className="productTopRight">
          <div className="productInfoTop">
            <span className="productName">{device.deviceName}</span>
          </div>
          <div className="productInfoBottom">
            <div className="productInfoItem">
              <span className="productInfoKey">ID:</span>
              <span className="productInfoValue">{device.id}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Serial number:</span>
              <span className="productInfoValue">{device.serialNumber}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Purchase Date:</span>
              <span className="productInfoValue">{device.purchaseDate}</span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Warranty Expiry Date:</span>
              <span className="productInfoValue">
                {device.warrantyExpiryDate}
              </span>
            </div>
            <div className="productInfoItem">
              <span className="productInfoKey">Description:</span>
              <span className="productInfoValue">{device.description}</span>
            </div>
            {device.assignedDate &&
              (device.employee || device.room) &&
              device.assignee && (
                <>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Assigned Date:</span>
                    <span className="productInfoValue">
                      {device.assignedDate}
                    </span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Assignee:</span>
                    <span className="productInfoValue">
                      {`${device.assignee.firstName} ${device.assignee.lastName}`}
                    </span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Assigned to:</span>
                    <span className="productInfoValue">
                      {device.employee != null
                        ? `${device.employee.firstName} ${device.employee.lastName}`
                        : `Room ${device.room.name}`}
                    </span>
                  </div>
                  <div className="productInfoItem">
                    <span className="productInfoKey">Status:</span>
                    <span className="productInfoValue">
                      {device.deviceStatus}
                    </span>
                  </div>
                </>
              )}
          </div>
        </div>
      </div>
      <div className="productBottom">
        <form className="productForm" onSubmit={handleFormUpdate}>
          <div className="productFormLeft">
            <label>Device name</label>
            <input
              name="deviceName"
              type="text"
              placeholder="Device name"
              value={updatingDevice.deviceName || ""}
              onChange={handleFormChange}
            />
            <label>Serial number</label>
            <input
              name="serialNumber"
              type="text"
              placeholder="Serial number"
              value={updatingDevice.serialNumber || ""}
              onChange={handleFormChange}
            />
            <label>Purchase date</label>
            <input
              name="purchaseDate"
              type="date"
              value={formatDate(updatingDevice.purchaseDate)}
              onChange={handleFormChange}
            />
            <label>Warranty Expiry Date</label>
            <input
              name="warrantyExpiryDate"
              type="date"
              value={formatDate(updatingDevice.warrantyExpiryDate)}
              onChange={handleFormChange}
            />
            <label>Description</label>
            <input
              name="description"
              type="text"
              placeholder="Description"
              value={updatingDevice.description || ""}
              onChange={handleFormChange}
            />
          </div>
          <div className="productFormRight">
            <h3>Assigning device</h3>
            <label>Assignee</label>
            <input
              name="assignee"
              type="text"
              value={
                updatingDevice.assignee
                  ? `${updatingDevice.assignee.firstName} ${updatingDevice.assignee.lastName}`
                  : `${user.firstName} ${user.lastName}`
              }
              readOnly
              style={{
                cursor: "pointer",
                outline: "none",
              }}
            />
            <label>Assigned to employee</label>
            <select
              name="employeeId"
              value={updatingAssignedEmployee.selectionValue || ""}
              onChange={handleAssignedEmployeeChange}
            >
              <option key="-1" value="null">
                Select Employee
              </option>
              {employeeList.map((employee) => (
                <option
                  key={employee.id}
                  value={`${employee.firstName} ${employee.lastName} - ${employee.id}`}
                >
                  {`${employee.firstName} ${employee.lastName} - ${employee.id}`}
                </option>
              ))}
            </select>
            <label>Assigned to room</label>
            <select
              name="roomId"
              value={updatingRoom.selectValue || ""}
              onChange={handleUpdatingRoomChange}
            >
              <option key="-1" value="null">
                Select Room
              </option>
              {roomList.map((room) => (
                <option key={room.id} value={`${room.name} - ${room.id}`}>
                  {`${room.name} - ${room.id}`}
                </option>
              ))}
            </select>
            <label>Assigned Date</label>
            <input
              name="assignedDate"
              type="date"
              value={updatingAssignedDateNStatus.assignedDate || ""}
              onChange={handleUpdatingAssignedDateNStatusChange}
            />
            <label>Status</label>
            <input
              name="deviceStatus"
              type="text"
              placeholder="Device status"
              value={updatingAssignedDateNStatus.deviceStatus || ""}
              onChange={handleUpdatingAssignedDateNStatusChange}
            />
            <button className="productButton" type="submit">
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
