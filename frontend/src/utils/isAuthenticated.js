import axios from "axios";

export async function isAuthenticated() {
    try {
        const response = await axios.post("/api/auth/check-auth", {
            access_token: sessionStorage.getItem("access_token"),
        });
        return response.data;
    } catch (error) {
        console.error("Error checking authentication:", error);
        return false; // Assume not authenticated on error
    }
}
