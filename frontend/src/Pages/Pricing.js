import FAQ from "../Components/FAQ";
import PricingCard from "../Components/PricingCard";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { paths } from "../config/paths";
import { pricingCardItems, faqData } from "../config/dummy-data";

export default function Pricing() {
    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.pricing]}
                activeLink={paths.pricing}
            />
            <PricingCard pricingCardItems={pricingCardItems} />
            <FAQ faqData={faqData} />
        </div>
    );
}
