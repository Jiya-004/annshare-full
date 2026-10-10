import React from "react";
import {
  StoryWrapper,
  Container,
  StoryCard,
  VisualSide,
  ContentSide,
} from "./style";

export default function SuccessStory() {
  return (
    <StoryWrapper id="stories">
      <Container>
        <StoryCard>
          {/* Visual with photo and live impact metrics */}
          <VisualSide>
            <img src="/serve.jpg" alt="Shelter Meal Distribution" />
            <div className="stat-pill-group">
              <div className="stat-pill">48 Warm Portions</div>
              <div className="stat-pill">Matched in 28 mins</div>
              <div className="stat-pill">Zero Waste</div>
            </div>
          </VisualSide>

          {/* Editorial Story */}
          <ContentSide>
            <span className="badge">Field Impact Story</span>
            <h2>A meal that almost became waste.</h2>
            <blockquote>
              "Following an evening hospitality gala, our kitchen had over 45 freshly prepared, untouched banquet courses remaining. Rather than seeing good food go into trash bins, we posted it on ANNShare. Within 28 minutes, a verified shelter van arrived and collected the warm trays. 48 children went to bed nourished."
            </blockquote>

            <div className="author-meta">
              <div className="avatar">RS</div>
              <div className="info">
                <div className="name">Executive Chef Ramesh Shrestha</div>
                <div className="role">Hotel Summit Kathmandu & Partner Donor</div>
              </div>
            </div>
          </ContentSide>
        </StoryCard>
      </Container>
    </StoryWrapper>
  );
}
