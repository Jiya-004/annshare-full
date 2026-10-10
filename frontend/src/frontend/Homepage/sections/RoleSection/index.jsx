import React from "react";
import { IoArrowForward, IoSparkles } from "react-icons/io5";
import {
  RoleWrapper,
  Container,
  HeaderArea,
  PanelsGrid,
  ImagePanel,
} from "./style";

const RoleSection = ({ onOpenDonate, onOpenNeedFood }) => {
  return (
    <RoleWrapper id="who-is-it-for">
      <Container>
        {/* COMPACT SECTION HEADER */}
        <HeaderArea>
          <span className="eyebrow">
            <IoSparkles />
            <span>HOW CAN ANNSHARE HELP?</span>
          </span>
          <h2>Two Ways to Make an Impact</h2>
          <p>
            Whether you have surplus food to share or need food for your
            community, we're here to connect you.
          </p>
        </HeaderArea>

        {/* TWO LARGE IMAGE-LED PANELS */}
        <PanelsGrid>
          {/* LEFT PANEL — FOOD BUSINESSES */}
          <ImagePanel onClick={onOpenDonate}>
            <img
              src="/food.png"
              alt="Chef carefully packing fresh untouched surplus meals in a contemporary restaurant kitchen"
              className="panel-image"
              loading="lazy"
            />
            <div className="gradient-overlay" />

            <div className="panel-content">
              <span className="panel-label">FOR FOOD BUSINESSES</span>
              <h3 className="panel-title">Have Food to Share?</h3>
            
              <button
                type="button"
                className="panel-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenDonate?.();
                }}
              >
                <span>List Surplus Food</span>
                <IoArrowForward />
              </button>
            </div>
          </ImagePanel>

          {/* RIGHT PANEL — NGOs & COMMUNITY ORGANIZATIONS */}
          <ImagePanel onClick={onOpenNeedFood}>
            <img
              src="/foodeating.png"
              alt="Community members enjoying fresh nutritious food together in a warm dining environment"
              className="panel-image"
              loading="lazy"
            />
            <div className="gradient-overlay" />

            <div className="panel-content">
              <span className="panel-label">
                FOR NGOS & COMMUNITY ORGANIZATIONS
              </span>
              <h3 className="panel-title">Need Food?</h3>
            
              <button
                type="button"
                className="panel-cta"
                onClick={(e) => {
                  e.stopPropagation();
                  onOpenNeedFood?.();
                }}
              >
                <span>Find Available Food</span>
                <IoArrowForward />
              </button>
            </div>
          </ImagePanel>
        </PanelsGrid>
      </Container>
    </RoleWrapper>
  );
};

export default RoleSection;
