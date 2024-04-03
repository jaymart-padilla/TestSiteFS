import Blog from "../Components/Blog";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { paths } from "../config/paths";

export default function BlogIndex() {
    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.blog]}
                activeLink={paths.blog}
            />
            <Blog />
        </div>
    );
}
