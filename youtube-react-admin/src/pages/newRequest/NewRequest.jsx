import "./newRequest.css";

import {
  GetAllUsers,
  GetUserFromToken,
} from "../../services/users/user.service";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

import { GetAllRooms } from "../../services/rooms/room.service";

import { GetAllDevices } from "../../services/devices/device.service";

export default function NewRequest() {
  const [ownershipType, setOwnershipType] = useState("");
  const handleOwnershipTypeChange = (event) => {
    setOwnershipType(event.target.value);
    setUpdatingAssignedEmployee({
      fullName: "",
      id: "",
      selectionValue: "",
    });
    setUpdatingRoom({
      name: "",
      id: "",
      selectValue: "",
    });
  };

  const [deviceDescription, setDeviceDescription] = useState("");
  const handleDeviceDescriptionChange = () => {};

  const [updatingDevice, setUpdatingDevice] = useState({
    deviceNameNSerialNumber: "",
    id: "",
    selectValue: "",
  });
  const handleUpdatingDeviceChange = (event) => {
    const selectedValue = event.target.value;
    if (selectedValue == "null") {
      setUpdatingDevice({
        deviceNameNSerialNumber: "",
        id: "",
        selectValue: "",
      });
      return;
    }

    const [deviceNameNSerialNumber, id] = selectedValue.split(" - ");
    setUpdatingDevice({
      deviceNameNSerialNumber: deviceNameNSerialNumber,
      id: id,
      selectValue: selectedValue,
    });
  };

  const [updatingAssignedEmployee, setUpdatingAssignedEmployee] = useState({
    fullName: "",
    id: "",
    selectionValue: "",
  });
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

  const [updatingRoom, setUpdatingRoom] = useState({
    name: "",
    id: "",
    selectValue: "",
  });
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

  const handleFormUpdate = (event) => {
    event.preventDefault();
    const payload = {
      requestType: ownershipType,
      beforeDescription: deviceDescription,
      employeeId: updatingAssignedEmployee.id,
      
    };
  };

  const [token, setToken] = useState("");
  const history = useHistory();
  const { logout } = useAuth();
  const [employeeList, setEmployeeList] = useState([]);
  const [roomList, setRoomList] = useState([]);
  const [deviceList, setDeviceList] = useState([]);
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

        const employees = await GetAllUsers(token);
        setEmployeeList(employees);

        const rooms = await GetAllRooms(token);
        setRoomList(rooms.data);

        const devices = await GetAllDevices(token);
        setDeviceList(devices.data);
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="newRequest">
      <h1 className="newRequestTitle">New Request</h1>
      <form className="newRequestForm">
        <div className="newRequestItem">
          <label>Loại yêu cầu:</label>
          <div className="newRequestType">
            <input
              type="radio"
              name="type"
              id="maintenance"
              value="maintenance"
            />
            <label htmlFor="maintenance">Bảo trì</label>
            <input type="radio" name="type" id="repair" value="repair" />
            <label htmlFor="repair">Sửa chữa</label>
          </div>
        </div>

        <div className="newRequestItem device-selection">
          <label>Select device</label>
          <select
            name="device"
            value={updatingDevice.selectValue || ""}
            onChange={handleUpdatingDeviceChange}
          >
            <option key="-1" value="null">
              Select device
            </option>
            {deviceList.map((device) => (
              <option
                key={device.id}
                value={`${device.deviceName} | ${device.serialNumber} - ${device.id}`}
              >
                {`${device.deviceName} | ${device.serialNumber} - ${device.id}`}
              </option>
            ))}
          </select>
        </div>

        <div className="newRequestItem">
          <label>Tình trạng thiết bị khi tiếp nhận:</label>
          <input
            type="text"
            placeholder="Mô tả"
            onChange={handleDeviceDescriptionChange}
          />
        </div>
        <div className="newRequestItem">
          <label>Sở hữu thiết bị:</label>
          <div className="newRequestType">
            <input
              type="radio"
              name="ownership"
              id="employee"
              value="employee"
              onChange={handleOwnershipTypeChange}
            />
            <label htmlFor="employee">Cá nhân</label>
            <input
              type="radio"
              name="ownership"
              id="room"
              value="room"
              onChange={handleOwnershipTypeChange}
            />
            <label htmlFor="room">Phòng</label>
          </div>
        </div>

        {/* Conditionally render based on ownershipType */}
        {ownershipType === "employee" && (
          <div className="newRequestItem employee-selection">
            <label>Select employee</label>
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
          </div>
        )}

        {ownershipType === "room" && (
          <div className="newRequestItem room-selection">
            <label>Select room</label>
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
          </div>
        )}

        <button className="newRequestButton">Create</button>
      </form>
    </div>
  );
}
