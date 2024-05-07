import { useState } from "react";
import axios from "axios";
import {
    Button,
    Card,
    Col,
    Container,
    Modal,
    Pagination,
    Row,
} from "react-bootstrap";
import { useAuthContext } from "../context/AuthProvider";
import { useBlogContext } from "../context/BlogProvider";
import BlogMarkdownLayout from "../Layouts/BlogMarkdownLayout";
import BlogSidebar from "./BlogSidebar";
import Loading from "./Loading";
import { formatDate } from "../utils/formateDate";
import { parseErrorMessage } from "../utils/errorParser";
import { paths } from "../config/paths";

export default function Blog() {
    const { user } = useAuthContext();

    const { blogs, pagination, setParams, loading } = useBlogContext();

    // if (loading) return <Loading />;

    return (
        <Container className="py-3 py-md-5 blog-container">
            <Row>
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                    {loading ? (
                        <Loading />
                    ) : (
                        <>
                            {blogs && blogs.length > 0 ? (
                                <>
                                    {blogs.map((blog, index) => (
                                        <BlogCard
                                            user={user}
                                            {...blog}
                                            key={blog.id || index}
                                        />
                                    ))}
                                    <BlogPagination
                                        {...pagination}
                                        setParams={setParams}
                                    />
                                </>
                            ) : (
                                <p className="lead">No blogs found</p>
                            )}
                        </>
                    )}
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                    <BlogSidebar user={user} />
                </Col>
            </Row>
            <style jsx global>{`
                .blog-container {
                    padding-left: 2rem;
                    padding-right: 2rem;
                }

                .blog-card {
                    margin-bottom: 2.75rem;
                }

                .blog-card-title {
                    font-size: 1.5rem;
                    font-weight: bold;
                }

                .blog-card-metadata {
                    color: gray;
                    margin-bottom: 0.75rem;

                    display: flex;
                    gap: 1.25rem;
                }

                .blog-card-image {
                    height: 300px;
                }

                .blog-card-content-preview {
                    font-size: 0.85rem;
                    color: #555;
                    word-spacing: 0.175ch;
                }

                .blog-card-button {
                    width: fit-content;
                    margin-top: 0.75rem;
                }

                .blog-pagination {
                    display: flex;
                    justify-content: center;
                    margin-top: -1rem;
                }

                .blog-pagination .page-item > a {
                    color: #333;
                }

                .blog-pagination .page-item > a:hover,
                .blog-pagination .page-item > a:focus {
                    color: white;
                    background-color: var(--accent-color-muted);
                }

                .blog-pagination .page-link {
                    border: none;
                    padding: 0.5rem 1.5rem;
                }

                .blog-pagination .page-item.active .page-link {
                    background-color: var(--accent-color);
                    border-color: var(--accent-color);
                    padding: 0.5rem 1rem;
                    z-index: 10;
                }
            `}</style>
        </Container>
    );
}

function BlogCard({
    user,
    id,
    title,
    author,
    created_at,
    updated_at,
    comments,
    thumbnail,
    content,
}) {
    const isAdmin = user?.privilege === "admin";

    const [show, setShow] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const dateCreated = formatDate(created_at);
    const dateUpdated = formatDate(updated_at);

    const blogContentPreviewMaxLength = 375;

    // truncate blog content for preview
    const blogContent = content
        ? content.substring(0, blogContentPreviewMaxLength) + "..."
        : "";

    async function handleDelete() {
        try {
            setLoading(true);

            await axios.delete(`/api${paths.blog.url}/delete`, {
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

    return (
        <Card className="blog-card shadow">
            <Card.Img
                variant="top"
                src={`/api/${thumbnail}`}
                alt={`${author}'s Blog: ${title}`}
                className="normalized-image blog-card-image"
            />
            <Card.Body className="px-4">
                <Card.Title className="blog-card-title">{title}</Card.Title>
                <Card.Text className="blog-card-metadata">
                    <small>
                        <i className="fa-regular fa-user mr-2" />
                        {author || "Anonymous"}
                    </small>
                    <small>
                        <i className="fa-regular fa-clock mr-2" />
                        {dateCreated && dateUpdated
                            ? `${dateCreated} — ${dateUpdated}`
                            : "Unknown"}
                    </small>
                    <small>
                        <i className="fa-regular fa-comment-dots mr-2" />
                        {(comments && isAdmin
                            ? comments.length
                            : comments.filter(
                                  (comment) => comment?.status === "approved"
                              ).length) || 0}{" "}
                        comments
                    </small>
                </Card.Text>
                <BlogMarkdownLayout
                    overrides={{
                        // overrides layout default components
                        h1: ({ children, ...props }) => (
                            <h5 {...props}>{children}</h5>
                        ),
                        h2: ({ children, ...props }) => (
                            <h6 {...props}>
                                <em>{children}</em>
                            </h6>
                        ),
                        h3: ({ children, ...props }) => (
                            <h6 {...props}>{children}</h6>
                        ),
                        h4: ({ children, ...props }) => (
                            <h6 {...props}>{children}</h6>
                        ),
                        h5: ({ children, ...props }) => (
                            <h6 {...props}>{children}</h6>
                        ),
                    }}
                    className="blog-card-content-preview"
                >
                    {blogContent}
                </BlogMarkdownLayout>
                <div className="d-flex justify-content-between">
                    {user && user.privilege === "admin" && (
                        <div>
                            <Button
                                variant="danger"
                                className="accent-button mr-2 py-1 px-3 font-weight-normal blog-card-button"
                                onClick={() => setShow(true)}
                            >
                                Delete
                            </Button>

                            <Modal show={show} onHide={() => setShow(false)}>
                                <Modal.Header>
                                    <Modal.Title>{title}</Modal.Title>
                                </Modal.Header>
                                <Modal.Body>
                                    Are you sure you want to delete this blog?
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

                            <Button
                                href={`${paths.blog.url}/edit/${id}`}
                                variant="warning"
                                className="accent-button py-1 px-3 font-weight-normal blog-card-button"
                            >
                                Edit
                            </Button>
                        </div>
                    )}
                    <Button
                        href={`${paths.blog.url}/${id}`}
                        variant="success"
                        className="d-block ml-auto accent-button py-1 px-3 font-weight-normal blog-card-button"
                    >
                        Read More
                    </Button>
                </div>
                {error && (
                    <small className="d-block text-center pt-3 text-danger">
                        {error}
                    </small>
                )}
            </Card.Body>
        </Card>
    );
}

function BlogPagination({
    current_page: currentPage,
    prev_page: prev,
    next_page: next,
    setParams,
}) {
    return (
        <Pagination className="blog-pagination">
            <Pagination.Item
                onClick={() => setParams({ page: prev })}
                disabled={prev == null}
                // key={0}
                activeLabel=""
            >
                Prev
            </Pagination.Item>

            <Pagination.Item key={currentPage} active={true} activeLabel="">
                {currentPage || 1}
            </Pagination.Item>

            <Pagination.Item
                onClick={() => setParams({ page: next })}
                disabled={next == null}
                // key={total + 1}
                activeLabel=""
            >
                Next
            </Pagination.Item>
        </Pagination>
    );
}
