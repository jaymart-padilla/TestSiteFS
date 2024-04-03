import Gallery from "../Components/Gallery";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { paths } from "../config/paths";

export default function Portfolio() {
    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.portfolio]}
                activeLink={paths.portfolio}
            />
            <Gallery />
        </div>
    );
}
