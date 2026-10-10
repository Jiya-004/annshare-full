import React from "react";
import {
  StripWrapper,
  Container,
  StatsGrid,
  StatItem,
  IconBadge,
  StatText,
} from "./style";
import {
  IoStorefrontOutline,
  IoShieldCheckmarkOutline,
  IoRestaurantOutline,
  IoLeafOutline,
} from "react-icons/io5";

const STATS_DATA = [
  {
    icon: <IoStorefrontOutline />,
    iconBg: "rgba(163, 231, 201, 0.14)",
    iconColor: "#A3E7C9",
    number: "1,200+",
    label: "Food Partners",
    subNote: "Restaurants, bakeries & caterers",
  },
  {
    icon: <IoShieldCheckmarkOutline />,
    iconBg: "rgba(128, 222, 234, 0.14)",
    iconColor: "#80DEEA",
    number: "350+",
    label: "Verified Organizations",
    subNote: "Shelters, orphanages & NGOs",
  },
  {
    icon: <IoRestaurantOutline />,
    iconBg: "rgba(255, 213, 153, 0.15)",
    iconColor: "#FFD599",
    number: "25,000+",
    label: "Meals Redistributed",
    subNote: "Direct community impact",
  },
  {
    icon: <IoLeafOutline />,
    iconBg: "rgba(163, 231, 201, 0.14)",
    iconColor: "#A3E7C9",
    number: "18 Tons",
    label: "Food Rescued",
    subNote: "Prevented landfill waste",
  },
];

const ImpactStrip = () => {
  return (
    <StripWrapper id="impact-strip">
      <Container>
        <StatsGrid>
          {STATS_DATA.map((item, idx) => (
            <StatItem key={idx}>
              <IconBadge $bg={item.iconBg} $color={item.iconColor}>
                {item.icon}
              </IconBadge>
              <StatText>
                <span className="stat-number">{item.number}</span>
                <span className="stat-label">{item.label}</span>
                <span className="sub-note">{item.subNote}</span>
              </StatText>
            </StatItem>
          ))}
        </StatsGrid>
      </Container>
    </StripWrapper>
  );
};

export default ImpactStrip;
