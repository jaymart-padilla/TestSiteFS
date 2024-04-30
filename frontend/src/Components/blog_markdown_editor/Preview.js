import Markdown from "markdown-to-jsx";
import { useMarkdown } from "../../context/MarkdownProvider";
import TitleBar from "./TitleBar";
import { Container } from "react-bootstrap";

export default function Preview() {
    const { markdown } = useMarkdown();

    return (
        <div className="blog-create-preview">
            <TitleBar title="Preview" />
            <div className="blog-create-preview__scroll">
                <Markdown
                    options={{
                        wrapper: "article",
                        overrides: {
                            h2: {
                                component: ArticleJumbotron,
                            },
                            img: {
                                component: ArticleImage,
                                props: { className: "normalized-image" },
                            },
                        },
                    }}
                >
                    {markdown}
                </Markdown>
                <style jsx global>
                    {`
                        .blog-card-jumbotron {
                            position: relative;
                            color: #444;
                            font-size: 1.25rem;
                            font-weight: 500;
                            word-spacing: 0.175ch;
                        }

                        .blog-card-jumbotron::before {
                            content: "";
                            position: absolute;
                            background-color: var(--accent-color);
                            width: 0.25rem;
                            height: 90%;
                            left: 0;
                            top: 50%;
                            bottom: 50%;
                            transform: translateY(-50%);
                        }
                    `}
                </style>
            </div>
        </div>
    );
}

function ArticleJumbotron({ children }) {
    return (
        <Container className="p-5 mb-3 bg-light rounded-3 blog-card-jumbotron">
            <em>{children}</em>
        </Container>
    );
}

export function ArticleImage({ ...props }) {
    return <img {...props} width="100%" />;
}
