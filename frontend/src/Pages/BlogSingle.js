import { useParams } from "react-router-dom";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import BlogItem from "../Components/BlogItem";
import { paths } from "../config/paths";
import { useEffect, useState } from "react";
import axios from "axios";

export default function BlogSingle() {
    const { id } = useParams();
    const [currentBlog, setCurrentBlog] = useState();
    const [loading, setLoading] = useState(true);

    // fetch blog post if editing
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`/api/blog/view/`, {
                    params: {
                        id: id,
                    },
                });

                setCurrentBlog(response.data);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBlog();
    }, [id]);

    const currentPath = {
        url: paths.blog.url + "/" + id,
        text: currentBlog?.title || "Blog Single",
    };

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.blog, currentPath]}
                activeLink={currentPath}
            />
            <BlogItem blog={currentBlog} loading={loading} />
        </div>
    );
}
