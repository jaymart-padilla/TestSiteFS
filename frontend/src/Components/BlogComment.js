import { Card } from "react-bootstrap";
import { formatDate } from "../utils/formateDate";

export const blogComments = [
    {
        id: 1,
        name: "John Doe",
        date: new Date(2024, 0, 1),
        img: "/images/testimonials/img-2.jpg",
        comment:
            "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptas unde accusantium impedit recusandae quis corrupti quia velit fugiat adipisci maxime. Ea dicta quo saepe totam.",
    },
];

export default function BlogComment({ name, date, img, comment }) {
    if (![name, date, img, comment].every(Boolean)) return null;

    const imgPxSize = 64;
    const formattedDate = formatDate(date);

    return (
        <Card className="border-0 blog-comment-root">
            <Card.Body className="d-flex blog-comment-container">
                <img
                    src={img}
                    alt={name}
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
                <div>
                    <p className="blog-comment-name">
                        {name}{" "}
                        <a href="#" className="text-dark">
                            <small>
                                <i className="fa-solid fa-reply" /> Reply
                            </small>
                        </a>
                    </p>
                    <small className="blog-comment-date">{formattedDate}</small>
                    <small className="blog-comment-text">{comment}</small>
                </div>
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
                `}
            </style>
        </Card>
    );
}
