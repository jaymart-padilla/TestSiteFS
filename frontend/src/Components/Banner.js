import { Container } from "react-bootstrap";

export default function Banner() {
    return (
        <Container className="d-flex flex-md-row flex-column justify-content-center text-dark banner">
            <div className="banner-child">
                <h2 className="text-uppercase font-weight-bold banner-title">
                    Eum ipsam laborum deleniti velitena
                </h2>
                <p className="lead m-0 banner-subtitle">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    Quaerat, eos quasi. Perferendis laudantium.
                </p>
            </div>
            <div className="banner-child">
                <p className="m-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Voluptas deserunt, minima unde culpa perspiciatis adipisci
                    dignissimos enim accusamus. Architecto accusantium sed,
                    perspiciatis quo in consequuntur?
                </p>
                <div
                    className="d-flex flex-column justify-content-center align-items-start py-3"
                    style={{ gap: "0.5rem" }}
                >
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "1rem" }}
                    >
                        <i className="fa-solid fa-check-double accent-color" />
                        <p className="m-0">
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                        </p>
                    </div>
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "1rem" }}
                    >
                        <i className="fa-solid fa-check-double accent-color" />
                        <p className="m-0">
                            Lorem ipsum dolor sit, amet consectetur adipisicing.
                        </p>
                    </div>
                    <div
                        className="d-flex justify-content-center align-items-center"
                        style={{ gap: "1rem" }}
                    >
                        <i className="fa-solid fa-check-double accent-color" />
                        <p className="m-0">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ipsam incidunt nisi eligendi dolore fugiat.
                        </p>
                    </div>
                </div>
                <p className="font-italic m-0">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Tempore, maiores laboriosam excepturi repellat velit esse?
                </p>
            </div>
            <style jsx global>{`
                .banner {
                    gap: 1.5rem;
                    padding: 2.75rem 1.85rem;
                    font-size: 0.9rem;
                }
                .banner-child {
                    width: 100%;
                }
                .banner-title {
                    font-size: 2.125rem;
                    margin-bottom: 1rem;
                }
                .banner-subtitle {
                    font-weight: 500;
                }
                @media (max-width: 576px) {
                    .banner {
                         {
                            /* padding: 2.75rem 4rem; */
                        }
                    }
                }
            `}</style>
        </Container>
    );
}
