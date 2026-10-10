import React, { useState } from "react";
import {
  PartnersWrapper,
  Container,
  HeaderArea,
  FilterBar,
  PartnersGrid,
  PartnerCard,
} from "./style";
import {
  IoCheckmarkCircle,
  IoLocationOutline,
  IoShieldCheckmark,
} from "react-icons/io5";

const PARTNERS = [
  {
    id: 1,
    name: "Hotel Yak & Yeti",
    cat: "Hotels & Banquets",
    filter: "restaurants",
    initials: "YY",
    location: "Durbar Marg, Kathmandu",
    stat: "1,420 meals donated",
  },
  {
    id: 2,
    name: "Himalayan Java Coffee",
    cat: "Café & Bakery",
    filter: "cafes",
    initials: "HJ",
    location: "Thamel, Kathmandu",
    stat: "960 bakery items",
  },
  {
    id: 3,
    name: "Sneha Care Shelter",
    cat: "Community Care & NGO",
    filter: "shelters",
    initials: "SC",
    location: "Baluwatar, Kathmandu",
    stat: "2,840 meals received",
  },
  {
    id: 4,
    name: "The Bakery Café",
    cat: "Restaurants",
    filter: "restaurants",
    initials: "BC",
    location: "Pulchowk, Lalitpur",
    stat: "850 meals donated",
  },
  {
    id: 5,
    name: "Maiti Nepal Kitchen",
    cat: "Non-Profit Shelter",
    filter: "shelters",
    initials: "MN",
    location: "Tinkune, Kathmandu",
    stat: "3,100 meals received",
  },
  {
    id: 6,
    name: "Koto Japanese Cuisine",
    cat: "Restaurants",
    filter: "restaurants",
    initials: "KJ",
    location: "Durbar Marg, Kathmandu",
    stat: "620 meals donated",
  },
];

export default function VerifiedPartners() {
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredList =
    activeFilter === "all"
      ? PARTNERS
      : PARTNERS.filter((p) => p.filter === activeFilter);

  return (
    <PartnersWrapper id="partners">
      <Container>
        <HeaderArea>
          <span className="badge">Trusted Ecosystem</span>
          <h2>Verified Food & Community Partners</h2>
          <p>
            Every establishment and shelter is rigorously vetted for food safety standards and legitimate community distribution.
          </p>
        </HeaderArea>

        <FilterBar>
          <button
            className={`filter-btn ${activeFilter === "all" ? "active" : ""}`}
            onClick={() => setActiveFilter("all")}
          >
            All Partners (350+)
          </button>
          <button
            className={`filter-btn ${activeFilter === "restaurants" ? "active" : ""}`}
            onClick={() => setActiveFilter("restaurants")}
          >
            Restaurants & Hotels
          </button>
          <button
            className={`filter-btn ${activeFilter === "cafes" ? "active" : ""}`}
            onClick={() => setActiveFilter("cafes")}
          >
            Cafés & Bakeries
          </button>
          <button
            className={`filter-btn ${activeFilter === "shelters" ? "active" : ""}`}
            onClick={() => setActiveFilter("shelters")}
          >
            Community Shelters
          </button>
        </FilterBar>

        <PartnersGrid>
          {filteredList.map((partner) => (
            <PartnerCard key={partner.id}>
              <div>
                <div className="top-meta">
                  <div className="initials-box">{partner.initials}</div>
                  <div className="verified-badge">
                    <IoShieldCheckmark size={13} />
                    <span>ANNShare Verified</span>
                  </div>
                </div>

                <div className="main-info">
                  <h3>{partner.name}</h3>
                  <div className="category">
                    <IoLocationOutline size={14} />
                    <span>{partner.location}</span>
                  </div>
                </div>
              </div>

              <div className="bottom-stat">
                <span className="stat-lbl">Tracked Impact</span>
                <span className="stat-val">{partner.stat}</span>
              </div>
            </PartnerCard>
          ))}
        </PartnersGrid>
      </Container>
    </PartnersWrapper>
  );
}
