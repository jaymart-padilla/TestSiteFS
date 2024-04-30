export default function TitleBar({ title, aside }) {
    return (
        <div className="mb-2">
            <div className="blog-create-titleBar__wrap">
                {title && <h4 className="mb-2">{title}</h4>}
                {aside && <h6>{aside}</h6>}
            </div>
            <hr />
        </div>
    );
}
