import { Col, Container, ProgressBar, Row } from "react-bootstrap";
import SubHeader from "./SubHeader";
import { skills } from "../config/dummy-data";

export default function Skills() {
    return (
        <Container className="section">
            <SubHeader
                title="Our Skills"
                description="Lorem ipsum dolor sit, amet consectetur adipisicing elit. Culpa nihil impedit, sed officia vitae tempore. Vero, omnis aut sequi similique, minima optio rerum eveniet aliquam natus deserunt nobis maiores. Consectetur a sint ea non."
            />
            <Row className="mt-4">
                {skills.map((skill, index) => {
                    return <Progress {...skill} key={index} />;
                })}
            </Row>
            <style jsx global>
                {`
                    .skill-progress .progress {
                        height: 0.675rem;
                    }

                    .skill-progress .progress-bar {
                        background-color: var(--accent-color);
                    }

                    .skill-progress-label {
                        font-size: 0.75rem;
                        font-weight: 500;
                    }
                `}
            </style>
        </Container>
    );
}

function Progress({ label, value }) {
    return (
        <Col className="text-center pb-3 px-4 skill-progress" sm={12} md={6}>
            <div className="d-flex justify-content-between align-items-center mb-1">
                <small className="text-uppercase skill-progress-label">
                    {label}
                </small>
                <small className="text-uppercase skill-progress-label">
                    {value}&#37;
                </small>
            </div>
            <ProgressBar now={value} className="rounded-0" />
        </Col>
    );
}
