import { RequestStatusButton } from "./RequestStatusButton.component";

import { Link } from "react-router-dom";

function formatDateTime(isoString) {
  const date = new Date(isoString);

  const formattedDate = date.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });

  return formattedDate;
}

export const RequestDataBuilder = () => {
  return [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "employee",
      headerName: "Full name",
      width: 200,
      renderCell: (params) => {
        const data = params.row.requestBy;
        const fullName = `${data.firstName} ${data.lastName}`;
        return <div className="requestListUser">{fullName}</div>;
      },
    },
    {
      field: "email",
      headerName: "Email",
      width: 250,
      renderCell: (params) => {
        const data = params.row.requestBy;
        return <p>{data?.email}</p>;
      },
    },
    {
      field: "status",
      headerName: "Status",
      width: 120,
      renderCell: (params) => {
        const data = params.row.status;
        return <RequestStatusButton type={data} />;
      },
    },
    {
      field: "type",
      headerName: "Request Type",
      width: 160,
      renderCell: (params) => {
        const data = params.row.requestType;
        return <RequestStatusButton type={data} />;
      },
    },
    {
      field: "createTimestamp",
      headerName: "Created At",
      width: 160,
      renderCell: (params) => {
        const data = params.row.createdAt;
        return <p>{formatDateTime(data)}</p>;
      },
    },
    {
      field: "action",
      headerName: "Action",
      width: 130,
      renderCell: (params) => {
        return (
          <Link to={"/request-detail/" + params.row.id}>
            <button className="requestListView">View detail</button>
          </Link>
        );
      },
    },
  ];
};
