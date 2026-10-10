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
  box-shadow: 0 4px 20px rgba(23, 74, 58, 0.06), 0 1px 3px rgba(0, 0, 0, 0.02);
  border: 1.5px solid #D5E0DB;
  display: flex;
  align-items: center;
  padding: 6px 8px 6px 20px;
  max-width: 720px;
  margin: 0 auto;
  position: relative;
  transition: all 0.25s cubic-bezier(0.16, 1, 0.3, 1);

  &:hover {
    border-color: #2E7D5B;
    box-shadow: 0 8px 26px rgba(23, 74, 58, 0.09);
  }

  &:focus-within {
    border-color: #174A3A;
    box-shadow: 0 8px 30px rgba(23, 74, 58, 0.12), 0 0 0 3px rgba(46, 125, 91, 0.12);
  }

  @media (max-width: 640px) {
    border-radius: 16px;
    flex-direction: column;
    padding: 12px;
    gap: 10px;
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
    font-size: 1.2rem;
    flex-shrink: 0;
  }

  input {
    border: none;
    background: transparent;
    font-family: var(--font-sans, 'Inter', sans-serif);
    font-size: 0.94rem;
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
    font-size: 1.05rem;
    transition: color 0.15s ease;

    &:hover {
      color: #174A3A;
    }
  }

  @media (max-width: 640px) {
    width: 100%;
    padding: 8px 12px;
    border-radius: 10px;
    background: #F8F5ED;
  }
`;

const FieldDivider = styled.div`
  width: 1px;
  height: 28px;
  background: #E2EAE5;
  margin: 0 8px;

  @media (max-width: 640px) {
    display: none;
  }
`;

const SearchButton = styled.button`
  background: #174A3A;
  color: #FFFFFF;
  border: none;
  border-radius: 999px;
  padding: 12px 26px;
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
  flex-shrink: 0;

  svg {
    font-size: 1rem;
  }

  &:hover {
    background: #235E4B;
    transform: translateY(-1px);
    box-shadow: 0 6px 18px rgba(23, 74, 58, 0.28);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 640px) {
    width: 100%;
    justify-content: center;
    padding: 12px 16px;
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
          placeholder="What food are you looking for?"
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
          placeholder="Kathmandu, Nepal"
        />
      </SearchField>

      {/* 3. Search Action */}
      <SearchButton type="button" onClick={onSearch}>
        <IoSearchOutline />
        <span>Search</span>
      </SearchButton>
    </SearchBarCard>
  );
}
