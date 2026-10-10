import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { IoArrowForward } from "react-icons/io5";

import {
  SectionWrapper,
  Container,
  HeaderRow,
  FilterPillsRow,
  FilterPill,
  FoodCardsGrid,
} from "./style";

import FoodCard from "../../../../pages/FindFood/components/FoodCard";
import { LISTINGS_DATA } from "../../../../pages/FindFood/data/listingsData";

const FoodDiscovery = ({ onOpenNeedFood }) => {
  const [activeCategory, setActiveCategory] = useState("All");
  const navigate = useNavigate();

  const categories = [
    "All",
    "Prepared Meals",
    "Bakery",
    "Fruits & Vegetables",
    "Groceries",
  ];

  const filteredItems =
    activeCategory === "All"
      ? LISTINGS_DATA.slice(0, 6)
      : LISTINGS_DATA.filter((item) => item.category === activeCategory);

  const handleViewAll = (e) => {
    e.preventDefault();
    if (onOpenNeedFood) {
      onOpenNeedFood();
    } else {
      navigate("/find-food");
    }
  };

  return (
    <SectionWrapper id="explore">
      <Container>
        <HeaderRow>
          <div className="title-group">
            <h2>Available near you</h2>
            <p>Discover surplus food currently available from ANNShare partners.</p>
          </div>
          <a
            href="/find-food"
            className="view-all-link"
            onClick={handleViewAll}
          >
            <span>View all donations</span>
            <IoArrowForward />
          </a>
        </HeaderRow>

        <FilterPillsRow>
          {categories.map((cat) => (
            <FilterPill
              key={cat}
              type="button"
              $isActive={activeCategory === cat}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </FilterPill>
          ))}
        </FilterPillsRow>

        <FoodCardsGrid>
          {filteredItems.map((item) => (
            <FoodCard key={item.id} item={item} />
          ))}
        </FoodCardsGrid>
      </Container>
    </SectionWrapper>
  );
};

export default FoodDiscovery;
