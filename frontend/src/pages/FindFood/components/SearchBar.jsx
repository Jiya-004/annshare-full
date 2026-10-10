import React from "react";
import styled from "styled-components";
import {
  IoLocationOutline,
  IoRestaurantOutline,
  IoTimeOutline,
  IoSearchOutline,
} from "react-icons/io5";

const SearchBarCard = styled.div`
  background: #FFFFFF;
  border-radius: 999px;
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.06);
  border: 1.5px solid #DCE4E0;
  display: flex;
  align-items: center;
  padding: 6px 8px 6px 20px;
  max-width: 860px;
  margin: 0 auto;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #2E7D5B;
    box-shadow: 0 8px 24px rgba(23, 74, 58, 0.08);
  }

  &:focus-within {
    border-color: #174A3A;
    box-shadow: 0 8px 28px rgba(23, 74, 58, 0.1), 0 0 0 3px rgba(46, 125, 91, 0.12);
  }

  @media (max-width: 768px) {
    border-radius: 16px;
    flex-direction: column;
    padding: 12px;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const SearchSegment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 14px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  text-align: left;

  @media (max-width: 768px) {
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    background: #F8F5ED;
  }

  .segment-label {
    font-size: 0.72rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #2E7D5B;
    display: flex;
    align-items: center;
    gap: 5px;
    margin-bottom: 2px;

    @media (max-width: 768px) {
      font-size: 0.66rem;
      gap: 4px;
      margin-bottom: 1px;
    }

    svg {
      color: #2E7D5B;
      font-size: 0.95rem;

      @media (max-width: 768px) {
        font-size: 0.82rem;
      }
    }
  }

  input,
  select {
    border: none;
    background: transparent;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.92rem;
    color: #174A3A;
    font-weight: 600;
    outline: none;
    padding: 0;
    width: 100%;
    cursor: pointer;

    @media (max-width: 768px) {
      font-size: 0.84rem;
    }

    &::placeholder {
      color: #8C9E98;
      font-weight: 400;
    }

    &:focus {
      cursor: text;
    }
  }

  select {
    cursor: pointer;
  }
`;

const SegmentDivider = styled.div`
  width: 1px;
  height: 32px;
  background: #E5EBE7;

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  padding: 13px 26px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.92rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #235E4B;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(23, 74, 58, 0.28);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 12px 16px;
    font-size: 0.88rem;
    border-radius: 10px;
    gap: 6px;
    margin-top: 4px;
  }
`;

export default function SearchBar({
  locationQuery,
  setLocationQuery,
  searchQuery,
  setSearchQuery,
  timeQuery,
  setTimeQuery,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarCard>
      {/* 1. Location */}
      <SearchSegment>
        <span className="segment-label">
          <IoLocationOutline />
          Location
        </span>
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Kathmandu, Lalitpur, Bhaktapur"
        />
      </SearchSegment>

      <SegmentDivider />

      {/* 2. Food / Dish */}
      <SearchSegment>
        <span className="segment-label">
          <IoRestaurantOutline />
          Food
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="What are you looking for?"
        />
      </SearchSegment>

      <SegmentDivider />

      {/* 3. Availability */}
      <SearchSegment>
        <span className="segment-label">
          <IoTimeOutline />
          Availability
        </span>
        <select
          value={timeQuery}
          onChange={(e) => setTimeQuery(e.target.value)}
        >
          <option value="all">Any time</option>
          <option value="today">Available Today</option>
          <option value="tomorrow">Available Tomorrow</option>
          <option value="soon">Pickup Soon (&lt; 3 hours)</option>
        </select>
      </SearchSegment>

      {/* 4. Action Button */}
      <SearchButton type="button" onClick={onSearch}>
        <IoSearchOutline size={18} />
        <span>Search</span>
      </SearchButton>
    </SearchBarCard>
  );
}
