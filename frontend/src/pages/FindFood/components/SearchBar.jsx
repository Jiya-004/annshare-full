import React from "react";
import styled from "styled-components";
import {
  IoLocationOutline,
  IoRestaurantOutline,
  IoTimeOutline,
  IoSearchOutline,
} from "react-icons/io5";

const SearchBarCard = styled.div`
  background: #F8F5ED;
  border-radius: 999px;
  box-shadow: 0 4px 16px rgba(23, 74, 58, 0.05);
  border: 1.5px solid rgba(23, 74, 58, 0.12);
  display: flex;
  align-items: center;
  padding: 7px 8px 7px 22px;
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover,
  &:focus-within {
    background: #FFFFFF;
    border-color: #2E7D5B;
    box-shadow: 0 10px 30px rgba(23, 74, 58, 0.1);
  }

  @media (max-width: 768px) {
    border-radius: 18px;
    flex-direction: column;
    padding: 10px;
    gap: 8px;
    background: #FFFFFF;
    width: 100%;
    box-sizing: border-box;
  }
`;

const SearchSegment = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 4px 16px;
  cursor: pointer;
  position: relative;
  box-sizing: border-box;

  @media (max-width: 768px) {
    width: 100%;
    padding: 7px 10px;
    border-radius: 10px;
    background: #F8F5ED;
  }

  .segment-label {
    font-size: 0.74rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: #174A3A;
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

    @media (max-width: 768px) {
      font-size: 0.82rem;
    }

    &::placeholder {
      color: #8C9E98;
      font-weight: 500;
    }
  }
`;

const SegmentDivider = styled.div`
  width: 1px;
  height: 36px;
  background: rgba(23, 74, 58, 0.12);

  @media (max-width: 768px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  padding: 14px 28px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.92rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  box-shadow: 0 4px 16px rgba(23, 74, 58, 0.25);
  transition: all 0.2s ease;
  white-space: nowrap;

  &:hover {
    background: #2E7D5B;
    transform: translateY(-1px);
    box-shadow: 0 8px 22px rgba(46, 125, 91, 0.32);
  }

  @media (max-width: 768px) {
    width: 100%;
    justify-content: center;
    padding: 10px 16px;
    font-size: 0.84rem;
    border-radius: 12px;
    gap: 6px;
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
