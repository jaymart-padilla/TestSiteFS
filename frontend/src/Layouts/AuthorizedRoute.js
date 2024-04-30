import { Outlet } from "react-router-dom";
import { useAuthContext } from "../context/AuthProvider";
import ErrorPage from "../Pages/ErrorPage";
import Loading from "../Components/Loading";

export default function AuthorizedRoute({
    // redirect = paths.home.url,
    withAdminPrivileges = false,
    children,
}) {
    const { user, authenticated, loading } = useAuthContext();

    if (loading) {
        return <Loading />;
    }

    // if (!authenticated) {
    //     return <Navigate to={redirect} replace />;
    // }

    if (!authenticated) {
        return <ErrorPage message="401 Unauthorized" />;
    }

    // if user is not admin
    if (withAdminPrivileges && user?.privilege !== "admin") {
        return <ErrorPage message="403 Forbidden" />;
    }

    return children ? children : <Outlet />;
}
