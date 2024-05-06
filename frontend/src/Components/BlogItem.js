import { useForm } from "@inertiajs/react";
import { useState } from "react";
import axios from "axios";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import BlogMarkdownLayout from "../Layouts/BlogMarkdownLayout";
import BlogSidebar from "./BlogSidebar";
import BlogComment from "./BlogComment";
import Loading from "./Loading";
import ErrorPage from "../Pages/ErrorPage";
import { formatDate } from "../utils/formateDate";
import { parseErrorMessage } from "../utils/errorParser";
import { useAuthContext } from "../context/AuthProvider";

export default function BlogItem({ blog, loading }) {
    const { user } = useAuthContext();
    const isAdmin = user?.privilege === "admin";

    return (
        <Container className="py-3 py-lg-5 blog-container">
            <Row>
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                    {loading ? (
                        <Loading />
                    ) : !blog ? (
                        <ErrorPage message="404 Not Found" />
                    ) : (
                        <>
                            <BlogCard {...blog} isAdmin={isAdmin} />
                            <ProfileCard />
                            <BlogComments
                                comments={blog?.comments}
                                isAdmin={isAdmin}
                            />
                            <BlogLeaveReplyForm blogId={blog?.id} />
                        </>
                    )}
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                    <BlogSidebar />
                </Col>
            </Row>
            <style jsx global>
                {`
                    .blog-container {
                        padding-left: 2rem;
                        padding-right: 2rem;
                    }

                    .blog-item-card {
                        margin-bottom: 2rem;
                    }

                    .blog-item-card-title {
                        font-size: 1.5rem;
                        font-weight: bold;
                    }

                    .blog-item-card-metadata {
                        color: gray;
                        display: flex;
                        gap: 1.25rem;
                        margin-bottom: 0.75rem;
                    }

                    .blog-item-card-image {
                        height: 300px;
                    }

                    .blog-item-card-content {
                        color: #555;
                        font-size: 0.85rem;
                        word-spacing: 0.175ch;
                        padding-bottom: 0.5rem;
                    }

                    .blog-item-profile-card-grid-item {
                        font-weight: 500;
                    }

                    .blog-item-profile-card-grid-item-container {
                        gap: 1.125rem;
                    }

                    .blog-item-profile-card-item-name {
                        font-size: 1.175rem;
                        margin: 0;
                    }

                    .blog-item-profile-card-item-social-icons {
                        color: gray;
                        margin-bottom: 0.75rem;
                        display: flex;
                        gap: 0.75rem;
                    }

                    .blog-item-profile-card-item-text {
                        color: #aaa;
                        font-weight: 500;
                        font-size: 0.825rem;
                    }

                    .blog-item-comment {
                        font-weight: 500;
                        margin-bottom: 1.25rem;
                        margin-top: 1.25rem;
                    }

                    .blog-item-leave-reply-form {
                        margin-top: 1.25rem;
                    }

                    .blog-item-leave-reply-form-input {
                        font-size: small;
                    }
                `}
            </style>
        </Container>
    );
}

function BlogCard({
    title,
    author,
    created_at,
    updated_at,
    comments,
    thumbnail,
    content,
    isAdmin,
    tags = [],
}) {
    const dateCreated = formatDate(created_at);
    const dateUpdated = formatDate(updated_at);

    return (
        <Card className="blog-item-card">
            <Card.Img
                variant="top"
                src={`/api/${thumbnail}`}
                alt={`${author}'s Blog: ${title}`}
                className="normalized-image blog-item-card-image"
            />
            <Card.Body className="px-4">
                <Card.Title className="blog-item-card-title">
                    {title}
                </Card.Title>
                <Card.Text className="blog-item-card-metadata">
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
                <BlogMarkdownLayout className="blog-item-card-content">
                    {content}
                </BlogMarkdownLayout>

                {tags && tags.length > 0 && (
                    <Card.Text className="border-top pt-2 blog-item-card-metadata">
                        <small>
                            <i className="fa-solid fa-tags mr-2" />
                            {tags.map((tag) => tag).join(", ")}
                        </small>
                    </Card.Text>
                )}
            </Card.Body>
        </Card>
    );
}

function ProfileCard() {
    const imgPxSize = 94;
    const name = "Jane Smith";
    const img = "/images/testimonials/img-2.jpg";
    const withShadow = true;
    const text =
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Obcaecati eos possimus consequuntur corporis, fugiat atque ut facere quod adipisci assumenda.";

    return (
        <Card
            className={`border-top border-bottom-0 border-left-0 border-right-0 px-3 blog-item-profile-card-grid-item ${
                withShadow && "shadow-sm"
            }`}
        >
            <Card.Body className="d-flex px-4 blog-item-profile-card-grid-item-container">
                <img
                    src={img}
                    alt={name}
                    className="d-block rounded-circle normalized-image align-self-center"
                    width={imgPxSize}
                    height={imgPxSize}
                    style={{
                        maxWidth: imgPxSize,
                        maxHeight: imgPxSize,
                        minWidth: imgPxSize,
                        minHeight: imgPxSize,
                    }}
                />
                <div>
                    <p className="blog-item-profile-card-item-name">{name}</p>
                    <div className="mt-1 mb-2 blog-item-profile-card-item-social-icons">
                        <i className="fa-brands fa-twitter" />
                        <i className="fa-brands fa-facebook" />
                        <i className="fa-brands fa-instagram" />
                    </div>
                    <em className="blog-item-profile-card-item-text">{text}</em>
                </div>
            </Card.Body>
        </Card>
    );
}

function BlogComments({ isAdmin, comments = [] }) {
    //
    // will be handled differently on full stack (each reply to a comment will add a dynamic insertion // adding a padding to its left)
    //
    if (!comments && comments.length < 1) return null;

    return (
        <div className="overflow-auto">
            <h5 className="blog-item-comment">
                {isAdmin
                    ? comments.length
                    : comments.filter(
                          (comment) => comment?.status === "approved"
                      ).length}{" "}
                Comments
            </h5>
            {comments.map((comment, index) => (
                <BlogComment key={comment?.id || index} {...comment} />
            ))}

            {/* <div>
                <BlogComment {...blogComment} />
            </div>
            <div>
                <BlogComment {...blogComment} />
                <div className="pl-4">
                    <BlogComment {...blogComment} />
                </div>
                <div className="pl-5">
                    <BlogComment {...blogComment} />
                </div>
            </div>
            <div>
                <BlogComment {...blogComment} />
            </div> */}
        </div>
    );
}

function BlogLeaveReplyForm({ blogId }) {
    const { data, setData } = useForm({
        comment: "",
    });

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState();

    const submit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await axios.post("/api/blog-comment/create", {
                ...data,
                blog_id: blogId,
            });

            setError();
            setLoading(false);

            console.log(response.data);

            window.location.reload();
        } catch (error) {
            setLoading(false);
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
        <Form
            className="p-4 shadow-sm border border-bottom-0 blog-item-leave-reply-form"
            onSubmit={submit}
        >
            <h5 className="font-weight-bold">Leave a Reply</h5>
            <small className="d-block mt-2 mb-3">
                Please be polite when writing your comment. All comments will be
                moderated.
            </small>
            {/* <Row>
                <Form.Group as={Col} controlId="name" className="mb-3">
                    <Form.Control
                        placeholder="Your Name*"
                        className="blog-item-leave-reply-form-input"
                    />
                </Form.Group>
                <Form.Group as={Col} controlId="email" className="mb-3">
                    <Form.Control
                        type="email"
                        placeholder="Your Email*"
                        className="blog-item-leave-reply-form-input"
                    />
                </Form.Group>
            </Row>
            <Form.Group controlId="subject" className="mb-3">
                <Form.Control
                    placeholder="Your Website"
                    className="blog-item-leave-reply-form-input"
                />
            </Form.Group> */}
            <Form.Group controlId="message" className="mb-3">
                <Form.Control
                    as="textarea"
                    placeholder="Your Comment"
                    rows={3}
                    className="blog-item-leave-reply-form-input"
                    value={data.comment}
                    onChange={(e) => setData("comment", e.target.value)}
                />
            </Form.Group>
            <Button
                className="d-block accent-button"
                variant="dark"
                disabled={loading}
                type="submit"
            >
                Send Message
            </Button>
            {error && (
                <small className="d-block text-left pt-3 text-danger">
                    {error}
                </small>
            )}
        </Form>
    );
}
