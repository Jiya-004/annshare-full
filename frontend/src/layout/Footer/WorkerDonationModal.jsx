import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import {
  IoClose,
  IoHeart,
  IoCheckmarkCircle,
  IoCopyOutline,
  IoCheckmark,
  IoQrCodeOutline,
  IoShieldCheckmarkOutline,
} from "react-icons/io5";

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`;

const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.08); }
  100% { transform: scale(1); }
`;

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(18, 54, 43, 0.65);
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 99999;
  padding: 16px;
  animation: ${fadeIn} 0.22s ease-out forwards;
  box-sizing: border-box;
`;

const ModalCard = styled.div`
  background: #FFFFFF;
  border: 1px solid rgba(23, 74, 58, 0.1);
  border-radius: 24px;
  width: 100%;
  max-width: 520px;
  max-height: 90vh;
  overflow-y: auto;
  box-shadow: 0 24px 60px rgba(18, 54, 43, 0.25);
  animation: ${slideUp} 0.26s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  position: relative;
  display: flex;
  flex-direction: column;

  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-thumb {
    background: rgba(23, 74, 58, 0.15);
    border-radius: 999px;
  }
`;

const ModalHeader = styled.div`
  padding: 24px 28px 16px;
  border-bottom: 1px solid rgba(23, 74, 58, 0.08);
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
`;

const HeaderInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

const Badge = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-size: 0.74rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: #C53030;
  background: #FFF5F5;
  border: 1px solid rgba(229, 62, 62, 0.2);
  padding: 3px 10px;
  border-radius: 999px;
  width: fit-content;
`;

const ModalTitle = styled.h3`
  font-family: var(--font-display, "Poppins", sans-serif);
  font-size: 1.3rem;
  font-weight: 700;
  color: #174A3A;
  margin: 6px 0 0;
`;

const CloseButton = styled.button`
  background: #F8F5ED;
  border: 1px solid rgba(23, 74, 58, 0.1);
  color: #174A3A;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  cursor: pointer;
  transition: all 0.2s ease;
  flex-shrink: 0;

  &:hover {
    background: #174A3A;
    color: #FFFFFF;
    transform: rotate(90deg);
  }
`;

const ModalBody = styled.div`
  padding: 20px 28px 28px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const AmountBanner = styled.div`
  background: #F8F5ED;
  border: 1px solid rgba(23, 74, 58, 0.12);
  border-radius: 16px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .label {
    font-size: 0.85rem;
    color: #66756F;
    font-weight: 500;
  }

  .amount-val {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.6rem;
    font-weight: 700;
    color: #174A3A;
  }
`;

const SectionLabel = styled.label`
  font-size: 0.86rem;
  font-weight: 700;
  color: #174A3A;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;

  span.sub {
    font-weight: 500;
    font-size: 0.78rem;
    color: #66756F;
  }
`;

const PaymentMethodsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;

  @media (max-width: 440px) {
    grid-template-columns: 1fr;
  }
`;

const PaymentMethodCard = styled.button`
  background: ${({ $active }) => ($active ? "#FFFFFF" : "#FAFAFA")};
  border: 2px solid ${({ $active, $color }) => ($active ? $color : "rgba(23, 74, 58, 0.12)")};
  border-radius: 14px;
  padding: 12px 14px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  text-align: left;
  transition: all 0.2s ease;
  position: relative;
  box-shadow: ${({ $active }) => ($active ? "0 4px 14px rgba(23, 74, 58, 0.08)" : "none")};

  &:hover {
    border-color: ${({ $color }) => $color};
    transform: translateY(-1px);
  }

  .icon-box {
    width: 38px;
    height: 38px;
    border-radius: 10px;
    background: ${({ $bg }) => $bg};
    color: ${({ $color }) => $color};
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 800;
    font-size: 0.95rem;
    flex-shrink: 0;
  }

  .meta {
    display: flex;
    flex-direction: column;

    .name {
      font-size: 0.9rem;
      font-weight: 700;
      color: #174A3A;
    }
    .tagline {
      font-size: 0.74rem;
      color: #718096;
    }
  }

  .radio-check {
    position: absolute;
    top: 10px;
    right: 10px;
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 2px solid ${({ $active, $color }) => ($active ? $color : "#CBD5E0")};
    background: ${({ $active, $color }) => ($active ? $color : "transparent")};
  }
`;

const DetailsBox = styled.div`
  background: #F8F5ED;
  border: 1px dashed rgba(23, 74, 58, 0.2);
  border-radius: 14px;
  padding: 14px 16px;
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.85rem;

  .row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;

    .key {
      color: #66756F;
      font-weight: 500;
    }

    .val-group {
      display: flex;
      align-items: center;
      gap: 6px;
      font-weight: 700;
      color: #174A3A;

      button {
        background: none;
        border: none;
        color: #2E7D5B;
        cursor: pointer;
        padding: 2px;
        display: flex;
        align-items: center;
        font-size: 1rem;
        transition: transform 0.15s ease;

        &:hover {
          transform: scale(1.15);
        }
      }
    }
  }
`;

const QrPreviewCard = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 12px;
  background: #FFFFFF;
  border-radius: 12px;
  border: 1px solid rgba(23, 74, 58, 0.1);
  text-align: center;
  gap: 8px;

  .qr-box {
    width: 120px;
    height: 120px;
    background: #174A3A;
    color: #FFFFFF;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 4px;
    padding: 10px;

    svg {
      font-size: 3.5rem;
    }

    span {
      font-size: 0.68rem;
      letter-spacing: 0.05em;
      text-transform: uppercase;
      font-weight: 700;
    }
  }

  .qr-caption {
    font-size: 0.78rem;
    color: #66756F;
    font-weight: 500;
  }
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;

  input {
    padding: 10px 14px;
    border-radius: 10px;
    background-color: #F8F5ED;
    border: 1px solid rgba(23, 74, 58, 0.14);
    font-family: inherit;
    font-size: 0.88rem;
    color: #174A3A;
    outline: none;
    transition: all 0.2s ease;

    &:focus {
      background-color: #FFFFFF;
      border-color: #2E7D5B;
      box-shadow: 0 0 0 3px rgba(46, 125, 91, 0.12);
    }
  }
`;

const PayButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 14px 20px;
  border-radius: 999px;
  background-color: #174A3A;
  color: #FFFFFF;
  border: none;
  font-family: inherit;
  font-size: 0.96rem;
  font-weight: 700;
  cursor: pointer;
  box-shadow: 0 4px 14px rgba(23, 74, 58, 0.2);
  transition: all 0.22s ease;
  margin-top: 6px;

  &:hover:not(:disabled) {
    background-color: #2E7D5B;
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(46, 125, 91, 0.28);
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const TrustFooter = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  font-size: 0.76rem;
  color: #66756F;
  margin-top: -6px;

  svg {
    color: #2E7D5B;
    font-size: 0.95rem;
  }
`;

const SuccessView = styled.div`
  padding: 36px 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  gap: 16px;

  .heart-badge {
    width: 68px;
    height: 68px;
    border-radius: 50%;
    background: #E8F5E9;
    color: #2E7D5B;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 2.4rem;
    animation: ${pulse} 1.6s infinite ease-in-out;
  }

  h3 {
    font-family: var(--font-display, "Poppins", sans-serif);
    font-size: 1.45rem;
    font-weight: 700;
    color: #174A3A;
    margin: 0;
  }

  p {
    font-size: 0.92rem;
    color: #556B64;
    line-height: 1.55;
    margin: 0;
    max-width: 400px;
  }

  .receipt-box {
    background: #F8F5ED;
    border: 1px solid rgba(23, 74, 58, 0.1);
    border-radius: 12px;
    padding: 12px 18px;
    width: 100%;
    max-width: 380px;
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 0.84rem;

    .receipt-row {
      display: flex;
      justify-content: space-between;
      color: #66756F;

      strong {
        color: #174A3A;
      }
    }
  }
`;

export default function WorkerDonationModal({
  isOpen,
  onClose,
  initialAmount = "500",
  onSuccess,
}) {
  const [amount] = useState(initialAmount);
  const [selectedMethod, setSelectedMethod] = useState("esewa");
  const [donorName, setDonorName] = useState("");
  const [donorPhone, setDonorPhone] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [txnId, setTxnId] = useState("");

  if (!isOpen) return null;

  const paymentMethods = [
    {
      id: "esewa",
      name: "eSewa",
      tagline: "Mobile Wallet",
      color: "#60BB46",
      bg: "rgba(96, 187, 70, 0.12)",
      iconText: "eS",
      idLabel: "eSewa ID",
      idVal: "9801234567",
      acName: "ANNShare Worker Welfare",
    },
    {
      id: "khalti",
      name: "Khalti",
      tagline: "Digital Wallet",
      color: "#5C2D91",
      bg: "rgba(92, 45, 145, 0.12)",
      iconText: "Kh",
      idLabel: "Khalti ID",
      idVal: "9801234567",
      acName: "ANNShare Nepal",
    },
    {
      id: "fonepay",
      name: "Fonepay QR",
      tagline: "Scan Any Bank App",
      color: "#C8102E",
      bg: "rgba(200, 16, 46, 0.12)",
      iconText: "FP",
      idLabel: "Merchant Code",
      idVal: "ANN-WKR-01",
      acName: "ANNShare Nepal Fund",
    },
    {
      id: "bank",
      name: "Bank Transfer",
      tagline: "Nabil Bank A/C",
      color: "#0A3871",
      bg: "rgba(10, 56, 113, 0.12)",
      iconText: "NB",
      idLabel: "A/C Number",
      idVal: "01201017502468",
      acName: "ANNShare Welfare Trust",
    },
  ];

  const currentMethod = paymentMethods.find((m) => m.id === selectedMethod);

  const handleCopy = (text) => {
    navigator.clipboard?.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const isLocal = typeof window !== 'undefined' && (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1');
  const API_BASE_URL = import.meta.env.VITE_API_URL || (isLocal ? 'http://localhost:8000/api' : 'https://annshare-backend.onrender.com/api');

  const handleCompleteDonation = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    const generatedTxn = "TXN-ANN-" + Math.floor(100000 + Math.random() * 900000);
    setTxnId(generatedTxn);

    // 1. Post to backend API
    try {
      const response = await fetch(`${API_BASE_URL}/worker-donations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: Number(amount),
          paymentMethod: selectedMethod,
          donorName: donorName?.trim() || "Anonymous Donor",
          donorPhone: donorPhone?.trim() || "",
          transactionId: generatedTxn,
          fundType: "Worker Welfare Fund",
        }),
      });
      const resJson = await response.json();
      if (resJson?.data?.transactionId) {
        setTxnId(resJson.data.transactionId);
      }
    } catch (err) {
      console.warn("Backend unavailable, proceeding with local receipt:", err.message);
    }

    // 2. Synchronize to localStorage for instant Admin Dashboard visibility
    try {
      const existing = JSON.parse(localStorage.getItem('annshare_worker_donations') || '[]');
      existing.unshift({
        id: generatedTxn,
        transactionId: generatedTxn,
        donorName: donorName?.trim() || "Anonymous Donor",
        donorPhone: donorPhone?.trim() || "",
        amount: Number(amount),
        currency: "NPR",
        paymentMethod: selectedMethod,
        status: "Completed",
        fundType: "Worker Welfare Fund",
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: '2-digit',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
        }),
        createdAt: new Date().toISOString(),
      });
      localStorage.setItem('annshare_worker_donations', JSON.stringify(existing));
      window.dispatchEvent(new Event('annshare_storage_update'));
    } catch (e) {
      // ignore
    }

    setIsProcessing(false);
    setIsSuccess(true);
    if (onSuccess) {
      onSuccess(amount);
    }
  };

  return (
    <Overlay onClick={onClose}>
      <ModalCard onClick={(e) => e.stopPropagation()}>
        {!isSuccess ? (
          <>
            <ModalHeader>
              <HeaderInfo>
                <Badge>
                  <IoHeart /> Worker Welfare Fund
                </Badge>
                <ModalTitle>Support Our Frontline Workers</ModalTitle>
              </HeaderInfo>
              <CloseButton onClick={onClose} aria-label="Close modal">
                <IoClose />
              </CloseButton>
            </ModalHeader>

            <form onSubmit={handleCompleteDonation}>
              <ModalBody>
                <AmountBanner>
                  <div>
                    <div className="label">Donation Amount</div>
                    <div className="amount-val">Rs. {Number(amount).toLocaleString()}</div>
                  </div>
                  <div style={{ textAlign: "right", fontSize: "0.8rem", color: "#66756F" }}>
                    100% directly funds
                    <br />
                    <strong style={{ color: "#174A3A" }}>Fuel & Rescue Stipends</strong>
                  </div>
                </AmountBanner>

                <div>
                  <SectionLabel>
                    <span>Choose Payment Method</span>
                    <span className="sub">Secure via Nepal Gateway</span>
                  </SectionLabel>

                  <PaymentMethodsGrid>
                    {paymentMethods.map((m) => (
                      <PaymentMethodCard
                        key={m.id}
                        type="button"
                        $active={selectedMethod === m.id}
                        $color={m.color}
                        $bg={m.bg}
                        onClick={() => setSelectedMethod(m.id)}
                      >
                        <div className="icon-box">{m.iconText}</div>
                        <div className="meta">
                          <span className="name">{m.name}</span>
                          <span className="tagline">{m.tagline}</span>
                        </div>
                        <span className="radio-check" />
                      </PaymentMethodCard>
                    ))}
                  </PaymentMethodsGrid>
                </div>

                {selectedMethod === "fonepay" ? (
                  <QrPreviewCard>
                    <div className="qr-box">
                      <IoQrCodeOutline />
                      <span>Scan & Pay</span>
                    </div>
                    <div className="qr-caption">
                      Scan with eSewa, Khalti, or any Mobile Banking App
                    </div>
                  </QrPreviewCard>
                ) : (
                  <DetailsBox>
                    <div className="row">
                      <span className="key">{currentMethod.idLabel}:</span>
                      <div className="val-group">
                        <span>{currentMethod.idVal}</span>
                        <button
                          type="button"
                          onClick={() => handleCopy(currentMethod.idVal)}
                          title="Copy to clipboard"
                        >
                          {isCopied ? <IoCheckmark style={{ color: "#2E7D5B" }} /> : <IoCopyOutline />}
                        </button>
                      </div>
                    </div>
                    <div className="row">
                      <span className="key">Account Name:</span>
                      <div className="val-group">{currentMethod.acName}</div>
                    </div>
                  </DetailsBox>
                )}

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px" }}>
                  <FormField>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#174A3A" }}>
                      Your Name <span style={{ color: "#8C9E98" }}>(optional)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Ramesh Sharma"
                      value={donorName}
                      onChange={(e) => setDonorName(e.target.value)}
                    />
                  </FormField>

                  <FormField>
                    <label style={{ fontSize: "0.82rem", fontWeight: 600, color: "#174A3A" }}>
                      Mobile <span style={{ color: "#8C9E98" }}>(optional)</span>
                    </label>
                    <input
                      type="tel"
                      placeholder="98xxxxxxxx"
                      value={donorPhone}
                      onChange={(e) => setDonorPhone(e.target.value)}
                    />
                  </FormField>
                </div>

                <PayButton type="submit" disabled={isProcessing}>
                  {isProcessing ? (
                    "Processing Donation..."
                  ) : (
                    <>
                      <IoHeart style={{ color: "#FF7B7B" }} /> Donate Rs.{" "}
                      {Number(amount).toLocaleString()} via {currentMethod.name}
                    </>
                  )}
                </PayButton>

                <TrustFooter>
                  <IoShieldCheckmarkOutline /> 100% verified non-profit worker support initiative
                </TrustFooter>
              </ModalBody>
            </form>
          </>
        ) : (
          <SuccessView>
            <div className="heart-badge">
              <IoCheckmarkCircle />
            </div>
            <h3>Thank You for Your Generosity!</h3>
            <p>
              Your donation of <strong>Rs. {Number(amount).toLocaleString()}</strong> directly helps
              empower our frontline food rescue workers with daily transportation, meal delivery logistics,
              and safety equipment.
            </p>

            <div className="receipt-box">
              <div className="receipt-row">
                <span>Transaction Ref:</span>
                <strong>{txnId}</strong>
              </div>
              <div className="receipt-row">
                <span>Payment Method:</span>
                <strong>{currentMethod.name}</strong>
              </div>
              <div className="receipt-row">
                <span>Beneficiary:</span>
                <strong>ANNShare Worker Welfare Fund</strong>
              </div>
              {donorName && (
                <div className="receipt-row">
                  <span>Donor:</span>
                  <strong>{donorName}</strong>
                </div>
              )}
            </div>

            <PayButton type="button" onClick={onClose} style={{ width: "100%", maxWidth: "380px" }}>
              Done
            </PayButton>
          </SuccessView>
        )}
      </ModalCard>
    </Overlay>
  );
}
