import { Navbar, Nav, NavDropdown, Container, Button } from "react-bootstrap";
import { paths } from "../config/paths";
// import { socialLinks } from "../config/social-links";
import { useMatch } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import { logout } from "../utils/logout";

export default function TopNav() {
    const accessToken = sessionStorage.getItem("access_token");
    const { authenticated } = useAuthContext();

    return (
        <Container>
            <Navbar collapseOnSelect expand="lg" className="top-navbar">
                <Navbar.Brand
                    href={paths.home.url}
                    className="text-uppercase font-weight-bold top-navbar-brand"
                >
                    <span className="accent-color">Test</span>Site
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav" className="gap-5">
                    <NavLinks
                        // {paths}
                        paths={Object.values(paths).filter(
                            (path) =>
                                path.url !== paths.login.url &&
                                path.url !== paths.signup.url &&
                                path.url !== paths.logout.url
                        )}
                    />
                    <div className="d-none d-lg-block mx-2">|</div>
                    {/* <Nav className="d-flex flex-row top-navbar-social-icons">
                        <Nav.Link href={socialLinks.twitter} target="_blank">
                            <i className="fa-brands fa-twitter" />
                        </Nav.Link>
                        <Nav.Link href={socialLinks.facebook} target="_blank">
                            <i className="fa-brands fa-facebook" />
                        </Nav.Link>
                        <Nav.Link href={socialLinks.instagram} target="_blank">
                            <i className="fa-brands fa-square-instagram" />
                        </Nav.Link>
                        <Nav.Link href={socialLinks.linkedIn} target="_blank">
                            <i className="fa-brands fa-linkedin" />
                        </Nav.Link>
                    </Nav> */}
                    <Nav className="d-flex flex-row" style={{ gap: "0.25rem" }}>
                        {accessToken || authenticated ? (
                            <Button
                                className="action-button"
                                variant="success"
                                onClick={logout}
                            >
                                {paths.logout.text}
                            </Button>
                        ) : (
                            <>
                                <Button
                                    href={paths.login.url}
                                    className="action-button"
                                    variant="success"
                                >
                                    {paths.login.text}
                                </Button>
                                <Button
                                    href={paths.signup.url}
                                    className="action-button action-button-outline"
                                    variant="outline-success"
                                >
                                    {paths.signup.text}
                                </Button>
                            </>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
            <style jsx global>
                {`
                    .top-navbar {
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;
                    }

                    .top-navbar-brand {
                        font-size: 1.5rem;
                    }

                    .top-nav-container {
                        font-size: small;
                    }

                    .top-nav-container .nav-container-link {
                        font-weight: 500;
                    }

                    .top-nav-container .nav-container-link.active {
                        color: var(--accent-color) !important;
                    }

                    .top-nav-container .nav-link:hover,
                    .top-nav-container .dropdown-toggle.show {
                        color: var(--accent-color) !important;
                    }

                    .top-nav-container .dropdown-menu {
                        padding: 0;
                        border: none;
                    }

                    .top-nav-container .nav-container-dropdown-link {
                        position: relative;
                        font-size: small;
                        font-weight: 500;
                        padding-top: 0.5rem;
                        padding-bottom: 0.5rem;

                        -webkit-transition: 0.3s all ease;
                        -o-transition: 0.3s all ease;
                        transition: 0.3s all ease;
                    }

                    .top-nav-container .nav-container-dropdown-link:hover {
                        color: var(--accent-color) !important;
                        background-color: var(--light-muted);
                        padding-left: 1.75rem;
                    }

                    .top-nav-container .nav-container-dropdown-link:before {
                        content: "";
                        position: absolute;
                        width: 0px;
                        height: 100%;
                        left: 0;
                        bottom: 0;
                        top: 0;
                        opacity: 0;
                        visibility: hidden;
                        z-index: 2;
                        background-color: var(--accent-color);
                    }

                    .top-nav-container
                        .nav-container-dropdown-link:hover:before {
                        visibility: visible;
                        opacity: 100%;
                        width: 0.325rem;
                    }

                    .top-nav-container a.dropdown-toggle.nav-link {
                        color: inherit;
                    }

                    .action-button {
                        font-weight: 500 !important;
                        font-size: small !important;
                        padding-left: 1.25rem !important;
                        padding-right: 1.25rem !important;
                    }

                    .action-button-outline {
                        border: none;
                    }

                    .action-button-outline {
                        color: var(--accent-color) !important;
                    }

                    .action-button-outline:hover {
                        color: white !important;
                    }

                    @media (max-width: 992px) {
                        .top-navbar {
                            padding: 0.5rem 1rem;
                        }

                        .top-navbar-social-icons {
                            gap: 1.25rem;
                        }

                        .top-nav-container .nav-container-dropdown-link {
                            border-bottom: 1px solid var(--light-muted);
                        }
                    }
                `}
            </style>
        </Container>
    );
}

function NavLinks({ paths = {} }) {
    return (
        <Nav className="ml-auto top-nav-container">
            {Object.values(paths).map((path, index) => {
                if (path.innerLinks && path.innerLinks.length > 0)
                    return (
                        <NavDropDown innerLinks={path.innerLinks} key={index} />
                    );
                return <NavLink path={path} key={index} />;
            })}
        </Nav>
    );
}

function NavDropDown({ innerLinks }) {
    return (
        <NavDropdown title="About" className="text-dark nav-container-link">
            {innerLinks.map((innerLink, key) => {
                return (
                    <NavDropdown.Item
                        href={innerLink.url}
                        className="nav-container-dropdown-link"
                        key={key}
                    >
                        {innerLink.text}
                    </NavDropdown.Item>
                );
            })}
        </NavDropdown>
    );
}

function NavLink({ path }) {
    const match = useMatch(path.url);

    return (
        <Nav.Link
            href={path.url}
            className={`text-dark nav-container-link ${match && "active"}`}
        >
            {path.text}
        </Nav.Link>
    );
}
