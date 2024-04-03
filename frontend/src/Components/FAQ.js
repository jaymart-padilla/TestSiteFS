import {
    Container,
    Accordion,
    useAccordionButton,
    AccordionContext,
} from "react-bootstrap";
import SubHeader from "./SubHeader";
import { useContext } from "react";

export default function FAQ({ faqData }) {
    if (!faqData || !faqData.length > 0) return null;

    return (
        <section className="section-darken faq-card-grid">
            <SubHeader title="Frequently Asked Questions" />
            <Container className="mt-5 px-4">
                <FAQAccordion faqData={faqData} />
            </Container>
            <style jsx global>
                {`
                    .faq-card-grid {
                        padding: 2.75rem 0rem;
                    }

                    .faq-accordion {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .faq-accordion .accordion-item {
                        max-width: 768px;
                        width: 100%;
                        margin: 0 auto;
                        background-color: white;
                        border: 1px solid var(--gray-muted);
                    }

                    .faq-accordion .accordion-header {
                        font-size: 1rem;
                        margin: 0;
                    }

                    .faq-accordion .accordion-body {
                        font-size: 0.975rem !important;
                        padding: 0rem 2rem 1rem 2rem !important;
                    }

                    .faq-accordion .accordion-header .accordion-button {
                        color: var(--accent-color);
                        background-color: white;
                        border: none;
                        width: 100%;
                        text-align: left;
                        padding: 1rem 2rem;
                        font-weight: 500;

                        display: flex;
                        align-items: center;
                    }

                    .faq-accordion .accordion-header .accordion-button i {
                        color: var(--accent-color);
                    }

                    .faq-accordion
                        .accordion-header
                        .accordion-button.collapsed,
                    .faq-accordion
                        .accordion-header
                        .accordion-button.collapsed
                        i {
                        color: black;
                    }
                `}
            </style>
        </section>
    );
}

function ContextAwareToggle({ eventKey, callback }) {
    const { activeEventKey } = useContext(AccordionContext);

    const decoratedOnClick = useAccordionButton(
        eventKey,
        () => callback && callback(eventKey)
    );

    const isCurrentEventKey = activeEventKey === eventKey;

    return isCurrentEventKey ? (
        <i
            className="fa-solid fa-chevron-up ml-auto"
            onClick={decoratedOnClick}
        />
    ) : (
        <i
            className="fa-solid fa-chevron-down ml-auto"
            onClick={decoratedOnClick}
        />
    );
}

function FAQAccordion({ faqData }) {
    return (
        <Accordion defaultActiveKey="0" className="faq-accordion">
            {faqData.map((faq, index) => {
                return (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                        <Accordion.Header>
                            <i className="fa-solid fa-circle-question mr-3" />
                            {faq.question}
                            <ContextAwareToggle eventKey={index.toString()} />
                        </Accordion.Header>
                        <Accordion.Body className="py-2 px-4">
                            {faq.answer}
                        </Accordion.Body>
                    </Accordion.Item>
                );
            })}
        </Accordion>
    );
}
