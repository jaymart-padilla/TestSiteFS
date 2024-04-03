import {
    Route,
    RouterProvider,
    createBrowserRouter,
    createRoutesFromElements,
} from "react-router-dom";
import IndexLayout from "./Layouts/IndexLayout";
import ErrorPage from "./Pages/ErrorPage";
import Index from "./Pages/Index";
import About from "./Pages/About";
import Team from "./Pages/Team";
import Testimonials from "./Pages/Testimonials";
import Services from "./Pages/Services";
import Portfolio from "./Pages/Portfolio";
import Pricing from "./Pages/Pricing";
import BlogIndex from "./Pages/BlogIndex";
import BlogSingle from "./Pages/BlogSingle";
import Contact from "./Pages/Contact";
import { paths } from "./config/paths";

const router = createBrowserRouter(
    createRoutesFromElements(
        <Route path="/" element={<IndexLayout />} errorElement={<ErrorPage />}>
            <Route errorElement={<ErrorPage />}>
                <Route index element={<Index />} />
                <Route
                    path={
                        paths.about.innerLinks.find(
                            (innerLink) => innerLink.url === "/about"
                        ).url
                    }
                    element={<About />}
                />
                <Route
                    path={
                        paths.about.innerLinks.find(
                            (innerLink) => innerLink.url === "/team"
                        ).url
                    }
                    element={<Team />}
                />
                <Route
                    path={
                        paths.about.innerLinks.find(
                            (innerLink) => innerLink.url === "/testimonials"
                        ).url
                    }
                    element={<Testimonials />}
                />
                <Route path={paths.services.url} element={<Services />} />
                <Route path={paths.portfolio.url} element={<Portfolio />} />
                <Route path={paths.pricing.url} element={<Pricing />} />
                <Route path={paths.blog.url} element={<BlogIndex />} />
                <Route
                    path={paths.blog.url + "/:id"}
                    element={<BlogSingle />}
                />
                <Route path={paths.contact.url} element={<Contact />} />
            </Route>
        </Route>
    )
);

function App() {
    return (
        <>
            <RouterProvider router={router} />
            <style jsx global>
                {`
                    :root {
                        --accent-color: #1bbd36;
                        --accent-color-muted: #1bbd3666;
                        --light-muted: #f5f5f5;
                        --gray-muted: #ddd;

                        --section-gap: 5rem;
                    }

                    *,
                    *::before,
                    *::after {
                        transition: all 100ms ease-in-out;
                    }

                    .accent-color {
                        color: var(--accent-color) !important;
                    }

                    .accent-button {
                        color: white !important;
                        font-weight: 500 !important;
                        font-size: small !important;
                        padding: 0.5rem 1.75rem !important;
                    }

                    a.animated-link:after {
                        display: block;
                        content: "";
                        width: inherit;
                        border-bottom: solid 0.15rem var(--accent-color);
                        transform: scaleX(0);
                        transition: transform 250ms ease-in-out;
                        transform-origin: left;
                    }

                    a.animated-link:hover:after {
                        transform: scaleX(1);
                    }

                    .section {
                        margin-top: var(--section-gap);
                        margin-bottom: var(--section-gap);
                    }

                    .section-darken {
                        background: radial-gradient(
                            circle,
                            rgba(255, 255, 255) 0%,
                            rgba(238, 238, 238) 50%,
                            rgba(224, 224, 224) 100%
                        );
                    }

                    .normalized-image {
                        object-fit: cover;
                        background-position: center;
                        background-size: contain;
                        background-repeat: no-repeat;
                    }
                `}
            </style>
        </>
    );
}

export default App;
