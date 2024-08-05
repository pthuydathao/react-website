import "./featuredInfo.css";
import { ArrowDownward, ArrowUpward } from "@material-ui/icons";

export default function FeaturedInfo() {
  return (
    <div className="featured">
      <div className="featuredItem">
        <span className="featuredTitle">Maintenance</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">50 devices</span>
          {/* <span className="featuredMoneyRate">
            5% <ArrowDownward  className="featuredIcon negative"/>
          </span> */}
        </div>
        <span className="featuredSub">In this month counted till now</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Repairs</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">20 devices</span>
          <span className="featuredMoneyRate">
            56% <ArrowDownward className="featuredIcon negative"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
      <div className="featuredItem">
        <span className="featuredTitle">Redeem</span>
        <div className="featuredMoneyContainer">
          <span className="featuredMoney">10 devices</span>
          <span className="featuredMoneyRate">
            3% <ArrowUpward className="featuredIcon"/>
          </span>
        </div>
        <span className="featuredSub">Compared to last month</span>
      </div>
    </div>
  );
}
