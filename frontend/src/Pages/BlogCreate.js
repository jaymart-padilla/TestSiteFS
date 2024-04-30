import { useEffect } from "react";
import { Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import { useMarkdown } from "../context/MarkdownProvider";
import MainLayout from "../Components/blog_markdown_editor/MainLayout";
import Editor from "../Components/blog_markdown_editor/Editor";
import Preview from "../Components/blog_markdown_editor/Preview";
import { paths } from "../config/paths";
import axios from "axios";

export default function BlogCreate({ isEditing = false }) {
    // eslint-disable-next-line
    const { setMarkdown, setMarkdownTitle } = useMarkdown();
    const currentPath = {
        url: paths.blog.url + "/create",
        text: `Blog ${isEditing ? "Edit" : "Create"}`,
    };

    const { id } = useParams();

    // fetch blog post if editing
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/view/`, {
                    params: {
                        id: id,
                    },
                });
                setMarkdown(response.data?.content);
                setMarkdownTitle(response.data?.title);
            } catch (error) {
                console.error(error);
            }
        };
        if (isEditing) {
            fetchBlog();
        }
        // eslint-disable-next-line
    }, [id, isEditing]);

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.blog, currentPath]}
                activeLink={currentPath}
            />
            <Container className="blog-create-container">
                <MainLayout>
                    <MainLayout.Column>
                        <Editor isEditing={isEditing} />
                    </MainLayout.Column>
                    <MainLayout.Column>
                        <Preview />
                    </MainLayout.Column>
                </MainLayout>
            </Container>
            <style jsx global>
                {`
                    .blog-create-container {
                        padding-left: 0.125rem;
                        padding-right: 0.125rem;
                    }

                    .blog-create-mainLayout {
                        position: relative;
                        display: flex;
                        flex-direction: column;
                        min-height: 85vh;
                    }

                    .blog-create-mainLayout__col {
                        flex: 1;
                        padding: 1.875rem;
                    }

                    .blog-create-editor__wrap {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                    }

                    .blog-create-editor {
                        width: 100%;
                        flex-grow: 1;
                        margin-bottom: 20px;
                        border: none;
                        outline: none;
                        appearance: none;
                        background: none;
                        resize: none;
                    }

                    .blog-create-preview {
                        display: flex;
                        flex-direction: column;
                        height: 100%;
                        width: 100%;
                        word-break: break-all; /* prevent overflowing */
                    }

                    .blog-create-preview__scroll {
                        overflow: auto;
                        flex-grow: 1;
                    }

                    .blog-create-titleBar__wrap {
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                    }

                    @media (min-width: 768px) {
                        .blog-create-mainLayout {
                            flex-direction: row;
                        }

                        .blog-create-mainLayout::before {
                            content: "";
                            height: 95%;
                            width: 1px;
                            background-color: var(--gray-muted);

                            position: absolute;
                            top: 50%;
                            left: 50%;

                            transform: translate(-50%, -50%);
                        }
                    }
                `}
            </style>
        </div>
    );
}
