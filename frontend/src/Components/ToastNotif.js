import { Col, Row, Toast } from "react-bootstrap";

export default function ToastNotif({ show, setShow, message }) {
    return (
        <Row>
            <Col xs={6}>
                <Toast
                    onClose={() => setShow(false)}
                    show={show}
                    delay={3000}
                    autohide
                    style={{
                        position: "fixed",
                        bottom: "2%",
                        right: "1.75%",
                        zIndex: 999,
                    }}
                >
                    <Toast.Header closeButton={false}>
                        <strong className="mr-auto">
                            <span className="accent-color">Test</span>Site
                        </strong>
                    </Toast.Header>
                    <Toast.Body>
                        {message || "Default toast message"}
                    </Toast.Body>
                </Toast>
            </Col>
        </Row>
    );
}
