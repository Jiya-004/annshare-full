import React from "react";
import {
  CTAWrapper,
  Container,
  BannerCard,
} from "./style";
import {
  IoRestaurantOutline,
  IoPeopleOutline,
} from "react-icons/io5";

export default function CommunityCTA({ onOpenDonate, onOpenNeed, onOpenNeedFood }) {
  const handleNeed = onOpenNeedFood || onOpenNeed;

  return (
    <CTAWrapper id="community-action">
      <Container>
        <BannerCard>
          <div className="content-inner">
            <span className="badge">Join The Movement</span>
            <h2>Ready to eliminate food waste in your community?</h2>
            <p>
              Whether you operate a commercial kitchen with daily surplus or an organization providing relief meals, ANNShare connects your capacity in minutes.
            </p>

            <div className="btn-group">
              <button className="btn-donate" onClick={onOpenDonate}>
                <IoRestaurantOutline size={18} />
                <span>I Have Surplus Food</span>
              </button>
              <button className="btn-need" onClick={handleNeed}>
                <IoPeopleOutline size={18} />
                <span>I Need Food For My Shelter</span>
              </button>
            </div>
          </div>
        </BannerCard>
      </Container>
    </CTAWrapper>
  );
}
