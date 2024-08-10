import "./requestDetail.css";

import {
  GetAllUsers,
  GetUserFromToken,
} from "../../services/users/user.service";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import {
  GetRequestById,
  UpdateMaintainingEmployee,
  UpdateRequest,
} from "../../services/requests/request.service";
import { GetDeviceById } from "../../services/devices/device.service";

export default function RequestDetail() {
  const [requestStatus, setRequestStatus] = useState("");
  const handleRequestStatusChange = (event) => {
    setRequestStatus(event.target.value);
  };

  const [descriptions, setDescriptions] = useState({
    before: "",
    after: "",
  });
  const handleDescriptionsChanges = (event) => {
    setDescriptions({
      ...descriptions,
      [event.target.name]: event.target.value,
    });
  };

  const [maintainingEmployee, setMaintainingEmployee] = useState({
    selectValue: "",
    id: "",
  });
  const handleMaintainingEmployeeChange = (event) => {
    const selectedValue = event.target.value;
    const [fullName, id] = selectedValue.split(" - ");
    setMaintainingEmployee({
      selectValue: selectedValue,
      id: id,
    });
  };

  const handleMaintainingEmployeeUpdate = async (event) => {
    event.preventDefault();
    const payload = {
      requestId: `${request.id}`,
      maintainById: maintainingEmployee.id,
    };
    console.log("payload:", payload);
    const response = await UpdateMaintainingEmployee(token, payload);
    if ("data" in response) {
      alert("Update success!");
    } else {
      alert("Error:", request.error);
    }
  };

  const handleRequestFormSubmit = async (event) => {
    event.preventDefault();

    const payload = {
      id: `${request.id}`,
      requestType: request.requestType,
      beforeDescription: descriptions.before,
      afterDescription: descriptions.after,
      status: requestStatus,
      completeDate: `${requestStatus == "COMPLETED" ? new Date() : null}`,
    };
    // console.log("payload:", payload);
    const response = await UpdateRequest(token, payload);
    if ("data" in response) {
      // console.log("res:", response);
      alert("Update success!");
    } else {
      alert("Error:", request.error);
    }
  };

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const history = useHistory();
  const { logout } = useAuth();
  const { requestId } = useParams();
  const [request, setRequest] = useState({});
  const [device, setDevice] = useState({});
  const [employeeList, setEmployeeList] = useState([]);
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

        const request = await GetRequestById(token, requestId);
        setRequest(request.data);
        setRequestStatus(request.data.status);
        console.log("request:", request.data);
        if (request.data.maintainBy != null) {
          setMaintainingEmployee({
            selectValue: `${request.data.maintainBy.firstName} ${request.data.maintainBy.lastName} - ${request.data.maintainBy.id}`,
            id: `${request.data.maintainBy.id}`,
          });
        }
        setDescriptions({
          before: request.data.beforeDescription,
          after: request.data.afterDescription,
        });

        const device = await GetDeviceById(token, request.data?.device?.id);
        setDevice(device.data);

        const employees = await GetAllUsers(token);
        setEmployeeList(employees);
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="request">
      <div className="requestTitleContainer">
        <h1 className="requestTitle">Request Detail</h1>
      </div>
      <div className="requestContainer">
        <div className="requestShow">
          <div className="requestShowBottom">
            <form className="request-form" onSubmit={handleRequestFormSubmit}>
              <span className="requestShowTitle">Process</span>
              <div className="requestShowInfo">
                <label
                  htmlFor="request-status"
                  className="requestShowInfoTitle"
                >
                  <strong>Requested by:</strong>
                </label>
                <input
                  className="requestReadOnlyInput"
                  id="request-status"
                  type="text"
                  value={`${request?.requestBy?.firstName} ${request?.requestBy?.lastName} | ${request?.requestBy?.email}`}
                  readOnly
                />
              </div>
              <div className="requestShowInfo">
                <label
                  htmlFor="request-status"
                  className="requestShowInfoTitle"
                >
                  <strong>Status:</strong>
                </label>
                <select
                  className="requestStatusSelect"
                  id="request-status"
                  value={requestStatus}
                  onChange={handleRequestStatusChange}
                >
                  <option key="0" value="PENDING">
                    Pending
                  </option>
                  <option key="1" value="IN_PROCESS">
                    In process
                  </option>
                  <option key="2" value="COMPLETED">
                    Completed
                  </option>
                  <option key="3" value="CANCELED">
                    Canceled
                  </option>
                </select>
              </div>
              {request?.completedDate != null ? (
                <div className="requestShowInfo">
                  <label
                    htmlFor="complete-date"
                    className="requestShowInfoTitle"
                  >
                    <strong>Complete at:</strong>
                  </label>
                  <input
                    className="requestReadOnlyInput"
                    id="complete-date"
                    type="date"
                    value={`${request?.completedDate}`}
                    readOnly
                  />
                </div>
              ) : (
                <></>
              )}
              <div className="requestShowInfo">
                <label htmlFor="maintain-by" className="requestShowInfoTitle">
                  <strong>
                    {request.requestType == "MAINTENANCE"
                      ? "Maintained "
                      : "Repaired "}
                    by:
                  </strong>
                </label>
                <select
                  className="requestStatusSelect"
                  id="maintain-by"
                  value={maintainingEmployee.selectValue}
                  onChange={handleMaintainingEmployeeChange}
                >
                  <option key="-1" value="null">
                    Select{" "}
                    {request.requestType == "MAINTENANCE"
                      ? "maintaining "
                      : "repairing "}{" "}
                    employee
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
              <div className="requestShowInfo update-maintaining-employee">
                <button onClick={handleMaintainingEmployeeUpdate}>
                  Update{" "}
                  {request.requestType == "MAINTENANCE"
                    ? "maintaining "
                    : "repairing "}{" "}
                  employee
                </button>
              </div>
              <span className="requestShowTitle">
                <a className="requestShowTitle" href={`/devices/${device.id}`}>
                  Device information
                </a>
              </span>
              <div className="requestShowInfo">
                <label htmlFor="device-id" className="requestShowInfoTitle">
                  <strong>ID:</strong>
                </label>
                <input
                  className="requestReadOnlyInput"
                  type="text"
                  id="device-id"
                  value={device?.id}
                  readOnly
                />
              </div>
              <div className="requestShowInfo">
                <label htmlFor="device-name" className="requestShowInfoTitle">
                  <strong>Name:</strong>
                </label>
                <input
                  className="requestReadOnlyInput"
                  type="text"
                  id="device-name"
                  value={device?.deviceName}
                  readOnly
                />
              </div>
              <div className="requestShowInfo">
                <label htmlFor="serial-number" className="requestShowInfoTitle">
                  <strong>Serial number:</strong>
                </label>
                <input
                  className="requestReadOnlyInput"
                  type="text"
                  id="serial-number"
                  value={device?.serialNumber}
                  readOnly
                />
              </div>

              <span className="requestShowTitle">Description</span>
              <div className="requestShowInfo">
                <label
                  htmlFor="before-description"
                  className="requestShowInfoTitle"
                >
                  <strong>Before:</strong>
                </label>
                <input
                  type="text"
                  id="before-description"
                  name="before"
                  placeholder={descriptions.before}
                  onChange={handleDescriptionsChanges}
                />
              </div>
              <div className="requestShowInfo">
                <label
                  htmlFor="before-description"
                  className="requestShowInfoTitle"
                >
                  <strong>After:</strong>
                </label>
                <input
                  type="text"
                  id="after-description"
                  name="after"
                  placeholder={descriptions.after}
                  value={descriptions.after || ""}
                  onChange={handleDescriptionsChanges}
                />
              </div>
              <button>Update</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
