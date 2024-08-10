const ValueMapping = {
  PENDING: "pending",
  CANCELED: "canceled",
  IN_PROCESS: "in-progress",
  COMPLETED: "completed",
};

export const RequestStatusButton = ({ type }) => {
  return (
    <button className={`requestButton ${ValueMapping[type]}`}>{type}</button>
  );
};
