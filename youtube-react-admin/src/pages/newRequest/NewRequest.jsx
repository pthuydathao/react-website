import "./newRequest.css";

export default function NewRequest() {
  return (
    <div className="newRequest">
      <h1 className="newRequestTitle">Create New Request</h1>
      <form className="newRequestForm">
        {/* <div className="newRequestItem">
          <label>Username</label>
          <input type="text" placeholder="john" />
        </div> */}
        <div className="newRequestItem">
          <label>Loại yêu cầu:</label>
          <div className="newRequestType">
            <input type="radio" name="type" id="maintenance" value="maintenance" />
            <label for="male">Bảo trì</label>
            <input type="radio" name="type" id="repair" value="repair" />
            <label for="female">Sửa chữa</label>
            {/* <input type="radio" name="type" id="liquidation" value="liquidation" />
            <label for="other">Thanh lý</label> */}
          </div>
        </div>
        {/* <div className="newRequestItem">
          <label>Full Name</label>
          <input type="text" placeholder="Họ Và Tên" />
        </div> */}
        {/* <div className="newRequestItem">
          <label>Email</label>
          <input type="email" placeholder="john@gmail.com" />
        </div> */}
        <div className="newRequestItem">
          <label>Mô tả tình trạng thiết bị:</label>
          <input type="text" placeholder="Mô tả" />
        </div>
        {/* <div className="newUserItem">
          <label>Phone</label>
          <input type="text" placeholder="+1 123 456 78" />
        </div> */}
        <div className="newRequestItem">
          <label>Sở hữu thiết bị:</label>
          <div className="newRequestType">
            <input type="radio" name="type" id="maintenance" value="maintenance" />
            <label for="male">Cá nhân</label>
            <input type="radio" name="type" id="repair" value="repair" />
            <label for="female">Phòng</label>
            {/* <input type="radio" name="type" id="liquidation" value="liquidation" />
            <label for="other">Thanh lý</label> */}
          </div>
        </div>

        <div className="newRequestItem">
          <label>Số phòng, vị trí:</label>
          <input type="text" placeholder="Phòng" />
        </div>
        
        {/* <div className="newRequestItem">
          <label>Active</label>
          <select className="newRequestSelect" name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        
          <button className="newRequestButton">Create</button>
        
        
      </form>
    </div>
  );
}
