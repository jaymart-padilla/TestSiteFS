function MainLayout({ children }) {
    return <main className="blog-create-mainLayout">{children}</main>;
}
MainLayout.Column = ({ children }) => (
    <div className="blog-create-mainLayout__col">{children}</div>
);

MainLayout.Column.displayName = "MainLayoutColumn";

export default MainLayout;
