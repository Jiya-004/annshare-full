import React from "react";
import {
  HubWrapper,
  Container,
  HeaderArea,
  DashboardLayout,
  MapVisualCard,
  LiveMetricsCard,
} from "./style";
import {
  IoPulseOutline,
  IoRestaurantOutline,
  IoPeopleOutline,
  IoBicycleOutline,
  IoCheckmarkCircle,
} from "react-icons/io5";

export default function LiveActivityHub() {
  return (
    <HubWrapper id="live-activity">
      <Container>
        <HeaderArea>
          <span className="badge">
            <IoPulseOutline style={{ marginRight: 6, verticalAlign: "middle" }} />
            Real-Time Telemetry
          </span>
          <h2>Live Surplus Redistribution Hub</h2>
          <p>
            Watch food move seamlessly across Kathmandu Valley in real-time — from kitchens with surplus to community dining halls.
          </p>
        </HeaderArea>

        <DashboardLayout>
          {/* Left: Kathmandu Valley Interactive Map Simulation */}
          <MapVisualCard>
            <div className="map-grid-bg" />
            
            <div className="map-content-overlay">
              <div className="map-header-pill">
                <span className="live-dot" />
                <span>Kathmandu Valley Network • 4 Active Routes</span>
              </div>

              {/* Pin 1: Donor */}
              <div className="pin-node donor-pin">
                <IoRestaurantOutline size={14} />
                <span>The Heritage Kitchen (Jhamsikhel)</span>
              </div>

              {/* Pin 2: NGO */}
              <div className="pin-node ngo-pin">
                <IoPeopleOutline size={14} />
                <span>Asha Child Shelter (Baluwatar)</span>
              </div>

              {/* Route Courier */}
              <div className="pin-node route-pin">
                <IoBicycleOutline size={16} />
                <span>Delivery: In Transit (12m left)</span>
              </div>

              {/* Connecting Curvature SVG */}
              <svg className="route-svg" viewBox="0 0 500 350" fill="none" preserveAspectRatio="none">
                <path
                  d="M 120 100 Q 250 180 370 240"
                  stroke="#2E7D5B"
                  strokeWidth="3"
                  strokeDasharray="6 6"
                  opacity="0.8"
                />
              </svg>

              {/* Bottom Legend */}
              <div className="map-legend">
                <span>
                  <span className="dot-legend c1" /> Donor Pickup
                </span>
                <span>
                  <span className="dot-legend c2" /> Courier In Transit
                </span>
                <span>
                  <span className="dot-legend c3" /> NGO Destination
                </span>
              </div>
            </div>
          </MapVisualCard>

          {/* Right: Live Metrics & Activity Timeline */}
          <LiveMetricsCard>
            <div className="card-top">
              <h3>Today's Redirections</h3>
              <span>Updated automatically every 60 seconds</span>
            </div>

            <div className="metrics-grid">
              <div className="metric-box">
                <div className="num">34</div>
                <div className="lbl">Donations Today</div>
              </div>
              <div className="metric-box">
                <div className="num">21</div>
                <div className="lbl">Matched to NGOs</div>
              </div>
              <div className="metric-box">
                <div className="num">780+</div>
                <div className="lbl">Meals Rescued</div>
              </div>
              <div className="metric-box">
                <div className="num">380 kg</div>
                <div className="lbl">CO₂ Emissions Saved</div>
              </div>
            </div>

            <div className="timeline-container">
              <div className="timeline-title">Recent Activity Log</div>

              <div className="step-node">
                <div className="node-bullet">
                  <IoCheckmarkCircle size={14} />
                </div>
                <div>
                  <strong>Bakery Atelier</strong> matched with <strong>Sneha Care Kitchen</strong> (14m ago)
                </div>
              </div>

              <div className="step-node">
                <div className="node-bullet">
                  <IoCheckmarkCircle size={14} />
                </div>
                <div>
                  <strong>Himalayan Java</strong> packed 28 bakery items for pickup (32m ago)
                </div>
              </div>

              <div className="step-node">
                <div className="node-bullet">
                  <IoCheckmarkCircle size={14} />
                </div>
                <div>
                  <strong>Koto Restaurant</strong> completed delivery of 35 warm bento meals (1h ago)
                </div>
              </div>
            </div>
          </LiveMetricsCard>
        </DashboardLayout>
      </Container>
    </HubWrapper>
  );
}
