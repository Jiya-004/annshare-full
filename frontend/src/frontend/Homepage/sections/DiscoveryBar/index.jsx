import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoChevronForward,
  IoArrowForward,
  IoCheckmarkOutline,
} from "react-icons/io5";

import {
  DiscoveryWrapper,
  Container,
  SearchCard,
  SegmentsRow,
  SegmentButton,
  LocationSegment,
  SearchSubmitButton,
  MobileSearchCard,
  MobileCardHeader,
  SegmentedControl,
  SegmentTab,
  ActionContentCard,
  LocationRowWrapper,
  LocationNativeRow,
  LocationDropdownList,
  LocationOptionItem,
  MobilePrimaryCtaButton,
  MicroDetailText,
} from "./style";

const LOCATION_OPTIONS = [
  "Kathmandu Valley (All)",
  "Thamel, Kathmandu",
  "Jhamsikhel, Lalitpur",
  "Lazimpat, Kathmandu",
  "Baneshwor, Kathmandu",
  "Pulchowk, Lalitpur",
  "Bhaktapur City",
];

const DiscoveryBar = ({ onOpenDonate, onOpenNeedFood, onExplore }) => {
  const [selectedRole, setSelectedRole] = useState("donor");
  const [location, setLocation] = useState("Kathmandu Valley (All)");
  const [isLocationPickerOpen, setIsLocationPickerOpen] = useState(false);

  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    setSelectedRole(role);
    if (role === "donor") {
      onOpenDonate?.();
    } else {
      onOpenNeedFood?.();
    }
  };

  const handleSearch = () => {
    if (onExplore) {
      onExplore();
    } else {
      navigate("/find-food");
    }
  };

  const handleMobileExplore = () => {
    if (selectedRole === "donor") {
      onOpenDonate?.();
    } else {
      if (onExplore) {
        onExplore();
      } else {
        navigate("/find-food");
      }
    }
  };

  return (
    <DiscoveryWrapper>
      <Container>
        {/* DESKTOP SEARCH CARD (UNTOUCHED) */}
        <SearchCard>
          <div className="header-row">
            <h3>What are you looking for?</h3>
          </div>

          <SegmentsRow>
            {/* Field 1: I Have Food */}
            <SegmentButton
              type="button"
              $isActive={selectedRole === "donor"}
              onClick={() => handleRoleSelect("donor")}
            >
              <span className="label">
                <IoRestaurantOutline style={{ marginRight: "4px" }} />
                I Have Food
              </span>
              <span className="value">List surplus food</span>
            </SegmentButton>

            {/* Field 2: I Need Food */}
            <SegmentButton
              type="button"
              $isActive={selectedRole === "ngo"}
              onClick={() => handleRoleSelect("ngo")}
            >
              <span className="label">
                <IoPeopleOutline style={{ marginRight: "4px" }} />
                I Need Food
              </span>
              <span className="value">Find available donations</span>
            </SegmentButton>

            {/* Field 3: Location */}
            <LocationSegment>
              <span className="label">Location</span>
              <div className="input-box">
                <IoLocationOutline />
                <select
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  aria-label="Filter by location"
                >
                  <option value="Kathmandu Valley (All)">Kathmandu Valley (All)</option>
                  <option value="Thamel, Kathmandu">Thamel, Kathmandu</option>
                  <option value="Jhamsikhel, Lalitpur">Jhamsikhel, Lalitpur</option>
                  <option value="Lazimpat, Kathmandu">Lazimpat, Kathmandu</option>
                  <option value="Baneshwor, Kathmandu">Baneshwor, Kathmandu</option>
                  <option value="Pulchowk, Lalitpur">Pulchowk, Lalitpur</option>
                  <option value="Bhaktapur City">Bhaktapur City</option>
                </select>
              </div>
            </LocationSegment>

            {/* Button: Explore */}
            <SearchSubmitButton type="button" onClick={handleSearch}>
              <IoSearchOutline style={{ fontSize: "1.15rem" }} />
              <span>Explore</span>
            </SearchSubmitButton>
          </SegmentsRow>
        </SearchCard>

        {/* MOBILE-FIRST APP-LIKE SEARCH CARD (Airbnb / Uber Style) */}
        <MobileSearchCard>
          {/* 1. Header */}
          <MobileCardHeader>
            <h4>HOW CAN WE HELP?</h4>
          </MobileCardHeader>

          {/* 2. iOS-style Segmented Control */}
          <SegmentedControl role="tablist" aria-label="Action selection">
            <SegmentTab
              type="button"
              role="tab"
              aria-selected={selectedRole === "donor"}
              $isSelected={selectedRole === "donor"}
              onClick={() => setSelectedRole("donor")}
            >
              <IoRestaurantOutline className="tab-icon" />
              <span>I HAVE FOOD</span>
            </SegmentTab>

            <SegmentTab
              type="button"
              role="tab"
              aria-selected={selectedRole === "ngo"}
              $isSelected={selectedRole === "ngo"}
              onClick={() => setSelectedRole("ngo")}
            >
              <IoPeopleOutline className="tab-icon" />
              <span>I NEED FOOD</span>
            </SegmentTab>
          </SegmentedControl>

          {/* 3. Action Content Description */}
          <ActionContentCard>
            {selectedRole === "donor" ? (
              <>
                <span className="action-title">List your surplus food</span>
                <span className="action-desc">
                  Help good food reach trusted organizations.
                </span>
              </>
            ) : (
              <>
                <span className="action-title">Find available donations</span>
                <span className="action-desc">
                  Discover available food near you.
                </span>
              </>
            )}
          </ActionContentCard>

          {/* 4. Native Mobile App Setting Location Row */}
          <LocationRowWrapper>
            <LocationNativeRow
              type="button"
              $isOpen={isLocationPickerOpen}
              onClick={() => setIsLocationPickerOpen(!isLocationPickerOpen)}
              aria-label="Select location"
            >
              <div className="loc-left">
                <span className="loc-pin">
                  <IoLocationOutline />
                </span>
                <span className="loc-name">{location}</span>
              </div>
              <span className="loc-chevron">
                <IoChevronForward />
              </span>
            </LocationNativeRow>

            {isLocationPickerOpen && (
              <LocationDropdownList>
                {LOCATION_OPTIONS.map((opt) => (
                  <LocationOptionItem
                    key={opt}
                    type="button"
                    $isSelected={location === opt}
                    onClick={() => {
                      setLocation(opt);
                      setIsLocationPickerOpen(false);
                    }}
                  >
                    <span>{opt}</span>
                    {location === opt && (
                      <IoCheckmarkOutline className="check-icon" />
                    )}
                  </LocationOptionItem>
                ))}
              </LocationDropdownList>
            )}
          </LocationRowWrapper>

          {/* 5. Full-Width Primary CTA */}
          <MobilePrimaryCtaButton
            type="button"
            onClick={handleMobileExplore}
          >
            <span>EXPLORE</span>
            <IoArrowForward className="cta-arrow" />
          </MobilePrimaryCtaButton>

          {/* 6. Micro Detail */}
          <MicroDetailText>
            Restaurants · Hotels · Events · Caterers
          </MicroDetailText>
        </MobileSearchCard>
      </Container>
    </DiscoveryWrapper>
  );
};

export default DiscoveryBar;
