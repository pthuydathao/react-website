import "./requestList.css";
import { DataGrid } from "@material-ui/data-grid";
import { DeleteOutline } from "@material-ui/icons";
import { requestRows, assigneeOptions } from "../../dummyData";
import { Link } from "react-router-dom";
import { useState } from "react";
import { Select, MenuItem } from "@mui/material";

export default function RequestList() {
  const Button = ({ type }) => {
    let colorClass = "";

    switch (type) {
      case "Pending":
        colorClass = "pending";
        break;
      case "Canceled":
        colorClass = "canceled";
        break;
      case "In Progress":
        colorClass = "in-progress";
        break;
      case "Completed":
        colorClass = "completed";
        break;
      // default:
      //   colorClass = "default";
      //   break;
    }

    return <button className={`requestButton ${colorClass}`}>{type}</button>;
  };

  const [data, setData] = useState(requestRows);

  const handleDelete = (id) => {
    setData(data.filter((item) => item.id !== id));
  };

  const handleTypeRequestChange = (event, id) => {
    const newTypeRequest = event.target.value;
    setData((prevData) =>
      prevData.map((item) =>
        item.id === id ? { ...item, typeRequest: newTypeRequest } : item
      )
    );
  };

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "employee",
      headerName: "Full name",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="requestListUser">
            <img className="requestListImg" src={params.row.avatar} alt="" />
            {params.row.username}
          </div>
        );
      },
    },
    { field: "email", headerName: "Email", width: 200 },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        return (
          <>
            <Button type={params.row.status} />
          </>
        );
      },
    },

    { field: "type", headerName: "Request Type", width: 160 },

    {
      field: "assignee",
      headerName: "Assignee",
      width: 150,
      renderCell: (params) => {
        return (
          <Select
            value={params.row.assignee}
            onChange={(event) => handleTypeRequestChange(event, params.row.id)}
            variant="outlined"
            fullWidth
          >
            {assigneeOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        );
      },
    },

    {
      field: "action",
      headerName: "Action",
      width: 150,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/requestDetail/" + params.row.id}>
              <button className="requestListView">View detail</button>
            </Link>
            <DeleteOutline
              className="requestListDelete"
              onClick={() => handleDelete(params.row.id)}
            />
          </>
        );
      },
    },
  ];

  return (
    <div className="requestList">
      <DataGrid
        rows={data}
        disableSelectionOnClick
        columns={columns}
        pageSize={8}
        checkboxSelection
      />
    </div>
  );
}
