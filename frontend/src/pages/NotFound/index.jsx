import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  IoHomeOutline,
  IoRestaurantOutline,
  IoHeartOutline,
  IoArrowForward,
  IoBookOutline,
  IoPeopleOutline,
  IoHelpCircleOutline,
  IoSparkles,
} from "react-icons/io5";

import {
  PageWrapper,
  Container,
  NotFoundCard,
  BadgePill,
  BigVisualBlock,
  Title,
  Subtitle,
  ActionsGroup,
  QuickLinksSection,
  QuickLinksGrid,
  QuickLinkCard,
} from "./style";

export default function NotFoundPage() {
  const navigate = useNavigate();

  const helpfulLinks = [
    {
      title: "Find Food",
      desc: "Browse fresh surplus food currently available near you.",
      icon: <IoRestaurantOutline />,
      to: "/find-food",
    },
    {
      title: "Donate Food",
      desc: "Connect excess meals with local community partners.",
      icon: <IoHeartOutline />,
      to: "/donate",
    },
    {
      title: "Journal & Stories",
      desc: "Read field stories of community nourishment and zero waste.",
      icon: <IoBookOutline />,
      to: "/blog",
    },
    {
      title: "Become a Partner",
      desc: "Join commercial kitchens, NGOs, and food champions.",
      icon: <IoPeopleOutline />,
      to: "/become-a-partner",
    },
  ];

  return (
    <PageWrapper>
      <Container>
        <NotFoundCard>
          {/* Eyebrow Pill */}
          <BadgePill>
            <IoSparkles /> 404 • Page Not Found
          </BadgePill>

          {/* Animated 404 Visual with Food Plate Motif */}
          <BigVisualBlock>
            <div className="glow-ring" />
            <div className="number-display">
              <span className="digit">4</span>
              <div className="icon-plate" title="Empty Plate">
                <IoRestaurantOutline />
              </div>
              <span className="digit">4</span>
            </div>
          </BigVisualBlock>

          {/* Warm Headline & Explanatory Subtitle */}
          <Title>Looks like this dish isn't on our menu.</Title>
          <Subtitle>
            The page you're searching for might have been moved, renamed, or
            perhaps never existed. But don't worry — there's plenty of good food
            and community impact waiting for you.
          </Subtitle>

          {/* Primary Action Buttons */}
          <ActionsGroup>
            <Link to="/" className="btn-primary">
              <IoHomeOutline /> Back to Home
            </Link>
            <Link to="/find-food" className="btn-secondary">
              <IoRestaurantOutline /> Explore Available Food
            </Link>
          </ActionsGroup>

          {/* Helpful Navigation Cards */}
          <QuickLinksSection>
            <span className="section-label">Helpful Places to Go</span>
            <QuickLinksGrid>
              {helpfulLinks.map((item, idx) => (
                <QuickLinkCard
                  key={idx}
                  as={Link}
                  to={item.to}
                >
                  <div className="card-icon">{item.icon}</div>
                  <span className="card-title">
                    {item.title} <IoArrowForward size={14} />
                  </span>
                  <p className="card-desc">{item.desc}</p>
                </QuickLinkCard>
              ))}
            </QuickLinksGrid>
          </QuickLinksSection>
        </NotFoundCard>
      </Container>
    </PageWrapper>
  );
}
