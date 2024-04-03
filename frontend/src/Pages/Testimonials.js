import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import TestimonialCardGrid from "../Components/TestimonialCardGrid";
import { paths } from "../config/paths";
import { testimonials } from "../config/dummy-data";

export default function Testimonials() {
    const testimonialsPath = paths.about.innerLinks.find(
        (innerLink) => innerLink.url === "/testimonials"
    );

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, testimonialsPath]}
                activeLink={testimonialsPath}
            />

            <TestimonialCardGrid testimonials={testimonials} withShadow />
        </div>
    );
}
