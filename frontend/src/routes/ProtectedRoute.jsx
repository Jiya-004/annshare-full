import React, { useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";
import { FaHandshake } from "react-icons/fa6";
import { IoHeart } from "react-icons/io5";

export const ProtectedRoute = ({ role: requiredRole, children }) => {
  const { isAuthenticated, role, requireAuth, switchRole } = useAuth();
  const location = useLocation();
  const hasTriggered = useRef(false);

  useEffect(() => {
    if (!isAuthenticated && !hasTriggered.current) {
      hasTriggered.current = true;
      requireAuth({
        role: requiredRole,
        intent: requiredRole === "donor" ? "donate_food" : "view_order_request",
      });
    }
  }, [isAuthenticated, requiredRole]);

  if (!isAuthenticated) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <h3 style={{ color: "#174A3A", marginBottom: "8px" }}>
          Authentication Required
        </h3>
        <p style={{ color: "#556B64", marginBottom: "20px" }}>
          Please sign in as a {requiredRole === "ngo" ? "Verified NGO" : "Food Donor"} to access this area.
        </p>
        <button
          type="button"
          onClick={() =>
            requireAuth({
              role: requiredRole,
              intent: requiredRole === "donor" ? "donate_food" : "view_order_request",
            })
          }
          style={{
            background: "#174A3A",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Open Sign In
        </button>
      </div>
    );
  }

  // If wrong role
  if (role !== requiredRole) {
    return (
      <div
        style={{
          minHeight: "60vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "40px 20px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontSize: "2.4rem",
            marginBottom: "12px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: requiredRole === "ngo" ? "#2E7D5B" : "#E11D48",
          }}
        >
          {requiredRole === "ngo" ? <FaHandshake /> : <IoHeart />}
        </div>
        <h3 style={{ color: "#174A3A", marginBottom: "8px" }}>
          {requiredRole === "ngo" ? "NGO Account Required" : "Donor Account Required"}
        </h3>
        <p style={{ color: "#556B64", maxWidth: "420px", marginBottom: "20px" }}>
          You are currently signed in as a{" "}
          <strong>{role === "donor" ? "Food Donor" : "NGO"}</strong>. This dashboard is exclusive to verified{" "}
          {requiredRole === "ngo" ? "NGO Partners" : "Food Donors"}.
        </p>
        <button
          type="button"
          onClick={() => switchRole(requiredRole)}
          style={{
            background: "#174A3A",
            color: "#FFFFFF",
            padding: "12px 24px",
            borderRadius: "12px",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
          }}
        >
          Switch to {requiredRole.toUpperCase()}
        </button>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
