import { useState } from "react";
import { useForm } from "@inertiajs/react";
import axios from "axios";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { parseErrorMessage } from "../utils/errorParser";
import { paths } from "../config/paths";

export default function Login() {
    const { data, setData } = useForm({
        username: "",
        password: "",
    });

    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/api/auth/${paths.login.url}`,
                data
            );

            const { token } = response.data;

            sessionStorage.setItem("access_token", token);

            window.location.href = paths.home.url;
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }
        }
    };

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.login]}
                activeLink={paths.login}
            />
            <form className="form-login mt-4 mb-5" onSubmit={submit}>
                <div className="text-center mb-4">
                    <h2 className="h1 mb-3">
                        <span className="accent-color">Test</span>Site
                    </h2>
                    <p className="blockquote">Welcome back!</p>
                </div>

                <div className="form-label-group">
                    <input
                        type="username"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        required
                        autoFocus
                        value={data.username}
                        onChange={(e) => setData("username", e.target.value)}
                    />
                    <label htmlFor="username">Username</label>
                </div>

                <div className="form-label-group">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        required
                        value={data.password}
                        onChange={(e) => setData("password", e.target.value)}
                    />
                    <label htmlFor="password">Password</label>
                </div>
                <button
                    className="btn btn-success accent-button w-100"
                    type="submit"
                >
                    {paths.login.text}
                </button>
                {error && (
                    <small className="d-block text-center pt-3 text-danger">
                        {error}
                    </small>
                )}
            </form>
            <style jsx global>
                {`
                    .form-login {
                        width: 100%;
                        max-width: 420px;
                        padding: 15px;
                        margin: auto;
                        font-size: small;
                    }

                    .form-login .form-label-group {
                        position: relative;
                        margin-bottom: 1rem;
                    }

                    .form-login .form-label-group input,
                    .form-login .form-label-group label {
                        height: 3.125rem;
                        padding: 0.75rem;
                    }

                    .form-login .form-label-group label {
                        position: absolute;
                        top: 0;
                        left: 0;
                        display: block;
                        width: 100%;
                        margin-bottom: 0;
                        line-height: 1.5;
                        color: #495057;
                        pointer-events: none;
                        cursor: text; /* Match the input under the label */
                        border: 1px solid transparent;
                        border-radius: 0.25rem;
                        transition: all 0.1s ease-in-out;
                    }

                    .form-login
                        .form-label-group
                        input::-webkit-input-placeholder {
                        color: transparent;
                    }

                    .form-login .form-label-group input::-moz-placeholder {
                        color: transparent;
                    }

                    .form-login .form-label-group input:-ms-input-placeholder {
                        color: transparent;
                    }

                    .form-login .form-label-group input::-ms-input-placeholder {
                        color: transparent;
                    }

                    .form-login .form-label-group input::placeholder {
                        color: transparent;
                    }

                    .form-login
                        .form-label-group
                        input:not(:-moz-placeholder-shown) {
                        padding-top: 1.25rem;
                        padding-bottom: 0.25rem;
                    }

                    .form-login
                        .form-label-group
                        input:not(:-ms-input-placeholder) {
                        padding-top: 1.25rem;
                        padding-bottom: 0.25rem;
                    }

                    .form-login
                        .form-label-group
                        input:not(:placeholder-shown) {
                        padding-top: 1.25rem;
                        padding-bottom: 0.25rem;
                    }

                    .form-login
                        .form-label-group
                        input:not(:-moz-placeholder-shown)
                        ~ label {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                        font-size: 12px;
                        color: #777;
                    }

                    .form-login
                        .form-label-group
                        input:not(:-ms-input-placeholder)
                        ~ label {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                        font-size: 12px;
                        color: #777;
                    }

                    .form-login
                        .form-label-group
                        input:not(:placeholder-shown)
                        ~ label {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                        font-size: 12px;
                        color: #777;
                    }

                    .form-login
                        .form-label-group
                        input:-webkit-autofill
                        ~ label {
                        padding-top: 0.25rem;
                        padding-bottom: 0.25rem;
                        font-size: 12px;
                        color: #777;
                    }
                `}
            </style>
        </div>
    );
}
