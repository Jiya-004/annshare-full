import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

import {
  HeroWrapper,
  HeroContainer,
  SliderCardWrapper,
  SlideCard,
  NavArrowBtn,
  PaginationContainer,
  PaginationDot,
} from "./style";

import {
  IoArrowForward,
  IoSparkles,
  IoLeafOutline,
  IoShieldCheckmarkOutline,
  IoChevronBack,
  IoChevronForward,
} from "react-icons/io5";

const SLIDES_DATA = [
  {
    id: 1,
    bg: "#F9F6F0",
    overlay:
      "linear-gradient(90deg, #F9F6F0 0%, #F9F6F0 42%, rgba(249, 246, 240, 0.88) 58%, rgba(249, 246, 240, 0.25) 75%, transparent 100%)",
    eyebrow: "ANNShare Food Redistribution",
    eyebrowIcon: <IoSparkles />,
    headline: "Give Surplus Food, A Second Journey.",
    description:
      "Turn extra kitchen portions, banquets, and daily commercial bakery surplus into warm, nourishing meals for verified shelters across Kathmandu Valley.",
    primaryCta: "I Have Food",
    primaryAction: "donate",
    secondaryCta: "I Need Food",
    secondaryAction: "need",
    image: "/food.png",
    accentColor: "#8B3A2B",
    ctaBg: "#8B3A2B",
  },
  {
    id: 2,
    bg: "#F5F8F6",
    overlay:
      "linear-gradient(90deg, #F5F8F6 0%, #F5F8F6 42%, rgba(245, 248, 246, 0.88) 58%, rgba(245, 248, 246, 0.25) 75%, transparent 100%)",
    eyebrow: "Zero Waste • Shared Impact",
    eyebrowIcon: <IoLeafOutline />,
    headline: "Nourish Communities, Eliminate Food Waste.",
    description:
      "Over 25,000+ meals redirected from landfills directly to children's shelters and community dining tables with verified safety standards.",
    primaryCta: "Explore Available Food",
    primaryAction: "explore",
    secondaryCta: "Share Surplus Food",
    secondaryAction: "donate",
    image: "/foodeating.png",
    accentColor: "#2E7D5B",
    ctaBg: "#174A3A",
  },
  {
    id: 3,
    bg: "#FAF7F2",
    overlay:
      "linear-gradient(90deg, #FAF7F2 0%, #FAF7F2 42%, rgba(250, 247, 242, 0.88) 58%, rgba(250, 247, 242, 0.25) 75%, transparent 100%)",
    eyebrow: "Verified & Rapid Redistribution",
    eyebrowIcon: <IoShieldCheckmarkOutline />,
    headline: "Rapid Pickups, Audit-Ready ESG Reports.",
    description:
      "Our intelligent dispatch automatically pairs hot banquet courses and pantry goods with nearby verified relief organizations in under 30 minutes.",
    primaryCta: "Start Sharing Food",
    primaryAction: "donate",
    secondaryCta: "Request For Community",
    secondaryAction: "need",
    image: "/serve.jpg",
    accentColor: "#174A3A",
    ctaBg: "#174A3A",
  },
];

export default function HeroSection({
  onOpenDonate,
  onOpenNeedFood,
  onExploreClick,
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [swiperInstance, setSwiperInstance] = useState(null);

  const handleAction = (type) => {
    if (type === "donate") onOpenDonate?.();
    else if (type === "need") onOpenNeedFood?.();
    else if (type === "explore") onExploreClick?.();
  };

  return (
    <HeroWrapper id="hero">
      <HeroContainer>
        <SliderCardWrapper>
          <Swiper
            modules={[Autoplay, EffectFade, Navigation]}
            effect="fade"
            fadeEffect={{ crossFade: true }}
            speed={900}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true}
            navigation={{
              prevEl: ".hero-swiper-prev",
              nextEl: ".hero-swiper-next",
            }}
            onSwiper={setSwiperInstance}
            onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
          >
            {SLIDES_DATA.map((slide) => (
              <SwiperSlide key={slide.id}>
                <SlideCard
                  $bg={slide.bg}
                  $overlay={slide.overlay}
                  $accentColor={slide.accentColor}
                  $ctaBg={slide.ctaBg}
                  onClick={() => handleAction(slide.primaryAction)}
                >
                  {/* Background Image */}
                  <img
                    src={slide.image}
                    alt={slide.headline}
                    className="slide-bg-image"
                    loading={slide.id === 1 ? "eager" : "lazy"}
                  />

                  {/* Soft Gradient Overlay */}
                  <div className="slide-overlay" />

                  {/* Ambient Light */}
                  <div className="ambient-glow" />

                  {/* Text Content */}
                  <div className="slide-content">
                    <div className="eyebrow-badge">
                      {slide.eyebrowIcon}
                      <span>{slide.eyebrow}</span>
                    </div>

                    <h1 className="slide-headline">{slide.headline}</h1>

                    <p className="slide-description">{slide.description}</p>

                    <div className="actions-row">
                      <button
                        type="button"
                        className="btn-primary-cta"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleAction(slide.primaryAction);
                        }}
                      >
                        <span>{slide.primaryCta}</span>
                        <IoArrowForward size={14} />
                      </button>

                      {slide.secondaryCta && (
                        <button
                          type="button"
                          className="btn-secondary-cta"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAction(slide.secondaryAction);
                          }}
                        >
                          <span>{slide.secondaryCta}</span>
                        </button>
                      )}
                    </div>
                  </div>
                </SlideCard>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Navigation Arrows */}
          <NavArrowBtn className="hero-swiper-prev" $prev aria-label="Previous Slide">
            <IoChevronBack />
          </NavArrowBtn>
          <NavArrowBtn className="hero-swiper-next" aria-label="Next Slide">
            <IoChevronForward />
          </NavArrowBtn>

          {/* Custom Elongated Pill Pagination Dots */}
          <PaginationContainer>
            {SLIDES_DATA.map((slide, idx) => (
              <PaginationDot
                key={slide.id}
                type="button"
                $isActive={activeIndex === idx}
                onClick={() => swiperInstance?.slideToLoop(idx)}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </PaginationContainer>
        </SliderCardWrapper>
      </HeroContainer>
    </HeroWrapper>
  );
}
