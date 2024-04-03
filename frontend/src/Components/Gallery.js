import { useState } from "react";
import { Container, Nav, Row, Card, Tab } from "react-bootstrap";
import { galleryItems } from "../config/dummy-data";

const tabs = [
    { title: "All", category: "all", link: "link-1" },
    { title: "App", category: "app", link: "link-2" },
    { title: "Card", category: "card", link: "link-3" },
    { title: "Web", category: "web", link: "link-4" },
];

export default function Gallery() {
    const [activeKey, setActiveKey] = useState(tabs[0].link);

    return (
        <Container className="my-5 px-4">
            <Tab.Container
                activeKey={activeKey}
                onSelect={(selectedKey) => setActiveKey(selectedKey)}
            >
                <Nav
                    variant="pills"
                    className="justify-content-center gallery-nav"
                >
                    {/* pills */}
                    {tabs.map((tab, index) => {
                        return (
                            <Nav.Item className="gallery-nav-item" key={index}>
                                <Nav.Link eventKey={tab.link}>
                                    {tab.title}
                                </Nav.Link>
                            </Nav.Item>
                        );
                    })}
                </Nav>
                <Tab.Content>
                    {tabs.map((tab, index) => {
                        return (
                            <Tab.Pane eventKey={tab.link} key={index}>
                                <Row>
                                    <div className="card-columns p-4">
                                        {/* render galleryItems that matched the current category */}
                                        {galleryItems
                                            .find(
                                                (item) =>
                                                    item.category ===
                                                    tab.category
                                            )
                                            .items.map((img, index) => {
                                                return (
                                                    <GalleryItem
                                                        key={index}
                                                        img={img}
                                                    />
                                                );
                                            })}
                                    </div>
                                </Row>
                            </Tab.Pane>
                        );
                    })}
                </Tab.Content>
            </Tab.Container>
            <style jsx global>
                {`
                    .gallery-nav .nav-link.active,
                    .gallery-nav .show > .nav-link {
                        background-color: var(--accent-color);
                    }

                    .gallery-nav-item > a {
                        color: black;
                        font-size: small;
                        font-weight: 500;
                        text-transform: uppercase;
                    }

                    .gallery-nav-item > a:hover,
                    .gallery-nav-item > a:focus {
                        background-color: var(--accent-color-muted);
                        color: white;
                    }
                `}
            </style>
        </Container>
    );
}

function GalleryItem({ img }) {
    return (
        <Card className="p-0" style={{ border: "none" }}>
            <Card.Body style={{ padding: "0.325rem 0" }}>
                <img src={img} alt="Image" width="100%" />
            </Card.Body>
        </Card>
    );
}
