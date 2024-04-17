import { useEffect, useState } from "react";
import { useForm } from "@inertiajs/react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import axios from "axios";
import ToastNotif from "./ToastNotif";
import { useAuthContext } from "../context/AuthProvider";
import { parseErrorMessage } from "../utils/errorParser";

export default function ContactFormIndex() {
    return (
        <section className="section mt-5">
            <Container>
                <ContactInfo />
                <ContactForm />
            </Container>
            <style jsx global>
                {`
                    .contact-root {
                        max-width: 768px;
                    }

                    .contact-info {
                        margin: 0 auto;
                    }

                    .contact-info-container {
                        display: flex;
                        gap: 1rem;
                    }

                    .contact-info-label {
                        font-size: 1.25rem;
                        font-weight: 500;
                        margin-bottom: 0.25rem;
                    }

                    .contact-info-text {
                        color: gray;
                    }

                    .contact-info-icon {
                        color: var(--accent-color);
                        padding: 1rem 0.25rem;
                    }

                    .contact-form {
                        margin: 0 auto;
                        margin-top: 1.25rem;
                    }

                    .contact-form-input {
                        font-size: small;
                    }

                    @media (max-width: 768px) {
                        .contact-info {
                            flex-direction: column;
                            gap: 2rem;
                            margin-top: -2.25rem;
                        }
                    }
                `}
            </style>
        </section>
    );
}

function ContactInfo() {
    return (
        <div className="d-flex justify-content-between px-5 py-4 contact-root contact-info">
            <div className="contact-info-container">
                <i className="fa-solid fa-location-dot fa-xl contact-info-icon" />
                <div>
                    <p className="contact-info-label">Location:</p>
                    <div className="d-flex flex-column">
                        <small className="contact-info-text">
                            A108 Adam Street
                        </small>
                        <small className="contact-info-text">
                            New York, NY 535022
                        </small>
                    </div>
                </div>
            </div>
            <div className="contact-info-container">
                <i className="fa-solid fa-envelope fa-xl contact-info-icon" />
                <div>
                    <p className="contact-info-label">Email:</p>
                    <div className="d-flex flex-column">
                        <small className="contact-info-text">
                            info@example.com
                        </small>
                        <small className="contact-info-text">
                            contact@example.com
                        </small>
                    </div>
                </div>
            </div>
            <div className="contact-info-container">
                <i className="fa-solid fa-mobile-screen fa-xl contact-info-icon" />
                <div>
                    <p className="contact-info-label">Call:</p>
                    <div className="d-flex flex-column">
                        <small className="contact-info-text">
                            +1 5589 55488 51
                        </small>
                        <small className="contact-info-text">
                            +1 5589 22475 14
                        </small>
                    </div>
                </div>
            </div>
        </div>
    );
}

function ContactForm() {
    const { user } = useAuthContext();

    const { data, setData } = useForm({
        name: user ? user.username : "",
        email: user ? user.email : "",
        subject: "",
        message: "",
    });

    useEffect(() => {
        if (user) {
            setData({
                name: user.username || "",
                email: user.email || "",
                subject: "",
                message: "",
            });
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [user]);

    const [error, setError] = useState();
    const [showToast, setShowToast] = useState(false);
    const [toastMessage, setToastMessage] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post(
                "/api/contact/contact-form-submit",
                data
            );

            setData((prevData) => ({ ...prevData, subject: "", message: "" }));

            setError();

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
            className="contact-root contact-form"
            style={{ gap: "1rem" }}
            onSubmit={submit}
        >
            <Row>
                <Form.Group as={Col} controlId="name" className="mb-4">
                    <Form.Control
                        type="text"
                        placeholder="Your Name"
                        className="contact-form-input"
                        required
                        value={data.name}
                        onChange={(e) => setData("name", e.target.value)}
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="email" className="mb-4">
                    <Form.Control
                        type="email"
                        placeholder="Your Email"
                        className="contact-form-input"
                        required
                        value={data.email}
                        onChange={(e) => setData("email", e.target.value)}
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="subject" className="mb-4">
                <Form.Control
                    placeholder="Subject"
                    className="contact-form-input"
                    required
                    value={data.subject}
                    onChange={(e) => setData("subject", e.target.value)}
                />
            </Form.Group>
            <Form.Group controlId="message" className="mb-4">
                <Form.Control
                    as="textarea"
                    placeholder="Message"
                    rows={3}
                    className="contact-form-input"
                    required
                    value={data.message}
                    onChange={(e) => setData("message", e.target.value)}
                />
            </Form.Group>
            <Button
                className="d-block mx-auto accent-button"
                variant="success"
                type="submit"
            >
                Send Message
            </Button>
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
