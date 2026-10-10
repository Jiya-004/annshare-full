import React from "react";
import styled from "styled-components";

const LogoLink = styled.a`
  display: inline-flex;
  align-items: center;
  text-decoration: none;
  cursor: pointer;
  user-select: none;
  transition: transform 0.2s ease, opacity 0.2s ease;

  &:hover {
    opacity: 0.94;
    transform: translateY(-1px);
  }

  &:active {
    transform: translateY(0);
  }
`;

const LogoImage = styled.img`
  height: ${({ $size }) => ($size === "footer" ? "46px" : "42px")};
  width: auto;
  object-fit: contain;
  display: block;
  mix-blend-mode: multiply;
  transition: all 0.25s ease;

  @media (max-width: 860px) {
    height: 36px;
  }
`;

export const ANNShareLogo = ({ href = "/", size = "header", className }) => {
  return (
    <LogoLink href={href} aria-label="ANNShare Homepage" className={className}>
      <LogoImage
        src="/logo-old.png"
        alt="अन्नShare"
        $size={size}
        loading="eager"
      />
    </LogoLink>
  );
};

export default ANNShareLogo;
