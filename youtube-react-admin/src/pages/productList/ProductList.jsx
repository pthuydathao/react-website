import "./productList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { productRows } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

import { GetUserFromToken } from "../../services/users/user.service";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { GetAllDevices } from "../../services/devices/device.service";

export default function ProductList() {
  const [data, setData] = useState(productRows);
  const [token, setToken] = useState("");
  const history = useHistory();
  const { logout } = useAuth();

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const columns = [
    {
      field: "id",
      headerName: "ID",
      width: 90,
      renderCell: (params) => {
        const record = params.row;
        return <div className="productListItem">{record.id}</div>;
      },
    },
    {
      field: "product",
      headerName: "Device",
      width: 200,
      renderCell: (params) => {
        const record = params.row;
        return <div className="productListItem">{record.deviceName}</div>;
      },
    },
    {
      field: "serialNumber",
      headerName: "Serial Number",
      width: 170,
      renderCell: (params) => {
        const record = params.row;
        return <div className="productListItem">{record.serialNumber}</div>;
      },
    },
    {
      field: "purchaseDate",
      headerName: "Purchase Date",
      width: 170,
      renderCell: (params) => {
        const record = params.row;
        return <div className="productListItem">{record.purchaseDate}</div>;
      },
    },
    {
      field: "warrantyExpiryDate",
      headerName: "Warranty Expiry",
      width: 180,
      renderCell: (params) => {
        const record = params.row;
        return (
          <div className="productListItem">{record.warrantyExpiryDate}</div>
        );
      },
    },
    {
      field: "availability",
      headerName: "Availability",
      width: 150,
      renderCell: (params) => {
        const record = params.row;
        return (
          <div className="productListItem">
            {record.assignedDate == null ? "Available" : "Unavailable"}
          </div>
        );
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        const record = params.row;
        return (
          <>
            <Link to={`/devices/${record.id}`}>
              <button className="productListEdit">View Detail</button>
            </Link>
            <DeleteOutline
              className="productListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

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

        const res = await GetAllDevices(token);
        setData(res.data);
        console.log("res:", res);
      }
    }
    fetchData();
  }, [logout, history]);

  return (
    <div className="productList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={15}
        checkboxSelection
      />
    </div>
  );
}
