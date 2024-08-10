import "./requestDetail.css";

import {
  GetAllUsers,
  GetUserFromToken,
} from "../../services/users/user.service";
import { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { GetRequestById } from "../../services/requests/request.service";
import { GetDeviceById } from "../../services/devices/device.service";

export default function RequestDetail() {
  const [requestStatus, setRequestStatus] = useState("");
  const handleRequestStatusChange = (event) => {
    setRequestStatus(event.target.value);
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
            <form className="request-form" action="">
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
              {request?.requestType == "MAINTENANCE" ? (
                <>
                  <div className="requestShowInfo">
                    <label
                      htmlFor="maintain-by"
                      className="requestShowInfoTitle"
                    >
                      <strong>Maintained by:</strong>
                    </label>
                    <select
                      className="requestStatusSelect"
                      id="maintain-by"
                      value={maintainingEmployee.selectValue}
                      onChange={handleMaintainingEmployeeChange}
                    >
                      <option key="-1" value="null">
                        Select maintaining employee
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
                    <button>Update maintaining employee</button>
                  </div>
                </>
              ) : (
                <></>
              )}
              {request?.completeDate != null ? (
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
                    value={`${request?.completeDate}`}
                    readOnly
                  />
                </div>
              ) : (
                <></>
              )}
              <span className="requestShowTitle">
                Device information
                <a href={`/devices/${device.id}`} className="more-detail-link">
                  Details
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

              <span className="requestShowTitle">Device's status</span>
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
                  placeholder={request?.beforeDescription}
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
                  placeholder={request?.afterDescription}
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
