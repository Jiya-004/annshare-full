import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { IoHeartOutline, IoArrowBack, IoFastFoodOutline } from "react-icons/io5";
import { useWishlist } from "../../context/WishlistContext";
import { getListings } from "../../data/listingsStore";
import FoodCard from "../FindFood/components/FoodCard";

const PageWrapper = styled.div`
  min-height: 80vh;
  background: #FDFBF7;
  padding: 40px 24px 80px;

  @media (max-width: 768px) {
    padding: 24px 16px 60px;
  }
`;

const Container = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

const TopNav = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  background: none;
  border: none;
  color: #174A3A;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  margin-bottom: 24px;
  padding: 8px 14px;
  border-radius: 999px;
  background: rgba(23, 74, 58, 0.05);
  transition: all 0.2s ease;

  &:hover {
    background: rgba(23, 74, 58, 0.1);
    transform: translateX(-2px);
  }
`;

const HeaderSection = styled.div`
  margin-bottom: 32px;

  .header-tag {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: #E11D48;
    background: rgba(225, 29, 72, 0.08);
    padding: 4px 12px;
    border-radius: 999px;
    margin-bottom: 12px;
  }

  h1 {
    font-size: 2.2rem;
    font-weight: 800;
    color: #174A3A;
    margin: 0 0 8px;

    @media (max-width: 768px) {
      font-size: 1.75rem;
    }
  }

  p {
    color: #71827B;
    font-size: 1rem;
    margin: 0;
  }
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 24px;

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;

const EmptyState = styled.div`
  background: #FFFFFF;
  border-radius: 20px;
  border: 1px dashed rgba(23, 74, 58, 0.16);
  padding: 64px 24px;
  text-align: center;
  max-width: 540px;
  margin: 40px auto;

  .icon-box {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: rgba(225, 29, 72, 0.08);
    color: #E11D48;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2rem;
    margin: 0 auto 20px;
  }

  h3 {
    font-size: 1.3rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0 0 8px;
  }

  p {
    color: #71827B;
    font-size: 0.95rem;
    line-height: 1.5;
    margin: 0 0 24px;
  }

  button {
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    padding: 12px 28px;
    border-radius: 999px;
    font-size: 0.95rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      background: #2E7D5B;
      transform: translateY(-2px);
      box-shadow: 0 8px 20px rgba(23, 74, 58, 0.15);
    }
  }
`;

export default function WishlistPage() {
  const navigate = useNavigate();
  const { wishlist } = useWishlist();

  // Cross-reference with getListings() from listingsStore.js
  const allListings = getListings();
  const savedItems = allListings.filter((item) =>
    wishlist.some((savedId) => String(savedId) === String(item.id))
  );

  return (
    <PageWrapper>
      <Container>
        <TopNav type="button" onClick={() => navigate("/find-food")}>
          <IoArrowBack />
          <span>Back to Marketplace</span>
        </TopNav>

        <HeaderSection>
          <div className="header-tag">
            <IoHeartOutline />
            <span>Personal Bookmarks</span>
          </div>
          <h1>Your Saved Wishlist</h1>
          <p>
            {savedItems.length === 1
              ? "1 food rescue donation saved for quick access."
              : `${savedItems.length} food rescue donations saved for quick access.`}
          </p>
        </HeaderSection>

        {savedItems.length === 0 ? (
          <EmptyState>
            <div className="icon-box">
              <IoHeartOutline />
            </div>
            <h3>No items saved yet</h3>
            <p>
              Explore available meals and surplus packages across the valley. Click the heart icon on any donation card to bookmark it here.
            </p>
            <button type="button" onClick={() => navigate("/find-food")}>
              Explore Available Food
            </button>
          </EmptyState>
        ) : (
          <Grid>
            {savedItems.map((item) => (
              <FoodCard key={item.id} item={item} />
            ))}
          </Grid>
        )}
      </Container>
    </PageWrapper>
  );
}
