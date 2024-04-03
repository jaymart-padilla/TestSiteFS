import { useParams } from "react-router-dom";
import TopBreadcrumbs from "../Components/TopBreadcrumbs";
import BlogItem from "../Components/BlogItem";
import { paths } from "../config/paths";
import { blogData } from "../config/dummy-data";

export default function BlogSingle() {
    const { id } = useParams();
    const currentBlog = blogData.find(
        (blog) => blog.id.toString() === id.toString()
    );

    const currentPath = {
        url: paths.blog.url + "/" + id,
        text: currentBlog.title || "Blog Single",
    };

    return (
        <div className="flex-grow-1">
            <TopBreadcrumbs
                links={[paths.home, paths.blog, currentPath]}
                activeLink={currentPath}
            />
            <BlogItem blog={currentBlog} />
        </div>
    );
}
