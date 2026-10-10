import React from "react";
import { useAuth } from "../../context/AuthContext";

/**
 * Reusable ProtectedAction wrapper component
 * Intercepts clicks and routes them through requireAuth
 */
export const ProtectedAction = ({
  role = "donor",
  intent = null,
  payload = null,
  onAction = null,
  children,
  ...rest
}) => {
  const { requireAuth } = useAuth();

  const handleProtectedTrigger = (e) => {
    if (e && typeof e.preventDefault === "function") {
      e.preventDefault();
    }
    if (e && typeof e.stopPropagation === "function") {
      e.stopPropagation();
    }

    requireAuth({
      role,
      intent,
      payload,
      onAuthorized: onAction,
    });
  };

  if (typeof children === "function") {
    return children({ handleClick: handleProtectedTrigger });
  }

  return (
    <div
      onClick={handleProtectedTrigger}
      style={{ display: "inline-block", cursor: "pointer", width: "100%" }}
      {...rest}
    >
      {children}
    </div>
  );
};

export default ProtectedAction;
