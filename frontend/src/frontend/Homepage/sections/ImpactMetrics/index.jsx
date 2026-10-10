import React from "react";
import {
  MetricsWrapper,
  Container,
  HeaderArea,
  MetricGrid,
  MetricCard,
} from "./style";
import {
  IoScaleOutline,
  IoFastFoodOutline,
  IoLeafOutline,
  IoCheckmarkDoneCircleOutline,
} from "react-icons/io5";

const STATS = [
  {
    icon: <IoScaleOutline />,
    trend: "+24% mo/mo",
    val: "18,420 kg",
    label: "Food Rescued",
    desc: "Quality surplus redirected from landfills into verified feeding channels.",
  },
  {
    icon: <IoFastFoodOutline />,
    trend: "25k+ served",
    val: "25,000+",
    label: "Nutritious Meals",
    desc: "Wholesome, safe meals delivered to children shelters and day centers.",
  },
  {
    icon: <IoLeafOutline />,
    trend: "Zero waste",
    val: "12.4 Tons",
    label: "CO₂ Avoided",
    desc: "Significant reduction in greenhouse gas emissions from organic decomposition.",
  },
  {
    icon: <IoCheckmarkDoneCircleOutline />,
    trend: "99% reliable",
    val: "98.4%",
    label: "On-Time Pickups",
    desc: "Verified courier and volunteer logistics executing pickups within allotted windows.",
  },
];

export default function ImpactMetrics() {
  return (
    <MetricsWrapper id="impact-metrics">
      <Container>
        <HeaderArea>
          <span className="badge">Audited Environmental & Social Impact</span>
          <h2>Small actions. Shared impact.</h2>
          <p>
            Every single batch of rescued surplus directly reduces carbon footprint while putting nutritious food on community plates across Nepal.
          </p>
        </HeaderArea>

        <MetricGrid>
          {STATS.map((stat, idx) => (
            <MetricCard key={idx}>
              <div className="icon-row">
                <div className="icon-wrap">{stat.icon}</div>
                <div className="trend">{stat.trend}</div>
              </div>
              <div>
                <div className="stat-val">{stat.val}</div>
                <div className="stat-label">{stat.label}</div>
                <p className="stat-desc">{stat.desc}</p>
              </div>
            </MetricCard>
          ))}
        </MetricGrid>
      </Container>
    </MetricsWrapper>
  );
}
