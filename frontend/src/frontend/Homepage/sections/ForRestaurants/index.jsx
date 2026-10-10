import React from "react";
import {
  SectionWrapper,
  Container,
  SplitGrid,
  ImageWrapper,
  TextContent,
} from "./style";
import {
  IoCheckmarkCircle,
  IoShieldCheckmarkOutline,
  IoRestaurantOutline,
  IoArrowForward,
} from "react-icons/io5";

export default function ForRestaurants({ onOpenDonate }) {
  return (
    <SectionWrapper id="for-restaurants">
      <Container>
        <SplitGrid>
          {/* Left: Commercial kitchen photo & badges */}
          <ImageWrapper>
            <div className="image-box">
              <img src="/food.png" alt="Commercial Kitchen Partner" />
            </div>

            <div className="floating-cert-badge">
              <IoShieldCheckmarkOutline size={16} />
              <span>Certified Zero-Waste Partner</span>
            </div>

            <div className="monthly-impact-card">
              <div className="icon-circle">
                <IoRestaurantOutline />
              </div>
              <div className="impact-text">
                <div className="num">1,248 meals</div>
                <div className="lbl">Shared this month by partners</div>
              </div>
            </div>
          </ImageWrapper>

          {/* Right: Pitch & features */}
          <TextContent>
            <span className="badge">For Food Businesses & Caterers</span>
            <h2>Turn surplus kitchen inventory into community nourishment</h2>
            <p className="desc">
              Food businesses in Nepal discard tonnes of fresh, pristine food daily while local families struggle for nutrition. ANNShare streamlines your redistribution with zero operational friction.
            </p>

            <div className="features-list">
              <div className="feature-item">
                <IoCheckmarkCircle className="check-icon" />
                <div className="text-block">
                  <h4>Cut Waste Disposal Expenses</h4>
                  <p>Lower commercial trash surcharges and reduce disposal logistics with rapid volunteer pickups.</p>
                </div>
              </div>

              <div className="feature-item">
                <IoCheckmarkCircle className="check-icon" />
                <div className="text-block">
                  <h4>Automated Schedule & Handshake</h4>
                  <p>Choose pickup times that fit your shift endings. Nearby verified partners arrive promptly on schedule.</p>
                </div>
              </div>

              <div className="feature-item">
                <IoCheckmarkCircle className="check-icon" />
                <div className="text-block">
                  <h4>Audit-Ready CSR & ESG Reports</h4>
                  <p>Receive monthly sustainability certificates detailing kilograms saved, meals shared, and emissions avoided.</p>
                </div>
              </div>
            </div>

            <button className="btn-partner" onClick={onOpenDonate}>
              <span>Start Sharing Surplus Food</span>
              <IoArrowForward />
            </button>
          </TextContent>
        </SplitGrid>
      </Container>
    </SectionWrapper>
  );
}
