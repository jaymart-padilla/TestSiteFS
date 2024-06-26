import { useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import {
    Button,
    Col,
    Container,
    Form,
    InputGroup,
    Nav,
    Row,
} from "react-bootstrap";
import ToastNotif from "./ToastNotif";
import { socialLinks as socialUrl } from "../config/social-links";
import { parseErrorMessage } from "../utils/errorParser";
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
                        <NewsLetter />
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

function NewsLetter() {
    // const { user, hasNewsletterSubscription } = useAuthContext();
    // const { user } = useAuthContext();
    const { data, setData, reset } = useForm({
        email: "",
    });

    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();
    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            // const apiRoute = hasNewsletterSubscription
            //     ? "unsubscribe"
            //     : "subscribe";
            // const response = await axios.post(`/api/newsletter/${apiRoute}`, {
            //     email: user?.email,
            //     accessToken: sessionStorage.getItem("access_token"),
            // });

            const response = await axios.post(
                "/api/newsletter/subscribe",
                data
            );

            setError();

            reset();

            setToastMessage(response.data?.message);

            setShowToast(true);
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }
        }
    };

    return (
        <Form
            className="d-flex flex-column"
            style={{ gap: "0.285rem" }}
            onSubmit={submit}
        >
            <h6>Join Our Newsletter</h6>
            <p className="text-white-50">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                Voluptates ea facere et esse aliquid.
            </p>
            <InputGroup>
                <Form.Control
                    type="email"
                    // placeholder="Please login first to subscribe"
                    placeholder="Enter your email address"
                    required
                    value={data.email}
                    onChange={(e) => setData("email", e.target.value)}
                    style={{ fontSize: "small" }}
                />
                <div className="input-group-append">
                    <Button
                        type="submit"
                        // variant={`${
                        //     hasNewsletterSubscription
                        //         ? "outline-success"
                        //         : "success"
                        // }`}
                        variant="success"
                        className="px-3"
                        style={{ fontWeight: 500, fontSize: "small" }}
                    >
                        {/* {hasNewsletterSubscription
                            ? "Unsubscribe"
                            : "Subscribe"} */}
                        Subscribe
                    </Button>
                </div>
            </InputGroup>
            {error && (
                <small className="d-block text-center pt-3 text-danger">
                    {error}
                </small>
            )}
            <ToastNotif
                show={showToast}
                message={toastMessage}
                setShow={setShowToast}
            />
        </Form>
    );
}
