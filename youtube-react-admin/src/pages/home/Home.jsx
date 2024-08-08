import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import { userData } from "../../dummyData";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import WidgetLg from "../../components/widgetLg/WidgetLg";

import { useEffect, useState } from "react";
import { GetUserFromToken } from "../../services/users/user.service";
import { useHistory } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";

export default function Home() {
  const history = useHistory();
  const { logout } = useAuth();

  useEffect(async () => {
    const token = sessionStorage.getItem("token");
    const response = await GetUserFromToken(token);
    if ("error" in response) {
      logout();
      history.push("/login");
    }
  }, []);

  return (
    <div className="home">
      <FeaturedInfo />
      <Chart
        data={userData}
        title="Maintenace Analytics"
        grid
        dataKey="Active User"
      />
      <div className="homeWidgets">
        {/* <WidgetSm/> */}
        <WidgetLg />
      </div>
    </div>
  );
}
