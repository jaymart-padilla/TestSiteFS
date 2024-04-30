import { createContext, useContext, useState } from "react";

const MarkdownContext = createContext(null);

export const MarkdownProvider = ({ children }) => {
    const [markdown, setMarkdown] = useState("");
    const [markdownTitle, setMarkdownTitle] = useState("");

    return (
        <MarkdownContext.Provider
            value={{ markdown, setMarkdown, markdownTitle, setMarkdownTitle }}
        >
            {children}
        </MarkdownContext.Provider>
    );
};

export const useMarkdown = () => useContext(MarkdownContext);
