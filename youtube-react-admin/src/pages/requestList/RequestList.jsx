import "./requestList.css";
import { DataGrid } from "@material-ui/data-grid";

import { GetUserFromToken } from "../../services/users/user.service";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { GetAllRequests } from "../../services/requests/request.service";
import { RequestDataBuilder } from "./components/RequestDataBuilder";

export default function RequestList() {
  const [data, setData] = useState([]);

  const columns = RequestDataBuilder();

  const [user, setUser] = useState({});
  const [token, setToken] = useState("");
  const history = useHistory();
  const { logout } = useAuth();
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

        const requests = await GetAllRequests(token);
        setData(requests.data);
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="requestList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={20}
        checkboxSelection
      />
    </div>
  );
}
