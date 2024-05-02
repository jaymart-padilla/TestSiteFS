import { useEffect, useState } from "react";
import { Button, Form, FormControl, InputGroup } from "react-bootstrap";
import { useBlogContext } from "../context/BlogProvider";
import { formatDate } from "../utils/formateDate";
import { blogCategories, blogData, blogTags } from "../config/dummy-data";
import { paths } from "../config/paths";

export default function BlogSidebar({ user }) {
    return (
        <section className="py-3 px-4 mt-4 mt-lg-0 blog-sidebar shadow border">
            <SearchSection />
            <BlogCreateSection user={user} />
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
    const { params, setParams } = useBlogContext();
    const [search, setSearch] = useState(params?.search || "");

    function updateSearch(e) {
        setSearch(e.target.value);
    }

    // throttle searching
    useEffect(() => {
        const SEARCH_THROTTLE_DELAY = 200;

        const timer = setTimeout(() => {
            setParams({ ...params, search });
        }, SEARCH_THROTTLE_DELAY);

        return () => clearTimeout(timer);

        // eslint-disable-next-line
    }, [search]);

    return (
        <Form>
            <div className="blog-sidebar-section-title">Search</div>
            <InputGroup>
                <FormControl
                    className="border-right-0 blog-sidebar-search-input"
                    aria-label="Search"
                    aria-describedby="basic-addon2"
                    value={search || ""}
                    onChange={updateSearch}
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

function BlogCreateSection({ user }) {
    if (!user || user?.privilege !== "admin") return null;

    return (
        <Button
            href={paths.blog.url + "/create"}
            variant="success"
            className="accent-button px-3"
        >
            <i className="fa-solid fa-plus mr-2" />
            Create a new blog
        </Button>
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
