import React from "react";
import styled from "styled-components";
import { IoClose, IoOptionsOutline } from "react-icons/io5";

const DrawerOverlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(23, 74, 58, 0.45);
  backdrop-filter: blur(6px);
  z-index: 2000;
  display: flex;
  justify-content: flex-end;
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;

const DrawerPanel = styled.div`
  background: #FFFFFF;
  width: 100%;
  max-width: 440px;
  height: 100%;
  box-shadow: -8px 0 32px rgba(23, 74, 58, 0.2);
  display: flex;
  flex-direction: column;
  animation: slideIn 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  @keyframes slideIn {
    from { transform: translateX(100%); }
    to { transform: translateX(0); }
  }
`;

const DrawerHeader = styled.div`
  padding: 22px 24px;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  align-items: center;
  justify-content: space-between;

  .header-title {
    display: flex;
    align-items: center;
    gap: 8px;

    svg {
      color: #2E7D5B;
      font-size: 1.25rem;
    }

    h3 {
      font-family: var(--font-display, 'Poppins', sans-serif);
      font-size: 1.15rem;
      font-weight: 600;
      color: #174A3A;
      margin: 0;
    }
  }

  .btn-close {
    width: 34px;
    height: 34px;
    border-radius: 50%;
    background: #F8F5ED;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #174A3A;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(23, 74, 58, 0.12);
    }
  }
`;

const DrawerBody = styled.div`
  padding: 24px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 28px;
`;

const FilterSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.95rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    span {
      font-size: 0.82rem;
      color: #2E7D5B;
      font-weight: 700;
    }
  }

  .range-slider {
    width: 100%;
    accent-color: #2E7D5B;
    cursor: pointer;
  }

  .slider-labels {
    display: flex;
    justify-content: space-between;
    font-size: 0.76rem;
    color: #8C9E98;
  }
`;

const CheckboxList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.88rem;
    color: #174A3A;
    cursor: pointer;
    user-select: none;

    input[type="checkbox"] {
      width: 18px;
      height: 18px;
      accent-color: #2E7D5B;
      cursor: pointer;
    }
  }
`;

const RadioGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;

  label {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 0.88rem;
    color: #174A3A;
    cursor: pointer;
    user-select: none;

    input[type="radio"] {
      width: 18px;
      height: 18px;
      accent-color: #2E7D5B;
      cursor: pointer;
    }
  }
`;

const DrawerFooter = styled.div`
  padding: 18px 24px;
  border-top: 1px solid rgba(23, 74, 58, 0.08);
  background: #F8F5ED;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 14px;

  .btn-clear {
    background: transparent;
    border: none;
    font-size: 0.88rem;
    font-weight: 600;
    color: #66756F;
    cursor: pointer;
    padding: 8px 12px;
    border-radius: 8px;

    &:hover {
      color: #174A3A;
      text-decoration: underline;
    }
  }

  .btn-apply {
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    border-radius: 999px;
    padding: 12px 24px;
    font-size: 0.9rem;
    font-weight: 600;
    cursor: pointer;
    box-shadow: 0 4px 14px rgba(23, 74, 58, 0.22);
    transition: all 0.2s ease;

    &:hover {
      background: #2E7D5B;
      transform: translateY(-1px);
    }
  }
`;

import api from "../../../services/api";

const DEFAULT_DRAWER_CATEGORIES = [
  "Prepared Meals",
  "Bakery & Bread",
  "Fruits & Veggies",
  "Packaged Food",
  "Rice & Grains",
  "Dairy & Pantry",
  "Other Items",
];

export default function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onClearFilters,
  resultCount,
}) {
  const [categories, setCategories] = React.useState(DEFAULT_DRAWER_CATEGORIES);

  React.useEffect(() => {
    let isMounted = true;
    api.categories
      .getAll()
      .then((data) => {
        if (isMounted && Array.isArray(data) && data.length > 0) {
          const names = data.filter((c) => c.status !== "Inactive").map((c) => c.name);
          if (names.length > 0) {
            setCategories(names);
          }
        }
      })
      .catch(() => {});

    return () => {
      isMounted = false;
    };
  }, []);

  if (!isOpen) return null;

  const handleCategoryToggle = (cat) => {
    const current = filters.categories || [];
    const next = current.includes(cat)
      ? current.filter((c) => c !== cat)
      : [...current, cat];
    onFilterChange("categories", next);
  };

  return (
    <DrawerOverlay onClick={onClose}>
      <DrawerPanel onClick={(e) => e.stopPropagation()}>
        <DrawerHeader>
          <div className="header-title">
            <IoOptionsOutline />
            <h3>Filter Surplus Listings</h3>
          </div>
          <button type="button" className="btn-close" onClick={onClose}>
            <IoClose size={20} />
          </button>
        </DrawerHeader>

        <DrawerBody>
          {/* Distance Slider */}
          <FilterSection>
            <h4>
              Distance Radius
              <span>Up to {filters.maxDistance || 15} km</span>
            </h4>
            <input
              type="range"
              min="1"
              max="20"
              value={filters.maxDistance || 15}
              className="range-slider"
              onChange={(e) =>
                onFilterChange("maxDistance", Number(e.target.value))
              }
            />
            <div className="slider-labels">
              <span>0 km</span>
              <span>10 km</span>
              <span>20 km</span>
            </div>
          </FilterSection>

          {/* Food Type */}
          <FilterSection>
            <h4>Food Category</h4>
            <CheckboxList>
              {categories.map((cat) => (
                <label key={cat}>
                  <input
                    type="checkbox"
                    checked={(filters.categories || []).includes(cat)}
                    onChange={() => handleCategoryToggle(cat)}
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </CheckboxList>
          </FilterSection>

          {/* Quantity minimum */}
          <FilterSection>
            <h4>
              Minimum Portion Count
              <span>{filters.minQuantity || 1}+ portions</span>
            </h4>
            <input
              type="range"
              min="1"
              max="100"
              step="1"
              value={filters.minQuantity || 1}
              className="range-slider"
              onChange={(e) =>
                onFilterChange("minQuantity", Number(e.target.value))
              }
            />
            <div className="slider-labels">
              <span>1 portion</span>
              <span>50 portions</span>
              <span>100 portions</span>
            </div>
          </FilterSection>

          {/* Pickup Window */}
          <FilterSection>
            <h4>Pickup Time</h4>
            <RadioGroup>
              {[
                { id: "all", label: "Any time" },
                { id: "today", label: "Today only" },
                { id: "tomorrow", label: "Tomorrow" },
              ].map((item) => (
                <label key={item.id}>
                  <input
                    type="radio"
                    name="pickup"
                    checked={(filters.pickupTime || "all") === item.id}
                    onChange={() => onFilterChange("pickupTime", item.id)}
                  />
                  <span>{item.label}</span>
                </label>
              ))}
            </RadioGroup>
          </FilterSection>
        </DrawerBody>

        <DrawerFooter>
          <button type="button" className="btn-clear" onClick={onClearFilters}>
            Clear all
          </button>
          <button type="button" className="btn-apply" onClick={onClose}>
            Show {resultCount} {resultCount === 1 ? "result" : "results"}
          </button>
        </DrawerFooter>
      </DrawerPanel>
    </DrawerOverlay>
  );
}
