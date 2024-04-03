import { Container } from "react-bootstrap";
import Markdown from "markdown-to-jsx";

//
//  children prop must be a `string/text` in `Markdown` component
//

export default function BlogMarkdownLayout({
    children,
    overrides,
    className = "",
    ...props
}) {
    return (
        <>
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
                        ...overrides,
                    },
                }}
                {...props}
                className={className}
            >
                {children}
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
        </>
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
