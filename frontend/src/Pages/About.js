import Banner from "../Components/Banner";
import CardGrid from "../Components/CardGrid";
import Clients from "../Components/Clients";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import Skills from "../Components/Skills";
import { paths } from "../config/paths";
import { team } from "../config/dummy-data";

export default function About() {
    const aboutPath = paths.about.innerLinks.find(
        (innerLink) => innerLink.url === "/about"
    );

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, aboutPath]}
                activeLink={aboutPath}
            />
            <Banner />
            <CardGrid
                cardItems={team}
                title="Our Team"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sapiente consequatur tempore omnis rerum corporis mollitia accusantium odit ratione itaque. Lorem ipsum dolor sit amet consectetur adipisicing elit."
                colSize={4}
                withShadow
                padded={false}
                imgHeight={280}
            />
            <Skills />
            <Clients />
        </div>
    );
}
