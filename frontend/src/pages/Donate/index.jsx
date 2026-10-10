import React, { useState, useEffect } from "react";
import {
  DonatePageWrapper,
  Container,
  IntroHero,
  TwoColumnLayout,
  FormCard,
  FormSectionGroup,
  FormGroup,
  TwoColInputs,
  QuantityInputRow,
  ConditionGrid,
  ConditionOption,
  LocationSearchBox,
  FormActionsBar,
  PreviewCardWrapper,
  SuccessStateWrapper,
} from "./style";

import ProgressSteps from "./components/ProgressSteps";
import FoodCategorySelector from "./components/FoodCategorySelector";
import ImageUploader from "./components/ImageUploader";
import SafetyNotice from "./components/SafetyNotice";
import DonationPreview from "./components/DonationPreview";
import ReviewSummary from "./components/ReviewSummary";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

import {
  IoSparkles,
  IoCheckmarkCircle,
  IoLocationOutline,
  IoArrowForward,
  IoArrowBack,
  IoCheckmark,
  IoCompassOutline,
  IoInformationCircleOutline,
  IoShieldCheckmark,
  IoLeafOutline,
  IoTimeOutline,
  IoHeart,
} from "react-icons/io5";

import { addListing, formatCurrentTime, normalizeCategory } from "../../data/listingsStore";
import { isValidPhone, formatPhoneNumber } from "../../utils/validation";

export default function DonatePage() {
  const navigate = useNavigate();
  const { user, requireAuth } = useAuth();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isPublished, setIsPublished] = useState(false);

  // Dynamic Current Time
  const getCurrentTimes = () => {
    const now = new Date();
    const from = formatCurrentTime(now);
    const to = formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000));
    return { from, to };
  };

  const initialTimes = getCurrentTimes();

  // Controlled Form State
  const [formData, setFormData] = useState({
    foodName: "Fresh Vegetable Rice Meals",
    category: "Prepared Meals",
    quantity: 48,
    unit: "portions",
    description:
      "Freshly prepared vegetable meals packed in hygienic meal containers, ready for immediate redistribution.",
    condition: "Freshly Prepared",
    images: [],
    businessName: user?.organization || user?.orgName || user?.name || "Utsha Cafe",
    location: user?.location || "Thamel, Kathmandu",
    pickupDate: "Today",
    pickupFromTime: initialTimes.from,
    pickupToTime: initialTimes.to,
    contactName: user?.name || "Utsha",
    contactPhone: user?.phone || "+977 980-1234567",
    instructions: "Please collect directly from the back kitchen service entrance.",
  });

  // Keep form synced with user if user updates
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        businessName: user.organization || user.orgName || user.name || prev.businessName,
        contactName: user.name || prev.contactName,
        contactPhone: user.phone || prev.contactPhone,
        location: user.location || prev.location,
      }));
    }
  }, [user]);

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const [formError, setFormError] = useState("");

  const handleNext = () => {
    setFormError("");
    if (currentStep === 1) {
      if (!formData.foodName.trim()) {
        setFormError("Please enter a food dish or title.");
        return;
      }
      if (!formData.quantity || Number(formData.quantity) <= 0) {
        setFormError("Please specify a valid quantity greater than 0.");
        return;
      }
    }
    if (currentStep === 2) {
      if (formData.contactPhone && !isValidPhone(formData.contactPhone)) {
        setFormError("Please enter a valid phone number (e.g. +977 980-1234567 or 9841234567).");
        return;
      }
    }
    setCurrentStep((prev) => Math.min(prev + 1, 3));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleBack = () => {
    setFormError("");
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handlePublish = () => {
    if (formData.contactPhone && !isValidPhone(formData.contactPhone)) {
      setFormError("Please enter a valid phone number.");
      return;
    }

    requireAuth({
      role: "donor",
      intent: "donate_food",
      onAuthorized: () => {
        setIsSubmitting(true);
        setTimeout(() => {
          const now = new Date();
          const currentFormattedTime = formatCurrentTime(now);
          const fallbackImg = `/food/food${Math.floor(Math.random() * 8) + 1}.jpg`;
          const formattedPhone = formData.contactPhone ? formatPhoneNumber(formData.contactPhone) : (user?.phone || "+977 980-1234567");
          const donorOrg = user?.organization || user?.orgName || formData.businessName || user?.name || "Utsha Cafe";
          const donorContact = user?.name || formData.contactName || "Utsha";
          const donorIdentifier = user?.id || user?._id || user?.email || "donor-user";

          const newListing = {
            title: formData.foodName,
            category: normalizeCategory(formData.category),
            quantity: Number(formData.quantity) || 1,
            unit: formData.unit || "portions",
            condition: formData.condition || "Freshly Prepared",
            partner: donorOrg,
            partnerType: user?.badge || "Verified Food Donor",
            verified: true,
            location: formData.location || user?.location || "Thamel, Kathmandu",
            area: formData.location ? formData.location.split(",")[0].trim() : "Kathmandu",
            distance: "1.2 km",
            pickupDate: formData.pickupDate || "Today",
            pickupTime: `${formData.pickupFromTime || currentFormattedTime} – ${formData.pickupToTime || formatCurrentTime(new Date(now.getTime() + 2.5 * 60 * 60 * 1000))}`,
            postedTime: currentFormattedTime,
            createdAt: now.toISOString(),
            image: formData.images?.[0] || fallbackImg,
            images: formData.images && formData.images.length > 0 ? formData.images : [fallbackImg],
            description: formData.description || "",
            safetyInfo: formData.condition ? `Condition: ${formData.condition}. Prepared at ${currentFormattedTime} under food hygiene standards.` : `Prepared at ${currentFormattedTime}.`,
            contactName: donorContact,
            contactPhone: formattedPhone,
            status: "Pending Approval",
            donorId: donorIdentifier,
            donorEmail: user?.email || "",
            isCustomDonation: true,
            instructions: formData.instructions || "",
          };

          addListing(newListing);
          setIsSubmitting(false);
          setIsPublished(true);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }, 800);
      },
    });
  };

  const handleReset = () => {
    setIsPublished(false);
    setCurrentStep(1);
    const freshTimes = getCurrentTimes();
    setFormData({
      foodName: "Fresh Vegetable Rice Meals",
      category: "Prepared Meals",
      quantity: 48,
      unit: "portions",
      description:
        "Freshly prepared vegetable meals packed in hygienic meal containers, ready for immediate redistribution.",
      condition: "Freshly Prepared",
      images: [],
      businessName: user?.organization || user?.name || "Green Leaf Café",
      location: user?.location || "Thamel, Kathmandu",
      pickupDate: "Today",
      pickupFromTime: freshTimes.from,
      pickupToTime: freshTimes.to,
      contactName: user?.name || "Ramesh Shrestha",
      contactPhone: "+977 980-1234567",
      instructions: "Please collect directly from the back kitchen service entrance.",
    });
  };

  const handleUseCurrentLocation = () => {
    updateField("location", "Jhamsikhel, Lalitpur (Current GPS)");
  };

  const conditions = [
    { id: "fresh", label: "Freshly Prepared" },
    { id: "packaged", label: "Packaged & Sealed" },
    { id: "near_best", label: "Near Best Before" },
    { id: "other", label: "Other Condition" },
  ];

  return (
    <DonatePageWrapper>
      <Container>
        {/* PAGE INTRODUCTION HERO - hidden when published */}
        {!isPublished && (
          <IntroHero>
            <div className="hero-content">
              <span className="eyebrow">
                <IoSparkles /> Share Your Surplus · Zero Food Waste
              </span>
              <h1>
                Give your surplus food a{" "}
                <span className="highlight-text">second journey</span>
              </h1>
              <p>
                List excess portions from your kitchen in 2 minutes. We instantly coordinate
                contactless pickup with verified community shelters across Kathmandu Valley.
              </p>

              <div className="trust-row">
                <span className="trust-pill">
                  <IoShieldCheckmark /> Verified NGOs Only
                </span>
                <span className="trust-pill">
                  <IoTimeOutline /> Simple Pickup Coordination
                </span>
                <span className="trust-pill">
                  <IoLeafOutline /> Track Real-Time Impact
                </span>
              </div>
            </div>

            <div className="hero-metric-card">
              <div className="metric-icon-circle">
                <IoHeart />
              </div>
              <div className="metric-value">3,420+</div>
              <div className="metric-label">Meals Shared This Month</div>
              <div className="metric-live-status">
                <span className="pulse-indicator" />
                <span>Live Matching Active</span>
              </div>
            </div>
          </IntroHero>
        )}

        {isPublished ? (
          /* SUCCESS STATE SCREEN */
          <SuccessStateWrapper>
            <div className="check-circle" style={{ background: "#EEF8F4", color: "#185C4A" }}>
              <IoCheckmarkCircle size={54} />
            </div>

            <h2>Donation Submitted for Review!</h2>
            <p className="success-desc">
              Your surplus food listing has been submitted and is pending verification by ANNShare platform moderators. Once approved, it will become publicly available on the Find Food marketplace for verified NGOs.
            </p>

            <div className="status-radar-box">
              <div className="radar-indicator">
                <div className="pulsing-dot" />
                <span className="radar-text">⏳ Status: Pending Admin Approval</span>
              </div>
              <div className="portions-badge">
                {formData.quantity} {formData.unit} · {formData.category}
              </div>
            </div>

            <div className="success-actions">
              <button
                type="button"
                className="btn-view-donation"
                onClick={() => navigate("/donor/dashboard?tab=my-donations")}
              >
                <span>View in Donor Dashboard</span>
                <IoArrowForward />
              </button>

              <button
                type="button"
                className="btn-list-another"
                onClick={handleReset}
              >
                <span>List Another Donation</span>
              </button>
            </div>
          </SuccessStateWrapper>
        ) : (
          /* MAIN TWO-COLUMN LISTING FLOW */
          <TwoColumnLayout>
            {/* LEFT COLUMN: MULTI-STEP FORM */}
            <FormCard>
              <ProgressSteps
                currentStep={currentStep}
                onStepClick={(step) => setCurrentStep(step)}
              />

              {formError && (
                <div
                  style={{
                    background: "#FEF2F2",
                    border: "1px solid #FCA5A5",
                    color: "#B91C1C",
                    padding: "10px 14px",
                    borderRadius: "10px",
                    marginBottom: "16px",
                    fontSize: "0.88rem",
                    fontWeight: 600,
                  }}
                >
                  ⚠️ {formError}
                </div>
              )}

              {/* STEP 1: FOOD DETAILS */}
              {currentStep === 1 && (
                <div>
                  <div className="step-header">
                    <h2>What would you like to share?</h2>
                    <p>Select your category and tell us about the portions available.</p>
                  </div>

                  <FormSectionGroup>
                    {/* Category Selector */}
                    <FormGroup>
                      <label>Food Category</label>
                      <FoodCategorySelector
                        selectedCategory={formData.category}
                        onSelect={(cat) => updateField("category", cat)}
                      />
                    </FormGroup>

                    {/* Food Name */}
                    <FormGroup>
                      <label>Food Title / Dish Name</label>
                      <input
                        type="text"
                        value={formData.foodName}
                        onChange={(e) => updateField("foodName", e.target.value)}
                        placeholder="e.g. Fresh Vegetable Rice Meals, Artisan Sourdough Loaves"
                      />
                    </FormGroup>

                    {/* Quantity & Unit */}
                    <FormGroup>
                      <label>Quantity & Measure</label>
                      <QuantityInputRow>
                        <input
                          type="number"
                          min="1"
                          value={formData.quantity}
                          onChange={(e) =>
                            updateField("quantity", e.target.value)
                          }
                          placeholder="e.g. 48"
                        />
                        <select
                          value={formData.unit}
                          onChange={(e) => updateField("unit", e.target.value)}
                        >
                          <option value="portions">Portions</option>
                          <option value="boxes">Boxes</option>
                          <option value="kg">Kilograms (kg)</option>
                          <option value="packs">Packs</option>
                          <option value="items">Items</option>
                        </select>
                      </QuantityInputRow>
                    </FormGroup>

                    {/* Food Condition */}
                    <FormGroup>
                      <label>
                        Food Condition
                        <span className="optional-tag">
                          <IoInformationCircleOutline style={{ verticalAlign: "middle" }} /> Food safety standard
                        </span>
                      </label>
                      <ConditionGrid>
                        {conditions.map((c) => {
                          const isSelected = formData.condition === c.label;
                          return (
                            <ConditionOption
                              key={c.id}
                              type="button"
                              $selected={isSelected}
                              onClick={() => updateField("condition", c.label)}
                            >
                              <span>{c.label}</span>
                              <span className="condition-check">
                                {isSelected ? "✓" : "○"}
                              </span>
                            </ConditionOption>
                          );
                        })}
                      </ConditionGrid>
                    </FormGroup>

                    {/* Food Description */}
                    <FormGroup>
                      <label>
                        Food Description
                        <span className="optional-tag">Ingredients & notes</span>
                      </label>
                      <textarea
                        value={formData.description}
                        onChange={(e) =>
                          updateField("description", e.target.value)
                        }
                        placeholder="Tell organizations a little about the food… (e.g. ingredients, dietary allergens, hot vs chilled packaging)"
                      />
                      <span className="helper-text">
                        Example: Mention ingredients, preparation time, packaging, etc.
                      </span>
                    </FormGroup>

                    {/* Image Upload */}
                    <FormGroup>
                      <label>Food Photos</label>
                      <ImageUploader
                        images={formData.images}
                        onImagesChange={(imgs) => updateField("images", imgs)}
                      />
                    </FormGroup>
                  </FormSectionGroup>

                  <FormActionsBar>
                    <div className="left-buttons">
                      <button
                        type="button"
                        className="btn-draft"
                        onClick={() => alert("Draft saved locally!")}
                      >
                        Save Draft
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleNext}
                    >
                      <span>Next: Pickup Details</span>
                      <IoArrowForward />
                    </button>
                  </FormActionsBar>
                </div>
              )}

              {/* STEP 2: PICKUP DETAILS */}
              {currentStep === 2 && (
                <div>
                  <div className="step-header">
                    <h2>Where can the food be collected?</h2>
                    <p>Set your kitchen address and convenient pickup window.</p>
                  </div>

                  <FormSectionGroup>
                    {/* Business Name */}
                    <FormGroup>
                      <label>Restaurant / Business Name</label>
                      <input
                        type="text"
                        value={formData.businessName}
                        onChange={(e) =>
                          updateField("businessName", e.target.value)
                        }
                        placeholder="e.g. Green Leaf Café, Summit Hotel Kitchen"
                      />
                    </FormGroup>

                    {/* Location Address */}
                    <FormGroup>
                      <label>Pickup Location Address</label>
                      <LocationSearchBox>
                        <div className="input-with-icon">
                          <IoLocationOutline className="loc-icon" />
                          <input
                            type="text"
                            value={formData.location}
                            onChange={(e) =>
                              updateField("location", e.target.value)
                            }
                            placeholder="Enter your street, area, and city (e.g. Thamel, Kathmandu)"
                          />
                        </div>

                        <button
                          type="button"
                          className="btn-gps"
                          onClick={handleUseCurrentLocation}
                        >
                          <IoCompassOutline />
                          <span>Use current location</span>
                        </button>
                      </LocationSearchBox>
                    </FormGroup>

                    {/* Date & Time Window */}
                    <TwoColInputs>
                      <FormGroup>
                        <label>Pickup Date</label>
                        <input
                          type="text"
                          value={formData.pickupDate}
                          onChange={(e) =>
                            updateField("pickupDate", e.target.value)
                          }
                          placeholder="e.g. Today, Tomorrow morning"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Pickup Time Slot</label>
                        <TwoColInputs>
                          <input
                            type="text"
                            value={formData.pickupFromTime}
                            onChange={(e) =>
                              updateField("pickupFromTime", e.target.value)
                            }
                            placeholder="From 5:00 PM"
                          />
                          <input
                            type="text"
                            value={formData.pickupToTime}
                            onChange={(e) =>
                              updateField("pickupToTime", e.target.value)
                            }
                            placeholder="To 7:30 PM"
                          />
                        </TwoColInputs>
                      </FormGroup>
                    </TwoColInputs>

                    {/* Contact Person */}
                    <TwoColInputs>
                      <FormGroup>
                        <label>Contact Person</label>
                        <input
                          type="text"
                          value={formData.contactName}
                          onChange={(e) =>
                            updateField("contactName", e.target.value)
                          }
                          placeholder="Name of manager / chef"
                        />
                      </FormGroup>

                      <FormGroup>
                        <label>Contact Phone Number</label>
                        <input
                          type="tel"
                          value={formData.contactPhone}
                          onChange={(e) =>
                            updateField("contactPhone", e.target.value)
                          }
                          placeholder="+977 980-1234567"
                        />
                      </FormGroup>
                    </TwoColInputs>

                    {/* Instructions */}
                    <FormGroup>
                      <label>
                        Pickup Instructions for Couriers / NGOs
                        <span className="optional-tag">Where to enter</span>
                      </label>
                      <textarea
                        value={formData.instructions}
                        onChange={(e) =>
                          updateField("instructions", e.target.value)
                        }
                        placeholder="e.g. Please collect from the back kitchen door and ask for Chef Ramesh."
                      />
                    </FormGroup>

                    {/* Food Safety Notice */}
                    <SafetyNotice />
                  </FormSectionGroup>

                  <FormActionsBar>
                    <div className="left-buttons">
                      <button
                        type="button"
                        className="btn-back"
                        onClick={handleBack}
                      >
                        <IoArrowBack />
                        <span>Back</span>
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      onClick={handleNext}
                    >
                      <span>Next: Review Donation</span>
                      <IoArrowForward />
                    </button>
                  </FormActionsBar>
                </div>
              )}

              {/* STEP 3: REVIEW & PUBLISH */}
              {currentStep === 3 && (
                <div>
                  <div className="step-header">
                    <h2>Review your donation</h2>
                    <p>Verify all details before publishing to verified organizations.</p>
                  </div>

                  <FormSectionGroup>
                    <ReviewSummary formData={formData} />
                  </FormSectionGroup>

                  <FormActionsBar>
                    <div className="left-buttons">
                      <button
                        type="button"
                        className="btn-back"
                        onClick={handleBack}
                      >
                        <IoArrowBack />
                        <span>Edit Details</span>
                      </button>

                      <button
                        type="button"
                        className="btn-draft"
                        onClick={() => alert("Draft saved successfully!")}
                      >
                        Save Draft
                      </button>
                    </div>

                    <button
                      type="button"
                      className="btn-primary"
                      disabled={isSubmitting}
                      onClick={handlePublish}
                    >
                      <span>
                        {isSubmitting ? "Publishing..." : "Publish Donation →"}
                      </span>
                    </button>
                  </FormActionsBar>
                </div>
              )}
            </FormCard>

            {/* RIGHT COLUMN: STICKY REAL-TIME DONATION PREVIEW */}
            <PreviewCardWrapper>
              <DonationPreview formData={formData} />
            </PreviewCardWrapper>
          </TwoColumnLayout>
        )}
      </Container>
    </DonatePageWrapper>
  );
}
