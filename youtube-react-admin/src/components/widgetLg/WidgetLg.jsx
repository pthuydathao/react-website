import "./widgetLg.css";

export default function WidgetLg() {
  const Button = ({ type }) => {
    return <button className={"widgetLgButton " + type}>{type}</button>;
  };
  return (
    <div className="widgetLg">
      <h3 className="widgetLgTitle">Latest Requests</h3>
      <table className="widgetLgTable">
        <tr className="widgetLgTr">
          <th className="widgetLgTh">Employee</th>
          <th className="widgetLgTh">Date</th>
          <th className="widgetLgTh">Type</th>
          <th className="widgetLgTh">Status</th>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Da Thao</span>
          </td>
          <td className="widgetLgDate">2 Aug 2024</td>
          <td className="widgetLgAmount">Maintenance</td>
          <td className="widgetLgStatus">
            <Button type="Pending" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Ngoc Anh</span>
          </td>
          <td className="widgetLgDate">2 Aug 2024</td>
          <td className="widgetLgAmount">Repair</td>
          <td className="widgetLgStatus">
            <Button type="InProgress" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Nhat Minh</span>
          </td>
          <td className="widgetLgDate">1 Jun 2024</td>
          <td className="widgetLgAmount">Repair</td>
          <td className="widgetLgStatus">
            <Button type="InProgress" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Giang Quynh</span>
          </td>
          <td className="widgetLgDate">1 Aug 2024</td>
          <td className="widgetLgAmount">Redeem</td>
          <td className="widgetLgStatus">
            <Button type="Completed" />
          </td>
        </tr>
        <tr className="widgetLgTr">
          <td className="widgetLgUser">
            <img
              src="https://images.pexels.com/photos/4172933/pexels-photo-4172933.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940"
              alt=""
              className="widgetLgImg"
            />
            <span className="widgetLgName">Minh Nguyen</span>
          </td>
          <td className="widgetLgDate">31 Jul 2024</td>
          <td className="widgetLgAmount">Repair</td>
          <td className="widgetLgStatus">
            <Button type="Canceled" />
          </td>
        </tr>
      </table>
    </div>
  );
}
