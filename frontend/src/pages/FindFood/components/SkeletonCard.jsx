import React from "react";
import styled, { keyframes } from "styled-components";

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`;

const SkeletonWrapper = styled.div`
  background: #FFFFFF;
  border-radius: 18px;
  padding: 10px;
  border: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 10px rgba(23, 74, 58, 0.04);

  .shimmer-block {
    background: linear-gradient(
      90deg,
      #F0EFEA 25%,
      #F8F7F3 50%,
      #F0EFEA 75%
    );
    background-size: 200% 100%;
    animation: ${shimmer} 1.6s infinite ease-in-out;
  }

  .sk-image {
    width: 100%;
    aspect-ratio: 16 / 10;
    max-height: 220px;
    border-radius: 14px;
  }

  .sk-body {
    padding: 10px 4px 4px;
    display: flex;
    flex-direction: column;
    gap: 8px;

    .sk-row-1 {
      display: flex;
      justify-content: space-between;
      gap: 12px;

      .sk-title {
        height: 18px;
        width: 65%;
        border-radius: 4px;
      }
      .sk-rating {
        height: 18px;
        width: 18%;
        border-radius: 4px;
      }
    }

    .sk-donor {
      height: 14px;
      width: 50%;
      border-radius: 4px;
    }

    .sk-meta {
      height: 14px;
      width: 65%;
      border-radius: 4px;
    }

    .sk-divider {
      height: 1px;
      background: rgba(23, 74, 58, 0.06);
      margin-top: 4px;
    }

    .sk-row-bottom {
      display: flex;
      justify-content: space-between;
      align-items: center;

      .sk-portions {
        height: 16px;
        width: 40%;
        border-radius: 4px;
      }
      .sk-badge {
        height: 20px;
        width: 25%;
        border-radius: 6px;
      }
    }
  }
`;

export default function SkeletonCard() {
  return (
    <SkeletonWrapper>
      <div className="shimmer-block sk-image" />
      <div className="sk-body">
        <div className="sk-row-1">
          <div className="shimmer-block sk-title" />
          <div className="shimmer-block sk-rating" />
        </div>
        <div className="shimmer-block sk-donor" />
        <div className="shimmer-block sk-meta" />
        <div className="sk-divider" />
        <div className="sk-row-bottom">
          <div className="shimmer-block sk-portions" />
          <div className="shimmer-block sk-badge" />
        </div>
      </div>
    </SkeletonWrapper>
  );
}
