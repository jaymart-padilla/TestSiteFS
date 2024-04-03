import { Card, Col, Container, Row } from "react-bootstrap";

export default function TestimonialCardGrid({
    testimonials,
    colSize = 2,
    withShadow = false,
    imgPxSize = 74,
}) {
    if (!testimonials || !testimonials.length > 0) return null;

    return (
        <section className="section-darken testimonial-card-grid">
            <Container>
                <Row className="no-gutters">
                    {testimonials.map((testimonial, index) => {
                        colSize = colSize < 0 ? 1 : colSize > 12 ? 12 : colSize;
                        return (
                            <Col
                                className="text-center"
                                style={{ marginBottom: "1.25rem" }}
                                sm={12}
                                md={6}
                                lg={12 / colSize}
                                key={index}
                            >
                                <CardItem
                                    {...testimonial}
                                    imgPxSize={imgPxSize}
                                    withShadow={withShadow}
                                />
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <style jsx global>
                {`
                    .testimonial-card-grid {
                        padding: 2.75rem 0rem;
                    }

                    .testimonial-card-grid-item {
                        margin: 0 0.75rem;
                        height: 100%;
                        border: none;
                    }

                    .testimonial-title {
                        font-weight: 500;
                    }

                    .testimonial-quote {
                        margin: 0;
                        font-size: 0.9rem;
                        font-style: italic;
                        line-height: 1.5rem;
                        word-spacing: 0.075rem;
                    }

                    .testimonial-quote-marks {
                        color: var(--gray-muted);
                    }
                `}
            </style>
        </section>
    );
}

function CardItem({ name, title, img, text, imgPxSize, withShadow }) {
    return (
        <Card
            className={`px-3 testimonial-card-grid-item ${
                withShadow && "shadow-sm"
            }`}
        >
            <Card.Body>
                <img
                    src={img}
                    alt={title}
                    className="d-block rounded-circle mr-1 float-left normalized-image"
                    width={imgPxSize}
                    height={imgPxSize}
                    style={{
                        maxWidth: imgPxSize,
                        maxHeight: imgPxSize,
                        minWidth: imgPxSize,
                        minHeight: imgPxSize,
                    }}
                />
                <div className="d-flex flex-column align-items-start pl-2 pb-3">
                    <strong className="testimonial-title">{name}</strong>
                    <small className="text-muted mt-1 testimonial-title">
                        {title}
                    </small>
                </div>
                <p className="text-left testimonial-quote">
                    <i className="fa-solid fa-quote-left fa-2xl pr-2 testimonial-quote-marks" />
                    {text}
                    <i className="fa-solid fa-quote-right fa-2xl pl-2 testimonial-quote-marks" />
                </p>
            </Card.Body>
        </Card>
    );
}
