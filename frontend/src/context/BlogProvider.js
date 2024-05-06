import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { paths } from "../config/paths";

const BlogContext = React.createContext();

export const BlogProvider = ({ children }) => {
    const [blogs, setBlogs] = useState([]);
    const [pagination, setPagination] = useState(null);
    const [params, setParams] = useState({
        page: 1,
        search: "",
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchBlogs = async () => {
            try {
                const response = await axios.get(`/api${paths.blog.url}`, {
                    params: {
                        ...params,
                    },
                });

                setBlogs(response.data?.blogs);
                setPagination(response.data?.pagination);
                setLoading(false);
            } catch (error) {
                console.error(error);
                setLoading(false);
            }
        };
        fetchBlogs();
    }, [params]);

    return (
        <BlogContext.Provider
            value={{
                blogs,
                pagination,
                params,
                setParams,
                loading,
            }}
        >
            {children}
        </BlogContext.Provider>
    );
};

export const useBlogContext = () => {
    const context = useContext(BlogContext);

    if (!context) {
        throw new Error("useBlog must be used within a BlogProvider");
    }
    return context;
};
