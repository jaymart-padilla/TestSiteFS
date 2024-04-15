import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import ErrorPage from "../Pages/ErrorPage";
import Loading from "../Components/Loading";

export default function NonAuthorizedUserRoute({ children }) {
    const { authenticated, loading } = useAuthContext();

    if (loading) {
        return <Loading />;
    }

    if (authenticated) {
        return <ErrorPage message="403 Forbidden" />;
    }

    return children ? children : <Outlet />;
}
