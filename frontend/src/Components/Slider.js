import { Carousel, Card, Button } from "react-bootstrap";

const sliderItems = [
    {
        img: "/images/slider/img-1.jpg",
        title: "Card title",
        text: "This card has supporting text below as a natural lead-in to additional content.",
    },
    {
        img: "/images/slider/img-2.jpg",
        title: "Card title",
        text: "This card has supporting text below as a natural lead-in to additional content.",
    },
];

export default function Slider() {
    return (
        <div
            id="indexMainSlider"
            className="carousel slide slider"
            data-ride="carousel"
            data-interval="4000"
        >
            <div className="carousel-inner">
                {sliderItems.map((sliderItem, index) => {
                    const { img, title, text } = sliderItem;
                    return (
                        <Carousel.Item
                            key={index}
                            className={index === 1 && "active"}
                        >
                            <img src={img} alt={title} />
                            <Carousel.Caption>
                                <Card className="text-center slider-card">
                                    <Card.Body>
                                        <Card.Title>{title}</Card.Title>
                                        <Card.Text>{text}</Card.Text>
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                            className="accent-button"
                                        >
                                            Read More
                                        </Button>
                                    </Card.Body>
                                </Card>
                            </Carousel.Caption>
                        </Carousel.Item>
                    );
                })}
            </div>
            <button
                className="carousel-control-prev"
                type="button"
                data-target="#indexMainSlider"
                data-slide="prev"
            >
                <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
            </button>
            <button
                className="carousel-control-next"
                type="button"
                data-target="#indexMainSlider"
                data-slide="next"
            >
                <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
            </button>
            <style jsx global>{`
                .slider img {
                    width: 100%;
                    max-height: 65vh;
                    height: 65vh;
                    object-fit: cover;
                    background-position: center;
                    background-size: contain;
                    background-repeat: no-repeat;
                }
                .slider .carousel-control-prev,
                .slider .carousel-control-next {
                    border: none;
                    background: transparent;
                }
                .slider .slider-card {
                    width: 70%;
                    margin: 0 auto;
                    background-color: #00000099;
                    border-top: 0.25rem solid var(--accent-color);
                    border-bottom: none;
                    border-left: none;
                    border-right: none;
                    box-shadow: none;
                    font-size: small;
                }
                @media (max-width: 768px) {
                    .slider .slider-card {
                        width: 100%;
                    }
                }
            `}</style>
        </div>
    );
}
