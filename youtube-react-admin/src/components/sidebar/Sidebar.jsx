import "./sidebar.css";
import {
  LineStyle,
  Timeline,
  TrendingUp,
  PermIdentity,
  Storefront,
  AttachMoney,
  BarChart,
  MailOutline,
  DynamicFeed,
  ChatBubbleOutline,
  WorkOutline,
  Report,
  Add,
  Devices,
  Adjust,
  HomeOutlined,
} from "@material-ui/icons";
import { Link } from "react-router-dom";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <div className="sidebarMenu">
          <h3 className="sidebarTitle">Dashboard</h3>
          <ul className="sidebarList">
            <Link to="/" className="link">
            <li className="sidebarListItem active">
              <HomeOutlined className="sidebarIcon" />
              Home
            </li>
            </Link>
            <Link to="/requests" className="link">
              <li className="sidebarListItem">
                <PermIdentity className="sidebarIcon" />
                Requests
              </li>
            </Link>
            <Link to="/products" className="link">
              <li className="sidebarListItem">
                <Devices className="sidebarIcon" />
                Devices
              </li>
            </Link>
            <Link to="/newRequest" className="link">
            <li className="sidebarListItem">
                <Add className="sidebarIcon" />
                Create new request
            </li>
            </Link>
          </ul>
        </div>
        
        
      </div>
    </div>
  );
}
