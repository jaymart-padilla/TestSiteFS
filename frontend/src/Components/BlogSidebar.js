import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { formatDate } from "../utils/formateDate";
import { paths } from "../config/paths";
import { blogCategories, blogData, blogTags } from "../config/dummy-data";

export default function BlogSidebar() {
    return (
        <section className="py-3 px-4 mt-4 mt-lg-0 blog-sidebar shadow border">
            <SearchSection />
            <CategoriesSection />
            <RecentPostSection />
            <TagSection />
            <style jsx global>
                {`
                    .blog-sidebar {
                        display: flex;
                        flex-direction: column;
                        gap: 1.5rem;
                        font-size: 0.9rem;
                    }

                    .blog-sidebar-section-title {
                        font-size: 1.125rem;
                        font-weight: 500;
                        margin-bottom: 0.5rem;
                    }

                    .blog-sidebar-search-input {
                        font-size: inherit;
                    }

                    .blog-sidebar-search-button {
                        color: white;
                        border: none;
                        border-radius: 0 0.25rem 0.25rem 0;
                    }

                    .blog-sidebar-categories {
                        display: flex;
                        flex-direction: column;
                        gap: 0.5rem;
                        color: #555;
                        font-weight: 500;
                    }

                    .blog-sidebar-recent-post-container {
                        display: flex;
                        flex-direction: column;
                        gap: 1rem;
                    }

                    .blog-sidebar-recent-post {
                        display: flex;
                        gap: 1rem;
                    }

                    .blog-sidebar-recent-post-title {
                        font-weight: 500;
                        color: inherit;
                    }

                    .blog-sidebar-tag {
                        font-size: small;
                        padding: 0.25rem 0.75rem;
                    }
                `}
            </style>
        </section>
    );
}

function SearchSection() {
    return (
        <Form>
            <div className="blog-sidebar-section-title">Search</div>
            <InputGroup>
                <FormControl
                    className="border-right-0 blog-sidebar-search-input"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                />
                <Button
                    variant="success"
                    className="accent-button px-3 blog-sidebar-search-button"
                >
                    <i className="fa-solid fa-magnifying-glass" />
                </Button>
            </InputGroup>
        </Form>
    );
}

function CategoriesSection() {
    return (
        <div>
            <div className="blog-sidebar-section-title">Categories</div>
            <div className="blog-sidebar-categories">
                {blogCategories.map((blogCategory, index) => {
                    return (
                        <span key={index}>
                            {blogCategory.title}{" "}
                            <span className="text-secondary font-weight-normal">
                                <small>({blogCategory.count})</small>
                            </span>
                        </span>
                    );
                })}
            </div>
        </div>
    );
}

function RecentPostSection() {
    return (
        <div>
            <div className="blog-sidebar-section-title">Recent Posts</div>
            <div className="blog-sidebar-recent-post-container">
                {blogData.map((blog, index) => {
                    const formattedDate = formatDate(blog.date);
                    return (
                        <div className="blog-sidebar-recent-post" key={index}>
                            <a href={`${paths.blog.url}/${blog.id}`}>
                                <img
                                    className="normalized-image mt-1"
                                    src={blog.img}
                                    alt={blog.title}
                                    width={75}
                                    height={50}
                                />
                            </a>
                            <div className="d-flex flex-column">
                                <a
                                    href={`${paths.blog.url}/${blog.id}`}
                                    className="blog-sidebar-recent-post-title"
                                >
                                    {blog.title}
                                </a>
                                <span className="text-secondary font-weight-normal">
                                    <small className="font-italic">
                                        {formattedDate}
                                    </small>
                                </span>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

function TagSection() {
    return (
        <div>
            <div className="blog-sidebar-section-title">Tags</div>
            {blogTags.map((blogTag, index) => {
                return (
                    <Button
                        variant="outline-secondary"
                        className="mb-2 mr-2 rounded-0 blog-sidebar-tag"
                        size="sm"
                        key={index}
                    >
                        {blogTag}
                    </Button>
                );
            })}
        </div>
    );
}
