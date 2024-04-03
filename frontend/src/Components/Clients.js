import { Card, Col, Container, Row } from "react-bootstrap";
import SubHeader from "./SubHeader";
import { clients } from "../config/dummy-data";

export default function Clients() {
    return (
        <Container className="section">
            <SubHeader title="Clients" />
            <Row className="no-gutters mt-5">
                {clients.map((client, index) => {
                    return <ClientCardGrid img={client.img} key={index} />;
                })}
            </Row>
        </Container>
    );
}

function ClientCardGrid({ img }) {
    return (
        <Col className="text-center" xs={6} md={4} lg={3}>
            <Card className="rounded-0">
                <Card.Body>
                    <div dangerouslySetInnerHTML={{ __html: img }}></div>
                </Card.Body>
            </Card>
        </Col>
    );
}
