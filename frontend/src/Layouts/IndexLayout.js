import { Outlet } from "react-router-dom";
import TopNav from "../Components/TopNav";
import Footer from "../Components/Footer";

export default function Root({ children }) {
    return (
        <div className="vh-100 d-flex flex-column">
            <TopNav />
            {/* render children prop if Outlet isn't provided (it hasn't been provided from the react-route-dom's route hierarchy) */}
            {children || <Outlet />}
            <Footer />
        </div>
    );
}
