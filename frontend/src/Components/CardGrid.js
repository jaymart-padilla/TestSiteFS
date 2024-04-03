import { Card, Col, Container, Row } from "react-bootstrap";
import SubHeader from "./SubHeader";

export default function CardGrid({
    cardItems,
    title = "",
    description = "",
    colSize = 3,
    withShadow = false,
    imgHeight = 74,
    padded = true,
    hasBorder = false,
}) {
    if (!cardItems || !cardItems.length > 0) return null;

    return (
        <section className="section-darken card-grid">
            <Container>
                {title && <SubHeader title={title} description={description} />}
                <Row className="no-gutters">
                    {cardItems.map((cardItem, index) => {
                        colSize = colSize < 0 ? 1 : colSize > 12 ? 12 : colSize;
                        return (
                            <Col
                                className="text-center"
                                sm={12}
                                md={6}
                                lg={12 / colSize}
                                key={index}
                            >
                                {padded ? (
                                    <PaddedCardItem
                                        {...cardItem}
                                        imgHeight={imgHeight}
                                        withShadow={withShadow}
                                    />
                                ) : (
                                    <CardItem
                                        {...cardItem}
                                        imgHeight={imgHeight}
                                        withShadow={withShadow}
                                        hasBorder={hasBorder}
                                    />
                                )}
                            </Col>
                        );
                    })}
                </Row>
            </Container>
            <style jsx global>
                {`
                    .card-grid {
                        padding: 2.75rem 0rem;
                    }
                `}
            </style>
        </section>
    );
}

function PaddedCardItem({
    title,
    description,
    img,
    footer,
    imgHeight,
    withShadow,
    hasBorder,
}) {
    return (
        <Card
            className={`py-4 m-3 ${withShadow && "shadow-sm"} ${
                !hasBorder && "border-0"
            }`}
        >
            <Card.Img
                variant="top"
                style={{ padding: "1.25rem", paddingBottom: 0 }}
                src={img}
                alt={title}
                height={imgHeight}
            />
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
                {footer && (
                    <Card.Text>
                        <small className="text-muted">{footer}</small>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}

function CardItem({ title, description, img, footer, imgHeight, withShadow }) {
    return (
        <Card className={`m-3 ${withShadow && "shadow-sm"}`}>
            <Card.Img
                variant="top"
                src={img}
                alt={title}
                height={imgHeight}
                className="normalized-image"
            />
            <Card.Body>
                {title && <Card.Title>{title}</Card.Title>}
                {description && <Card.Text>{description}</Card.Text>}
                {footer && (
                    <Card.Text>
                        <small className="text-muted">{footer}</small>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}
