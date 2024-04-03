import { Breadcrumb, Container, Navbar } from "react-bootstrap";

export default function TopBreadcrumbs({ links, activeLink }) {
    const maxLetters = 10;

    return (
        <Container fluid className="top-breadcrumbs">
            <Container className="py-2">
                <Navbar className="d-flex align-items-center justify-content-between">
                    <h5 className="m-0">
                        <a
                            href={activeLink.url}
                            data-toggle="tooltip"
                            title={activeLink.text || ""}
                        >
                            {truncateText(activeLink.text, maxLetters)}
                        </a>
                    </h5>
                    <Breadcrumb>
                        {links.map((link, index) => (
                            <Breadcrumb.Item
                                key={index}
                                href={link.url}
                                active={link.url === activeLink.url}
                            >
                                {truncateText(link.text, maxLetters)}
                            </Breadcrumb.Item>
                        ))}
                    </Breadcrumb>
                </Navbar>
            </Container>
            <style jsx global>
                {`
                    .top-breadcrumbs {
                        background-color: var(--accent-color);
                    }

                    .top-breadcrumbs .breadcrumb {
                        padding: initial;
                    }

                    .top-breadcrumbs .breadcrumb {
                        background-color: var(--accent-color);
                        margin-bottom: 0;
                    }

                    .top-breadcrumbs a,
                    .breadcrumb-item + .breadcrumb-item::before {
                        color: white;
                    }

                    .top-breadcrumbs .breadcrumb-item.active {
                        color: var(--light-muted);
                    }

                    @media (max-width: 576px) {
                        .top-breadcrumbs.container-fluid {
                            padding-left: initial;
                            padding-right: initial;
                        }
                    }
                `}
            </style>
        </Container>
    );
}

function truncateText(text = "", length) {
    return text.length > length ? text.slice(0, length) + "..." : text;
}
