import React from "react";
import styled from "styled-components";
import {
  IoRestaurantOutline,
  IoCafeOutline,
  IoLeafOutline,
  IoArchiveOutline,
  IoNutritionOutline,
  IoWaterOutline,
  IoGridOutline,
} from "react-icons/io5";

const CategoriesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
  }
`;

const CategoryCard = styled.button`
  background: ${({ $selected }) => ($selected ? "#174A3A" : "#F8F5ED")};
  color: ${({ $selected }) => ($selected ? "#FFFFFF" : "#174A3A")};
  border: 1.5px solid
    ${({ $selected }) => ($selected ? "#174A3A" : "rgba(23, 74, 58, 0.1)")};
  border-radius: 14px;
  padding: 12px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 768px) {
    padding: 10px 8px;
    border-radius: 12px;
    gap: 4px;
  }

  &:hover {
    border-color: #2E7D5B;
    transform: translateY(-2px);
    box-shadow: 0 4px 14px rgba(23, 74, 58, 0.08);
  }

  .cat-icon-wrap {
    font-size: 1.35rem;
    color: ${({ $selected }) => ($selected ? "#A3E7C9" : "#2E7D5B")};
    display: flex;
    align-items: center;
    justify-content: center;

    @media (max-width: 768px) {
      font-size: 1.15rem;
    }
  }

  .cat-name {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.8rem;
    font-weight: 600;
    text-align: center;
    line-height: 1.25;

    @media (max-width: 768px) {
      font-size: 0.74rem;
    }
  }
`;

const CATEGORIES = [
  { id: "prepared", icon: <IoRestaurantOutline />, label: "Prepared Meals" },
  { id: "bakery", icon: <IoCafeOutline />, label: "Bakery & Bread" },
  { id: "produce", icon: <IoLeafOutline />, label: "Fruits & Veggies" },
  { id: "packaged", icon: <IoArchiveOutline />, label: "Packaged Food" },
  { id: "grains", icon: <IoNutritionOutline />, label: "Rice & Grains" },
  { id: "dairy", icon: <IoWaterOutline />, label: "Dairy & Pantry" },
  { id: "other", icon: <IoGridOutline />, label: "Other Items" },
];

export default function FoodCategorySelector({ selectedCategory, onSelect }) {
  return (
    <CategoriesGrid>
      {CATEGORIES.map((cat) => {
        const isSelected =
          selectedCategory === cat.label ||
          (cat.id === "prepared" && selectedCategory === "Prepared Meals");

        return (
          <CategoryCard
            key={cat.id}
            type="button"
            $selected={isSelected}
            onClick={() => onSelect(cat.label)}
          >
            <div className="cat-icon-wrap">{cat.icon}</div>
            <span className="cat-name">{cat.label}</span>
          </CategoryCard>
        );
      })}
    </CategoriesGrid>
  );
}
