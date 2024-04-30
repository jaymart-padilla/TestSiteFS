import React, { useContext, useEffect, useState } from "react";
import { isAuthenticated } from "../utils/isAuthenticated";

const AuthContext = React.createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [authenticated, setAuthenticated] = useState(false);
    // const [hasNewsletterSubscription, setHasNewsletterSubscription] =
    //     useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const checkAuth = async () => {
            const { user, authenticated } = await isAuthenticated();
            setUser(user);
            setAuthenticated(authenticated);
            // setHasNewsletterSubscription(hasNewsletterSubscription);
            setLoading(false);
        };
        checkAuth();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                user,
                setUser,
                authenticated,
                // hasNewsletterSubscription,
                loading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuthContext = () => {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};
