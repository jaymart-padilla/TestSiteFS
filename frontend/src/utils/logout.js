import axios from "axios";
import { paths } from "../config/paths";

export async function logout() {
    try {
        await axios.post(`/api/auth${paths.logout.url}`);
    } catch (error) {
        console.error("Error logging out:", error);
    }

    sessionStorage.removeItem("access_token");

    window.location.replace(paths.login.url);
}
