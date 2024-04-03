import CardGrid from "../Components/CardGrid";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { paths } from "../config/paths";
import { team } from "../config/dummy-data";

export default function Team() {
    const teamPath = paths.about.innerLinks.find(
        (innerLink) => innerLink.url === "/team"
    );

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, teamPath]}
                activeLink={teamPath}
            />
            <CardGrid
                cardItems={team}
                title="Our Team"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sapiente consequatur tempore omnis rerum corporis mollitia accusantium odit ratione itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit."
                colSize={4}
                withShadow
                padded={false}
                imgHeight={280}
            />
        </div>
    );
}
