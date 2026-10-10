import React from "react";
import styled from "styled-components";
import {
  IoGridOutline,
  IoRestaurantOutline,
  IoCafeOutline,
  IoLeafOutline,
  IoNutritionOutline,
  IoArchiveOutline,
  IoTimeOutline,
  IoLocationOutline,
  IoOptionsOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

const FilterBarWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  position: relative;
  width: 100%;
`;

const ScrollWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  flex: 1;
  min-width: 0;
`;

const ScrollablePillsContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  overflow-x: auto;
  padding: 4px 2px;
  scrollbar-width: none;
  -ms-overflow-style: none;
  scroll-behavior: smooth;
  flex: 1;

  &::-webkit-scrollbar {
    display: none;
  }
`;

const ScrollNavBtn = styled.button`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.15);
  display: flex;
  align-items: center;
  justify-content: center;
  color: #174A3A;
  font-size: 0.85rem;
  cursor: pointer;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  transition: all 0.2s ease;
  flex-shrink: 0;
  z-index: 2;

  &:hover {
    background: #F8F5ED;
    border-color: #2E7D5B;
    transform: scale(1.06);
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const FilterPill = styled.button`
  background: ${({ $isActive }) => ($isActive ? "#174A3A" : "#FFFFFF")};
  color: ${({ $isActive }) => ($isActive ? "#FFFFFF" : "#174A3A")};
  border: 1px solid
    ${({ $isActive }) => ($isActive ? "#174A3A" : "rgba(23, 74, 58, 0.12)")};
  padding: 9px 16px;
  border-radius: 999px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.84rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 6px;
  white-space: nowrap;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  box-shadow: ${({ $isActive }) =>
    $isActive
      ? "0 4px 12px rgba(23, 74, 58, 0.2)"
      : "0 2px 6px rgba(0, 0, 0, 0.02)"};

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.76rem;
    gap: 5px;
  }

  svg {
    font-size: 1rem;
    color: ${({ $isActive }) => ($isActive ? "#A3E7C9" : "#2E7D5B")};

    @media (max-width: 768px) {
      font-size: 0.88rem;
    }
  }

  &:hover {
    border-color: #2E7D5B;
    transform: translateY(-1px);
  }
`;

const FilterDrawerBtn = styled.button`
  background: #FFFFFF;
  color: #174A3A;
  border: 1px solid rgba(23, 74, 58, 0.14);
  padding: 9px 18px;
  border-radius: 999px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.86rem;
  font-weight: 600;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  white-space: nowrap;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.04);
  transition: all 0.2s ease;
  flex-shrink: 0;

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.78rem;
    gap: 6px;
  }

  svg {
    font-size: 1.05rem;
    color: #2E7D5B;

    @media (max-width: 768px) {
      font-size: 0.92rem;
    }
  }

  .filter-count {
    background: #174A3A;
    color: #FFFFFF;
    font-size: 0.72rem;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;

    @media (max-width: 768px) {
      width: 16px;
      height: 16px;
      font-size: 0.65rem;
    }
  }

  &:hover {
    border-color: #174A3A;
    box-shadow: 0 4px 14px rgba(23, 74, 58, 0.1);
  }
`;

const PILLS = [
  { id: "all", label: "All", icon: <IoGridOutline /> },
  { id: "Prepared Meals", label: "Prepared Meals", icon: <IoRestaurantOutline /> },
  { id: "Bakery", label: "Bakery", icon: <IoCafeOutline /> },
  { id: "Fruits & Vegetables", label: "Fruits & Vegetables", icon: <IoLeafOutline /> },
  { id: "Groceries", label: "Groceries", icon: <IoNutritionOutline /> },
  { id: "Packaged Food", label: "Packaged Food", icon: <IoArchiveOutline /> },
  { id: "today", label: "Available Today", icon: <IoTimeOutline /> },
  { id: "near", label: "Within 5 km", icon: <IoLocationOutline /> },
];

export default function FilterBar({
  activeFilter,
  onSelectFilter,
  onOpenDrawer,
  activeFilterCount = 0,
}) {
  const scrollRef = React.useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -240 : 240;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <FilterBarWrapper>
      <ScrollWrapper>
        <ScrollNavBtn
          type="button"
          onClick={() => handleScroll("left")}
          title="Scroll left"
          style={{ marginRight: "6px" }}
        >
          <IoChevronBack />
        </ScrollNavBtn>

        <ScrollablePillsContainer ref={scrollRef}>
          {PILLS.map((pill) => {
            const isActive = activeFilter === pill.id;
            return (
              <FilterPill
                key={pill.id}
                type="button"
                $isActive={isActive}
                onClick={() => onSelectFilter(pill.id)}
              >
                {pill.icon}
                <span>{pill.label}</span>
              </FilterPill>
            );
          })}
        </ScrollablePillsContainer>

        <ScrollNavBtn
          type="button"
          onClick={() => handleScroll("right")}
          title="Scroll right"
          style={{ marginLeft: "6px" }}
        >
          <IoChevronForward />
        </ScrollNavBtn>
      </ScrollWrapper>

      <FilterDrawerBtn type="button" onClick={onOpenDrawer}>
        <IoOptionsOutline />
        <span>Filters</span>
        {activeFilterCount > 0 && (
          <span className="filter-count">{activeFilterCount}</span>
        )}
      </FilterDrawerBtn>
    </FilterBarWrapper>
  );
}
