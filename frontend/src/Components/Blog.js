import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Pagination, Row } from "react-bootstrap";
import BlogSidebar from "./BlogSidebar";
import BlogMarkdownLayout from "../Layouts/BlogMarkdownLayout";
import { formatDate } from "../utils/formateDate";
import { paths } from "../config/paths";
import { blogData } from "../config/dummy-data";

export default function Blog() {
    return (
        <Container className="py-3 py-md-5 blog-container">
            <Row>
                <Col xs={{ span: 12 }} lg={{ span: 8 }}>
                    {blogData.map((blog, index) => (
                        <BlogCard {...blog} key={blog.id || index} />
                    ))}
                    <BlogPagination />
                </Col>
                <Col xs={{ span: 12 }} lg={{ span: 4 }}>
                    <BlogSidebar />
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

function BlogCard({ id, title, author, date, comments, img, content }) {
    const formattedDate = formatDate(date);

    const blogContentPreviewMaxLength = 375;

    // truncate blog content for preview

    const [blogContent, setBlogContent] = useState("");

    useEffect(() => {
        import(/* @vite-ignore */ content)
            .then((res) => {
                fetch(res.default)
                    .then((res) => res.text())
                    .then((res) => {
                        const truncatedContent = res.substring(
                            0,
                            blogContentPreviewMaxLength
                        );
                        setBlogContent(truncatedContent + "...");
                    })
                    .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
    });

    return (
        <Card className="blog-card shadow">
            <Card.Img
                variant="top"
                src={img}
                alt={`${author}'s Blog: ${title}`}
                className="normalized-image blog-card-image"
            />
            <Card.Body className="px-4">
                <Card.Title className="blog-card-title">{title}</Card.Title>
                <Card.Text className="blog-card-metadata">
                    <small>
                        <i className="fa-regular fa-user mr-2" />
                        {author}
                    </small>
                    <small>
                        <i className="fa-regular fa-clock mr-2" />
                        {formattedDate}
                    </small>
                    <small>
                        <i className="fa-regular fa-comment-dots mr-2" />
                        {comments} comments
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
                <Button
                    href={`${paths.blog.url}/${id}`}
                    variant="success"
                    className="d-block ml-auto accent-button py-1 px-3 font-weight-normal blog-card-button"
                >
                    Read More
                </Button>
            </Card.Body>
        </Card>
    );
}

function BlogPagination() {
    return (
        <Pagination className="blog-pagination">
            <Pagination.Item key={1} activeLabel="">
                1
            </Pagination.Item>
            <Pagination.Item key={2} active={true} activeLabel="">
                2
            </Pagination.Item>
            <Pagination.Item key={3} activeLabel="">
                3
            </Pagination.Item>
        </Pagination>
    );
}
