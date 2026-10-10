import React, { useState, useEffect } from "react";
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
import api from "../../../services/api";

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

const DEFAULT_CATEGORIES = [
  { id: "cat-1", name: "Prepared Meals", icon: "cooked", status: "Active" },
  { id: "cat-2", name: "Bakery & Bread", icon: "bakery", status: "Active" },
  { id: "cat-3", name: "Fruits & Veggies", icon: "vegetables", status: "Active" },
  { id: "cat-4", name: "Packaged Food", icon: "packaged", status: "Active" },
  { id: "cat-5", name: "Rice & Grains", icon: "grains", status: "Active" },
  { id: "cat-6", name: "Dairy & Pantry", icon: "dairy", status: "Active" },
  { id: "cat-7", name: "Other Items", icon: "other", status: "Active" },
];

export const getCategoryIcon = (nameOrSlug = "", iconType = "") => {
  const key = `${nameOrSlug} ${iconType}`.toLowerCase();
  if (key.includes("bakery") || key.includes("bread") || key.includes("pastr") || key.includes("cake") || key.includes("croissant")) {
    return <IoCafeOutline />;
  }
  if (key.includes("tea") || key.includes("coffee") || key.includes("cafe")) {
    return <IoCafeOutline />;
  }
  if (key.includes("fruit") || key.includes("veg") || key.includes("produce") || key.includes("salad") || key.includes("leaf") || key.includes("greens")) {
    return <IoLeafOutline />;
  }
  if (key.includes("pack") || key.includes("can") || key.includes("box") || key.includes("sealed") || key.includes("archive")) {
    return <IoArchiveOutline />;
  }
  if (key.includes("rice") || key.includes("grain") || key.includes("cereal") || key.includes("flour") || key.includes("pulse") || key.includes("lentil") || key.includes("nutrition")) {
    return <IoNutritionOutline />;
  }
  if (key.includes("dairy") || key.includes("milk") || key.includes("water") || key.includes("beverag") || key.includes("juice") || key.includes("drink") || key.includes("pantry")) {
    return <IoWaterOutline />;
  }
  if (key.includes("meal") || key.includes("cook") || key.includes("dish") || key.includes("prepared") || key.includes("kitchen") || key.includes("curry") || key.includes("food") || key.includes("utensils")) {
    return <IoRestaurantOutline />;
  }
  return <IoGridOutline />;
};

export default function FoodCategorySelector({ selectedCategory, onSelect }) {
  const [categories, setCategories] = useState(DEFAULT_CATEGORIES);

  useEffect(() => {
    let isMounted = true;
    api.categories
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const active = data.filter((c) => c.status !== "Inactive");
          if (active.length > 0) {
            setCategories(active);
          }
        }
      })
      .catch((err) => {
        console.warn("Failed to load categories from API, using defaults:", err.message);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <CategoriesGrid>
      {categories.map((cat) => {
        const catName = cat.name || cat.label;
        const isSelected =
          selectedCategory === catName ||
          (selectedCategory === "Prepared Meals" && (catName === "Prepared Meals" || cat.slug === "prepared-meals"));

        return (
          <CategoryCard
            key={cat._id || cat.id || catName}
            type="button"
            $selected={isSelected}
            onClick={() => onSelect(catName)}
          >
            <div className="cat-icon-wrap">{getCategoryIcon(catName, cat.icon)}</div>
            <span className="cat-name">{catName}</span>
          </CategoryCard>
        );
      })}
    </CategoriesGrid>
  );
}

