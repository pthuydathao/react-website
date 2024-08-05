import "./newProduct.css";

export default function NewProduct() {
  return (
    <div className="newProduct">
      <h1 className="addProductTitle">New Device</h1>
      <form className="addProductForm">
        <div className="addProductItem">
          <label>Image</label>
          <input type="file" id="file" />
        </div>
        <div className="addProductItem">
          <label>Name</label>
          <input type="text" placeholder="Apple Airpods" />
        </div>
        <div className="addProductItem">
          <label>Serial Number</label>
          <input type="seri" placeholder="123456" />
        </div>
        <div className="addProductItem">
          <label>Purchase Date</label>
          <input type="text" placeholder="12/11/2020" />
        </div>
        <div className="addProductItem">
          <label>Warranty Expiry Date</label>
          <input type="text" placeholder="12/11/2024" />
        </div>
        <div className="addProductItem">
          <label>Discription</label>
          <input type="text" placeholder="Device discription" />
        </div>
        {/* <div className="addProductItem">
          <label>Active</label>
          <select name="active" id="active">
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div> */}
        <button className="addProductButton">Add new device</button>
      </form>
    </div>
  );
}
