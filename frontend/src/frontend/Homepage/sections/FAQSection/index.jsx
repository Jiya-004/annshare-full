import React, { useState } from "react";
import {
  FAQWrapper,
  Container,
  HeaderArea,
  AccordionList,
  AccordionItem,
} from "./style";
import { IoChevronDown } from "react-icons/io5";

const FAQS = [
  {
    id: 1,
    q: "What types of food can be donated on ANNShare?",
    a: "We welcome prepared hot/cold meals, catering trays, bakery items, dairy products, fresh produce, and packaged dry goods. All items must be unserved, freshly cooked or packaged, and stored according to municipal food hygiene guidelines.",
  },
  {
    id: 2,
    q: "Who is eligible to receive surplus food distributions?",
    a: "Eligible recipients include registered non-profit shelters, children's homes, community kitchens, eldercare centers, and verified grassroots relief organizations with adequate food handling capabilities.",
  },
  {
    id: 3,
    q: "How does ANNShare ensure hygiene and food safety?",
    a: "Every listing requires cooking time, safe consumption window, allergen disclosures, and temperature conditions. Upon pickup, receiving volunteers perform an inspection checklist before approving the handover digitally.",
  },
  {
    id: 4,
    q: "Is there any cost for restaurants or NGOs to use ANNShare?",
    a: "No. ANNShare is 100% free for community non-profits and feeding partners. Basic donation and matching capabilities for restaurants are also completely free as part of our circular sustainability pledge.",
  },
  {
    id: 5,
    q: "How quickly is surplus food collected once posted?",
    a: "Our automated dispatch notifies nearby verified partners instantly within a 3–8 km radius. On average across Kathmandu Valley, pairings happen within 18 minutes, with physical pickup completed well before the stated expiry window.",
  },
  {
    id: 6,
    q: "Can households or individuals donate, or only licensed food businesses?",
    a: "Currently, our immediate-matching protocol focuses on commercial food operators, hotels, event caterers, and bakeries to guarantee batch safety. However, community food drives and packaged goods can be organized by individuals via our community volunteer wing.",
  },
];

export default function FAQSection() {
  const [openId, setOpenId] = useState(1);

  const toggleItem = (id) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <FAQWrapper id="faq">
      <Container>
        <HeaderArea>
          <span className="badge">Frequently Asked Questions</span>
          <h2>Clear answers to common questions</h2>
          <p>
            Everything you need to know about food safety, partner verification, and the donation process.
          </p>
        </HeaderArea>

        <AccordionList>
          {FAQS.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <AccordionItem key={faq.id} className={isOpen ? "open" : ""}>
                <button
                  className="question-btn"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                >
                  <h3>{faq.q}</h3>
                  <div className={`icon-toggle ${isOpen ? "rotated" : ""}`}>
                    <IoChevronDown />
                  </div>
                </button>
                {isOpen && (
                  <div className="answer-panel">
                    <p>{faq.a}</p>
                  </div>
                )}
              </AccordionItem>
            );
          })}
        </AccordionList>
      </Container>
    </FAQWrapper>
  );
}
