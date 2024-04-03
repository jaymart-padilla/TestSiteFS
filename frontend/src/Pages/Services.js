import CardGrid from "../Components/CardGrid";
import FeatureCardGrid from "../Components/FeatureCardGrid";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { paths } from "../config/paths";
import { services } from "../config/dummy-data";

export default function Services() {
    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.services]}
                activeLink={paths.services}
            />
            <CardGrid cardItems={services} />
            <FeatureCardGrid />
        </div>
    );
}
