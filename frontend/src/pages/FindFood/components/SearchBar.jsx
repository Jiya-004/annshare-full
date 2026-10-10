import React from "react";
import styled from "styled-components";
import {
  IoSearchOutline,
  IoLocationOutline,
  IoCloseCircle,
} from "react-icons/io5";

const SearchBarCard = styled.div`
  background: #FFFFFF;
  border-radius: 999px;
  box-shadow: 0 2px 14px rgba(23, 74, 58, 0.05);
  border: 1px solid #DCE4E0;
  display: flex;
  align-items: center;
  padding: 5px 6px 5px 18px;
  max-width: 680px;
  margin: 0 auto;
  position: relative;
  transition: all 0.2s ease;

  &:hover {
    border-color: #2E7D5B;
    box-shadow: 0 4px 18px rgba(23, 74, 58, 0.08);
  }

  &:focus-within {
    border-color: #174A3A;
    box-shadow: 0 6px 22px rgba(23, 74, 58, 0.1), 0 0 0 3px rgba(46, 125, 91, 0.1);
  }

  @media (max-width: 640px) {
    border-radius: 14px;
    flex-direction: column;
    padding: 10px;
    gap: 8px;
    width: 100%;
    box-sizing: border-box;
  }
`;

const SearchField = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: relative;
  box-sizing: border-box;

  &.main-search {
    flex: 1.4;
  }

  &.location-search {
    flex: 1;
  }

  .field-icon {
    color: #2E7D5B;
    font-size: 1.15rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.92rem;
    color: #174A3A;
    font-weight: 500;
    outline: none;
    padding: 8px 0;
    width: 100%;

    &::placeholder {
      color: #8C9E98;
      font-weight: 400;
    }
  }

  .clear-btn {
    background: transparent;
    border: none;
    color: #A0AFA9;
    cursor: pointer;
    padding: 2px 6px;
    display: flex;
    align-items: center;
    font-size: 1rem;
    transition: color 0.15s ease;

    &:hover {
      color: #174A3A;
    }
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 6px 10px;
    border-radius: 10px;
    background: #F8F5ED;
  }
`;

const FieldDivider = styled.div`
  width: 1px;
  height: 26px;
  background: #E5EBE7;
  margin: 0 6px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  padding: 11px 22px;
  font-family: var(--font-sans, 'Inter', sans-serif);
  font-size: 0.9rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
  flex-shrink: 0;

  &:hover {
    background: #235E4B;
    transform: translateY(-1px);
    box-shadow: 0 4px 12px rgba(23, 74, 58, 0.25);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    padding: 11px 16px;
    border-radius: 10px;
    margin-top: 2px;
  }
`;

export default function SearchBar({
  locationQuery,
  setLocationQuery,
  searchQuery,
  setSearchQuery,
  onSearch,
}) {
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <SearchBarCard>
      {/* 1. Main Search Query */}
      <SearchField className="main-search">
        <IoSearchOutline className="field-icon" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search food, bakery, or meal..."
        />
        {searchQuery && (
          <button
            type="button"
            className="clear-btn"
            onClick={() => setSearchQuery("")}
            title="Clear search"
          >
            <IoCloseCircle />
          </button>
        )}
      </SearchField>

      <FieldDivider />

      {/* 2. Location */}
      <SearchField className="location-search">
        <IoLocationOutline className="field-icon" />
        <input
          type="text"
          value={locationQuery}
          onChange={(e) => setLocationQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Location"
        />
      </SearchField>

      {/* 3. Search Action */}
      <SearchButton type="button" onClick={onSearch}>
        Search
      </SearchButton>
    </SearchBarCard>
  );
}
