import { useState } from "react";
import axios from "axios";
import { useForm } from "@inertiajs/react";
import { useParams } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useMarkdown } from "../../context/MarkdownProvider";
import TitleBar from "./TitleBar";
import { parseErrorMessage } from "../../utils/errorParser";
import { paths } from "../../config/paths";

export default function Editor({ isEditing = false }) {
    const { markdown, setMarkdown, markdownTitle, setMarkdownTitle } =
        useMarkdown();
    const { data, setData } = useForm({
        thumbnail: null,
    });
    const { id } = useParams();
    const [error, setError] = useState();
    const [words, setWords] = useState(0);
    const [chars, setChars] = useState(0);

    const getWordsCount = (str) => {
        const matches = str ? str.match(/(\w+)/g) : null;
        return matches ? matches.length : 0;
    };

    const getCharsCount = (str) => {
        return str ? str.match(/\S/g).length : 0;
    };

    const updateMarkdown = (event) => {
        const value = event.target.value;

        setMarkdown(value);
        setWords(getWordsCount(value));
        setChars(getCharsCount(value));
    };

    async function saveMarkdown(e) {
        e.preventDefault();

        try {
            const response = await axios.post(
                `/api/${paths.blog.url}/create`,
                {
                    ...data,
                    title: markdownTitle,
                    content: markdown,
                },
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setError();

            window.location.href = `${paths.blog.url}/${response.data?.id}`;
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }
        }
    }

    async function editMarkdown(e) {
        e.preventDefault();

        try {
            await axios.post(
                `/api/${paths.blog.url}/update`,
                {
                    ...data,
                    title: markdownTitle,
                    content: markdown,
                },
                {
                    params: {
                        id,
                    },
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            setError();

            window.location.href = `${paths.blog.url}/${id}`;
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }
        }
    }

    return (
        <form
            className="blog-create-editor__wrap"
            encType="multipart/form-data"
            onSubmit={isEditing ? editMarkdown : saveMarkdown}
        >
            <TitleBar
                title="Editor"
                aside={`${words} Words | ${chars} Chars`}
            />
            {/* blog content */}
            <textarea
                className="blog-create-editor"
                autoFocus
                value={markdown}
                onChange={updateMarkdown}
                // required
            />
            {/* title & thumbnail */}
            <div
                className="mb-2"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "small",
                }}
            >
                <label htmlFor="title">Title:</label>

                <input
                    type="text"
                    className="form-control"
                    // required
                    value={markdownTitle}
                    onChange={(e) => setMarkdownTitle(e.target.value)}
                />
            </div>
            <div
                className="mb-3"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    fontSize: "small",
                }}
            >
                <label htmlFor="thumbnail">Choose a thumbnail:</label>

                <input
                    type="file"
                    id="thumbnail"
                    name="thumbnail"
                    accept="image/png, image/jpeg"
                    onChange={(e) => setData("thumbnail", e.target.files[0])}
                />
            </div>
            <Button type="submit" className="action-button" variant="success">
                {isEditing ? "Update" : "Save"}
            </Button>
            {error && (
                <small className="d-block text-center pt-3 text-danger">
                    {error}
                </small>
            )}
        </form>
    );
}
