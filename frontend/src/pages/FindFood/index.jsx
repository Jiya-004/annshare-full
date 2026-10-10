import React, { useState, useMemo, useEffect } from "react";
import {
  FindFoodWrapper,
  Container,
  SearchHero,
  StickyFilterWrapper,
  MarketplaceLayout,
  ListingsColumn,
  ListingsHeader,
  TrustBanner,
  CardsGrid,
  MapColumnWrapper,
  MobileMapToggleBtn,
} from "./style";

import { getListings } from "../../data/listingsStore";
import SearchBar from "./components/SearchBar";
import FilterBar from "./components/FilterBar";
import FilterDrawer from "./components/FilterDrawer";
import FoodCard from "./components/FoodCard";
import MapPanel from "./components/MapPanel";
import EmptyState from "./components/EmptyState";
import SkeletonCard from "./components/SkeletonCard";

import {
  IoShieldCheckmark,
  IoCheckmarkCircle,
  IoMapOutline,
  IoListOutline,
  IoSparkles,
} from "react-icons/io5";

export default function FindFoodPage() {
  // Search inputs
  const [locationQuery, setLocationQuery] = useState("Kathmandu, Nepal");
  const [searchQuery, setSearchQuery] = useState("");
  const [timeQuery, setTimeQuery] = useState("all");

  // Filter Bar pill
  const [activeFilter, setActiveFilter] = useState("all");

  // Sort state
  const [sortBy, setSortBy] = useState("recommended");

  // Filter Drawer
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [drawerFilters, setDrawerFilters] = useState({
    maxDistance: 15,
    categories: [],
    minQuantity: 5,
    pickupTime: "all",
  });

  // Selection & hover states
  const [selectedItem, setSelectedItem] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Shared store state
  const [allListings, setAllListings] = useState(getListings);

  useEffect(() => {
    const handleUpdate = () => {
      setAllListings(getListings());
    };
    window.addEventListener("annshare_listings_updated", handleUpdate);
    window.addEventListener("storage", handleUpdate);
    return () => {
      window.removeEventListener("annshare_listings_updated", handleUpdate);
      window.removeEventListener("storage", handleUpdate);
    };
  }, []);

  // Mobile Map View Toggle
  const [showMobileMap, setShowMobileMap] = useState(false);

  // Trigger search loading simulation
  const triggerSearch = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 280);
  };

  const handlePillSelect = (pillId) => {
    setActiveFilter(pillId);
    triggerSearch();
  };

  const handleDrawerFilterChange = (field, value) => {
    setDrawerFilters((prev) => ({ ...prev, [field]: value }));
  };

  const handleClearFilters = () => {
    setActiveFilter("all");
    setSearchQuery("");
    setLocationQuery("Kathmandu, Nepal");
    setTimeQuery("all");
    setDrawerFilters({
      maxDistance: 20,
      categories: [],
      minQuantity: 5,
      pickupTime: "all",
    });
    triggerSearch();
  };

  // Filter & Sort Pipeline
  const filteredListings = useMemo(() => {
    return allListings
      .filter((item) => item.status === "available")
      .filter((item) => {
        // 1. Text search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = item.title?.toLowerCase().includes(q);
          const matchPartner = item.partner?.toLowerCase().includes(q);
          const matchCat = item.category?.toLowerCase().includes(q);
          if (!matchTitle && !matchPartner && !matchCat) return false;
        }

        // 2. Pill Filter
        if (activeFilter !== "all") {
          if (activeFilter === "today") {
            if (item.pickupDate !== "Today") return false;
          } else if (activeFilter === "near") {
            const distNum = parseFloat(item.distance) || 2.5;
            if (distNum > 5) return false;
          } else {
            if (item.category !== activeFilter) return false;
          }
        }

        // 3. Drawer category filter
        if (
          drawerFilters.categories.length > 0 &&
          !drawerFilters.categories.includes(item.category)
        ) {
          return false;
        }

        // 4. Drawer distance filter
        const itemDist = parseFloat(item.distance) || 2.5;
        if (itemDist > drawerFilters.maxDistance) return false;

        // 5. Drawer min quantity filter
        if (Number(item.quantity) < drawerFilters.minQuantity) return false;

        // 6. Time query
        if (timeQuery === "today" && item.pickupDate !== "Today") return false;
        if (timeQuery === "tomorrow" && item.pickupDate !== "Tomorrow")
          return false;
        if (timeQuery === "soon" && item.status !== "pickup_soon") return false;

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "nearest") {
          return (parseFloat(a.distance) || 2.5) - (parseFloat(b.distance) || 2.5);
        }
        if (sortBy === "most_food") {
          return Number(b.quantity) - Number(a.quantity);
        }
        if (sortBy === "soonest") {
          return a.status === "pickup_soon" ? -1 : 1;
        }
        return 0; // recommended default
      });
  }, [allListings, searchQuery, activeFilter, drawerFilters, timeQuery, sortBy]);

  // Count active drawer filters
  const activeDrawerCount =
    (drawerFilters.categories.length > 0 ? 1 : 0) +
    (drawerFilters.maxDistance < 20 ? 1 : 0) +
    (drawerFilters.minQuantity > 5 ? 1 : 0) +
    (drawerFilters.pickupTime !== "all" ? 1 : 0);

  return (
    <FindFoodWrapper>
      <Container>
        {/* DISCOVERY HERO */}
        <SearchHero>
          <div className="hero-center-header">
            <div className="hero-badge-group">
              <span className="live-badge">
                <span className="pulse-dot" />
                Live Surplus Marketplace · Kathmandu Valley
              </span>
            </div>

            <h1>Find Surplus Food Near You</h1>
            <p className="hero-subtitle">
              Browse available surplus meals, bakery items, and fresh groceries ready for free pickup.
            </p>
          </div>

          {/* INTEGRATED SEARCH BAR */}
          <div className="searchbar-wrapper">
            <SearchBar
              locationQuery={locationQuery}
              setLocationQuery={setLocationQuery}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              timeQuery={timeQuery}
              setTimeQuery={setTimeQuery}
              onSearch={triggerSearch}
            />
          </div>

          <div className="hero-trust-row">
            <span className="trust-item">
              <IoShieldCheckmark /> 100% Verified Donors
            </span>
            <span className="trust-dot">•</span>
            <span className="trust-item">
              <IoSparkles /> Free Community Pickup
            </span>
            <span className="trust-dot">•</span>
            <span className="trust-item">
              Real-time Freshness Window
            </span>
          </div>
        </SearchHero>

        {/* HORIZONTAL FILTER PILLS (STICKY) */}
        <StickyFilterWrapper>
          <FilterBar
            activeFilter={activeFilter}
            onSelectFilter={handlePillSelect}
            onOpenDrawer={() => setIsDrawerOpen(true)}
            activeFilterCount={activeDrawerCount}
          />
        </StickyFilterWrapper>

        {/* MAIN MARKETPLACE LAYOUT: 65% LISTINGS / 35% MAP */}
        <MarketplaceLayout>
          {/* LEFT: LISTINGS COLUMN */}
          <ListingsColumn>
            <ListingsHeader>
              <div className="heading-group">
                <h2>Available Food Near Kathmandu</h2>
                <span className="count-badge">
                  {filteredListings.length}{" "}
                  {filteredListings.length === 1 ? "donation" : "donations"} available
                </span>
              </div>

              <div className="sort-group">
                <span>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                >
                  <option value="recommended">Recommended</option>
                  <option value="nearest">Nearest First</option>
                  <option value="soonest">Pickup Soon</option>
                  <option value="most_food">Most Food</option>
                </select>
              </div>
            </ListingsHeader>

            {/* TRUST BANNER */}
            <TrustBanner>
              <div className="trust-title">
                <IoShieldCheckmark />
                <span>Every listing is from a verified ANNShare partner.</span>
              </div>
              <div className="trust-pills">
                <span>
                  <IoCheckmarkCircle /> Partner verification
                </span>
                <span>
                  <IoCheckmarkCircle /> Food safety standard
                </span>
                <span>
                  <IoCheckmarkCircle /> Coordinated pickup
                </span>
              </div>
            </TrustBanner>

            {/* CARDS GRID / SKELETON / EMPTY STATE */}
            {isLoading ? (
              <CardsGrid>
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
                <SkeletonCard />
              </CardsGrid>
            ) : filteredListings.length === 0 ? (
              <EmptyState
                onClearFilters={handleClearFilters}
                onExploreNearby={handleClearFilters}
              />
            ) : (
              <CardsGrid>
                {filteredListings.map((item) => (
                  <FoodCard
                    key={item.id}
                    item={item}
                    isSelected={
                      selectedItem?.id === item.id || hoveredItem?.id === item.id
                    }
                    onSelect={(i) => setSelectedItem(i)}
                    onHover={(i) => setHoveredItem(i)}
                    onLeave={() => setHoveredItem(null)}
                  />
                ))}
              </CardsGrid>
            )}
          </ListingsColumn>

          
        </MarketplaceLayout>

        {/* MOBILE FLOATING TOGGLE: MAP VIEW <-> LIST VIEW */}
        <MobileMapToggleBtn
          type="button"
          onClick={() => setShowMobileMap(!showMobileMap)}
        >
          {showMobileMap ? <IoListOutline size={18} /> : <IoMapOutline size={18} />}
          <span>{showMobileMap ? "Show List View" : "Map View"}</span>
        </MobileMapToggleBtn>

        {/* FILTER SLIDE DRAWER */}
        <FilterDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          filters={drawerFilters}
          onFilterChange={handleDrawerFilterChange}
          onClearFilters={handleClearFilters}
          resultCount={filteredListings.length}
        />
      </Container>
    </FindFoodWrapper>
  );
}
