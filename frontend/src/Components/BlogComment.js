import { useState } from "react";
import axios from "axios";
import { Button, Card, Modal } from "react-bootstrap";
import { useAuthContext } from "../context/AuthProvider";
import { formatDate } from "../utils/formateDate";
import { parseErrorMessage } from "../utils/errorParser";

export default function BlogComment({
    id,
    author,
    status,
    created_at,
    img = "/images/testimonials/img-2.jpg",
    comment,
}) {
    const { user } = useAuthContext();
    const isAdmin = user?.privilege === "admin";
    const [commentStatus, setCommentStatus] = useState(status);

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    if (![id, author, created_at, status, img, comment].every(Boolean))
        return null;

    const imgPxSize = 64;
    const formattedCreatedAtDate = formatDate(created_at);

    async function handleStatusChange(id, status) {
        try {
            setLoading(true);
            const response = await axios.put(
                `/api/blog-comment/update-status/`,
                { status },
                {
                    params: { id },
                }
            );
            console.log(response.data?.message);

            setCommentStatus(response.data?.status);
            setLoading(false);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }
            setLoading(false);
        }
    }

    async function handleDelete() {
        try {
            setLoading(true);

            await axios.delete(`/api/blog-comment/delete`, {
                params: { id },
            });

            setLoading(false);
            setShow(false);

            window.location.reload();
        } catch (error) {
            if (error.response && error.response.data) {
                const responseData = error.response.data;
                const errorMessage = parseErrorMessage(responseData);
                setError(errorMessage);
            } else {
                setError("Network error or unexpected issue");
            }

            setLoading(false);
            setShow(false);
        }
    }

    if (
        (!isAdmin && commentStatus === "rejected") ||
        (!isAdmin && commentStatus === "pending")
    )
        return null;

    return (
        <Card className="border-0 blog-comment-root">
            <Card.Body className="d-flex blog-comment-container">
                <img
                    src={img}
                    alt={author}
                    className="d-block normalized-image pt-1"
                    width={imgPxSize}
                    height={imgPxSize}
                    style={{
                        maxWidth: imgPxSize,
                        maxHeight: imgPxSize,
                        minWidth: imgPxSize,
                        minHeight: imgPxSize,
                    }}
                />
                {/* <div>
                    <div className="blog-comment-name">
                        {author}{" "}
                        <a href="#" className="text-dark">
                            <small>
                                <i className="fa-solid fa-reply" /> Reply
                            </small>
                        </a>
                    </div>
                    <small className="blog-comment-date">
                        {formattedCreatedAtDate}
                    </small>
                    <small className="blog-comment-text">{comment}</small>
                </div> */}
                <div className="w-100">
                    <div className="d-flex justify-content-between align-items-center">
                        <div className="blog-comment-name">{author}</div>
                        {isAdmin && (
                            <div
                                className="d-flex justify-content-center align-items-start"
                                style={{ gap: "1rem" }}
                            >
                                <a
                                    href="#"
                                    className="text-danger"
                                    onClick={() => setShow(true)}
                                >
                                    <small>Delete</small>
                                </a>
                                <Modal
                                    show={show}
                                    onHide={() => setShow(false)}
                                    centered
                                >
                                    <Modal.Header>
                                        <Modal.Title>
                                            Delete Comment
                                        </Modal.Title>
                                    </Modal.Header>
                                    <Modal.Body>
                                        Are you sure you want to delete this
                                        comment?
                                    </Modal.Body>
                                    <Modal.Footer>
                                        <Button
                                            variant="secondary"
                                            className="accent-button"
                                            onClick={() => setShow(false)}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            variant="danger"
                                            className="accent-button"
                                            disabled={loading}
                                            onClick={handleDelete}
                                        >
                                            Confirm Delete
                                        </Button>
                                    </Modal.Footer>
                                </Modal>

                                <select
                                    className={`custom-select custom-select-sm ${
                                        commentStatus === "pending"
                                            ? "border-warning"
                                            : commentStatus === "rejected"
                                            ? "border-danger"
                                            : "border-success"
                                    }`}
                                    style={{
                                        borderWidth: "2px",
                                    }}
                                    disabled={loading}
                                    defaultValue={commentStatus}
                                    onChange={(e) => {
                                        handleStatusChange(id, e.target.value);
                                    }}
                                >
                                    <option value="pending">Pending</option>
                                    <option value="approved">Approved</option>
                                    <option value="rejected">Rejected</option>
                                </select>
                            </div>
                        )}
                    </div>
                    <small className="blog-comment-date">
                        {formattedCreatedAtDate}
                    </small>
                    <small className="blog-comment-text">{comment}</small>
                </div>
                {error && (
                    <small className="d-block text-center pt-3 text-danger">
                        {error}
                    </small>
                )}
            </Card.Body>
            <style jsx global>
                {`
                    .blog-comment-root {
                        min-width: 275px;
                        font-size: 0.9rem;
                        font-weight: 500;
                    }

                    .blog-comment-container {
                        gap: 1.125rem;
                    }

                    .blog-comment-name {
                        display: flex;
                        gap: 1rem;
                        justify-content: start;
                        align-items: center;

                        font-size: 0.975rem;
                        margin: 0;
                    }

                    .blog-comment-date {
                        color: gray;
                        display: block;
                        margin-bottom: 0.125rem;
                    }

                    .blog-comment-text {
                        color: #333;
                        font-size: 0.8rem;
                    }

                    .custom-select-sm {
                        font-size: 0.75rem;
                    }
                `}
            </style>
        </Card>
    );
}
