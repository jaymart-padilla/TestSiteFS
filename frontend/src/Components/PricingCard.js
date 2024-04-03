import { Button, Card, Col, Container, Row } from "react-bootstrap";

export default function PricingCard({ pricingCardItems, colSize = 4 }) {
    if (!pricingCardItems || !pricingCardItems.length > 0) return null;

    // fetch the pricingCardItem with the most perks
    const allPricingCardPerks = pricingCardItems.reduce(
        (acc, curr) => (acc.length > curr.perks.length ? acc : curr.perks),
        []
    );

    return (
        <section className="pricing-card-grid">
            <Container>
                <Row className="no-gutters">
                    {pricingCardItems.map((pricingCardItem, index) => {
                        colSize = colSize < 0 ? 1 : colSize > 12 ? 12 : colSize;

                        return (
                            <Col
                                style={{ marginBottom: "1.25rem" }}
                                sm={12}
                                md={6}
                                lg={12 / colSize}
                                key={index}
                            >
                                <PricingCardItem
                                    {...pricingCardItem}
                                    allPricingCardPerks={allPricingCardPerks}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <style jsx global>
                {`
                    .pricing-card-grid {
                        font-size: 0.9rem;
                        padding: 2.75rem 0;
                    }

                    .pricing-card-grid .highlighted-price {
                        color: white;
                        background-color: var(--accent-color);
                    }

                    .pricing-card {
                        position: relative;
                        overflow: hidden;
                    }

                    .pricing-card .tagged::before {
                        content: attr(data-tag);
                        position: absolute;
                        top: 4%;
                        right: -27%;
                        width: 12rem;
                        height: 1.75rem;
                        background-color: var(--accent-color);
                        color: white;
                        font-size: small;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        transform: rotate(45deg);
                        z-index: 1;
                    }

                    @media (max-width: 1200px) {
                        .pricing-card .tagged::before {
                            top: 4%;
                            right: -34%;
                        }
                    }

                    @media (max-width: 992px) {
                        .pricing-card .tagged::before {
                            top: 5%;
                            right: -21%;
                        }
                    }

                    @media (max-width: 768px) {
                        .pricing-card .tagged::before {
                            top: 7%;
                            right: -12%;
                        }
                    }

                    @media (max-width: 576px) {
                        .pricing-card .tagged::before {
                            top: 7%;
                            right: -15%;
                        }
                    }

                    .pricing-card .pricing-card-title {
                        font-weight: 500;
                    }

                    .pricing-card .pricing-card-price {
                        font-size: 2.4rem;
                        font-weight: bold;
                        word-spacing: -0.125rem;
                    }

                    .pricing-card .pricing-card-price::before {
                        content: "$";
                        font-size: 1.5rem;
                        position: relative;
                        top: -1rem;
                        left: -0.25rem;
                    }

                    .pricing-card .pricing-card-price-muted {
                        font-size: 1.25rem;
                        font-weight: normal;
                        color: lightgray;
                    }

                    .pricing-card .pricing-card-perk {
                        font-size: small;
                        margin-top: 2ch;
                    }

                    .pricing-card .pricing-card-perk-muted {
                        color: lightgray;
                        text-decoration: line-through;
                    }

                    .pricing-card .pricing-card-inner-border {
                        border: none;
                        padding: 1rem;
                    }
                `}
            </style>
        </section>
    );
}

function PricingCardItem({
    title,
    highlight,
    tag,
    pricePerMonth,
    perks = [],
    allPricingCardPerks,
}) {
    // get the perks that are not included in the current pricing card (to be crossed out in the UI)
    const notIncludedPerks = allPricingCardPerks.filter(
        (allPricingCardPerk) => {
            return !perks.includes(allPricingCardPerk);
        }
    );

    return (
        <Card className="mx-3 my-1 text-center h-100 pricing-card">
            <div className={tag && "tagged"} data-tag={tag} />
            <Card.Header
                className={`pricing-card-title pricing-card-inner-border ${
                    highlight && "highlighted-price"
                }`}
            >
                {title}
            </Card.Header>
            <Card.Body>
                <Card.Title className="accent-color pricing-card-price">
                    {pricePerMonth}
                    <span className="lead pricing-card-price-muted">
                        {" "}
                        / month
                    </span>
                </Card.Title>
                {perks.map((perk, index) => (
                    <Card.Text className="pricing-card-perk" key={index}>
                        {perk}
                    </Card.Text>
                ))}
                {/* crossed out perks */}
                {notIncludedPerks.map((notIncludedPerk, index) => (
                    <Card.Text className="pricing-card-perk-muted" key={index}>
                        {notIncludedPerk}
                    </Card.Text>
                ))}
            </Card.Body>
            <Card.Footer className="text-muted pricing-card-inner-border">
                <Button variant="success" className="accent-button">
                    Buy Now
                </Button>
            </Card.Footer>
        </Card>
    );
}
