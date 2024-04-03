import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    InputGroup,
    Nav,
    Row,
} from "react-bootstrap";
import { socialLinks as socialUrl } from "../config/social-links";
import { paths } from "../config/paths";

const footerLinks = {
    usefulLinks: [
        { title: paths.home.text, url: paths.home.url },
        {
            title: paths.about.text,
            url: paths.about.innerLinks.find(
                (innerLink) => innerLink.url === "/about"
            ).url,
        },
        { title: paths.services.text, url: paths.services.url },
        { title: "Terms of Service", url: "#" },
        { title: "Privacy Policy", url: "#" },
    ],
    servicesLinks: [
        { title: "Web Design", url: "#" },
        { title: "Web Development", url: "#" },
        { title: "Product Management", url: "#" },
        { title: "Marketing", url: "#" },
        { title: "Graphic Design", url: "#" },
    ],
};

const socialLinks = [
    {
        icon: "fa-brands fa-twitter fa-xl text-light",
        url: socialUrl.twitter,
    },
    {
        icon: "fa-brands fa-facebook fa-xl text-light",
        url: socialUrl.facebook,
    },
    {
        icon: "fa-brands fa-square-instagram fa-xl text-light",
        url: socialUrl.instagram,
    },
    {
        icon: "fa-brands fa-linkedin fa-xl text-light",
        url: socialUrl.linkedIn,
    },
];

export default function Footer() {
    return (
        <footer className="footer-index">
            <Container fluid className="py-5 text-light upper-footer">
                <Row className="container mx-auto flex-md-row flex-column">
                    <Col className="mb-md-3 mb-4">
                        <h5>COMPANY</h5>
                        <Nav className="flex-column" style={{ gap: "1rem" }}>
                            <p className="p-0 mb-0 text-white-50">
                                A108 Adam Street
                                <br />
                                New York, NY 535022
                                <br />
                                United States
                            </p>
                            <p className="p-0 mb-0 text-white-50">
                                <strong className="footer-info-label">
                                    Phone:{" "}
                                </strong>
                                +1 5589 55488 55
                                <br />
                                <strong className="footer-info-label">
                                    Email:{" "}
                                </strong>
                                info@example.com
                            </p>
                        </Nav>
                    </Col>
                    <Col className="mb-md-3 mb-4">
                        <h6 className="mb-3">Useful Links</h6>
                        <Nav className="flex-column">
                            {footerLinks.usefulLinks.map((link, index) => {
                                return (
                                    <Nav.Item
                                        className="d-flex align-items-center mb-2"
                                        style={{ gap: "1ch" }}
                                        key={index}
                                    >
                                        <i className="fa-solid fa-chevron-right fa-2xs accent-color" />
                                        <Nav.Link
                                            className="p-0 text-white-50 animated-link"
                                            href={link.url}
                                        >
                                            {link.title}
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col className="mb-md-3 mb-4">
                        <h6 className="mb-3">Our Services</h6>
                        <Nav className="flex-column">
                            {footerLinks.servicesLinks.map((link, index) => {
                                return (
                                    <Nav.Item
                                        className="d-flex align-items-center mb-2"
                                        style={{ gap: "1ch" }}
                                        key={index}
                                    >
                                        <i className="fa-solid fa-chevron-right fa-2xs accent-color" />
                                        <Nav.Link
                                            className="p-0 text-white-50 animated-link"
                                            href={link.url}
                                        >
                                            {link.title}
                                        </Nav.Link>
                                    </Nav.Item>
                                );
                            })}
                        </Nav>
                    </Col>
                    <Col md={5} className="mb-3 mt-md-0 mt-3">
                        <Form
                            className="d-flex flex-column"
                            style={{ gap: "0.285rem" }}
                        >
                            <h6>Join Our Newsletter</h6>
                            <p className="text-white-50">
                                Lorem ipsum dolor sit, amet consectetur
                                adipisicing elit. Voluptates ea facere et esse
                                aliquid.
                            </p>
                            <InputGroup>
                                <FormControl />
                                <div className="input-group-append">
                                    <Button
                                        variant="success"
                                        className="px-3"
                                        style={{ fontWeight: 500 }}
                                    >
                                        Subscribe
                                    </Button>
                                </div>
                            </InputGroup>
                        </Form>
                    </Col>
                </Row>
            </Container>
            <Container fluid className="text-light footer lower-footer">
                <div className="container d-flex flex-column flex-sm-row justify-content-between py-4">
                    <p>
                        &copy; Copyright <strong>TestSite</strong>. All rights
                        reserved.
                    </p>
                    <ul
                        className="list-unstyled d-flex"
                        style={{ gap: "1rem" }}
                    >
                        {socialLinks.map((link, index) => (
                            <li key={index}>
                                <a
                                    className="link-body-emphasis"
                                    href={link.url}
                                >
                                    <i className={link.icon} />
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </Container>
            <style jsx global>
                {`
                    .upper-footer {
                        background-color: #1e1e1e;
                    }

                    .lower-footer {
                        background-color: #111111;
                    }

                    .footer-info-label {
                        font-weight: 500;
                        color: lightgray;
                    }

                    .footer-index {
                        font-size: small;
                    }

                    .footer-index a:hover {
                        color: #f0f0f0 !important;
                    }
                `}
            </style>
        </footer>
    );
}
