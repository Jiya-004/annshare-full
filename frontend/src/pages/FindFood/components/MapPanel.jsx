import React, { useState } from "react";
import styled, { keyframes, css } from "styled-components";
import {
  IoAdd,
  IoRemove,
  IoLocateOutline,
  IoRestaurantOutline,
  IoArrowForward,
  IoClose,
} from "react-icons/io5";
import { useNavigate } from "react-router-dom";

const pulseMarker = keyframes`
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.12); }
`;

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  background-color: #EBF0EC;
  background-image:
    radial-gradient(#C8DDD0 1.5px, transparent 1.5px),
    linear-gradient(to right, rgba(23, 74, 58, 0.05) 1px, transparent 1px),
    linear-gradient(to bottom, rgba(23, 74, 58, 0.05) 1px, transparent 1px);
  background-size: 20px 20px, 60px 60px, 60px 60px;
  overflow: hidden;

  /* Simulated Kathmandu Valley Geography Curvatures */
  .river-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }

  .ring-road-svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1;
  }
`;

const MapTopPill = styled.div`
  position: absolute;
  top: 16px;
  left: 16px;
  z-index: 10;
  background: rgba(255, 255, 255, 0.94);
  backdrop-filter: blur(8px);
  border-radius: 999px;
  padding: 6px 14px;
  font-size: 0.78rem;
  font-weight: 700;
  color: #174A3A;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  align-items: center;
  gap: 6px;
  border: 1px solid rgba(23, 74, 58, 0.1);

  .live-dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #2E7D5B;
  }
`;

const MapControls = styled.div`
  position: absolute;
  bottom: 20px;
  right: 20px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;

  button {
    width: 36px;
    height: 36px;
    border-radius: 10px;
    background: #FFFFFF;
    border: 1px solid rgba(23, 74, 58, 0.12);
    color: #174A3A;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.1rem;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    transition: all 0.2s ease;

    &:hover {
      background: #F8F5ED;
      color: #2E7D5B;
    }
  }
`;

const LandmarkLabel = styled.div`
  position: absolute;
  top: ${({ $y }) => $y}%;
  left: ${({ $x }) => $x}%;
  transform: translate(-50%, -50%);
  font-size: 0.72rem;
  font-weight: 700;
  color: #8C9E98;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  pointer-events: none;
  z-index: 2;
  user-select: none;
`;

const MapMarkerBtn = styled.button`
  position: absolute;
  top: ${({ $y }) => $y}%;
  left: ${({ $x }) => $x}%;
  transform: translate(-50%, -50%);
  z-index: ${({ $isSelected }) => ($isSelected ? 20 : 5)};
  background: ${({ $isSelected }) => ($isSelected ? "#174A3A" : "#FFFFFF")};
  color: ${({ $isSelected }) => ($isSelected ? "#FFFFFF" : "#174A3A")};
  border: 2px solid
    ${({ $isSelected }) => ($isSelected ? "#D7A83E" : "#2E7D5B")};
  border-radius: 999px;
  padding: 5px 11px;
  font-family: var(--font-display, 'Poppins', sans-serif);
  font-size: 0.8rem;
  font-weight: 700;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.22);
  transition: all 0.22s cubic-bezier(0.16, 1, 0.3, 1);
  white-space: nowrap;

  ${({ $isSelected }) =>
    $isSelected &&
    css`
      animation: ${pulseMarker} 1.8s infinite ease-in-out;
      transform: translate(-50%, -50%) scale(1.15);
    `}

  &:hover {
    transform: translate(-50%, -50%) scale(1.18);
    background: #174A3A;
    color: #FFFFFF;
    border-color: #D7A83E;
    z-index: 25;
  }
`;

const MiniPopupCard = styled.div`
  position: absolute;
  top: ${({ $y }) => Math.max(10, $y - 20)}%;
  left: ${({ $x }) => Math.min(80, Math.max(20, $x))}%;
  transform: translate(-50%, -100%);
  z-index: 30;
  background: #FFFFFF;
  border-radius: 16px;
  padding: 12px;
  width: 220px;
  box-shadow: 0 12px 30px rgba(23, 74, 58, 0.2);
  border: 1px solid rgba(23, 74, 58, 0.12);
  animation: fadeIn 0.2s ease-out;

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translate(-50%, -90%);
    }
    to {
      opacity: 1;
      transform: translate(-50%, -100%);
    }
  }

  .btn-close-popup {
    position: absolute;
    top: 6px;
    right: 6px;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #F8F5ED;
    border: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8rem;
    color: #174A3A;
    cursor: pointer;
  }

  .popup-thumb {
    width: 100%;
    height: 90px;
    border-radius: 10px;
    object-fit: cover;
    margin-bottom: 8px;
    display: block;
  }

  h4 {
    font-family: var(--font-display, 'Poppins', sans-serif);
    font-size: 0.88rem;
    font-weight: 600;
    color: #174A3A;
    margin: 0 0 4px;
    line-height: 1.25;
  }

  .popup-meta {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.76rem;
    color: #66756F;
    margin-bottom: 8px;
  }

  .btn-popup-view {
    width: 100%;
    background: #174A3A;
    color: #FFFFFF;
    border: none;
    border-radius: 8px;
    padding: 6px 10px;
    font-size: 0.78rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;
    cursor: pointer;
    transition: background 0.2s ease;

    &:hover {
      background: #2E7D5B;
    }
  }
`;

const LANDMARKS = [
  { name: "Thamel", x: 42, y: 33 },
  { name: "Patan", x: 45, y: 76 },
  { name: "Baluwatar", x: 55, y: 18 },
  { name: "Baneshwor", x: 70, y: 56 },
];

export default function MapPanel({
  items,
  selectedItem,
  onSelectMarker,
}) {
  const [activePopup, setActivePopup] = useState(null);
  const navigate = useNavigate();

  const handleMarkerClick = (item) => {
    onSelectMarker(item);
    setActivePopup(item);
  };

  return (
    <MapContainer>
      <MapTopPill>
        <span className="live-dot" />
        <span>Kathmandu Valley Network</span>
      </MapTopPill>

      {/* Bagmati River Curvature SVG */}
      <svg className="river-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <path
          d="M 10 20 Q 30 45 48 50 T 80 85"
          fill="none"
          stroke="#C2DFD0"
          strokeWidth="3.5"
          opacity="0.8"
        />
      </svg>

      {/* Ring Road Outline */}
      <svg className="ring-road-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
        <ellipse
          cx="50"
          cy="48"
          rx="38"
          ry="32"
          fill="none"
          stroke="rgba(23, 74, 58, 0.09)"
          strokeWidth="1.5"
          strokeDasharray="4 4"
        />
      </svg>

      {/* Landmarks */}
      {LANDMARKS.map((lm, idx) => (
        <LandmarkLabel key={idx} $x={lm.x} $y={lm.y}>
          {lm.name}
        </LandmarkLabel>
      ))}

      {/* Interactive Item Markers */}
      {items.map((item) => {
        const isSelected = selectedItem?.id === item.id;
        const coords = item.mapCoords || { x: 50, y: 50 };

        return (
          <MapMarkerBtn
            key={item.id}
            type="button"
            $x={coords.x}
            $y={coords.y}
            $isSelected={isSelected}
            onClick={() => handleMarkerClick(item)}
            title={`${item.title} - ${item.quantity} ${item.unit}`}
          >
            <IoRestaurantOutline size={12} />
            <span>
              {item.quantity}
              {item.unit === "kg" ? "kg" : ""}
            </span>
          </MapMarkerBtn>
        );
      })}

      {/* Active Marker Mini Popup Card */}
      {activePopup && (
        <MiniPopupCard
          $x={activePopup.mapCoords.x}
          $y={activePopup.mapCoords.y}
        >
          <button
            type="button"
            className="btn-close-popup"
            onClick={() => setActivePopup(null)}
          >
            <IoClose />
          </button>

          <img
            src={activePopup.image}
            alt={activePopup.title}
            className="popup-thumb"
          />

          <h4>{activePopup.title}</h4>

          <div className="popup-meta">
            <span>
              {activePopup.quantity} {activePopup.unit}
            </span>
            <span>{activePopup.distance}</span>
          </div>

          <button
            type="button"
            className="btn-popup-view"
            onClick={() => navigate(`/food/${activePopup.id}`)}
          >
            <span>View Food</span>
            <IoArrowForward />
          </button>
        </MiniPopupCard>
      )}

      {/* Map Control Buttons */}
      <MapControls>
        <button type="button" title="Zoom In">
          <IoAdd />
        </button>
        <button type="button" title="Zoom Out">
          <IoRemove />
        </button>
        <button
          type="button"
          title="Center on Kathmandu"
          onClick={() => setActivePopup(null)}
        >
          <IoLocateOutline />
        </button>
      </MapControls>
    </MapContainer>
  );
}
