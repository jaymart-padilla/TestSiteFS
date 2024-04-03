import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import ContactFormIndex from "../Components/ContactFormIndex";
import { paths } from "../config/paths";

export default function Contact() {
    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.contact, paths.contact]}
                activeLink={paths.contact}
            />
            <iframe
                loading="lazy"
                src="https://maps.google.com/maps?q=chennai&t=&z=13&ie=UTF8&iwloc=&output=embed"
                className="google-maps-iframe"
            />
            <ContactFormIndex />
            <style jsx global>
                {`
                    .google-maps-iframe {
                        width: 100%;
                        height: 450px;
                        border: none;
                    }
                `}
            </style>
        </div>
    );
}
